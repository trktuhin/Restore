using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrdersController : BaseController
    {
        private readonly StoreContext _context;
        public OrdersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<OrderDto>>> GetOrders()
        {
            return await _context.Orders
                    .ProjectOrderToOrderDto()
                    .Where(x => x.BuyerId == User.Identity.Name)
                    .ToListAsync();
        }

        [HttpGet("{id}", Name = "GetOrder")]
        public async Task<ActionResult<OrderDto>> GetOrder(int id)
        {
            return await _context.Orders.ProjectOrderToOrderDto()
                    .FirstOrDefaultAsync(x => x.BuyerId == User.Identity.Name && x.Id == id);
        }
        [HttpPost]
        public async Task<ActionResult<int>> CreateOrder(CreateOrderDto dto)
        {
            var basket = await _context.Baskets.RetrieveBasketWithItems(User.Identity.Name)
                        .FirstOrDefaultAsync();
            if (basket == null)
            {
                return BadRequest(new ProblemDetails { Title = "Could not locate basket" });
            }
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var productItem = await _context.Products.FindAsync(item.ProductId);
                var itemOrdered = new ProductItemOrdered
                {
                    ProductId = productItem.Id,
                    Name = productItem.Name,
                    PictureUrl = productItem.PictureUrl
                };

                var orderItem = new OrderItem
                {
                    ItemOrdered = itemOrdered,
                    Price = productItem.Price,
                    Quantity = item.Quantity
                };
                items.Add(orderItem);
                productItem.QuantityInStock -= item.Quantity;
            }
            var subtotal = items.Sum(x => x.Price * x.Quantity);
            var deliveryFee = subtotal > 1000 ? 0 : 500;
            var order = new Order
            {
                OrderItems = items,
                BuyerId = User.Identity.Name,
                ShippingAddress = dto.ShippingAddress,
                Subtotal = subtotal,
                DeliveryFee = deliveryFee,
                PaymentIntentId = basket.PaymentIntentId
            };
            _context.Orders.Add(order);
            _context.Baskets.Remove(basket);
            if (dto.SaveAddress)
            {
                var user = await _context.Users
                .Include(u => u.Address)
                .FirstOrDefaultAsync(x => x.UserName == User.Identity.Name);
                var Address = new UserAddress
                {
                    FullName = dto.ShippingAddress.FullName,
                    Address1 = dto.ShippingAddress.Address1,
                    Address2 = dto.ShippingAddress.Address2,
                    City = dto.ShippingAddress.City,
                    State = dto.ShippingAddress.State,
                    Zip = dto.ShippingAddress.Zip,
                    Country = dto.ShippingAddress.Country
                };
                user.Address = Address;
                //_context.Update(user);
            }
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetOrder", new { id = order.Id }, order.Id);
            return BadRequest("Problem Creating order");
        }
    }
}
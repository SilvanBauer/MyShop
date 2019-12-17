using Microsoft.EntityFrameworkCore;

namespace MyShop.Services {
    /// <summary>
    /// The entity framework core store which let's you use your tables in the database
    /// </summary>
    public class MyShopStore : DbContext {
        // The models which are tabels in the database
        public DbSet<Product> Product { get; private set; }

        public DbSet<Order> Order { get; set; }

        public DbSet<OrderedProduct> OrderedProduct { get; set; }

        /// <summary>
        /// Configures the models
        /// </summary>
        /// <param name="modelBuilder">The modelBuilder from entity framework core</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<OrderedProduct>().HasKey(new[] { "OrderId", "ProductId" });
        }

        /// <summary>
        /// Configures entity framework core to use an sql server database
        /// </summary>
        /// <param name="optionsBuilder">The entity framework core optionsBuilder</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=MyShop;Trusted_Connection=True;");
        }
    }
}

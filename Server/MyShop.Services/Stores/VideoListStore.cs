using Microsoft.EntityFrameworkCore;

namespace VideoList.Services {
    /// <summary>
    /// The entity framework core store which let's you use your tables in the database
    /// </summary>
    public class VideoListStore : DbContext {
        // The models which are tabels in the database
        public DbSet<Review> Review { get; private set; }

        public DbSet<Serie> Serie { get; private set; }

        public DbSet<User> User { get; private set; }

        public DbSet<Video> Video { get; private set; }

        /// <summary>
        /// Configures the models
        /// </summary>
        /// <param name="modelBuilder">The modelBuilder from entity framework core</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Review>().HasKey(new[] { "UserId", "VideoId" });
        }

        /// <summary>
        /// Configures entity framework core to use an sql server database
        /// </summary>
        /// <param name="optionsBuilder">The entity framework core optionsBuilder</param>
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=VideoList;Trusted_Connection=True;");
        }
    }
}

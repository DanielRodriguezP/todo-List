 
using Microsoft.EntityFrameworkCore;
using todoList.Entities;

namespace todoList
{
	public class ApplicactionDbContext : DbContext
	{
        public ApplicactionDbContext(DbContextOptions options): base(options)
        {

        }
		public DbSet<Tasks> Tasks { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Tasks>()
		   .HasIndex(t => t.Title)
		   .IsUnique();

		}
	}
}


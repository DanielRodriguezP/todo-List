using System;
using System.ComponentModel.DataAnnotations;

namespace todoList.Entities
{
	public class Tasks
	{
        public int Id { get; set; }

        [Required(ErrorMessage = "the field {0} is mandatory")]
        [StringLength(100)]
        public string? Title { get; set; }

        [Required(ErrorMessage = "the field {0} is mandatory")]
        [StringLength(300)]
        public string? Description { get; set; }

        public bool Finished { get; set; }
    }
}


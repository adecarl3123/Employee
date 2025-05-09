using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeApi.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        [Column(TypeName ="nvarchar(100)")]
        public string? FirstName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string? LastName { get; set; }
        public int? Salary { get; set; }
        public string? Department { get; set; }
    }
}

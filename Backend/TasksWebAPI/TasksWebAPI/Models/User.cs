using System;
using System.Collections.Generic;

namespace TasksWebAPI.Models;

public partial class User
{
    public int IdUser { get; set; }

    public string? UserName { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}

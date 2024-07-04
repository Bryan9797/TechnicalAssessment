using System;
using System.Collections.Generic;

namespace TasksWebAPI.Models;

public partial class Task
{
    public int IdTask { get; set; }

    public string? Title { get; set; }

    public bool? IsDone { get; set; }

    public int? CreatedBy { get; set; }

    public virtual User? CreatedByNavigation { get; set; }
}

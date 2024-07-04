using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TasksWebAPI.Models;

namespace TasksWebAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ToDoController : ControllerBase
    {

        private readonly TaskDbContext _dbContext;

        public ToDoController(TaskDbContext taskDbContext)
        {
            _dbContext = taskDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {

            var tasks = await _dbContext.Tasks.ToListAsync();

            return StatusCode(StatusCodes.Status200OK, new { value = tasks });
        }

        [HttpGet]
        [Route("detail/{idTask}")]
        public async Task<IActionResult> GetTask(int idTask)
        {

            var task = await _dbContext.Tasks.Where(t => t.IdTask == idTask).ToListAsync();

            if (task != null)
            {
                return StatusCode(StatusCodes.Status200OK, task);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound, null);
            }

        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] Models.Task task)
        {
            _dbContext.Tasks.Add(task);
            await _dbContext.SaveChangesAsync();
            if (task != null)
            {
                return StatusCode(StatusCodes.Status200OK, task);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, null);
            }
        }

        [HttpPut]
        public async Task<IActionResult> EditTask([FromBody] Models.Task task)
        {

            var taskFound = _dbContext.Tasks.Where(t => t.IdTask == task.IdTask).FirstOrDefault();
            if (taskFound != null)
            {
                await _dbContext.Tasks.Where(t => t.IdTask == task.IdTask)
                    .ExecuteUpdateAsync(u => u.SetProperty(u => u.IsDone, task.IsDone));
                return StatusCode(StatusCodes.Status200OK, task);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound, null);
            }

        }

        [HttpDelete]
        [Route("{idTask}")]
        public async Task<IActionResult> deleteTask(int idtask)
        {

            var taskFound = _dbContext.Tasks.Where(t => t.IdTask == idtask).FirstOrDefault();

            if (taskFound != null)
            {
                await _dbContext.Tasks.Where(t => t.IdTask == idtask).ExecuteDeleteAsync();
                return StatusCode(StatusCodes.Status200OK, taskFound);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }

        }

    }
}

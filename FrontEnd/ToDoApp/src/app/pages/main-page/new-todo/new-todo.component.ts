import { Component, inject } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../../interfaces/Task';
import {MatDialogRef,
  MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle
} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './new-todo.component.html',
  styleUrl: './new-todo.component.css'
})
export class NewTodoComponent {

  private taskService = inject(TaskService);
  private router = inject(Router);
  private task: Task = {
    IdTask: 0,
    IsDone: false,
    Title: '',
    CreatedBy: 0
  }

  public formBuild = inject(FormBuilder);

  public formTask: FormGroup = this.formBuild.group({
    title:["",Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<NewTodoComponent>) {
    
  }

  create(){
    console.log(this.formTask.value['title']);

    this.task = {
      Title: this.formTask.value['title'],
      IsDone: false,
      IdTask: 0,
      CreatedBy: 2
    }

    this.taskService.createTask(this.task).subscribe({
      next: (data) => {
          console.log(data);
          console.log(data.value);
          window.location.reload();
      },
      error: (err) => {
          console.log(err.message);
      }
    })
  }

  cancel(){
    this.dialogRef.close();
  }

}

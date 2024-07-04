import { Component, inject, Inject } from '@angular/core';
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
  selector: 'app-edit-todo',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css'
})
export class EditTodoComponent {

  public formBuild = inject(FormBuilder);

  public formTask: FormGroup = this.formBuild.group({
    title:["",Validators.required],
    isDone:["",Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<EditTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formTask.value['title'] = this.data.data.title;
    this.formTask.patchValue({
      title: this.data.data.title,
      isDone: this.data.data.isDone
    });
  }


  edit(){
    console.log(this.data.data.idTask)
  }

  cancel(){
    this.dialogRef.close();
  }

}

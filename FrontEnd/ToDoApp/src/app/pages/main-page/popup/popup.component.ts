import { Component, inject, Inject } from '@angular/core';
import {MatDialogRef,
  MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../interfaces/Task';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, 
    MatButtonModule, MatDialogModule, MatCardModule, 
    MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  private taskService = inject(TaskService)
  public formBuild = inject(FormBuilder);

  public formTask: FormGroup = this.formBuild.group({
    title:["",Validators.required],
    isDone:["",Validators.required]
  });

  constructor(public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() {
    console.log(this.data.data.idTask, 'passed in value')
  }

  cancel(): void {
    console.log(this.data);
    this.dialogRef.close();
  }

  delete(){
    this.taskService.deleteTask(this.data.data.idTask).subscribe({
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

}

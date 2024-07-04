import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../../interfaces/Task';
import { TaskService } from '../../services/task.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { Router } from '@angular/router';
import { EditTodoComponent } from './edit-todo/edit-todo.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatCheckboxModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  private taskService = inject(TaskService)
  public listTasks: Task[] = []
  dataSource: any = []
  public displayColumns: string[] = ['IdTask', 'Title', 'IsDone', 'popup'];
  private router = inject(Router);
  
  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskService.listTasks().subscribe({
      next: (data) => {
           if (data.value.length > 0) {
                this.listTasks = data.value;
                this.dataSource.data = this.listTasks;
                console.log(this.dataSource.data);
           }
      },
      error: (err) => {
           console.log(err.message);
      }
    })
  }

  openPopup(task: any){
    console.log(task);
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '300px';
        dialogConfig.height = '180px';
        dialogConfig.data = {
          data: {idTask: task.idTask, title: task.title}
        }
        if(this.dialog.openDialogs.length == 0){
          const dialogRef = this.dialog.open(EditTodoComponent, dialogConfig)
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        }
  }

  delete(task:any){
    console.log(task);
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '300px';
        dialogConfig.height = '180px';
        dialogConfig.data = {
          data: {idTask: task.idTask, title: task.title}
        }
        if(this.dialog.openDialogs.length == 0){
          const dialogRef = this.dialog.open(PopupComponent, dialogConfig)
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        }
  }

  openNew(){
    const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '300px';
        dialogConfig.height = '180px';
        if(this.dialog.openDialogs.length == 0){
          const dialogRef = this.dialog.open(NewTodoComponent, dialogConfig)
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        }
  }

}
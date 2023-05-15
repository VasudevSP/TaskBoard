import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { TaskService } from './services/task.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { SnakeService } from './alert/snake.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'Name', 'email','taskdetails','deadline','status','action'];
  dataSource!: MatTableDataSource<any>;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  
  constructor(private dial: MatDialog, private ts: TaskService, private snakeservice: SnakeService){}

 
  ngOnInit(): void {
    this.gettaskList();
  }
  openAdd(){
    const addref=this.dial.open(AddEditComponent)

    addref.afterClosed().subscribe({
      next: (val) =>{
        if(val){
          this.gettaskList();
        }
      }
    })
  }

  gettaskList(){
      this.ts.gettaskList().subscribe({
        next: (res) =>{
          this.dataSource=new MatTableDataSource(res);
          this.dataSource.sort=this.sort;;
          this.dataSource.paginator=this.paginator;
          console.log(res)
        },
       error: (err) =>{
        console.log(err)
       }
      });
    } 

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    deletetask(id: number){
      this.ts.deletetask(id).subscribe({
        next: (res) => {
           
           this.snakeservice.openSnackBar("Deleted Successfully","Done");
           this.gettaskList();
        },
        error: console.log,
        
      })
    }
    updatedata(data: any){
      const update=this.dial.open(AddEditComponent,{data})
      update.afterClosed().subscribe({
        next: (val) =>{
          if(val){
            this.gettaskList();
          }
        }
        })
    }
 }
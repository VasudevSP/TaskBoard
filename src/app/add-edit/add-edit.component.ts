import { Component, OnInit,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from '../services/task.service';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { InjectSetupWrapper, inject } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SnakeService } from '../alert/snake.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent  implements OnInit {
  addform: FormGroup;


  constructor(private fbb: FormBuilder,private ts:TaskService,private snakeservice:SnakeService,private dialogRef: MatDialogRef<AddEditComponent>,@Inject (MAT_DIALOG_DATA) public data:any){
    this.addform = this.fbb.group({
      Name: '',
      email: '',
      taskdetails: '',
      deadline:'',
      status:'',
      
      });
  }
  ngOnInit(): void {
    this.addform.patchValue(this.data);
  }

   
    onsubmit() {
      if (this.addform.valid) {
        if(this.data){
          this.ts.updateList(this.data.id,this.addform.value).subscribe({
            next: (val: any) =>{
              
              this.snakeservice.openSnackBar("Update Successfully","Ok");
              this.dialogRef.close(true);
              
  
              
            },
           error: (err: any) =>{
            console.error(err)
           }
          })
  
        }
        else{
          this.ts.addtask(this.addform.value).subscribe({
            next: (val: any) =>{
              
              this.snakeservice.openSnackBar("Added Successfully","Done");
              this.dialogRef.close(true);
              
  
              
            },
           error: (err: any) =>{
            console.error(err)
           }
          })
  
        }
      }
    }
    }     
       
  



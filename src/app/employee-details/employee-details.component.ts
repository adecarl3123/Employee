import { Component, OnInit } from '@angular/core';
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { EmployeeDetailService } from '../shared/employee-detail.service';
import { NgFor } from '@angular/common';
import { EmployeeDetail } from '../shared/employee-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-details',
  imports: [EmployeeFormComponent, NgFor],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  constructor (public service: EmployeeDetailService, private toastr: ToastrService){
     
  }
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: EmployeeDetail){
    this.service.formData =Object.assign({}, selectedRecord) ;
  }

  onDelete(id:number){
    if(confirm('Are you sure you want to delete this employee record?'))
    this.service.deleteEmployees(id)
    .subscribe({
        next: res =>{
          this.service.list = res as EmployeeDetail[]
          this.toastr.error('Deleted successfully')
        },
        error: err => {console.log (err)}
      })
  }
}

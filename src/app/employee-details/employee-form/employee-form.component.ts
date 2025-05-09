import { Component } from '@angular/core';
import { EmployeeDetailService } from '../../shared/employee-detail.service';
import { FormsModule} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { EmployeeDetail } from '../../shared/employee-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {

  constructor (public service: EmployeeDetailService, private toastr:ToastrService){
    }

    onSubmit(form:NgForm){
      this.service.formSubmitted = true
      if(form.valid){
        if (this.service.formData.employeeId == 0)
          this.insertRecord(form)
        else
          this.updateRecord(form)
        
      }
    }

    insertRecord(form:NgForm){
      this.service.postEmployees()
      .subscribe({
        next: res =>{
          this.service.list = res as EmployeeDetail[]
          this.service.resetForm(form)
          this.toastr.success('Added successfully', 'New employee added')
        },
        error: err => {console.log (err)}
      })
    }

    updateRecord(form:NgForm){
      this.service.putEmployees()
      .subscribe({
        next: res =>{
          this.service.list = res as EmployeeDetail[]
          this.service.resetForm(form)
          this.toastr.info('Updated successfully')
        },
        error: err => {console.log (err)}
      })
    }


}

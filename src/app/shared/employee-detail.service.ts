import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmployeeDetail } from './employee-detail.model';
import { EmployeeFormComponent } from '../employee-details/employee-form/employee-form.component';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailService {

  url: string = environment.apiBaseUrl + '/Employees'
  list:EmployeeDetail[]=[]
  formData: EmployeeDetail = new EmployeeDetail()
  formSubmitted: boolean=false;

  constructor(private http: HttpClient) { }

  refreshList(){ 
    this.http.get(this.url)
    .subscribe({
      next: res => {
        this.list = res as EmployeeDetail[]
      },
      error: err => {console.log(err)}
    })
  }

  postEmployees(){
    return this.http.post(this.url, this.formData)
  }

   putEmployees(){
    return this.http.put(this.url + '/' + this.formData.employeeId, this.formData)
  }

    deleteEmployees(id: number){
    return this.http.delete(this.url + '/' + id)
  }



  resetForm(form:NgForm){
    form.form.reset()
    this.formData= new EmployeeDetail()
    this.formSubmitted= false
  }
}
 
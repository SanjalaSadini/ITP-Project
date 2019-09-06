import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { EmployeeService } from 'app/shared/services/employee.service';
import { Employee } from 'app/shared/services/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  list:Employee[];

  constructor(private firestore: AngularFirestore,
              private service : EmployeeService,
              private toastr : ToastrService) { }

  ngOnInit() {
    this.service.getEmployee().subscribe(actionArray => {
      this.list = actionArray.map(item=>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() 
        } as Employee;
        
        })
  });
  }

  onEdit(employee:Employee){
    this.service.formData=Object.assign({},employee);

  }

  onDelete(id:String){
    if(confirm('Are you sure to delete this record ?')){
      this.firestore.doc('Employee-Information/'+id).delete()
      this.toastr.warning('Deleted successfully !','Employee Record');
    }

  }

  createRange(number){
    var items: number[] = [];
    for(var i = 0; i < number; i++){
       items.push(i);
    }
    return items;
  }

}

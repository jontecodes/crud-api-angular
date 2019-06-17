import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
    // this.getTasks();
    // this.getSingleTask('5d01674801775e373484832b');
  }
  getSingleTask(id){
    // hardcoded :id

    return this._http.get(`/tasks/${id}`);
    // observable.subscribe(data => console.log('Got one task', data));
  }
  getTasks(){
    // our http response is an observable. store it in the variable tempObserable

    // subscribe to out observable and provide the cose we would like to do with our data from the res
    return this._http.get('/tasks');
  }
  addTask(newtask){
    console.log(newtask);
    return this._http.post('/create', newtask);
  }
  editTasks(task: any){
    console.log('Submitted', task);
    return this._http.put(`/tasks/edit/${task._id}`, task);
  }
  deleteTask(task: any){
    return this._http.delete(`/tasks/${task._id}`, task);
  }
}

import { Component, OnInit } from "@angular/core";
import { HttpService } from "./http.service";
import { discardPeriodicTasks } from "@angular/core/testing";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Restful Tasks API";
  tasks = [];
  all = [];
  newTask: any;
  editTask: any;
  delTask: any;

  constructor(private _httpService: HttpService) {}

  ngOnInit(){
    this.editTask = {title: '', description: ''};
    this.newTask = {title: '', description: ''};
    // this.delTask = {}
    this.getTasksFromService();
    // this.getTasksFromService()
  }
  onButtonClick(event: any): void {
    this.getTasksFromService();
    console.log(event);
  }
  onDelClick(task){
    this.delTask = task;
  }
  onShowClick(task) {
    this.editTask = task;
  }
  onEditSubmit(x: any){
    console.log('Edited Task', this.editTask);
    this.edit(this.editTask);
    this.getTasksFromService();
  }
  edit(x: any){
    let observable = this._httpService.editTasks(x);
    observable.subscribe(data => {
      console.log('Got data edited', data);
    })
  }

  onSubmit(){
    console.log(this.newTask);
    let observable = this._httpService.addTask(this.newTask);
    observable.subscribe(data => {
      console.log('Got post data!', data);
      this.newTask = {title: "", description: ""}
      this.getTasksFromService();
    })
  }

  onDelete(task: any){
    console.log('Deleted Task')
    let observable = this._httpService.deleteTask(task);
    observable.subscribe(data => {
      console.log('Deleted data', data);
      this.getTasksFromService();
    })
  }

  getOne(id){
    let obs = this._httpService.getSingleTask(id);
    obs.subscribe(data => {
      this.all = data['data'];
      console.log(this.all);
      console.log('Got some data', data['data']);
    })
  }
  getTasksFromService(){
    let observable = this._httpService.getTasks();
    observable.subscribe(data => {
      console.log('Got our data!', data);
      this.tasks = data['data'];
    })
  }
  // getTasksFromService(){
  //   let observable = this._httpService.getTasks();
  //   observable.subscribe(data => {
  //     console.log('Got our data!', data);
  //     for (let i = 0; i < data['data'].length; i++){
  //       this.tasks.push(data['data'][i].title);
  //     }
  //     // this.tasks = data['data'][0].title;
  //     console.log(this.tasks);
  //   })
  // }
}

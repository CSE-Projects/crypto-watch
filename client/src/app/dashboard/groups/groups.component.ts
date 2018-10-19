import { Component, OnInit } from '@angular/core';
import {GroupsService} from "./groups.service";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups;

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    // fill the groups array
    this.groups = this.groupsService.getGroups();
    console.log(this.groups);
    // this.groups = [{group_name: 'test', admin_username: 'test'}, {group_name: 'test1', admin_username: 'test1'}, {group_name: 'test2', admin_username: 'test2'}]
  }

}

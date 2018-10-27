import { Component, OnInit } from '@angular/core';
import {GroupsService} from "./groups.service";
import { Router } from '@angular/router';
import {GroupAdminDataService} from "../../services/groupAdminData";


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  groups;

  constructor(private groupsService: GroupsService, private router: Router, private groupAdminData: GroupAdminDataService) { }

  ngOnInit() {
    // fill the groups array
    this.groups = this.groupsService.getGroups();
    console.log(this.groups);
    // this.groups = [{group_name: 'test', admin_username: 'test'}, {group_name: 'test1', admin_username: 'test1'}, {group_name: 'test2', admin_username: 'test2'}]
  }

  routeNewGroup() {
    this.router.navigate(['/new-group']);
  }

  routeGroup(group_name, admin_username) {
    this.groupAdminData.admin_username = admin_username;
    this.router.navigate(['/group/'+group_name]);
  }
}

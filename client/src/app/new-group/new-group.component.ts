import { Component, OnInit } from '@angular/core';
import { NewGroupService } from "./new-group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  username_list = [];

  constructor(private newGroupService: NewGroupService) { }

  ngOnInit() {
  }

  addUsername(usernameInput) {
    let username = usernameInput.value;
    if (username != null && !username.includes(" ")) {
      this.username_list.push(username);
      usernameInput.value = "";
    }
  }

  createNewGroup(group_name) {
    if (group_name != null && group_name != "" && group_name != " " && this.username_list.length != 0) {
      this.newGroupService.createNewGroup(group_name, this.username_list);
    }
  }
}

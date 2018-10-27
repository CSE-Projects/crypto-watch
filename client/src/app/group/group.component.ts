import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
import {GroupService} from "./group.service";
import {GroupAdminDataService} from "../services/groupAdminData";
import {AuthService} from "../services/auth.service";
import {getProjectAsAttrValue} from "@angular/core/src/render3/node_selector_matcher";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  isAdmin = true;
  group_name;
  groupTransactions;
  users;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private groupAdminData: GroupAdminDataService
  ) {}

  ngOnInit() {
    // check if
    this.isAdmin = this.groupAdminData.admin_username === this.authService.username;
    // get group name
    this.group_name = this.route.snapshot.paramMap.get('group_name');
    console.log(this.group_name);

    this.users = this.groupService.getUsers(this.group_name);
    this.groupTransactions = this.groupService.getGroupTransactions(this.group_name);
    // this.groupTransactions = [{from: "new", to: "omkar", value: "1233"}, {from: "new", to: "omkar", value: "1243"}]
  }

  // check validity of input
  checkValidity(input) {
    if (input == "" || input == null || input.includes(" ")) {
      return false;
    }
    return true;
  }

  // add a new transaction for a group
  addGroupTransaction(payment_to, payment_from, value, time) {
    if (this.checkValidity(payment_to)&&this.checkValidity(payment_from)&&this.checkValidity(value)&&this.checkValidity(time)) {
      let data = {
        group_name: this.group_name,
        payment_to: payment_to,
        payment_from: payment_from,
        value: value,
        time: time
      };
      this.groupService.newGroupTransaction(data);
      this.groupTransactions = this.groupService.getGroupTransactions(this.group_name);

    }
  }

  resolveTransactions() {
    console.log(this.groupService.resolveTransactions(this.group_name));
  }
}

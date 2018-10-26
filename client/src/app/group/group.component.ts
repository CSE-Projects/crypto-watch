import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  isAdmin = true;
  group_name;
  groupTransactions;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // get group name
    this.group_name = this.route.snapshot.paramMap.get('group_name');
    console.log(this.group_name);

    this.groupTransactions = [{from: "new", to: "omkar", value: "1233"}, {from: "new", to: "omkar", value: "1243"}]
  }
}

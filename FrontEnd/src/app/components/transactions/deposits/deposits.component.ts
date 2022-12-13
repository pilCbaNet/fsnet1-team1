import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.css'],
})
export class DepositsComponent implements OnInit {
  @Input()
  list: Array<Array<String>> = [];
  @Input()
  depositosShow: boolean = true;

  depositosFunction() {
    this.depositosShow = true;
  }

  retirosFunction() {
    this.depositosShow = false;
  }
  constructor() {}

  ngOnInit(): void {}
}

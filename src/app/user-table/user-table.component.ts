import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit {
  users: any = [];
  filteredUsers: any = [];
  nameSearch: any = '';
  companySearch: any = '';
  designationSearch: any = '';
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http
      .get('https://zil-test.s3.us-east-1.amazonaws.com/json-data.json')
      .subscribe((response: any) => {
        console.log(response);
        this.users = response;
        this.filteredUsers = response;
      });
  }
  search(value: any, type: any) {
    console.log(value);
    if ((type = 'name')) {
      this.filteredUsers = this.users.filter((item: any) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      });
    }
    if ((type = 'companyname')) {
      console.log("enetered",value)
      this.filteredUsers = this.users.filter((item: any) => {
        return item.company.name
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }
    if ((type = 'designation')) {
      this.filteredUsers = this.users.filter((item: any) => {
        return item.company.designation
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }

    console.log(this.filteredUsers);
  }
}

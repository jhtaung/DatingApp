import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users: any;

  constructor(private accountService: AccountService, private presence: PresenceService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser === undefined || storedUser === null || storedUser === 'undefined') {
      this.accountService.setCurrentUser(undefined);
    } else {
      // console.log(typeof storedUser);
      const user: User = JSON.parse(storedUser);
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
}

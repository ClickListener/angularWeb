import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-term-eu',
  templateUrl: './term-eu.component.html',
  styleUrls: ['./term-eu.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class TermEuComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    if (userService.user) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-policies-eu',
  templateUrl: './policies-eu.component.html',
  styleUrls: ['./policies-eu.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class PoliciesEuComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    if (userService.user) {
      router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

}

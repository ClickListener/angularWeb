/**
 * Created by zhangxu on 2017/7/13.
 */

import {AfterViewInit, Component, DoCheck, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Device} from '../../model/Device';

declare let $: any;

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, DoCheck, AfterViewInit {
    ngAfterViewInit(): void {
        $('.datepicker').pickadate({
            labelMonthNext: 'Go to the next month',
            labelMonthPrev: 'Go to the previous month',
            labelMonthSelect: 'Pick a month from the dropdown',
            labelYearSelect: 'Pick a year from the dropdown',
            selectMonths: true,
            selectYears: true,
            min: +1,
            max: [2018, 0, 1]
        });
    }

    test(): void {

    }


    user: User;


    ngDoCheck(): void {
        this.user = this.userService.user;
    }

    constructor(private userService: UserService, private router: Router) {

    }


    ngOnInit(): void {
        this.user = this.userService.user;

    }


    managerLicense(): void {
        this.router.navigate(['manager-license']);
    }


    licenses = [
        {
            'ExpiredDate': '2017-10-10',
            'DeviceInfo': [
                {
                    'DeviceModel': 'BP5',
                    'DeviceTotalNumber': 100,
                    'DeviceUsedNumber': 1,
                },
                {
                    'DeviceModel': 'AM4',
                    'DeviceTotalNumber': 200,
                    'DeviceUsedNumber': 1,
                }
            ],
            'InstalledPhoneNumber': 1000
        },
        {
            'ExpiredDate': '2017-10-10',
            'DeviceInfo': [
                {
                    'DeviceModel': 'BP5',
                    'DeviceTotalNumber': 100,
                    'DeviceUsedNumber': 1,
                },
                {
                    'DeviceModel': 'AM4',
                    'DeviceTotalNumber': 200,
                    'DeviceUsedNumber': 1,
                }
            ],
            'InstalledPhoneNumber': 200
        },
        {
            'ExpiredDate': '2017-10-10',
            'DeviceInfo': [
                {
                    'DeviceModel': 'BP5',
                    'DeviceTotalNumber': 100,
                    'DeviceUsedNumber': 1,
                },
                {
                    'DeviceModel': 'AM4',
                    'DeviceTotalNumber': 200,
                    'DeviceUsedNumber': 1,
                }
            ],
            'InstalledPhoneNumber': 300
        }
    ];

}

/**
 * Created by zhangxu on 2017/9/19.
 */
import {Component, DoCheck, OnChanges, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../model/User";
import {LicenseService} from "../../../services/license.service";
import {License} from "../../../model/License";

import swal from 'sweetalert2';

@Component({
    selector: 'manager-license',
    templateUrl: './manager.component.html',
    styleUrls: ['manager.component.css']
})

export class ManagerComponent implements OnInit, DoCheck {


    user: User;
    licenses: Array<License> = [];

    licenses_fake = [
        {
            "ExpiredDate":"2017-10-10",
            "DeviceInfo": [
                {
                    "DeviceModel": "BP5",
                    "DeviceTotalNumber": 100,
                    "DeviceUsedNumber": 1,
                },
                {
                    "DeviceModel": "AM4",
                    "DeviceTotalNumber": 200,
                    "DeviceUsedNumber": 1,
                }
            ],
            "InstalledPhoneNumber": 1000
        },
        {
            "ExpiredDate":"2017-10-10",
            "DeviceInfo": [
                {
                    "DeviceModel": "BP5",
                    "DeviceTotalNumber": 100,
                    "DeviceUsedNumber": 1,
                },
                {
                    "DeviceModel": "AM4",
                    "DeviceTotalNumber": 200,
                    "DeviceUsedNumber": 1,
                }
            ],
            "InstalledPhoneNumber": 1000
        },
        {
            "ExpiredDate":"2017-10-10",
            "DeviceInfo": [
                {
                    "DeviceModel": "BP5",
                    "DeviceTotalNumber": 100,
                    "DeviceUsedNumber": 1,
                },
                {
                    "DeviceModel": "AM4",
                    "DeviceTotalNumber": 200,
                    "DeviceUsedNumber": 1,
                }
            ],
            "InstalledPhoneNumber": 1000
        }
    ]

    constructor(private userService: UserService, private router: Router, private licenseService: LicenseService) {
    }


    ngOnInit(): void {
        this.user = this.userService.user;
    }


    ngDoCheck(): void {

        this.licenses = this.licenseService.licenses;

        console.info("this.licenses = " + JSON.stringify(this.licenses));
        if (this.licenses !== null) {

            console.info("this.licenses.length = " + this.licenses.length);
        }

    }

    createNewLicense(): void {
        this.router.navigate(['./create-newLicense'])
    }

    //修改License，跳转到修改界面
    modifyLicense(licenseId: string): void {

        this.router.navigate(['./modify-license',licenseId]);
    }

    deleteLicense(licenseId: string): void {

        console.log('deleteLicense()');


        let self = this;
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            self.licenseService.deleteLicense(licenseId)
                .then(res => {
                    swal(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                })
                .catch(error => {
                    console.log("ManagerComponent--error = " + JSON.stringify(error));
                })
        }).catch(swal.noop)


    }

}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var LicenseService = LicenseService_1 = (function () {
    function LicenseService(http) {
        this.http = http;
        this.header = {
            headers: new http_1.Headers({ 'Content-Type': 'application/json' })
        };
        this.url = '/license';
        console.log('LicenseService--------constructor');
        this.licenses = JSON.parse(sessionStorage.getItem('licenses'));
        console.log('LicenseService--------licenses = ' + this.licenses);
    }
    /**
     * 创建 新的 License
     * @param licenseInfo
     * @returns {Promise<License[]>}
     */
    LicenseService.prototype.createNewLicense = function (licenseInfo) {
        var _this = this;
        console.info("licenseInfo = " + JSON.stringify(licenseInfo));
        // const url = '/api/auth/createNewLicense';
        return this.http.put(this.url, JSON.stringify(licenseInfo), this.header)
            .toPromise()
            .then(function (res) {
            _this.licenses = res.json().licenses;
            //将licenses存到本地
            sessionStorage.setItem('licenses', JSON.stringify(_this.licenses));
            console.info('res = ' + JSON.stringify(_this.licenses));
            return res.json();
        })
            .catch(LicenseService_1.handleError);
    };
    /**
     * 更新 License
     * @param message
     * @returns {Promise<License[]>}
     */
    LicenseService.prototype.updateLicense = function (message) {
        var _this = this;
        console.info("message = " + JSON.stringify(message));
        var url = this.url + '/' + message.licenseId;
        return this.http.post(url, JSON.stringify(message.licenseInfo), this.header)
            .toPromise()
            .then(function (res) {
            _this.licenses = res.json().licenses;
            //将licenses存到本地
            sessionStorage.setItem('licenses', JSON.stringify(_this.licenses));
            console.info('res = ' + JSON.stringify(_this.licenses));
            return res.json();
        })
            .catch(LicenseService_1.handleError);
    };
    /**
     * 删除  License
     * @param {string} licenseID
     * @returns {Promise<License[]>}
     */
    LicenseService.prototype.deleteLicense = function (licenseID) {
        var _this = this;
        console.info("licenseID = " + licenseID);
        return this.http.delete(this.url, new http_1.RequestOptions({
            headers: this.header.headers,
            body: { licenseId: licenseID }
        }))
            .toPromise()
            .then(function (res) {
            _this.licenses = res.json().licenses;
            //将licenses存到本地
            sessionStorage.setItem('licenses', JSON.stringify(_this.licenses));
            console.info('res = ' + JSON.stringify(_this.licenses));
            return res.json();
        })
            .catch(LicenseService_1.handleError);
    };
    LicenseService.handleError = function (error) {
        console.log('An error occurred', JSON.stringify(error)); //for demo purposes only
        return Promise.reject(error.message || error);
    };
    return LicenseService;
}());
LicenseService = LicenseService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], LicenseService);
exports.LicenseService = LicenseService;
var LicenseService_1;
//# sourceMappingURL=license.service.js.map
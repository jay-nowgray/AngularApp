import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Config } from './config';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isValid: boolean;
    constructor(private router: Router, private config: Config, private api: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.config.resolveLogin_KeyPromise();

        if (this.config.login_Key !== "" && typeof this.config.login_Key !== undefined && this.config.login_Key !== null) {
            //console.log('auth ' + this.config.login_Key);
            //this.ValidateLogin_KeyPromise();

            return true;
        }

        localStorage.setItem("LoginMessage", "Session expired, Please login again.");
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        // not logged in so redirect to login page with the return url
        return false;

    }

    async ValidateLogin_KeyPromise() {
        // return new Promise(resolve => {
        this.api.ValidateToken(this.config.login_Key).subscribe(
            res => {

                if (res.status == "1") {

                } else {
                    localStorage.setItem("LoginMessage", res.message);
                    this.router.navigate(['/']);
                }
            },
            err => {

                this.router.navigate(['/']);
                throw new Error(err);
            }
        );
        return "0";

    }
    updateAuth(res) {
        this.isValid = res;
    }

}
@Injectable()
export class AuthGuardSuperAdmin implements CanActivate {

    isValid: boolean;
    constructor(private router: Router, private config: Config, private api: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.config.resolveLogin_KeyPromise();

        if (this.config.login_Key !== "" && typeof this.config.login_Key !== undefined && this.config.login_Key !== null) {
            //console.log('auth ' + this.config.login_Key);
         // this.ValidateLogin_KeyPromise();
            //var userObj = JSON.parse(localStorage.getItem("userObj"));
            if (this.config.roleId == 0) {
                return true;
            }
            else if (this.config.roleId > 0) {
                localStorage.setItem("LoginMessage", "Ohoo! Wrong Place");
                this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
                return false;
            }
            else {
                localStorage.setItem("LoginMessage", "Ohoo! Request page is not valid");
                this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
                return false;
            }

        }

        localStorage.setItem("LoginMessage", "Session expired, Please login again.");
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        // not logged in so redirect to login page with the return url
        return false;

    }

    async ValidateLogin_KeyPromise() {
        // return new Promise(resolve => {
        this.api.ValidateToken(this.config.login_Key).subscribe(
            res => {

                if (res.status == "1") {

                } else {
                    localStorage.setItem("LoginMessage", res.message);
                    this.router.navigate(['/']);
                }
            },
            err => {

                this.router.navigate(['/']);
                throw new Error(err);
            }
        );
        return "0";

    }
    updateAuth(res) {
        this.isValid = res;
    }

}
@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private router: Router, private config: Config, private api: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            this.config.resolveLogin_KeyPromise();

            if (this.config.login_Key !== "" && typeof this.config.login_Key !== undefined && this.config.login_Key !== null) {


                let userRole = 'MANAGER';
                let roles = route && route.data["roles"] && route.data["roles"].length > 0 ? route.data["roles"].map(xx => xx.toUpperCase()) : null;

                if (roles == null || roles.indexOf(userRole) != -1) {
                    resolve(true);
                }
                else {
                    resolve(false);
                    localStorage.setItem("LoginMessage", "Ohoo! Wrong Place");
                    this.router.navigate(['/']);
                }


            } else {
                resolve(false);
                return;
            }
        });

    }

    // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    //     return new Promise<boolean>((resolve, reject) => {

    //         if (!this.authService.isLoggedIn()) {
    //             resolve(false);
    //             return;
    //         }


    //         var currentUser: AspNetUsersDTO = new AspNetUsersDTO();

    //         this._currentUser.GetCurrentUser().then((resp) => {
    //             currentUser = resp;
    //             let userRole = currentUser.roles && currentUser.roles.length > 0 ? currentUser.roles[0].toUpperCase() : '';
    //             let roles = route && route.data["roles"] && route.data["roles"].length > 0 ? route.data["roles"].map(xx => xx.toUpperCase()) : null;

    //             if (roles == null || roles.indexOf(userRole) != -1) resolve(true);
    //             else {
    //                 resolve(false);
    //                 this.router.navigate(['login']);
    //             }

    //         }).catch((err) => {
    //             reject(err);
    //             this.router.navigate(['login']);
    //         });
    //     });

    // }
}
import {ActivatedRouteSnapshot, DetachedRouteHandle, NavigationEnd, Router, RouteReuseStrategy} from "@angular/router";
import {UserService} from "../../services/user.service";

export class SimpleReuseStrategy implements RouteReuseStrategy {


  public static handlers: {[key: string]: DetachedRouteHandle } = {};

  private user: any;

  constructor() {
  }

  /**
   * 是否允许复用路由
   * @param {ActivatedRouteSnapshot} route
   * @returns {boolean}
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {

    if (!this.user) {
      return route.routeConfig.path === 'sign-up';
    } else {
      return false;
    }



  }

  /**
   * 当路由离开时会触发，储存路由
   *
   * 以当前Path为key储存路由快照&组件当前实例对象
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {DetachedRouteHandle | null} handle
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    SimpleReuseStrategy.handlers[route.routeConfig.path] = handle;
  }


  /**
   * 是否允许还原路由
   *
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {boolean}
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {

    return !!route.routeConfig && !!SimpleReuseStrategy.handlers[route.routeConfig.path];

  }


  /**
   * 获取存储路由
   * @param {ActivatedRouteSnapshot} route
   * @returns {DetachedRouteHandle | null}
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {

    if (!route.routeConfig) {
      return null;
    }
    return SimpleReuseStrategy.handlers[route.routeConfig.path];
  }

  /**
   * 进入路由触发，是否同一路由时复用路由
   * @param {ActivatedRouteSnapshot} future
   * @param {ActivatedRouteSnapshot} curr
   * @returns {boolean}
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

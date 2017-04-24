'use strict';

/**
 * @ngdoc overview
 * @name fbOauth2App
 * @description
 * # fbOauth2App
 *
 * Main module of the application.
 */
angular
  .module('fbOauth2App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'socialLogin',
    'simpleGrid'
  ])
  .config(function ($routeProvider, $locationProvider, $resourceProvider) {

    $resourceProvider.defaults.stripTrailingSlashes = false;
    $routeProvider
      .when('/main', {
        templateUrl: 'app/views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/', {
        templateUrl: 'app/views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode(false).hashPrefix('');
  });

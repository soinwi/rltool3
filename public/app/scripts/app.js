'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
        .module('app', [
            'ngRoute',
            'ngSanitize',
            'ui.bootstrap'
        ])
        
        .config(function ($routeProvider) {
            $routeProvider
                    .when('/people', {
                        templateUrl: 'views/people.html',
                        controller: 'PeopleCtrl',
                        controllerAs: 'vm',
                    })
                    .otherwise({
                        redirectTo: '/people'
                    });
        });


(function() {
    'use sctrict';

    var app = angular.module('app', ['ui.router', 'ngCookies', 'angular-md5', 'services', 'directives']);

    router.$inject = ['$stateProvider', '$urlRouterProvider'];
    routeChanged.$inject = ['$cookies', '$state', '$rootScope', '$location'];

    //Router
    app.config(router);
    app.run(routeChanged);    

    function router($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: '/app/views/main.html'
            })
            .state('index.dashboard', {
                url: '/dashboard',
                templateUrl: '/app/views/dashboard.html'
            })
            .state('index.newProject', {
                url: '/newProject',
                templateUrl: '/app/views/project/newProject.html'
            })
            .state('index.newProject.stepOne', {
                url: '/newProject/stepOne',
                templateUrl: '/app/views/project/projectSteps/stepOne.html'
            })
            .state('index.newProject.stepTwo', {
                url: '/newProject/stepTwo',
                templateUrl: '/app/views/project/projectSteps/stepTwo.html'
            })
             .state('index.projectActivities', {
                 url: '/projectActivities',
                 templateUrl: '/app/views/project/projectActivities.html'
             })
            .state('index.table', {
                url: '/table',
                templateUrl: '/app/views/table/table.html'
            })
            .state('index.wordViewer', {
                url: '/wordViewer',
                templateUrl: '/app/views/wordViewer/word.html',
                controller: 'wordViewerController',
                controllerAs: 'vm'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/app/views/user/login.html',
            });
    }

    function routeChanged($cookies, $state, $rootScope, $location) {
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            var shouldLogin = toState.data !== undefined && toState.data.requireLogin;
            var loginUser = $cookies.get('loginUser');
            if (loginUser) {
                //User logined in
                $rootScope.isLoginedIn = true;
            } else {
                $rootScope.isLoginedIn = false;
            }

            if (shouldLogin === true) {
                if (!loginUser) {
                    $state.go('login');
                    e.preventDefault();

                    $rootScope.isLoginedIn = false;
                }
            }

            return;   
        });
    }

    //Constants
    app.constant('DEBUG', true);
    app.constant('APIURL', 'http://localhost:8081/api');
})();
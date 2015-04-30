/*
    Sider Menu
    Function: Control user's view via his permission
*/
(function () {
    'use strict';

    angular
        .module('directives')
        .directive('siderMenu', siderMenu);

    siderMenu.$inject = [];

    function siderMenu() {
        var directive = {
            templateUrl: '/app/scripts/directives/siderMenu/siderMenu.html',
            controller: 'siderMenuController'
        };

        return directive;
    }
})();
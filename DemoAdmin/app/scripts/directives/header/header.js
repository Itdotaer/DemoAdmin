/*
    Notification Header
    Function: Load users notification
*/
(function () {
    'use strict';

    angular
        .module('directives')
        .directive('header', header);

    header.$inject = [];

    function header() {
        var directive = {
            templateUrl: '/app/scripts/directives/header/header.html',
            controller: 'headerController'
        };

        return directive;
    }
})();
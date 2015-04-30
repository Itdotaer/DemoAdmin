(function() {
    'use strict';

    angular
        .module('app')
        .controller('siderMenuController', siderMenuController);

    //Inject modules
    siderMenuController.$inject = ['$scope', 'logger', 'DEBUG'];

    function siderMenuController($scope, logger, DEBUG) {
        var vm = $scope;

        activate();

        function activate() {
           
        }
    }
})();
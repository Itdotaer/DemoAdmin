(function() {
    'use strict';

    angular
        .module('app')
        .controller('headerController', headerController);

    //Inject modules
    headerController.$inject = ['$scope', 'logger', 'DEBUG'];

    function headerController($scope, logger, DEBUG) {
        var vm = $scope;

        activate();

        function activate() {
           
        }
    }
})();
(function() {
    'use strict';

    angular
        .module('app')
        .controller('wordViewerController', wordViewerController);

    //Inject modules
    wordViewerController.$inject = ['logger', 'DEBUG'];

    function wordViewerController(logger, DEBUG) {
        var vm = this;
       

        activate();

        function activate() {
            viewWord();
        }

        function viewWord() {
            //var sourcePath = '/app/ci.docx';

            //var html = docxService.docx(sourcePath);
            //console.log('html', html);
        }
    }
})();
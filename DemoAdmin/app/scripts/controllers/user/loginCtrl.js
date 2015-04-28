(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    //Inject modules
    loginController.$inject = ['$scope', '$cookies', '$state', 'logger', 'userService','DEBUG'];

    function loginController($scope, $cookies, $state, logger, userService,DEBUG) {
        var vm = this;
        vm.login = login;

        activate();

        function activate() {
            vm.rememberedMeChecked = false;
            vm.userInfo = { email: '', password: '', rememberedMe: '', isMd5Encorpy: false };

            var userInfo = $cookies.get('userInfo');
            if (userInfo) {
                vm.userInfo = JSON.parse(userInfo);
            }

            if (DEBUG) {
                logger.logInfo("Get remembered userInfo.");
            }

            //Watch password changed
            $scope.$watch('vm.userInfo.password', function (newPwd, oldPwd) {
                if (newPwd != oldPwd) {
                    vm.userInfo.isMd5Encorpy = false;
                }
            });
        }

        function login() {
            if (!vm.userInfo.email || !vm.userInfo.password) {
                logger.logError("Email or password is null.");
            } else {
                if (DEBUG) {
                    logger.logInfo("Go into request user login service.");
                }

                if (vm.userInfo.rememberedMe === true) {
                    if (vm.userInfo.isMd5Encorpy === false) {
                        //Md5 Encorpy
                        userService.getMd5(vm.userInfo.password).then(function(data) {
                            if (data) {
                                if (data.result === 'ok') {
                                    vm.userInfo.password = data.data;
                                    vm.userInfo.isMd5Encorpy = true;
                                    $cookies.put('userInfo', angular.toJson(vm.userInfo));
                                } else {
                                    logger.logError(data.data);
                                }
                            } else {
                                logger.logError('Backend response data is null.');
                            }
                        }, function(reason) {
                            logger.logError('Get md5 error.');
                        });

                        if (DEBUG) {
                            logger.logInfo("Remembered");
                        }
                    } else {
                        $cookies.put('userInfo', angular.toJson(vm.userInfo));
                    }
                } else {
                    $cookies.remove('userInfo');
                    if (DEBUG) {
                        logger.logInfo("Remove user info.");
                    }
                }

                //Login
                userService.login(vm.userInfo).then(function (user) {
                    if (user) {
                        if (DEBUG) {
                            console.log('loged in user', user);
                        }
                        vm.userInfo.isMd5Encorpy = true;
                        $cookies.put('loginUser', JSON.stringify(user));
                        logger.logSuccess(user.UserName + ' Logined In.');
                        $state.go('index');
                    } else {
                        logger.logError("Email or password is incorrect.");
                    }
                }, function (reason) {
                    logger.logError("Post to server Error.");
                });
            }
        }        
    }
})();
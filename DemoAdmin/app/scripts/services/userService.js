(function() {
    'use strict';

    angular
        .module('services')
        .factory('userService', userService);

    userService.$inject = ['$http', '$cookies', 'logger', 'APIURL', 'DEBUG'];

    function userService($http, $cookies, logger, APIURL, DEBUG) {
        var service = {
            login: login,
            getMd5: getMd5
        };

        return service;

        function login(user) {
            var postUser =
                {
                    Id: -1,
                    Email: user.email,
                    UserName: '',
                    Password: user.password,
                    CreatedDate: null,
                    CreatedBy: -1,
                    LastUpdatedDate: null,
                    LastUpdatedBy: -1,
                    IsDeleted: false
                };
            if (user.isMd5Encorpy === false) {
                //Md5 Encorpy
                return getMd5(user.password).then(function(data) {
                    if (data) {
                        if (data.result === 'ok') {
                            postUser.Password = data.data;

                            if (DEBUG) {
                                console.log(postUser);
                            }

                            //Validate user info from backend database.
                            return $http.post(APIURL + '/Users/Login', JSON.stringify(postUser), {
                                headers: {
                                    'Access-Control-Allow-Origin': '*',
                                    'Content-Type': 'application/json'
                                }
                            }).then(function (resp) {
                                //if (resp.data) {
                                //    $cookies.put('loginUser', JSON.stringify(resp.data));
                                //}
                                return resp.data;
                            });
                        } else {
                            logger.logError(data.data);
                        }
                    } else {
                        logger.logError('Backend response data is null.');
                    }
                }, function(reason) {
                    logger.logError('Get md5 error.');
                });
            } else {
                if (DEBUG) {
                    console.log(postUser);
                }

                //Validate user info from backend database.
                return $http.post(APIURL + '/Users/Login', JSON.stringify(postUser), {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    }
                }).then(function (resp) {
                    //if (resp.data) {
                    //    $cookies.put('loginUser', JSON.stringify(resp.data));
                    //}
                    return resp.data;
                });
            }
        }

        function getMd5(input) {
            return $http.get(APIURL + '/Users/GetMd5Hash?input=' + input, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }).then(function(resp) {
                return resp.data;
            });
        }
    }
})();
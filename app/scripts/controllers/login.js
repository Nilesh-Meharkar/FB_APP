/**
 * Created by nilesh on 9/4/17.
 */


angular.module('fbOauth2App')
    .controller('LoginCtrl', function ($scope, $rootScope, $location, $window) {





        $scope.fb_page_id = "";
        $scope.page_token = "";
        $rootScope.fb_object_list = [];
        // $rootScope.page_token = "";
        // FB Code Block


        // window.fbAsyncInit = function() {
        FB.init({
            appId      : '287048911730953',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
        });
        // };



        // fetch the status on load
        FB.getLoginStatus(handleSessionResponse);

        $('#login').bind('click', function () {
            console.log("Login");
            FB.login(handleSessionResponse, {
                scope: "manage_pages,business_management"
            });
        });


        $('#logout').bind('click', function () {
            console.log("Logout");

            FB.logout(handleSessionResponse);
        });

        $scope.fb_login = function() {

            console.log("Login");
            FB.login(handleSessionResponse, {
                scope: "manage_pages,business_management"
            });

        };



        function page_callback(response){
            $rootScope.page_token = response.access_token;
            console.log(response);

            var address = "";
            var city = "";
            if(response.location){
                address = response.location.street;
                city = response.location.city;
            }

            var temp = {
                id:response.id,
                source: "Facebook",
                name:response.name,
                business: response.category,
                address: address,
                city: city,
                website: response.website
            };
            // $window.location.href = '/#!/main';

            $rootScope.fb_object_list.push(temp);
            // $rootScope.page_token = page_token
            //   page_update(fb_page_id, {access_token: page_token, about: "3_The greatest possible updates at lowest possible time.. Join scienceopedia and get updated to world of science...categories__1"});

        }

        function page_update(fb_page_id, updataion_map_with_token) {
            FB.api('/' + [fb_page_id], "post", updataion_map_with_token, function (response) {
                console.log(response);
            });
        }

        function handleSessionResponse(response) {
            console.log("handleSessionResponse");
            // If logged in
            if (response.status === 'connected') {
                var accessToken = response.authResponse.accessToken;

                FB.api('/me/accounts', function (response) {
                    console.log(response);

                    angular.forEach(response.data, function(value, key) {
                        console.log(key + ': ' + value);

                        $scope.fb_page_id = value.id; // "thescienceopedia"//
                        FB.api('/' + [$scope.fb_page_id] + '?fields=id,name,access_token,business,contact_address,about,category,location,website', page_callback);

                    });

                    setTimeout(function(){
                        $window.location.href = '/FB_APP/#!/main';
                    }, 4000);

                });
            }

        }


    });

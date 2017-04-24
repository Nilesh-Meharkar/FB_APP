/**
 * Created by nilesh on 9/4/17.
 */


angular.module('fbOauth2App')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $window) {

    $scope.page_token = "";
    $rootScope.fb_object_list = [];

    FB.init({
      appId      : '287048911730953',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });

    // fetch the status on load
    FB.getLoginStatus(handleSessionResponse);

    $scope.fb_login = function() {
      console.log("Login");
      FB.login(handleSessionResponse, {
        scope: "manage_pages,business_management"
      });
    };

    function page_callback(response){
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
        location:response.location,
        website: response.website,
        page_token: response.access_token
      };

      $rootScope.fb_object_list.push(temp);

    }

    function page_update(fb_page_id, updataion_map_with_token) {
      FB.api('/' + [fb_page_id], "post", updataion_map_with_token, function (response) {
        console.log(response);
      });
    }

    function handleSessionResponse(response) {
      if (response.status === 'connected') {
        FB.api('/me/accounts', function (response) {
          console.log(response);
          angular.forEach(response.data, function(value, key) {
            FB.api('/' + [value.id] + '?fields=id,name,access_token,business,contact_address,about,category,location,website', page_callback);
          });
            setTimeout(function(){
                $scope.$apply(function() {
                    $location.path("/main");
                });
            }, 3000);
        });
      }
    }


  });

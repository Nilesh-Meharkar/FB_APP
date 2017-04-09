'use strict';

/**
 * @ngdoc function
 * @name fbOauth2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fbOauth2App
 */
angular.module('fbOauth2App')
  .controller('MainCtrl', function ($scope, $rootScope, $location) {


    console.log("Main Ctrl");

    if($rootScope.fb_object == undefined){
      $location.path( "/" );
    }
    // $location.path( "/login" );

    function page_update(fb_page_id, updataion_map_with_token) {
      FB.api('/' + [fb_page_id], "post", updataion_map_with_token, function (response) {
        console.log(response);
      });
    }

    // FB Code Block end

    initializeDatatable();

    function initializeDatatable(){
      // Grid UI Code
      $scope.myGridConfig = {
        getData: function () {
          return $scope.myData;
        },
        options: {
          showEditButton: true,
          editRequested: function (row) {
            if (!row.$editable) {
              console.log('Edit row:', row);

              var updataion_map_with_token = {
                access_token: $rootScope.page_token,
                id:row.id,
                address: row.address,
                city: row.city,
                website: row.website
                  // source: "Facebook",
                // business: response.category,
                //,
                // name:response.name
              };

              page_update(row.id, updataion_map_with_token);

              // page_update(row.id, )

            }
          },

          editable: true,
          disabled: false,
          perRowEditModeEnabled: true,
          pageSize: 25,
          pageNum: 0,
          columns: [
            {
              field: 'source',
            },
            {
              field: 'business',
              title: 'Business Name',
            },
            {
              field: 'address'
            },
            {
              field: 'city',
              title: 'City Name'
            },
            {
              field: 'website',
            }
          ]

        }
      };

      var myData = [
        {
          id:"11",
          source: "Google",
          business: "Business",
          address: "Peth",
          city: "Pune",
          website: "www.google.com"
        },
        {
          id:"341",
          source: "LinkedIn",
          business: "Programmer",
          address: "Kothrud",
          city: "Pandharpur",
          website: "www.facebook.com"
        },

        {
          id:"1341",
          source: "Yahoo",
          business: "Marketing",
          address: "Baner",
          city: "Mumbai",
          website: "www.yahoo.com"
        },

        {
          id:$rootScope.fb_object.id,
          source: $rootScope.fb_object.source,
          business: $rootScope.fb_object.business,
          address: $rootScope.fb_object.address,
          city: $rootScope.fb_object.city,
          website: $rootScope.fb_object.website
          // ,
          // name:$rootScope.fb_object.name
        }

      ];


      $scope.myData = myData;


    }


  });

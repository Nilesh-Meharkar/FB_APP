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

    if($rootScope.fb_object_list == undefined ){
      $location.path( "/" );
    }

    function page_update(fb_page_id, updataion_map_with_token) {
      console.log({"page_update":{fb_page_id:fb_page_id, updataion_map_with_token:updataion_map_with_token}});
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
                access_token: row.page_token,
                id:row.id,
                location: row.location,
                website: row.website
              };

              if(row.location != undefined){
                updataion_map_with_token.location.city = row.city;
                updataion_map_with_token.location.street = row.address;
              }

              page_update(row.id, updataion_map_with_token);

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
              disabled: true
            },
            {
              field: 'name',
              disabled: true
            },
            {
              field: 'business',
              title: 'Business Name',
              disabled: true
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
          name:"Business Google",
          id:"11",
          source: "Google",
          business: "Business",
          address: "Hinjewadi",
          city: "Pune",
          website: "www.google.com"
        },
        {
          name:"Dev LinkedIn",
          id:"341",
          source: "LinkedIn",
          business: "Programmer",
          address: "International Tech Park",
          city: "Chennai",
          website: "www.facebook.com"
        },

        {
          name:"Marketing Yahoo",
          id: "1341",
          source: "Yahoo",
          business: "Marketing",
          address: "Nelco Complex",
          city: "Mumbai",
          website: "www.yahoo.com"
        }

      ];


      angular.forEach($rootScope.fb_object_list, function(value, key) {

        var temp = {
          id: value.id,
          name: value.name,
          source: value.source,
          business: value.business,
          address: value.address,
          city: value.city,
          location:value.location,
          website: value.website,
          page_token: value.page_token
        };

        if(!objectExists(value.id, myData)){
          myData.push(temp);
        }

      });

      $scope.myData = myData;

    }

    function objectExists(id_given, arr) {
      return arr.some(function(el) {
        return el.id === id_given;
      });
    }

  });

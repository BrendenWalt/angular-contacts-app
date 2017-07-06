(function() {
  // "use strict";

  var myApp = angular.module("Solstice",[]);

  myApp.controller("Contacts", ContactsController);

  showContactsController.$inject = ["$scope","$http","$window"];

  function ContactsController($scope, $http, $window){

    var vm = this;
    vm.contacts = [];
    vm.contactSelected = {};
    vm.showList = true;

    vm.isActive = _isActive;
    vm.onContactClick = _onContactClick;
    vm.showContactsList = _showContactsList;

    // Initialize page on startup
    init();

    function init() {
      // Get contacts list
      $http({
        method: "GET",
        url: "https://s3.amazonaws.com/technical-challenge/Contacts_v2.json",
      }).then(onGetContactsSuccess, onGetContactsError);
    }

    // Set selected contact to active class
    function _isActive(contact){
      return vm.selected === contact;
    }

    function _onContactClick(contact){
      vm.contactSelected = contact;
      vm.selected = contact;
      if ($window.innerWidth < 480){
        vm.showList = false;
      }
    }

    function onGetContactsSuccess(data){
      vm.contacts = data.data;
      populateFeatured();
    }

    function onGetContactsError(){
      console.log("Error");
    }

    function populateFeatured(){
      vm.contactSelected = vm.contacts[0];
    }

    // Show/hide Contacts List on Mobile
    function _showContactsList() {
      vm.showList = true;
    }
  }
})();
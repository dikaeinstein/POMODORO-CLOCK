angular.module('pomodoro', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal'); // primary color for app
  })
  .controller('AppCtrl', AppCtrl);
///////////////////////
function AppCtrl($mdMedia) {
  let vm  = this;
  
  vm.isBigScreen = $mdMedia('gt-xs');
  vm.sessionLength = 25;
  vm.breakLength = 5;
  vm.duration = { name: 'sessionLength', value: vm.sessionLength };
  vm.showPomodoro = false;
  vm.disable = false;
  vm.setShowPomodoro = function() {
    if (!vm.showPomodoro) 
      vm.showPomodoro = true;
    else
      vm.showPomodoro = false;
  };
  vm.setPomodoro = function() {
    vm.duration.name = 'sessionLength';
    vm.duration.value = vm.sessionLength; 
    vm.setShowPomodoro();
  };
  vm.enableInputs = function() {
    if (vm.disable)
      vm.disable = false;
  };
  vm.disableInputs = function() {
    if (!vm.disable)
      vm.disable = true;
  };
  vm.toggleTimer = function() {
    if (vm.duration.name === 'sessionLength') { 
      vm.duration = { 
        name: 'breakLength',
        value: vm.breakLength 
      };
    } else {
        vm.duration = { 
        name: 'sessionLength', 
        value: vm.sessionLength 
      };
    }
  };
}

AppCtrl.$inject = ['$mdMedia'];
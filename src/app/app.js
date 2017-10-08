angular.module('pomodoro', ['ngMaterial'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('green');
  })
  .controller('AppCtrl', AppCtrl);
///////////////////////
function AppCtrl() {
  let vm  = this;
  
    vm.sessionLength = 2;
    vm.breakLength = 1;
    vm.duration = { name: 'sessionLength', value: vm.sessionLength };
    vm.showPomodoro = false;
    vm.disable = false;
    vm.setShowPomodoro = function() {
      if (!vm.showPomodoro) 
        vm.showPomodoro = true;
    };
    vm.setPomodoro = function() {
      vm.duration.name = 'sessionLength';
      vm.duration.value = vm.sessionLength; 
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
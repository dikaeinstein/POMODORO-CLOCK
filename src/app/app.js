angular.module('pomodoro', ['ngMaterial'])
  .controller('AppCtrl', AppCtrl);
///////////////////////
function AppCtrl() {
  let instance = {
    duration: 2,
    break: 5,
    durationInput: false,
    showDuration: function() {
      if (!instance.durationInput) 
        instance.durationInput = true;
    }
  };

  return instance;
}
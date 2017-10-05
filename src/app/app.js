angular.module('pomodoro', ['ngMaterial'])
  .controller('AppCtrl', AppCtrl);
///////////////////////
function AppCtrl() {
  let instance = {
    pomodoroSession: 2,
    break: 5,
    showPomodoro: false,
    setShowPomodoro: function() {
      if (!instance.showPomodoro) 
        instance.showPomodoro = true;
    }
  };

  return instance;
}
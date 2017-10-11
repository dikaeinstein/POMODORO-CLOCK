angular.module('pomodoro')
  .directive('countDownTimer', CountDownTimer);

function CountDownTimer($interval, $mdMedia) {
  return {
    templateUrl: 'src/app/components/countdowntimer/countdowntimer.html',
    restrict: 'E',
    scope: { 
      duration: '=', 
      running: '&',
      stop: '&',
      resetted: '&'
    },
    link: link
  };
  ///////////////////////
  function link(scope, elem, attrs) {
    let timer, listener;
    scope.isSmallScreen = $mdMedia('xs');
    scope.isBigScreen = $mdMedia('gt-xs');
    scope.mins = 0;
    scope.secs = 0;
    scope.stopped = true;
    elem.find('button').eq(0).on('click', () => {
      listener = scope.$watch('duration', (oldVal, newVal) => {
        if (oldVal !== newVal) 
          scope.startCountdown();
      }, true);
    });
  
    scope.startCountdown = () => {
      if (scope.stopped) {
        initCountdown(scope.duration.value);
        scope.running();
        scope.stopped = false;
      }
    };

    scope.resetCountdown = () => {
      $interval.cancel(timer);
      listener();
      scope.mins = 0;
      scope.secs = 0;
      scope.stopped = true;
      scope.resetted();
    };

    scope.$on('destroy', () => {
      scope.resetCountdown();
    });

    function initCountdown(dura) {
      let durationSecs = Number(dura) * 60;
      durationSecs = updateTimer(durationSecs);
      timer = $interval(() => {
        durationSecs = updateTimer(durationSecs);
      }, 1000);
    }

    function updateTimer(duration) {
      if (duration <= 0) {
        scope.stop();
        $interval.cancel(timer);
        scope.stopped = true;
      }
      
      let mins = Math.floor(duration / 60),
      secs = String(duration % 60);

      scope.mins = mins;
      scope.secs = secs.length < 2 ? '0' + secs : secs;
      duration -= 1;
      return duration;
    }
  }
}

CountDownTimer.$inject = ['$interval', '$mdMedia'];
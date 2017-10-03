angular.module('pomodoro')
  .directive('countDownTimer', CountDownTimer);

function CountDownTimer($interval) {
  return {
    templateUrl: 'src/app/components/countdowntimer/countdowntimer.html',
    restrict: 'E',
    scope: { duration: '@' },
    link: link
  };
  ///////////////////////
  function link(scope, elem, attrs) {
    let timer;
    scope.duration = Number(scope.duration);
    scope.mins = 0;
    scope.secs = 0;
    scope.started = false;

    scope.startCountdown = () => {
      if (!scope.started) {
        initCountdown(scope.duration);
        scope.started = true;
      }
    };

    scope.resetCountdown = () => {
      $interval.cancel(timer);
      scope.mins = 0;
      scope.secs = 0;
      scope.started = false; 
    };

    scope.$on('destroy', () => {
      scope.resetCountdown();
    });

    function initCountdown(dura) {
      let durationSecs = dura * 60;
      durationSecs = updateTimer(durationSecs);
      timer = $interval(() => {
        durationSecs = updateTimer(durationSecs);
        console.log(durationSecs);
      }, 1000);
    }

    function updateTimer(duration) {
      let mins = Math.floor(duration / 60),
      secs = duration % 60;

      scope.mins = mins;
      scope.secs = secs;

      if (duration <= 0) {
        $interval.cancel(timer);
      }
      duration -= 1;
      return duration;
    }
  }
}

CountDownTimer.$inject = ['$interval'];
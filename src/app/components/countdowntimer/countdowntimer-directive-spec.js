describe('Countdown Timer Directive Tests', () => {
  let elem, appCtrl, $compile, $scope, $interval;
  beforeEach(module('pomodoro'));
  beforeEach(module('tpl'));
  beforeEach(inject((_$compile_, _$rootScope_, _$interval_, _$controller_) => {
    $compile = _$compile_;
    $scope = _$rootScope_.$new();
    $interval = _$interval_;
    $controller = _$controller_;
    appCtrl = $controller('AppCtrl');
    $scope.duration = appCtrl.duration;
  }));

  it('should render with default values', () => {
    
    elem = angular.element(`<count-down-timer 
      duration="duration" 
      running="appCtrl.disableInputs()"
      resetted="appCtrl.enableInputs()"
      stop="appCtrl.toggleTimer()"> 
    </count-down-timer>`);
    
    $compile(elem)($scope);
  
    $scope.$digest();
    
    let mins = elem.isolateScope().mins;
    let secs = elem.isolateScope().secs;

    expect(elem.isolateScope().duration).toEqual({
      name: 'sessionLength', 
      value: 25
    });
    expect(Number(mins)).toEqual(0);
    expect(Number(secs)).toEqual(0);
    expect(elem.find('span').eq(0).text()).toEqual(String(mins));
    expect(elem.find('span').eq(1).text()).toEqual(String(secs));
  });
 
  it('should start and update timer appropriately', () => {
    
    elem = angular.element(`<count-down-timer 
      duration="duration" 
      running="appCtrl.disableInputs()"
      resetted="appCtrl.enableInputs()"
      stop="appCtrl.toggleTimer()"> 
    </count-down-timer>`);

    $compile(elem)($scope);
  
    $scope.$digest();
    let sc = elem.isolateScope();
    let start = elem.find('button').eq(0);

    start.triggerHandler({type: 'click'});

    $interval.flush(60000);
    let mins = elem.find('span').eq(0).text();
    let secs = elem.find('span').eq(1).text();

    expect(sc.mins).toEqual(24);
    expect(sc.secs).toEqual('00');
    expect(Number(mins)).toEqual(sc.mins);
    expect(secs).toEqual(sc.secs);
  });

  it('should reset timer', () => {
    elem = angular.element(`<count-down-timer 
      duration="duration" 
      running="appCtrl.disableInputs()"
      resetted="appCtrl.enableInputs()"
      stop="appCtrl.toggleTimer()"> 
    </count-down-timer>`);
  
    $compile(elem)($scope);

    $scope.$digest();
    let sc = elem.isolateScope();
    let start = elem.find('button').eq(0);
    let reset = elem.find('button').eq(1);
    spyOn($interval, 'cancel').and.callThrough();

    start.triggerHandler({type: 'click'});
    $interval.flush(60000);
    reset.triggerHandler({type: 'click'});
    
    expect($interval.cancel).toHaveBeenCalled();
    expect($interval.cancel.calls.argsFor(0)[0].$$intervalId)
      .toEqual(0);
  });
});

describe('Countdown Timer Directive Tests', () => {
  let elem, compiledElem, $compile, $scope, $interval;
  beforeEach(module('pomodoro'));
  beforeEach(module('tpl'));
  beforeEach(inject((_$compile_, _$rootScope_, _$interval_) => {
    $compile = _$compile_;
    $scope = _$rootScope_;
    $interval = _$interval_;
    
  }));

  it('should render with default values', () => {
    elem = angular.element('<count-down-timer duration="1"></count-down-timer>');
    $compile(elem)($scope);
  
    $scope.$digest();

    let defDuration = elem.isolateScope().duration = 2;
    let defBreak = elem.isolateScope().break = 5;
    
    let mins = elem.find('span').eq(0).text();
    let secs = elem.find('span').eq(1).text();
    expect(Number(mins)).toEqual(0);
    expect(Number(secs)).toEqual(0);
    expect(Number(defDuration)).toEqual(2);
    expect(Number(defBreak)).toEqual(5);
  });
 
  it('should update timer appropriately', () => {
    elem = angular.element('<count-down-timer duration="2"></count-down-timer>');
    $compile(elem)($scope);
  
    $scope.$digest();
    let sc = elem.isolateScope();
    let start = elem.find('input').eq(0);

    start.triggerHandler({type: 'click'});

    $interval.flush(1000);
    let mins = elem.find('span').eq(0).text();
    let secs = elem.find('span').eq(1).text();

    expect(sc.mins).toEqual(1);
    expect(sc.secs).toEqual(59);
    expect(Number(mins)).toEqual(sc.mins);
    expect(Number(secs)).toEqual(sc.secs);
  });

  it('should cancel timer', () => {
    elem = angular.element('<count-down-timer duration="2"></count-down-timer>');
    $compile(elem)($scope);
  
    $scope.$digest();
    let sc = elem.isolateScope();
    let start = elem.find('input').eq(0);
    let reset = elem.find('input').eq(1);
    spyOn($interval, 'cancel').and.callThrough();

    start.triggerHandler({type: 'click'});
    $interval.flush(1000);
    reset.triggerHandler({type: 'click'});
    
    expect($interval.cancel).toHaveBeenCalled();
    expect($interval.cancel.calls.argsFor(0)[0].$$intervalId)
      .toEqual(0);
  });
});

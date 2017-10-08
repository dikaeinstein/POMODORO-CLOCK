describe('AppCtrl', () => {
  // instantiate a new instance of module before each test
  beforeEach(module('pomodoro'));

  let appCtrl;
  // Before each unit test, instantiate a new instance
  // of the controller
  beforeEach(inject((_$controller_) => {
    appCtrl = _$controller_('AppCtrl');
  }));

  it('should have default fields on load', () => {
    expect(appCtrl.sessionLength).toEqual(2);
    expect(appCtrl.breakLength).toEqual(1);
    expect(appCtrl.duration).toEqual({ 
      name: 'sessionLength', 
      value: 2 
    });
    expect(appCtrl.disable).toBeFalsy();
    expect(appCtrl.showPomodoro).toBeFalsy();
    expect(appCtrl.enableInputs).toBeDefined();
    expect(appCtrl.disableInputs).toBeDefined();
    expect(appCtrl.setPomodoro).toBeDefined();
    expect(appCtrl.setShowPomodoro).toBeDefined();
    expect(appCtrl.toggleTimer).toBeDefined();
  });

  it('should enable and disable inputs', () => {
    appCtrl.disableInputs();
    expect(appCtrl.disable).toBeTruthy();
    appCtrl.enableInputs();
    expect(appCtrl.disable).toBeFalsy();
  });

  it('should set pomodoro session length', () => {
    expect(appCtrl.duration.value).toEqual(2);
    appCtrl.sessionLength = 5;
    // updating the timer value in the duration passed to the
    // countDownTimer directive / component 
    appCtrl.setPomodoro();
    expect(appCtrl.duration.value).toEqual(5);
  });

  it('should show set pomodoro', () => {
    expect(appCtrl.showPomodoro).toBeFalsy();
    // show / hide setPomodoro
    appCtrl.setShowPomodoro();
    expect(appCtrl.showPomodoro).toBeTruthy();
  });

  it('should toggle timer', () => {
    expect(appCtrl.duration).toEqual({ 
      name: 'sessionLength', 
      value: appCtrl.sessionLength
    });
    // switching the timer value in the duration passed to the
    // countDownTimer directive / compoonent
    appCtrl.toggleTimer();
    expect(appCtrl.duration).toEqual({ 
      name: 'breakLength', 
      value: appCtrl.breakLength
    });
  });
});
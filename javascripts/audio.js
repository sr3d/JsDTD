/* Sound Manager 2 Stuff */
var sm          = soundManager;
sm.url          = "./audio/";
sm.flashVersion = 9;
sm.debugMode    = false;
sm.onready( function() { 
  window.SOUNDS = {
    pop: sm.createSound({
      id: 'sound_pop',
      url: './audio/pop.mp3'
    })
  };
  
} );  
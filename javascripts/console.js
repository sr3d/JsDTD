// game console  ( from javascriptgamer.com )
//
// requires: prototype.js (tested with v. 1.4.0)

// Console ///////////////////////////////////////

Console = Class.create();
Console.prototype = {

    initialize : function (startScreen, tickSpeed) {
        this.tickSpeed = tickSpeed || 25; // milliseconds between ticks
        this.screen = startScreen;
    },
    
    start : function() {
        _con = this;
        window.setInterval(function () { _con.tick() }, this.tickSpeed);
        document.onkeydown = function (e) { _con.keyDown(e) };
        document.onkeyup = function (e) { _con.keyUp(e) };
        document.onkeypress = function (e) { _con.keyPress(e) };
    },

    keyDown : function(e) {
        this.screen.keyDown(e);
    },
    
    keyUp : function(e) {
        this.screen.keyUp(e);
    },

    keyPress : function(e) {
        this.screen.keyPress(e);
    },
    
    tick : function () {
      this.screen.tick();
    }

}

// Screen ////////////////////////////////////////

Screen = Class.create();
Screen.prototype = {
  initialize : function (id, objects) {
    this.id = id;
    this.objects = [];
    
    if( objects )
    {
      for( var i = 0; i < objects.length; i++ )
      {
        this.objects.push( objects[ i ] );
      }
    }
  },
  
  keyDown : function (e) {
  },
  
  keyUp : function(e) {
  },
  
  keyPress : function(e) {
  },
  
  tick : function () {
  }
  
  ,registerObject: function( obj ) { this.objects.push( obj ); }

}

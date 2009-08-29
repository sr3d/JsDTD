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
      //console.log( this.screen );
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
        console.log( objects );
        console.log( 'pushing new object' );
        console.log( objects[i] );
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


// Sprite ////////////////////////////////////////

var Sprite = Class.create();
Sprite.prototype = {
    initialize : function(id) {
        this.id = id;
        this.node = $(id);
    },
    
    getX : function() {
        return this.node.offsetLeft;
    },
    
    setX : function(x) {
        this.node.setStyle({'left' : x + 'px'});
    },


    getY : function () {
        return this.node.offsetTop;
    },
    
    setY : function(y) {
        this.node.setStyle({'top' : y + 'px'});
    },    
    

    moveBy: function(dx, dy) {
        this.setX(this.getX()+dx);
        this.setY(this.getY()+dy);
    },

    getW : function() {
        return this.node.offsetWidth;
    },
    
    getH : function() {
        return this.node.offsetHeight;
    },
};



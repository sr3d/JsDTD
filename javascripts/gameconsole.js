var Console = Class.create();
Console.prototype = {
  initialize : function ( screen, options ) {
    options = Object.extend( { 
      tickSpeed:   25
    } , options || { } );
    
    this.tickSpeed  = options.tickSpeed;
    this.screen     = screen;
    this.counter    = 0;
    
    this.MAX_TICK   = 1000;
  }
  
  ,start: function() {
    var self = this;
    this.interval = window.setInterval( function () { self.tick() }, this.tickSpeed );
    document.onkeydown  = function (e) { self.keyDown(e); return !false; };
    document.onkeyup    = function (e) { self.keyUp(e); return !false; };
    document.onkeypress = function (e) { self.keyPress(e); return !false; };
    
    return this;
  }
  
  ,stop: function() { 
    clearInterval( this.interval );
    this.interval = null;
    return this;
  }

  ,keyDown : function(e) {
    this.screen.keyDown(e);
  }
  
  ,keyUp : function(e) {
    this.screen.keyUp(e);
  }

  ,keyPress : function(e) {
    this.screen.keyPress(e);
  }
  
  ,tick : function () {
    this.counter++;
    
    window.sl.log('Current Game Tick', this.counter );
    if( this.counter > this.MAX_TICK )
    {
      console.log( 'MAX_TICK reached - stopping...' );
      this.stop();
      return
    } 
    
    this.screen.tick();
  }
  
};
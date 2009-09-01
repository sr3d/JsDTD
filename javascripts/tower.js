var Sprite = Class.create();
Sprite.prototype = {
  initialize : function(id) {
    this.id = id;
  }
  ,getX : function() { return this.node.offsetLeft; }
  ,setX : function(x) { this.node.style.left = x + 'px';}
  ,getY : function () { return this.node.offsetTop; }
  ,setY : function(y) { 
    this.node.style.top = y + 'px';}
  ,moveBy: function(dx, dy) { this.setX(this.getX()+dx); this.setY(this.getY()+dy); }
  ,getW : function() { return this.node.offsetWidth; }
  ,getH : function() { return this.node.offsetHeight; }
};



var Tower = { };
Tower.Base = Class.create( Sprite, { 
  initialize: function( type, x, y, grid, options ) {
    options = Object.extend( { 
    }, options || { } );
    
    this.x = x;
    this.y = y;
    
    this.grid = grid;
    
    this.id = "tower_" + this.x + '_' + this.y;
    this.render();
    this.node = $(this.id);
   
    this.bb = new BoundingShape.Rectangle( this.id, { 
      w:  this.grid.cellSize * ( this.size + this.bbRadius )
      ,h: this.grid.cellSize * ( this.size + this.bbRadius )
      ,x: this.grid.xyToLeftTop( this.x - this.bbRadius/2, 0 )[0]
      ,y: this.grid.xyToLeftTop( this.x, this.y - this.bbRadius/2 )[1]
    } );
    
    
    this.bb.update();
    
  }
  ,render: function() { throw 'Not implemented'; }
});

Tower.Canon = Class.create( Tower.Base, {
  initialize: function( $super, x, y, grid, options ) {
    this.type       = 'canon';
    this.size       = 2;
    this.bbRadius   = 4;
    
    $super( this.type, x, y, grid , options );
  }
  
  ,render: function() { 
    ( this.grid.getTowersContainer() ).insert( { bottom: this.html() } );
    this.node = $(this.id);
  }
  
  ,html: function() { 
    var coords = this.grid.xyToLeftTop( this.x, this.y );
    
    var html  = "<div id='"+ this.id + "' style='left:" + coords[0] + "px;top:" + coords[1] + 
                ";width:"+ JsDTDConfig.cellSize * this.size +   "px; height:" + JsDTDConfig.cellSize * this.size +"px'" + 
                " class='tower canon'></div>";
    return html;
  }
  
  ,tick: function() { 
    //console.log( 'ticking - Canon %i', this.id );
    if( this.lockOnTarget ) { }
  }
  
  ,findTarget: function() { 
    
  }
  
  ,lock: function() { 
    
  }

} );


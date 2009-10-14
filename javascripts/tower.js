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
  
  ,logStatus: function( msg ) { sl.log( this.id + " Status", msg ); }
  ,getCenter: function() { 
    var center = [ ( this.getX() + this.getW() )/2 , ( this.getY() + this.getH() ) / 2 ]; 
    if( !this._center ) {
      $('canvas').insert( { bottom: '<div class="center" style="left:'+ center[0]+ 'px; top:' + center[1]+'px;width: 2px; height: 2px;"></div>'})
    }
     
    if( this.node ) this.node.addClassName( 'highlight' );
    
    // console.log( "center %s, %o", center, this ); return center; 
  }
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
    
    window[ this.id ] = this;
    
    this.bb.update();
    
  }
  ,render: function() { throw 'Not implemented'; }
});

Tower.Canon = Class.create( Tower.Base, {
  initialize: function( $super, x, y, grid, options ) {
    this.type       = 'canon';
    this.size       = 2;
    this.bbRadius   = 4;
    
    this.level      = 0;
    
    this.bulletTypes = [ Bullet.CanonBulletLevel1 ];
    
    this.DEFAULT_COOL_TIME = 15;  // 10 ticks between firing
    this.coolTime = 0;

    $super( this.type, x, y, grid , options );
    
    /* for the turret */
    this.centerCoords = this.grid.xyToLeftTop( this.x + this.size/2, this.y + this.size / 2 ); 
    
    this.radius = 10; // the range 10px around the center 
    
    this.updateTurret();
    
    this.lockedOnTarget = null;
  }
  
  ,render: function() { 
    ( this.grid.getTowersContainer() ).insert( { bottom: this.html() } );
    this.node   = $(this.id);
    this.turret = $( this.id + '_turret' );
    
    /*
    this.node.observe( 'mouseover', function() { 
      if( this.lockedOnTarget )
      {
        $(this.lockedOnTarget.id).addClassName( 'lockedOn' )
      }
    }.bind(this) ).observe( 'mouseout', function() { 
      if( this.lockedOnTarget )
        $(this.lockedOnTarget.id).removeClassName( 'lockedOn' );
    }.bind(this) );
    */
    
  }
  
  ,html: function() { 
    var coords = this.grid.xyToLeftTop( this.x, this.y );
    
    var html  = "<div id='"+ this.id + "' style='left:" + coords[0] + "px;top:" + coords[1] + 
                ";width:"+ JsDTDConfig.cellSize * this.size +   "px; height:" + JsDTDConfig.cellSize * this.size +"px'" + 
                " class='tower canon'><div id='" + this.id +"_turret' class='turret'></div></div>";
    return html;
  }
  
  ,buttonHtml: function() { 

  }
  
  ,tick: function() { 
    if( this.lockedOnTarget != null ) 
    { 
      if( !this.lockedOnTarget.isAlive )
      {
        //console.log( 'target %o is no longer alive ', this.lockedOnTarget );
        this.lockedOnTarget = null;
      }
      else if ( !this.bb.collidesWith( this.lockedOnTarget.bb ) )
      {
        //console.log( 'target %o is outside range', this.lockedOnTarget );
        this.lockedOnTarget = null;
      }
      else if( this.coolTime == 0 )
      {
        this.coolTime = this.DEFAULT_COOL_TIME;
        new this.bulletTypes[ this.level ]( 
          this.centerCoords[0] , this.centerCoords[1]
          ,this.lockedOnTarget, this.grid
        );
        
      }
      
      //this.updateTurret();
    }

    if( this.coolTime > 0 ) this.coolTime--;
  }

  
  ,lockOn: function( creep ) { 
    //this.logStatus( 'Locking on ' + creep.id );
    this.lockedOnTarget = creep;
  }
  
  ,updateTurret: function() { 
    if( this.lockedOnTarget )
    {
      var coords = [ this.lockedOnTarget.getX(), this.lockedOnTarget.getY() ];
      this.turret.style.left =  ( coords[0] > this.centerCoords[0] + this.radius ? this.centerCoords[0] + this.radius :
                                  coords[0] < this.centerCoords[0] - this.radius ? this.centerCoords[0] - this.radius :
                                  coords[0] ) + 'px';
      this.turret.style.top  =  ( coords[1] > this.centerCoords[1] + this.radius ? this.centerCoords[1] + this.radius :
                                  coords[1] < this.centerCoords[1] - this.radius ? this.centerCoords[1] - this.radius :
                                  coords[1] ) + 'px';
      return;
    }
    
    /* set turret to default position */
    this.turret.style.left = (this.centerCoords[0] - this.radius) + 'px';
    this.turret.style.top  = (this.centerCoords[1] - this.radius) + 'px';
  }

} );

Tower.Canon.size = 2;


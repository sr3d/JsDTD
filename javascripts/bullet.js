var Bullet = { };
Bullet.Base  = Class.create( Sprite, {
  initialize: function( $super, x, y, creep, grid, options ) {
    this.type       = 'bullet';
    
    options = Object.extend( { 
      ttl        : 20       // bullet don't dissapear
      ,speed     : 5          // px per tick
      ,tick      : 15         // 10ms
      ,w         : 2          // width
      ,h         : 2          // height
    }, options || {});

    this.x      = x;
    this.y      = y;
    this.ttl    = options.ttl;  
    this.speed  = options.speed;    
    this.tick   = options.tick
    this.w      = options.w;
    this.h      = options.h;

    this.life   = this.ttl; 
    this.creep  = creep;
    this.grid   = grid;
    
    this.id     = 'bullet_' + JsDTDConfig.nextInt();
    $super( this.id );
    this.render(); 
  }
  
  ,render: function() { throw 'To be implemented'; }
  
  ,dispose: function() { 
    delete this.creep;
    delete this.grid;

    if( this.node ) this.node.remove();    
    delete this.node;
  }
} );

Bullet.CanonBulletLevel1 = Class.create( Bullet.Base, { 
initialize: function( $super, x, y, creep, grid, options ) {
    this.type       = 'bullet';
    this.level      = 1;
    this.damage     = 10; // 10 hitpoint
    
    options = Object.extend( { 
      
    }, options || { } );
    
    $super( x, y, creep, grid, options );
    
    this.bb = new BoundingShape.Rectangle( this.id, { 
      w:  this.w
      ,h: this.h
      ,x: this.node.offsetLeft
      ,y: this.node.offsetTop
    } );
    
    this.fire();
  }
  
  ,render: function() { 
    ( this.grid.getBulletsContainer() ).insert( { bottom: this.html() } );
    this.node = $(this.id);
  }
  
  ,html: function() { 
    var coords = [ this.x, this.y ];
    // console.log( coords );
    var html  = "<div id='"+ this.id + "' style='left:" + coords[0] + "px;top:" + coords[1] + "'" + 
                " class='bullet canon_level_1'></div>";
    return html;
  }
  
  ,fire: function() { 
    var targetCoords = [this.creep.getX(), this.creep.getY() ];
    var angle = Math.atan( Math.abs( targetCoords[0] - this.getX()) / Math.abs( targetCoords[1] - this.getY() )  );
    var dx = ( this.getX() >= targetCoords[0] ? -1 : 1 ) * Math.sin( angle ) * this.speed;
    var dy = ( this.getY() >= targetCoords[1] ? -1 : 1 ) * Math.cos( angle ) * this.speed;

    var self = this;
    this.interval = setInterval( function() {
      /* make sure the target is alive */
      if( !self.creep || !self.creep.isAlive )
      {
        // console.log( 'Bullet' + self.id + ':  target died, ' + self.creep.id );
        self.dispose();
        return;
      }
      
      /* decrement */
      if( self.life-- > 0 )
      {
        /* move */
        self.moveBy( dx, dy );
        self.bb.setPos( self.getX(), self.getY() );
          
        /* collision detection */
        if( self.bb.collidesWith( self.creep.bb ) )
        {
          //console.log( 'bullet collides' );
          self.creep.takeDamage( self.damage );
          self.stop();
        }
        else
        {
          ; /* bullet doesn't collide, move on */
        }
        
      }
      else
      {
        // bullet expires
        //console.log( 'bullet ' + self.id + ' expires.  %o', self );
        self.stop();
      }
      
    }, this.tick );
  }
  
  /* */
  ,stop: function() { 
    clearInterval( this.interval );
    this.dispose();
  }
  
} );
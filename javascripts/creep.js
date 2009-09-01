var Soot = Class.create( Sprite, { 
  initialize: function( $super, grid, x, y ) { 
    this.id       = 'soot_' + JsDTDConfig.nextInt() ;
    this.speed    = 3;
    this.friction = 1;
    this.velocity = 0;
    this.type     = 'soot';
    this.isAlive  = true;

    //this.x = 0;
    //this.y = 100;

    //this.setX( this.x );
    //this.setY( this.y );
    
    this.grid = grid;
    
    this.bb = new BoundingShape.Rectangle( this.id, {x: this.x, y: this.y, w: 15, h: 15} );

    this.render();
    
    $super( this.id );
    
    this.maxHP = 100;
    this.currentHP = this.maxHP;
    
    this.updateHP();
  }

	,getSpeed: function() { return this.speed - this.friction; }

  ,tick : function() {
    if( this.wayPoint >= this.path.length )
    {
      this.wayPoint = 0;
      this._nextCoords = null;
      return;
    } 
    
    var nextCoords = this._getNextCoords();

    /* todo: cache the next delta to move */
    if( this.getX() != nextCoords[0] )
    {
      var dx = Math.abs( nextCoords[0] - this.getX() ) > this.getSpeed() ? 
                    ( nextCoords[0] > this.getX() ? 1 : -1 ) * this.getSpeed() : 
                    nextCoords[0] - this.getX();
      this.setX( this.getX() + dx );
    }
    
    if( this.getY() != nextCoords[1] )
    {
      var dy = Math.abs( nextCoords[1] - this.getY() ) <=  this.getSpeed() ? 
                    nextCoords[1] - this.getY() :
                    ( nextCoords[1] > this.getY() ? 1 : -1 ) * this.getSpeed();
      this.setY( this.getY() + dy );
    }

    this.bb.setPos( this.getX(), this.getY() );
    
    /* arrive at the targetted cell, bump it to next */
    if( this.getX() == nextCoords[0] && this.getY() == nextCoords[1] )
    {
      this.wayPoint++;
      this._nextCoords = null;

      
      //console.log( 'bump to next waypoint %s %o', this.wayPoint, this.path[ this.wayPoint ] );
      //sl.log( 'Next Coords:', this.path[ this.wayPoint ].toString() );
    }
  }
  
  ,_getNextCoords: function() { 
    /* cache the next coordniates */
    if( this._nextCoords ) return this._nextCoords;
    this._nextCoords = this.grid.xyToLeftTop( this.path[ this.wayPoint ][0], this.path[ this.wayPoint ][1]  );
    return this._nextCoords;
  }
 
	,reset: function() { 
	
	}
	
	,render: function() { 
	  (this.grid.getUnitsContainer()).insert( { bottom: this.html() } );
	  this.node = $(this.id);
	}
	
	,html: function() { 
    var coords = this.grid.xyToLeftTop( this.x, this.y );
    var html   = "<div id='" + this.id + "' style='left:" + coords[0] + "px;top:" + coords[1] + "px' class='creep soot'><div id='" + this.id+ "_hp_wrapper' class='hp_wrapper'><div id='" + this.id + "_hp' class='hp'></div></div></div>";
    return html
	}
	
	,setPath: function( path ) { 
	  this.path = path;
	  //this.highlightPath();
	  this.resetPosition();
	}
	
	,highlightPath: function() {
    for( var i = 0; i < this.path.length; i++ )
    {
      $( this.path[i][0] + "_" + this.path[i][1] ).addClassName( 'highlight' );
    }
	}

  ,resetPosition: function() { 
    this.wayPoint = 0;
    var coords = this.grid.xyToLeftTop( this.path[ this.wayPoint ][0], this.path[ this.wayPoint ][1] );
    this.node.style.left = coords[0] + 'px';
    this.node.style.top  = coords[1] + 'px';
  }
  
  ,takeDamage: function( hp ) {
    this.currentHP -= hp;
    this.updateHP();
    
    if( this.currentHP <= 0 )
    {
      console.log( 'Creep ' + this.id + ' is dead' );  
      this.isAlive = false;
    }
  }
  
  ,setHP: function( hp ) { this.hp = hp; if( this.hp > 0 ) this.isAlive = true; this.updateHP(); }
  
  ,updateHP: function() { 
		$(this.id + '_hp').style.width = Math.floor( this.currentHP * 100 / this.maxHP ) + '%';
	}  
} );
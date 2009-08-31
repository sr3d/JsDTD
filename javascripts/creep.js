var Soot = Class.create( Sprite, { 
  initialize: function( $super, grid, x, y ) { 
    this.id       = 'soot_' + JsDTDConfig.nextInt() ;
    this.speed    = 1;
    this.friction = 0.5;
    this.velocity = 0;
    this.type     = 'soot';

    //this.x = 0;
    //this.y = 100;

    //this.setX( this.x );
    //this.setY( this.y );
    
    this.grid = grid;
    
    //this.bb = new BoundingShape.Rectangle( this.id, {x: this.x, y: this.y, w: 15, h: 15} );

    this.render();
    
    $super( this.id );
  }

  ,updateBoundingBox: function() { 
		//this.bb.setPos( this.x, this.y );
	}
	
	,getSpeed: function() { return this.speed - this.friction; }

  ,tick : function() {
    if( this.wayPoint > this.path.length )
      return;
    var nextCoords = this.grid.xyToLeftTop( this.path[ this.wayPoint ][0], this.path[ this.wayPoint ][1]  );

    /* todo: cache the next delta to move */
    if( this.getX() < nextCoords[0] )
    {
      var xDelta = Math.abs( nextCoords[0] - this.getX() ) > this.getSpeed() ? 
                    ( nextCoords[0] > this.getX() ? 1 : -1 ) * this.getSpeed() : 
                    nextCoords[0] - this.getX();
      this.setX( this.getX() + xDelta );
    }
    
    if( this.getY() < nextCoords[1] )
    {
      var yDelta = Math.abs( nextCoords[1] - this.getY() ) > this.getSpeed() ? 
                    ( nextCoords[1] > this.getY() ? 1 : -1 ) * this.getSpeed() : 
                    nextCoords[1] - this.getY();
      this.setY( this.getY() + yDelta );
    }
    
    /* arrive at the targetted cell, bump it to next */
    if( this.getX() == nextCoords[0] && this.getY() == nextCoords[1] )
    {
      this.wayPoint++;
      console.log( 'bump to next waypoint %s %o', this.wayPoint, this.path[ this.wayPoint ] );
    }
  }
    
 
	,reset: function() { 
	
	}
	
	,render: function() { 
	  (this.grid.getUnitsContainer()).insert( { bottom: this.html() } );
	  this.node = $(this.id);
	}
	
	,html: function() { 
    var coords = this.grid.xyToLeftTop( this.x, this.y );
    var html   = "<div id='" + this.id + "' style='left:" + coords[0] + "px;top:" + coords[1] + "px' class='creep soot'></div>";
    return html
	}
	
	,setPath: function( path ) { 
	  this.path = path;
	  this.highlightPath();
	  this.resetPosition();
	}
	
	,highlightPath: function() {
    for( var i = 0; i < this.path.length; i++ )
    {
      //console.log( 'highlight (%s, %s)', this.path[i][0], this.path[i][1] );
      $( this.path[i][0] + "_" + this.path[i][1] ).addClassName( 'highlight' );
    }
	}

  ,resetPosition: function() { 
    var coords = this.grid.xyToLeftTop( this.path[0][0], this.path[0][1] );
    this.node.style.left = coords[0] + 'px';
    this.node.style.top  = coords[1] + 'px';
    
    this.wayPoint = 1;
  }
} );
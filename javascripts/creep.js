var Soot = Class.create( Sprite, { 
  initialize: function( $super, grid, x, y ) { 
    this.id       = 'soot_' + JsDTDConfig.nextInt() ;
    this.speed    = 5;
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

  ,tick : function() {
    // TODO:  follow the path 
    //this.setY( this.y );
		//this.updateBoundingBox();
  }
 
	,reset: function() { 
		//this.x = 0;
		this.resetCoefficents();
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
  }
} );
var Tower = { };
Tower.Base = Class.create( { 
  initialize: function( type, x, y, grid, options ) {
    options = Object.extend( { 
    }, options || { } );
    
    this.x = x;
    this.y = y;
    
    this.id = "tower_" + this.x + '_' + this.y;
    //this.node = $(id);
    
    this.grid = grid;
    
    console.log( 'init Tower.Base %o', this );
  }
});

Tower.Canon = Class.create( Tower.Base, {
  initialize: function( $super, x, y, grid, options ) {
    this.type = 'canon';
    this.size = 2;
    
    $super( this.type, x, y, grid , options );

    this.render();
  }
  
  ,render: function() { 
    ( this.grid.getUnitsContainer() ).insert( { bottom: this.html() } );
    this.node = $(this.id);
  }
  
  ,html: function() { 
    var coords = this.grid.xyToLeftTop( this.x, this.y );
    
    var html  = "<div id='"+ this.id + "' style='left:" + coords[0] + "px;top:" + coords[1] + 
                ";width:"+ JsDTDConfig.cellSize * this.size +   "px; height:" + JsDTDConfig.cellSize * this.size +"px'" + 
                " class='tower canon'></div>";
    //console.log( html );
    return html;
  }

} );


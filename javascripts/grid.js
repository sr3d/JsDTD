CELL_BLANK = 0;
CELL_TOWER = 1;

var Grid = Class.create( { 
  initialize: function( id, options ) {
    options = Object.extend( { 
      x:          30
      ,y:         30
      ,cellSize:  20
    } , options || {} );
    
    this.id       = id;
    this.node     = $(id);
    
    this.x        = options.x;
    this.y        = options.y;
    this.cellSize = options.cellSize;
    
    this.resetGrid();
    
    this.render();
    
    this.graph    = new Graph( this.grid );
  }
  
  /* init the internal 2D array */
  ,resetGrid: function() { 
    this.grid = [];
    for( var i = 0; i < this.x; i++ )
    {
      this.grid[i] = [];
      
      for( var j = 0; j < this.y; j++ )
      {
        this.grid[i][j] = false;
      }
    }
  }
  
  /* add a new Tower to the grid at a coordinates */
  ,addTower: function( x, y, tower ){
    var tower = new tower( x, y, this );
    
     /* mark the cell as occupied */
    for( var i = 0; i < tower.size; i++ )
      for( j = 0; j < tower.size; j++ )
        this.grid[ x + i][ y + j] = true;

    //this.recalculateAllCreepsPaths();
    this.graph.markDirty();        
    return tower;
  }
  
  ,addCreep: function( x, y, creepType ) { 
    var creep = new creepType( this );
    creep.setPath( this.calculatePath() );
    //console.log( 'Adding new creep: %o', creep );
    return creep;
  }

  
  ,calculatePath: function() { 
    //window.DEBUG = true;
    var outGate = this.getOutGate();
    var path = this.graph.aStar( 0, Math.floor( (this.y - 6 ) / 2 ), outGate[0], outGate[1] );
    
    //window.DEBUG = false;
    return path;
  }
  
  ,calculatePathFromCoords: function( x, y ){
    var outGate = this.getOutGate();
    console.log( 'new path from %o to %o', arguments, outGate);
    return this.graph.aStar( x, y, outGate[0], outGate[1] );    
  }
  
  ,getOutGate: function() { return [ ( this.x - 1 ), Math.floor( this.y /2 ) ]; }
  
  ,getContainer: function() { return this.node; }
  ,getTowersContainer: function() { return $('towers'); }
  ,getUnitsContainer: function() { return $('units'); }
  ,getBulletsContainer: function() { return $('bullets'); }
  
  ,render: function() { 
    var html = [];
    for( var i = 0; i < this.x; i++ )
    {
      for( var j = 0; j < this.y; j++ )
      {
        html.push( this.cellHtml( i, j ) );
      }
    }
    
    
    // this.node.innerHTML = html.join( ' ' );
    
    //$$('.grid_cell').each( function(item) { 
    //  Event.observe( item, 'mouseover', function() { 
    //    sl.log('MouseOver:',this.id  );
    //  } );
    //} );
  }
  
  ,cellHtml: function( x, y) { 
    return '<div id="' + x + '_' + y + '" class="grid_cell" style="left:' + (x*this.cellSize) + 'px;top:' + (y*this.cellSize)+ 'px;width:' + this.cellSize +'px;height:' + this.cellSize + 'px" x="' + x + '" y="' + y +'"></div>'
  }
  
  ,xyToLeftTop: function( x, y ) {
    return [ x * this.cellSize, y * this.cellSize ];
  }
  
  ,posToGridCoords: function ( left, top ) { 
    return [ Math.floor( left / this.cellSize ), Math.floor( top / this.cellSize ) ] ;
  }
  
  ,isWalkable: function( x, y ) { 
    return x >= 0 && x < this.grid.length && !this.grid[x][y]; 
  }
  
  ,isRegionAvailable: function( X1, Y1, X2, Y2 )
  {
    var coords = [ this.posToGridCoords( X1, Y1 ), this.posToGridCoords( X2, Y2 ) ];
    for( i = coords[0][0]; i < coords[1][0]; i++ )
      for( j = coords[0][1]; j < coords[1][1]; j++ )
      {
        if( !this.isWalkable( i, j ) )
          return false;
      }
    return true;
  }
  
} )


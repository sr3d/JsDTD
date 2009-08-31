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
    
    return tower;
  }
  
  ,addCreep: function( x, y, creepType ) { 
    var creep = new creepType( this );
    creep.setPath( this.calculatePath() );
    console.log( 'Adding new creep: %o', creep );
    
    return creep;
  }
  
  ,calculatePath: function() { 
    //window.DEBUG = true;
    console.log( this.graph );
    var path = this.graph.aStar( 0, Math.floor( (this.y - 5 ) / 2 ), ( this.x - 1 ), Math.floor( this.y /2 ) );
    console.log( path );
    //window.DEBUG = false;
    return path;
  }
  
  ,getContainer: function() { return this.node; }
  ,getTowersContainer: function() { return $('towers'); }
  ,getUnitsContainer: function() { return $('units'); }
  
  ,render: function() { 
    var html = [];
    for( var i = 0; i < this.x; i++ )
    {
      for( var j = 0; j < this.y; j++ )
      {
        html.push( this.cellHtml( i, j ) );
      }
    }
    this.node.innerHTML = html.join( ' ' );
    $$('.grid_cell').each( function(item) { 
      Event.observe( item, 'mouseover', function() { 
        sl.log('MouseOver:',this.id  );
      } );
    } );
  }
  
  ,cellHtml: function( x, y) { 
    return '<div id="' + x + '_' + y + '" class="grid_cell" style="left:' + (x*this.cellSize) + 'px;top:' + (y*this.cellSize)+ 'px;width:' + this.cellSize +'px;height:' + this.cellSize + 'px" x="' + x + '" y="' + y +'"></div>'
  }
  
  ,xyToLeftTop: function( x, y ) {
    return [ x * this.cellSize, y * this.cellSize ];
  }
  
  ,topLeftToXY: function ( left, top ) { 
    return Math.floor( )
  }
  
  ,isWalkable: function( x, y ) { 
    return x >= 0 && x < this.grid.length && !this.grid[x][y]; 
  }
  
} )


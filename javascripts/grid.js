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
  
  
  ,getContainer: function() { return this.node; }
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
  }
  
  ,cellHtml: function( x, y) { 
    return '<div id="' + x + '_' + y + '" class="grid_cell" style="left:' + (x*this.cellSize) + 'px;top:' + (y*this.cellSize)+ 'px;width:' + this.cellSize +'px;height:' + this.cellSize + 'px" x="' + x + '" y="' + y +'"></div>'
  }
  
  ,xyToLeftTop: function( x, y ) {
    return [ x * this.cellSize, y * this.cellSize ];
  }
  
  ,isWalkable: function( x, y ) { 
    return x >= 0 && x < this.grid.length && !this.grid[x][y]; 
  }
  
} )


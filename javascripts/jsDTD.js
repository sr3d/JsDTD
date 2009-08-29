var JsDTDConfig = { 
  cellSize: 20
};
var JsDTD = Class.create({ 
  initialize: function( id, options )
  {
    options = Object.extend( { 
      /* mapsize */
      x:        26
      ,y:       26
    }, options || { } );
    
    this.x = options.x;
    this.y = options.y;
    
    this.id = id;
    this.node = $(id);

    this.grid = new Grid( 'grid', { x: options.x, y: options.y, cellSize: JsDTDConfig.cellSize } );
    
    /* Array to keep track of all the units */
    this.towers = [];
  
  }
  
  ,addTower: function( x, y, tower ) {
    /* TODO: check to see if tower can be built */
    console.log( 'adding new tower: %o', this.grid.addTower( 10, 10, tower ) );
    //console.log( this.towers );
  }
  
  
})
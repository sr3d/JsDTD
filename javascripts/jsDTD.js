
var JsDTDConfig = { 
  cellSize: 20
  ,count: 0
  ,nextInt: function() { 
    return this.count++;
  }
};


var JsDTD = Class.create( Console, { 
  initialize: function( $super, id, options )
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
    this.creeps = [];
    
    $super( new Screen.JsDTD(), options );
  
  }
  
  ,addTower: function( x, y, tower ) {
    /* TODO: check to see if tower can be built */
    var tower = this.grid.addTower( x, y, tower )
    this.towers.push( tower );
    
    /* Register object to screen to tick */
    this.screen.registerObject( tower );

    return tower;
  }
  
  ,addCreep: function( creepType ) {
    var creep = this.grid.addCreep( 0, 0, creepType );
    this.creeps.push( creep );
    this.screen.registerObject( creep );
  }
  
  ,start: function( $super ) {
    this.addCreep( Soot );
    $super();
  }
    
} );
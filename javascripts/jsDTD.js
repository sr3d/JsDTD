
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
    this.screen.towers = this.towers;
    this.screen.creeps = this.creeps;
  
  }
  
  ,addTower: function( x, y, tower ) {
    /* TODO: check to see if tower can be built */
    var tower = this.grid.addTower( x, y, tower )
    this.towers.push( tower );
    
    /* Register object to screen to tick */
    this.screen.registerObject( tower );

    return tower;
  }
  
  ,addCreep: function( x, y, creepType ) {
    var creep = this.grid.addCreep( x, y, creepType );
    this.creeps.push( creep );
    this.screen.registerObject( creep );
  }
  
  ,addCreeps: function() { 
    var maxCreeps = 5;
    var self = this;
    for( var i = 0; i < maxCreeps; i++  )
    {
      var x = Math.floor( Math.random() * this.x );
      var y = Math.floor( Math.random() * this.y );
      //console.log( x, y );
      
      //setTimeout( function() { self.addCreep( x , y, Soot ) }, 1000 );
    }
    
  }
  
  ,start: function( $super ) {
    //this.addCreep( Soot );
    //this.addCreeps();
    $super();
    
    var self = this;

    /* pre-calculate the path to cache it */
    this.grid.calculatePath();

    // time out so to make sure the app init correctly    
    setTimeout( function() { 
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 1000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 3000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 5000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 8000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 10000 );
    }, 500 );
  }
    
} );
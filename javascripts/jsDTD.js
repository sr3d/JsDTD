
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
    
    /* Set the scores */
    this.scores   = 0;
    this.lives    = 20; // number of creeps that can run away
    this.refresh();
  
  }
  
  ,addTower: function( x, y, tower ) {
    /* TODO: check to see if tower can be built */
    var absCoords = this.grid.xyToLeftTop( x, y );
    if( !this.checkGridStatus( 
        absCoords[0],
        absCoords[1],
        absCoords[0] + this.grid.cellSize * tower.size - 1, 
        absCoords[1] + this.grid.cellSize * tower.size - 1 ) )
      return false;

    /* Check for closure */
    
    
    var tower = this.grid.addTower( x, y, tower )
    this.towers.push( tower );
    
    /* Register object to screen to tick */
    this.screen.registerObject( tower );

    /* recalculate path */
    this.recalculateAllCreepsPaths();
    
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
  
  ,recalculateAllCreepsPaths: function() { 
    /* update each creeps's path */
    var i = this.creeps.length;
    while( i-- )
    {
      // console.log( 'updating path for creep %s, %o', this.creeps[i].id, this.creeps[i]._getNextCoords() );
      
      if( !this.creeps[i].isAlive )
        continue;
        
      var nextCoords = this.creeps[i].getCurrentGridCoords();
      this.creeps[ i ].setPath( 
        this.grid.calculatePathFromCoords( nextCoords[0], nextCoords[1] )
      );
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
      setTimeout( function() { self.addCreep( 0 , 0, SootLevel2 ) }, 3000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 5000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 8000 );
      setTimeout( function() { self.addCreep( 0 , 0, SootLevel2 ) }, 10000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 15000 );
      setTimeout( function() { self.addCreep( 0 , 0, SootLevel2 ) }, 17000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 18000 );
      setTimeout( function() { self.addCreep( 0 , 0, SootLevel2 ) }, 19000 );
      setTimeout( function() { self.addCreep( 0 , 0, Soot ) }, 22000 );
    }, 500 );
  }
  
  ,creepsRunAway: function() { 
    this.lives--;
    this.refresh();
  }
  
  ,addScores: function( score ) { 
    var prevScores = this.scores + 1;
    this.scores += score;
    //this.refresh();
    if( !this._animatedScores )
    {
      this._animatedScores = setInterval( function() { 
        if( prevScores < this.scores )
        {
          prevScores += 1;
          $('scores').innerHTML = prevScores++;
        }
        else
        {
          clearInterval( this._animatedScores );
          this._animatedScores = null;
        }
      }.bind(this), 50 );
    }
  }
  
  ,refresh: function() { 
    $('lives').innerHTML = this.lives;
    $('scores').innerHTML = this.scores;
  }
  
  ,checkGridStatus: function( x1, y1, x2, y2 ) // top, right, left, bottom
  {
    /* check grid status for occupied cells */
    if( !this.grid.isRegionAvailable( x1, y1, x2, y2 ) )
      return false;
      
    /* now check for overlapping with Creeps */
    /* this is a hack to create a temporary bounding box rectangular shape */
    var bb = { x: x1, y: y1, w: x2 - x1 -2, h: y2 - y1 - 2, isEnabled: true };
    var i = this.creeps.length;
    while( i-- )
    {
      if( !this.creeps[i].isAlive ) continue;
      
      if( this.creeps[i].bb.collidesWith( bb ) )
      {
        return false;
      }
    }
    
    return true;
  }
  
  ,posToGridCoords: function( left, top )
  {
    return this.grid.posToGridCoords( left, top );
  }
    
} );
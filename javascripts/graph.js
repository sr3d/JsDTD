var l = console.log;

var Graph = function( graph, options ) {
    this.graph = graph;
    this.name = 'Graph';
    
    this.MOVE_COST = 10;
    this.X_MOVE_COST  = 21;
};

Graph.prototype = { 
  
  aStar1: function( startX, startY, endX, endY ) { 
    l( this.MOVE_COST );
    
    var open = new Util.PQ();
    var closed = [];

    var i = 100;
    
    var h = function( x1, y1, x2, y2 ) { l( arguments) ;return Math.abs( x1 - x2 ) + Math.abs( y1 - y2 ); }
    open.push( 0, {x: startX, y: startY, parentX: null, parentY: null, cost: 0 } );
    
    while( open.count() > 0 )
    {
      var temp = open.pop();
      console.log( 'item from the PQ: %o', temp );
      var node = temp[1], cost = temp[0];
      console.log( 'the node itself %o', node );
      if( node.x == endX && node.y == endY )
      {
        console.log( 'arrive at dest %o',  node );
        return true;
      }
      
      closed[ node.x + '_' + node.y ] = node;
      
      /* traverse the neighbor */
      for( var i = node.x - 1; i < node.x + 2; i++ )
      {
        for( var j = node.y - 1; j < node.y + 2; j++ )
        {
          console.log( 'checking neighbor (%s, %s)', i, j );
          /* if occupied */
          if( !this.graph[i] )
          {
            console.log( "Undefined i -- neighbor (%s, %s) is outside the grid, not walkable", i, j );
            continue;
          }    
          
          if( j < 0 || j >= this.graph[i].length )
          {
            console.log( "neighbor (%s, %s) is outside the grid, not walkable", i, j );
            continue;
          } 
          
          if( i == node.x && j == node.y )
          {
            console.log( "Current node is not walkable" , i, j );
            continue;
          }
          
          if( this.graph[i][j] )
          {
            console.log( "Neighbor node (%s, %s) is marked Occupied and not walkable", i, j ); 
            continue;
          }
          
          var moveCost = ( i != node.x && j != node.y ) ? this.X_MOVE_COST : this.MOVE_COST;
          console.log( 'moveCost', moveCost );
          var hCost = h( i, j, endX, endY );
          console.log( 'Heuristic of neighbord %s', hCost );
          
          
        }
      }
     
      if( i-- < 0 ){  
        console.log( 'exceed looping limit' );
        break ; 
      }
      
      return false;
    }
  }
  
  ,isWalkable: function( x, y ) { 
    return this.grid.isWalkable( x, y );
  }
  
  
};


var Node = function( x, y) { this.x = x; this.y = y; };


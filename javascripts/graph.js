var Graph = function( graph, options ) {
  this.graph = graph;
};
Graph.prototype = { 
  initialize: function( graph, options ){
    
    this.graph = graph;
    this.name = 'Graph';
    
    this.HV_COST = 10;
    this.D_COST  = 21;

    console.log( 'this.graph= %p', this.graph );
    
    console.log( this.graph );
  }
  
  ,aStar: function( start, end ) {
    if( start[0] == end[0] && start[1] == end[1] ) return true;
    var path = [];
    var self = this;
    // mahattan distant
    var h = function( a, b ) { return Math.abs( a[0] - b[0] ) + Math.abs( a[1] - b[1] ) };
    
    var openSet = new Util.SortedList( { 
      /* comparator to use the Mahattan heuristic distance */
      comparator: function( nodeA , nodeB ) { 
        /*
        var ha = h( [nodeA.x, nodeA.y], end );
        var hb = h( [nodeB.y, nodeB.y], end );*/
        var ha = nodeA.cost, hb = nodeB.cost
        return ha = hb ? 0 : ha > hb ? 1 : -1; 
      } 
    } ) ;
    

    var closedSet = {};

    openSet.push( { x: start[0], y: start[1], parentX: null, parentY: null, cost: h( start, end ) } );

    var walkable = function( x, y ) { return !!self.graph[x] && !self.graph[x][y]; }
    
    var addNode = function( x, y, parentX, parentY ) {
      if( !walkable( x,y ) ) return;
      if( !closedSet[ x + "_" + y ] )
      {
        var cost = 
        openSet.push( { x: x , y: y, parentX: node.x, parentY: node.y, cost: h( [x,y], end ) }  ) ;
        closedSet[ x + "_" + y ] = true;
      }
    };

    var i = 100;

    while( openSet.count() > 0 )
    {
      var node = openSet.pop();
      closedSet[ node.x + '_' + y ] = node;
      //var cost = 

      /*
      addNode( node.x + 1, node.y,        node.x, node.y );
      addNode( node.x    , node.y + 1,    node.x, node.y );
      addNode( node.x - 1, node.y,        node.x, node.y );
      addNode( node.x    , node.y - 1,    node.x, node.y );
      */
      // just incase ...
      if( i-- < 0 ){  
        console.log( 'exceed looping limit' );
        break ; 
      }
    }
    
    return false;
    /*
      OPEN = priority queue containing START
      CLOSED = empty set
      while lowest rank in OPEN is not the GOAL:
        current = remove lowest rank item from OPEN
        add current to CLOSED
        for neighbors of current:
          cost = g(current) + movementcost(current, neighbor)
          if neighbor in OPEN and cost less than g(neighbor):
            remove neighbor from OPEN, because new path is better
          if neighbor in CLOSED and cost less than g(neighbor): **
            remove neighbor from CLOSED
          if neighbor not in OPEN and neighbor not in CLOSED:
            set g(neighbor) to cost
            add neighbor to OPEN
            set priority queue rank to g(neighbor) + h(neighbor)
            set neighbor's parent to current
      
      reconstruct reverse path from goal to start
      by following parent pointers
    */

  }
  
  ,aStar1: function( startX, startY, endX, endY ) { 
    
    
  }
  
  ,isWalkable: function( x, y ) { 
    return this.grid.isWalkable( x, y );
  }
  
  
};


var Node = function( x, y) { this.x = x; this.y = y; };


if( typeof DEBUG == 'undefined') var DEBUG = !true;

var l = function() {
  //console.log( arguments ); 
  if( window.DEBUG )
    console.log.apply( this, arguments );
};

//var l = console.log;

var Graph = function( graph, options ) {
    this.graph = graph;
    this.name = 'Graph';
		this._paths = [];
    
    this.MOVE_COST      = 10;
    this.X_MOVE_COST    = 21;
    this.ALLOW_X_MOVE   = true;  // no diagnal movement
};

Graph.prototype = { 
   markDirty: function() { this.isDirty = true; 
	   this._paths = [];
	 }
  ,aStar: function( startX, startY, endX, endY ) {
		//console.log( this._paths );
    /* return the cache version */
    if( this._paths[ startX + "_" + startY + "_" + endX + "_" + endY ] ) 
    {
      //console.log( 'return form cache' );
			return this._paths[ startX + "_" + startY + "_" + endX + "_" + endY ];  
    }
		
		var startTime = new Date();
    
    var open = new Util.PQ();

    var DEBUG_FLAG = 1000;
    
    var h = function( x1, y1, x2, y2 ) { l( arguments) ;return Math.abs( x1 - x2 ) + Math.abs( y1 - y2 ); }
    
    var graphStatus = {};
    var self = this;
    var addToOpen = function( x, y, parentX, parentY, moveCost, hCost ) { 
      var fCost = moveCost + hCost;
      graphStatus[ x + '_' + y ] = {x: x, y: y, parentX: parentX, parentY: parentY, moveCost: moveCost, hCost: hCost };
      open.push( fCost, {x: x, y: y, parentX: parentX, parentY: parentY } ); 
      l( '>> Add Node to Open List:  %o %o', {x: startX, y: startY, parentX: parentX, parentY: parentY }, arguments );
    };
    var isInOpen = function( x, y ) { return !!graphStatus[ x + '_' + y ]; };
    
    var addToClosed = function( x, y ) { graphStatus[ x + '_' + y ].closed = true;};
    var isInClosed = function( x, y ) { return graphStatus[ x + '_' + y ] && graphStatus[ x + '_' + y ].closed; };
    
    var extractPath = function( x, y ) { 
      var node = graphStatus[ x + '_' + y ];
      var path = [];
      while( node )
      {
        l( node );
        if( path.length == 0 ) 
          path.push( [node.x, node.y] );
        else
          path.splice( 0, 0, [node.x, node.y] );
        node = graphStatus[ node.parentX + '_' + node.parentY ];
      }

			self._paths[ startX + "_" + startY + "_" + endX + "_" + endY ] = path;
      return path;
    }
    
    /* add the starting node to open so we can examine its neighbors */
    addToOpen( startX, startY, null, null, 0 , 0 );
    
    while( open.count() > 0 )
    {
      var temp = open.pop();
      l( 'item from the PQ: %o', temp );
      var node = temp[1], cost = temp[0];
      l( 'the node itself %o', node );
      
      /* Found the destination */
      if( node.x == endX && node.y == endY )
      {
        console.log( 'arrive at dest %o after %s iterations, taking %s ms',  node, DEBUG_FLAG, ( new Date() - startTime ) );
        return extractPath( node.x, node.y );
      }
      
      addToClosed( node.x, node.y );
      
      /* traverse the neighbor */
      for( var i = node.x - 1; i <= node.x + 1; i++ )
      {
        for( var j = node.y - 1; j <= node.y + 1; j++ )
        {
          l( 'checking neighbor (%s, %s)', i, j );
          /* if occupied */
          if( !this.graph[i] )
          {
            l( "Undefined i -- neighbor (%s, %s) is outside the grid, not walkable", i, j );
            continue;
          }    
          
          if( j < 0 || j >= this.graph[i].length )
          {
            l( "neighbor (%s, %s) is outside the grid, not walkable", i, j );
            continue;
          } 
          
          if( i == node.x && j == node.y )
          {
            l( "Current node is not walkable" , i, j );
            continue;
          }
          
          if( this.graph[i][j] )
          {
            l( "Neighbor node (%s, %s) is marked Occupied and not walkable", i, j ); 
            continue;
          }
          
          if( !this.ALLOW_X_MOVE && i != node.x && j != node.y )
          {
            l( "Neighbor node (%s, %s) is diagnal and not walkable", i, j ); 
            continue;
          }
          
          var moveCost = cost + ( i != node.x && j != node.y ) ? this.X_MOVE_COST : this.MOVE_COST;
          l( 'moveCost', moveCost );
          var hCost = h( i, j, endX, endY );
          l( 'Heuristic of neighbord %s', hCost );
          
          if( !isInClosed( i, j ) )
          {
            if( isInOpen( i, j ) )
            {
              /* found a cheaper path to the neighbor than before */
              if( moveCost < graphStatus[ i + '_' + j ].moveCost )
              {
                l( 'Node (%s, %s) was visited, but found new cheaper path', i, j );
                addToOpen( i, j, node.x, node.y, moveCost, hCost );
              }
            }
            else
            {
              /* never visit, queue up the node to examine later */
              l( 'Node (%s, %s) is never visit -- add to open list', i, j );
              addToOpen( i, j, node.x, node.y, moveCost, hCost );
            }
          }
          else
          {
            // in the closed set, ignore.
            l( 'Node (%s, %s) is closed', i, j );
          }
          
        }
      }
     
      if( DEBUG_FLAG-- < 0 ){  
      //  console.log( 'exceed looping limit' );
      //  break ; 
      }
      
      l( '*************************Open List count: %s', open.count() );
    }
    
    return false;
  }
  
  /* combine horizontal and vertical path into begin and enpoint */
  ,simplifyPath: function( path ) { 
    var newPath = [];
    var start = -1, end = -1;
    while( start < path.length - 1 )
    {
      if( path[ start + 1 ] && path[ start ][0] != path[ start + 1 ][0] )
      {
        console.log( 'skipping' );
        console.log( 'nothing matches, add to list ' );
        newPath.push( path[ start++ ] );
        continue;
      } 
      else if( path[ start + 1] && path[ start ][0] == path[ start + 1 ][0] )
      {
        end = start + 1;
        while( path[ end+1 ] && path[ end ][0] == path[end + 1][0] )
        {
          end++;
          console.log( 'advanced to next point %s', end );
        }
        
        if( end - start >= 2 )
        {
          console.log( 'reduceble' );
          console.log( end );
          newPath.push( [ path[ start ][ 0 ], path[ start ][ 1 ] ],  [ path[ end ][ 0 ], path[ end ][ 1 ] ] );
          start = end;
        }
      }

      //else if( start < path.length )
      //{
      //  console.log( 'Nothing match.  Move on %s', start );
      //  newPath.push( path[ start ] );
      //  start++;
      //}
    }
    
    
    return newPath.length > 0 ? newPath : path;
  }

};

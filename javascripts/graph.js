var Graph = Class.create( { 
  initialize: function( graph, options ){
    this.graph = graph;
  }
  
  ,findPath: function( start, end ) {
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
  
} );



/* Shorted List */
Util.SortedList = Class.create( { 
	initialize: function( options ) {
    options = Object.extend( { 
      comparator: function(a,b) { return ( a < b ) ? -1 : ( a == b ) ? 0 : 1; }
		  ,jsonifier: function(a) { return a.toJSON(); }
    }, options || {} );

		this.collection = [];
		this.comparator = options.comparator;
		this.jsonifier  = options.jsonifier;
	}
	
	/* Return a new Sorted list with similar comparator and jsonifier */
	,_clone: function() {
	  return new Util.SortedList( { 
	    comparator: this.comparator
	    ,jsonifier: this.jsonifier
    } );
	}
	
	,push: function( item ) {
		/* return the item and its index */
		if( this.collection.length == 0 ) 
		{
			this.collection.push( item );
			return 0;
		}
		/* special case: last item in the list */
		if( this.comparator( this.collection[ this.collection.length - 1 ], item ) != 1 )
		{ 
			this.collection.push( item );
			return this.collection.length - 1;
		}
		
		/* special case:  first item in the list */
		if( this.comparator( this.collection[0], item ) == 1 ) 
		{
			this.collection.splice( 0, 0, item );
			return 0;
		}
		
		/* searching for the item on the left, then splice the array accordingly */
		var prevIndex = this.getPrevIndex( item );
		this.collection.splice( prevIndex, 0, item );
		
		return prevIndex;
	}
	
	,pop: function() { 
	  if( this.count() == 0 ) return null;
	}
	
	,removeByIndex: function( i ) { 
		if( i > this.count() || i < 0 ) { return null; }
		return this.collection.splice( i, 1 )[0];
	}
	
	,remove: function( caption ) {
		var i = this.indexOf( caption );
		if( i == -1 ) { return null; }
		return this.collection.splice( i, 1 )[0];
	}
	
	,clear: function() { this.collection = []; return this; }
	
	/* Perform a binary search to seek to the greatest smaller item */
	,getPrevIndex: function( item ) {
		var low = 0, high = this.collection.length, mid = 0;
		do {
			mid = Math.floor( ( low + high ) / 2 );
			if( this.comparator( this.collection[ mid ], item ) < 1 )
			{	low = mid + 1; }
			else
			{	high = mid; }
		} while( low < high );
		
		return low--;
	}
	
	,get: function( index ) {
		return this.collection[ index ];
	}

  ,getByKey: function( item ) {
		if( this.comparator( this.collection[ 0 ], item ) == 0 )	{	return this.collection[ 0 ]; }
		else if( this.comparator( this.collection[ this.collection.length - 1 ], item ) == 0 )
		  { return this.collection[ this.collection.length - 1]; }

		var low = 0, high = this.collection.length, mid = 0;
		do {
			mid = Math.floor( ( low + high ) / 2 );
			switch( this.comparator( this.collection[ mid ], item ) )
			{
			  case -1:
			    low = mid + 1;
			    break;
			  case 0:
			    return this.collection[ mid ];
			  case 1:
			    high = mid;
			    break;
		  }
		} while( low < high );

    return null;
  }
  
		
	,indexOf: function( item ) {
		
		for( var i = 0, len = this.collection.length; i < len; ++i )
		{
			if( this.comparator( this.collection[ i ], item ) == 0 )
			{	return i; }
		}
		
		return -1; // not found;
	}

	,each: function( iterator ) {
		for( var i = 0, len = this.collection.length; i < len; ++i ) { 
			if( typeof( temp = iterator( this.collection[i], i ) ) != 'undefined' && !temp )
				break;
		}
	}
	
	/* Select all matching items using a boolean predicate */
	,select: function( predicate ) {
	  if( !predicate ) throw "a predicate is needed";
	  
	  var matches = this._clone();
	  for( var i = 0, len = this.count(); i < len; i++ )
	  {
	    
	    if( predicate( this.get( i ) ) )
	      matches.push( this.get( i ) );
	  }
	  return matches;
	}
	
	,first: function(){ return this.collection[0]; }
	,last: function() { return this.collection[ this.collection.length - 1]; }
	,count: function() { return this.collection.length; }	

	/* Utility Method */
	,toJSON: function() { 
		var json = [];
		for( var i = 0, len = this.collection.length; i < len; ++i )
			json.push( this.jsonifier( this.collection[i] ) );
		return "[" + json.join(",") + "]";
	}

	/* Uncomment this part to run Self-Unittest */
	/*
	,unitTest: function() {
		this.collection = [];
		this.push(5);
		if( this.toString() != "[5]" ) 
			throw "Failed. Expecting [5]";
		
		this.push(3);
		if( this.toString() != "[3,5]" ) 
			throw "Failed: Expecting [3,5]";
	
		this.push(4);
		if( this.toString() != "[3,4,5]" ) 
			throw "Failed: Expecting [3,4,5]";
			
		if( this.indexOf(4) != 1 )
			throw "Failed. Expecting 1";
		
		if( this.indexOf(5) != 2 )
			throw "Failed. Expecting 2";

		if( this.indexOf(3) != 0 )
			throw "Failed. Expecting 0";

		if( this.indexOf(1) != -1 )
			throw "Failed. Expecting -1";
			
		this.push(1);
		if( this.toString() != "[1,3,4,5]" ) 
			throw "Failed: Expecting [1,3,4,5]";
		if( this.indexOf(1) != 0 )
			throw "Failed. Expecting 0";
		
		this.push(8);
		this.push(7);
		if( this.toString() != "[1,3,4,5,7,8]" ) 
			throw "Failed: Expecting [1,3,4,5,7,8]";
		
		// Get and Enumerable  tests
		if ( this.get(0) != 1 )
			throw "Failed: Expecting 1";

		if ( this.get(1) != 3 )
			throw "Failed: Expecting 3";

		if ( this.last() != 8 )
			throw "Failed: Expecting 8";
	
		if ( this.first() != 1 )
			throw "Failed: Expecting 1";

		// Remove
		if( this.remove(8) != 8 || this.count() != 5 )
			throw "Failed: Expecting 8 and items count of 5";
		if( !this.last() == 7 || this.first() != 1 )
			throw "Failed: Expecting 7 and 1";
		if( this.removeByIndex(4) != 7 ) { 
			throw "Failed: Expecting 7, items count of 4, and 5 as the last item";
		}
		this.collection = [];
	} 
	*/
	
	,toString: function() { return "[" + this.collection.join(",") + "]"; }
} );


var PQueu = Class.create({ 
  initialize: function( options ) {
    options = Object.extend( { 
      comparator: function( a, b ) { return a == b ? 0 : a < b ? -1 : 1; }
    } )
    this.q = [];
  }
  
  ,push: function( item ) { 
    
  }
  
  
});

/* Shorted List */
var Util = {};

Util.PQ = Class.create( { 
initialize: function( options ) {
		this.collection = [];
		this.values = [];
	}
	
	,push: function( value, item ) {
		/* return the item and its index */
		if( this.collection.length == 0 ) 
		{
			this.collection.push( item );
			this.values.push( value );
			return;
		}

		/* special case: last item in the list */
		if( this.values[ this.values.length - 1 ] < value )
		{ 
			this.collection.push( item );
			this.values.push( value );
			return;
		}
		
		/* special case:  first item in the list */
		if( this.values[ 0 ] > value ) 
		{
			this.collection.splice( 0, 0, item );
			this.values.splice( 0, 0, value );
			return;
		}
		
		/* searching for the item on the left, then splice the array accordingly */
		var prevIndex = this.getPrevIndex( value );
		this.collection.splice( prevIndex, 0, item );
		this.values.splice( prevIndex, 0, value );
	}
	
	/* Perform a binary search to seek to the greatest smaller item */
	,getPrevIndex: function( value ) {
		var low = 0, high = this.collection.length, mid = 0;
		do {
			mid = Math.floor( ( low + high ) / 2 );
			if(  this.values[ mid ] < value  )
			{	low = mid + 1; }
			else
			{	high = mid; }
		} while( low < high );
		return low--;
	}
		
	,pop: function() { 
	  return this.removeByIndex( 0 );
	}
	
	,removeByIndex: function( i ) { 
		if( i > this.count() || i < 0 ) { return null; }
		return [ this.values.splice( i, 1 )[0], this.collection.splice( i, 1 )[0] ];
	}
  
	,count: function() { return this.collection.length; }	
	
	,clear: function() { this.collection = []; this.values = []; return this; }	
	
} );
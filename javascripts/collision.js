var BoundingShape = { };
BoundingShape.Base = Class.create( { 
	initialize: function( id, options ) { 
		this.id = id;
		
		options = Object.extend( {
			x: 		0
			,y: 	0	
		}, options || {} );
		this.setPos( options.x, options.y );
	}

	,collidesWith: function( shape ) { 
		return false;
	}

	,setX: function( x ) { this.x = x; }
	,setY: function( y ) { this.y = y; }
  ,setPos: function( x, y ) { this.x = x; this.y = y; this.update(); }
  ,update: function() {	}	
} );

BoundingShape.Rectangle = Class.create( BoundingShape.Base, { 
	initialize: function( $super, id, options ) 
	{
		this.w = options.w; // [0,0]
		this.h = options.h; // [0,0]

		this.type = 'rectangle';
		this.isEnabled = true;

		$super( id, options );	
	}
	
	,collidesWith: function( shape ) {
		if( !shape.isEnabled || !this.isEnabled ) return false;

		switch( shape.type )
		{
			case 'rectangle':
				var left1, right1, top1, bottom1, left2, right2, top2, bottom2;
				left1 = this.x;
				right1 = this.x + this.w;
				top1 = this.y;
				bottom1 = this.y + this.h;
				
				left2 = shape.x;
				right2 = shape.x + shape.w;
				top2 = shape.y;
				bottom2 = shape.y + shape.h;		

				if( bottom1 < top2 ) return false;
				if( top1 > bottom2 ) return false;
				if( right1 < left2 ) return false;
				if( left1 > right2 ) return false;

				return true;
				break;
		}
	}

	,update: function($super){ 
		if( window.DEBUG_COLLISION )
		{
			//if( typeof this.isEnabled == 'undefined' )
			
		  var id = this.id + '_bb';
			if( !this.box )
			{
				$('canvas').insert({ bottom: '<div id="'+ id + '" class="bb" style="width:' + this.w +'px;height:'+ this.h +'px;"></div>'} );
				this.box = $( id ); 
			}

			this.box.style.left = this.x + 'px';
			this.box.style.top = this.y + 'px';

			// incase the bb is disabled, only render when needed
			this.isEnabled ? this.box.show() : this.box.hide();
		}
	}
		
} );

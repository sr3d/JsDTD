Event.observe( window, 'load', function() {

  window.paddle = new Paddle('yukyuk');
  
  window.gameScreen = new GameScreen( 'canvas', [ window.paddle
		, new Soot('soot1') 
		, new Soot('soot2')
		, new Soot('soot3')
	] );
  window.gameScreen.paddle = window.paddle;
  window.gameconsole = new Console(window.gameScreen);
  gameconsole.start();
  window.game = new Sprite(); game.id="canvas"; game.node=$("canvas");
} );


var Soot = Class.create( Sprite, { 
  initialize: function( id ) { 
    this.id = id;
    this.node = $(id);
    this.speed = 5;
    this.friction = 0.5;
    this.velocity = 0;
		this.type = 'soot';

    this.x = 0;
    this.y = 100;

    this.setX( this.x );
    this.setY( this.y );
    
		this.bb = new BoundingShape.Rectangle( this.id, {x: this.x, y: this.y, w: 15, h: 15} );

    this.resetCoefficents();
  }
  
  ,resetCoefficents: function() { 
    this.b = 100 * Math.random();
    this.a = Math.random() / 10;
  }
  ,updateBoundingBox: function() { 
		this.bb.setPos( this.x, this.y );
	}	

  ,tick : function() {

    this.x += 2;
		this.setX( this.x );
    
    this.y = this.a * (this.x * this.x ) + this.b; //Math.sqrt( 4 * a * this.x ) + b;
    
    if( this.y > 500 - this.b )
    {
			this.reset();
		}
    this.setY( this.y );

		this.updateBoundingBox();
  }
 
	,reset: function() { 
		this.x = 0;
		this.resetCoefficents();
	}

	,onCollision: function() {
		this.reset();
	}
} );



 
var GameScreen = Class.create( Screen, {
	initialize: function( $super, id, objects ) { 
		$super(id, objects);

		/* push the soot to a list for collisions */
		this.soots = [];
		for( var i = 0; i < objects.length; i++ )
		{
			if( objects[i].type == 'soot' )
				this.soots.push( objects[i] );
		}
		
	}

	,collide: function() { 
//		this.
	}
  
	,keyDown : function (e) {
    switch (e.keyCode) {
    case Event.KEY_LEFT:
        this.paddle.velocity = -this.paddle.speed;
        break;
    case Event.KEY_RIGHT:
        this.paddle.velocity = +this.paddle.speed;
        break;
    case 32:  // space
      this.paddle.chomping();//this.paddle.node.addClassName('open');
      break;
    default:
        console.log('key ' + e.keyCode + ' pressed');
        break;
    }
  },

  keyUp : function(e) {
    switch (e.keyCode) {
    case Event.KEY_LEFT:
        if (paddle.velocity < 0) paddle.velocity = 0;
        break;
    case Event.KEY_RIGHT:
        if (paddle.velocity > 0) paddle.velocity = 0;
        break;
    case 32:  // space
      setTimeout( function(){ 
					this.paddle.noChomping();
      }, 200 );
      break; 
    }
  },
  
  tick : function() {
    var i = this.objects.length;
    while( i-- )
    {
      this.objects[ i ].tick();
    }

		if( this.paddle.isChomping )
		{
			//console.log( 'I\'m chomping' );
			i = this.soots.length;
			while( i-- )
			{
				if( this.paddle.bb.collidesWith( this.soots[i].bb ) )
				{	
					//console.log( 'colliding' );
					this.soots[i].onCollision();
					this.paddle.onCollision();
				}
			}

		}
  }

});  

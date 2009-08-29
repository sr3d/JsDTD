// Paddle ////////////////////////////////////////
var Paddle = Class.create();
Paddle.prototype = Object.extend(new Sprite(), {

  initialize: function(id) {
    this.id = id;
    this.node = $(id);
    this.speed = 10;
    this.friction = 0;
    this.velocity = 0;


		this.bb = new BoundingShape.Rectangle( this.id, { 
			x: this.x
			,y: this.y
			,w: 140 
			,h: 100	
		} );
		this.bb.isEnabled = false;
		
		this.score = 0;
  }
  
	,updateBoundingBox: function() {
		this.bb.setPos( this.getX() + 100, this.getY() + 200 );	
	}

  ,tick: function() {
    if (this.getX() + this.velocity <= -50)
        this.setX( -50 );
    else if (this.getX() + this.velocity + this.getW() >= game.getW() + 20 ) 
        this.setX(game.getW() - this.getW() + 20); 
    else 
        this.moveBy(this.velocity, 0);

		this.updateBoundingBox();
	
	}

	,chomping: function() { 
		this.isChomping = true; 
		//console.log( 'turn on chomping' );
		this.node.addClassName('open');
		this.bb.isEnabled = true;
	}

	,noChomping: function() {
			//console.log( 'turn off chomping' );
			this.node.removeClassName( 'open' );
			this.bb.isEnabled = false;
			this.isChomping = false;
	}

	,onCollision: function() {	
		console.log( this.score++ );
		$('score').innerHTML = this.score;
	}

});

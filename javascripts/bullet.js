var Bullet = { }
var Bullet.Base  = Class.create( Sprite, {
  initialize: function( $super, x, y, grid, options ) {
    this.type       = 'canon';
    this.size       = 2;
    this.bbRadius   = 4;
    
    this.DEFAULT_COOL_TIME = 15;  // 10 ticks between firing
    this.coolTime = 0;
    
    $super( this.type, x, y, grid , options );
  }
  
  ,render: function() { 
    ( this.grid.getTowersContainer() ).insert( { bottom: this.html() } );
    this.node = $(this.id);
  }
  
  ,html: function() { 
    var coords = this.grid.xyToLeftTop( this.x, this.y );
    
    var html  = "<div id='"+ this.id + "' style='left:" + coords[0] + "px;top:" + coords[1] + 
                ";width:"+ JsDTDConfig.cellSize * this.size +   "px; height:" + JsDTDConfig.cellSize * this.size +"px'" + 
                " class='tower canon'></div>";
    return html;
  }
};
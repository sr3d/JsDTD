var Screen = { };
Screen.Base = Class.create( { 
  initialize : function (id, objects) {
    this.id = id;
    this.objects = [];
    
    if( typeof objects == 'Object' )
    {
      for( var i = 0; o < objects.length; i++ )
        this.registerObject( objects[i] );
    }

  }
  
  ,keyDown : function (e) {}
  ,keyUp : function(e) {}
  ,keyPress : function(e) {}
  ,tick : function () {}
  ,registerObject: function( obj ) { this.objects.push( obj ); }
  
} );


Screen.JsDTD = Class.create( Screen.Base, { 
  initialize: function( $super, id, objects ) { 
    $super( id, objects );
  }

  ,tick: function() { 
    //console.log( 'screen ticking...' );
    var i = this.objects.length;
    while( i-- )
    {
      this.objects[ i ].tick();
    }
    
    // TODO: doing path-recalculation
  }

} );
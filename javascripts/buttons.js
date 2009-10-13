var CanonButton = Class.create({
  initialize: function() { 
    this.id             = 'canon_button';
    this.cssClassName   = 'canon';
    this.render();
  }
  
  ,render: function() { 
    $('buttons_wrapper').insert( { bottom: this.html() } );
    
    $( this.id ).observe( 'click', function() { 
      $(this.id).addClassName('tower_select');
      
      /* update overlay */
      $('overlay').style.width  = '40px';
      $('overlay').style.height = '40px';
      
      window.currentTower = Tower.Canon;
      
    }.bind(this) );
    
    /* bind Escape key */
  }
  
  ,onSelect: function() { 
    
  }
  
  ,html: function() { 
    var html = "<div id='" + this.id +"' class='"+ this.cssClassName + "' style='width: 40px; height: 40px;'></div>";
    return html;
  }
  
}); 



Event.observe( window, 'load', function() { 
  $('overlay').setOpacity( 0.8 ); 
  
  $('overlay').observe('click', function() { 
    var pos = window.game.posToGridCoords( 
      parseInt( $('overlay').style.left )
      ,parseInt( $('overlay').style.top )
    );
    
    window.game.addTower( pos[0], pos[1], window.currentTower );
    
  } )
  
  
  $('canvas').observe( 'mouseover', function() { 
    if( window.currentTower )
    {
      var overlay = $('overlay').show();
      
      /* check for availability */
      window._gridStatus = setInterval( function() { 
        //console.log( 'checking grid status' );
        
        if( window.game.checkGridStatus( 
          parseInt(overlay.style.left), 
          parseInt(overlay.style.top), 
          parseInt(overlay.style.left) + overlay.offsetWidth -1, 
          parseInt(overlay.style.top) + overlay.offsetHeight - 1 ) )
          overlay.removeClassName( 'invalid' );
        else
          overlay.addClassName( 'invalid' );
      }, 50 );
      
    }
    else
    {
      $('overlay').hide();
      clearInterval( window._gridStatus );
      window._gridStatus = null;
    }
    
  } ); // canvas.observe


  /* Mouse Out */
  $('canvas').observe( 'mouseout', function() { 
      clearInterval( window._gridStatus );
      window._gridStatus = null;
  } );

  $('canvas').observe( 'mousemove', function( event ) { 
    var e = event || window.event;
     var x = 0, y = 0;
     x = e.clientX - $('canvas').offsetLeft - 10 /* padding */;
     y = e.clientY - $('canvas').offsetTop - 10;

    /* snap */
    x = x - x % 20;
    y = y - y % 20;
    $('overlay').style.left = x + 'px';
    $('overlay').style.top  = y + 'px';
  } );
  
} );
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
  $('canvas').observe( 'mouseover', function() { 
    if( window.currentTower )
    {
      $('overlay').show();
    }
    else
    {
      $('overlay').hide();
    }
    
  } ); // canvas.observe


  /* Mouse Out */
  $('canvas').observe( 'mouseout', function() { 
    $('overlay').hide();
  } );

  $('canvas').observe( 'mousemove', function( event ) { 
    var e = event || window.event;
     var x = 0,y = 0;
     x = e.clientX - $('canvas').offsetLeft - 10;
     y = e.clientY - $('canvas').offsetTop - 10;

    $('overlay').style.left = x + 'px';
    $('overlay').style.top  = y + 'px';
    
  } );
  
} );
/* Template: Portfolio
   Author: Usman
   Created: 6 March 2020
   Description: Custom JS file
*/

(function($) {
    "use strict";
	/* Wow animations */
	var preloaderFadeOutTime = 100;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		
	var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
		offset: 0,
        mobile: false,
        live: true
    });
	
    var $dimg = [];;	
	$('.load-img').each( function( index ) {
		
		console.log( index + ": " + $( this ).text() );
		$dimg.push(this); 
		$(this).detach();
		
		});
	console.log($dimg);
	
	
	hidePreloader();
	wow.init();
	$(window).on('load', function() {
		
		
		$('.img-back').each( function( index ) {
			$(this).append( $dimg[index] );
			console.log($dimg[index]);
			
		});
		
	});
	
	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 20) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    

    

    /* Filter - Isotope */
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'fitRows',
		fitRows: {
    gutter: 2
  }
    });
    
    // filter items on button click
    $('.filters-button-group').on( 'click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
		
    });
    
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
			
        });	
    });
    

    


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


    /* Call Me Form */
    $("#callMeForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            lformError();
            lsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            lsubmitForm();
        }
    });

    function lsubmitForm() {
        // initiate variables with form content
		var name = $("#lname").val();
		var email = $("#lemail").val();
		var service = $("#lselect").val();
		var budget = $("#l2select").val();
		var message = $("#lmessage").val();
		var alertmessage = "Thanks " + name + ".  I recieved your details and will get back to you soon!";
	        lformSuccess(alertmessage);
	    $.ajax({
            type: "POST",
            url: "https://formspree.io/xnqzjlrw",
	    dataType: "json",
            data: "name=" + name + "&email=" + email + "&service=" + service + "&budget=" + budget + "&message=" + message, 
            success: function() {
                lformSuccess(alertmessage);
            }
        });
	}

    function lformSuccess(alertmessage) {
        $("#callMeForm")[0].reset();
        lsubmitMSG(true, alertmessage);
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function lformError() {
        $("#callMeForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function lsubmitMSG(valid, msg) {
        if (valid) {
			var alertBox = '<div id ="custom-alert-usman" class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + msg + '</div>';
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#lmsgSubmit").removeClass().html(alertBox);
    }
	
	
	

   
/* ==== 4) Make header section height of viewport / Minimum height is set to 445px in style.css ==== */

	
		$('.header').css({'height':($(window).height())+'px'});
		$(window).resize(function(){
		$('.header').css({'height':($(window).height())+'px'});
		});
	
	
	
		



	/* disable styling on support plan popup */
	
	$("#maintenance").on('shown.bs.modal', function(){
				$("nav").removeAttr("style");	
});
$("#maintenance").on('show.bs.modal', function(){
				
				
				$("#maintenance").fadeIn(200,"linear");

});
/* disable styling and img scrolling effect on projects popup */

$(".projects-modal-popup").on('shown.bs.modal', function(){
				$("nav").removeAttr("style");
				if ($(window).width() >= 768  )
				{
				
  var modal = $(this).find('.img-container .img-fluid').height();
  modal -= 500;
  var pos = $(this).find('.img-container .img-fluid');
  loop();
  function loop() {
  $(pos).animate({
    marginTop: -modal,
  }, 15000, "linear", function() {
	  $(this).animate({ "margin-top": "0" }, 10000 );
	  loop();
    
  });

  }
				}
});

/* disable styling on privacy policy popup */
$("#privacy-policy").on('shown.bs.modal', function(){
				$("nav").removeAttr("style");
				

});
$("#privacy-policy").on('show.bs.modal', function(){
				
				
				$("#privacy-policy").fadeIn(350,"linear");

});



       /* show/hide on support plan select */
	   
	$('select[name="lselect"]').on('change',function(){
		var selectedVal=$(this).val();
		switch(selectedVal){
       case 'Rise':case 'Shine':case 'Grow':
       //Add this into consideration if you have multiple cases where functionality has to be same
                   $('#l2select').fadeOut( "1000" );
             break;
       default: //change this according to your need
                   $('#l2select').fadeIn( "1000" );
             break;
   }
	});
	/* capture support plan button click */
	
	$('#maintenance .modal-body .btn-solid-lg').on('click', function(event) {
  var $button = $(event.target);

  $(this).closest('.modal').one('hidden.bs.modal', function() {
    
	switch($button[0].id){
       case 'Rise':case 'Shine':case 'Grow':
       //Add this into consideration if you have multiple cases where functionality has to be same
	   $('#lselect').val($button[0].id);
	   $("#lname").focus();
	   // jQuery for page scrolling feature - requires jQuery Easing plugin
	$('html, body').animate({
        scrollTop: $(".hire-section").offset().top
    }, 500);
                   $('#l2select').fadeOut( "1000" );
				   
             break;
       default: //change this according to your need
                   $('#l2select').fadeIn( "1000" );
             break;
   }
  });
});

  	
	
	
    

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll sprite-image">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

// Pen JS Starts Here
jQuery(document).ready(function(){

  // SVG 
  var snapC = Snap("#svgC"); 

  // SVG C - "Squiggly" Path
  var myPathC = snapC.path("M62.9 14.9c-25-7.74-56.6 4.8-60.4 24.3-3.73 19.6 21.6 35 39.6 37.6 42.8 6.2 72.9-53.4 116-58.9 65-18.2 191 101 215 28.8 5-16.7-7-49.1-34-44-34 11.5-31 46.5-14 69.3 9.38 12.6 24.2 20.6 39.8 22.9 91.4 9.05 102-98.9 176-86.7 18.8 3.81 33 17.3 36.7 34.6 2.01 10.2.124 21.1-5.18 30.1").attr({
    id: "squiggle",
    fill: "none",
    strokeWidth: "1",
    stroke: "rgba(117,78,249,0.6)",
    strokeMiterLimit: "10",
    strokeDasharray: "5 10",
    strokeDashOffset: "180"
  });

  // SVG C - Triangle (As Polyline)
  var Triangle = snapC.polyline("0, 30, 15, 0, 30, 30");
  Triangle.attr({
    id: "plane",
    fill: "rgba(117,78,249,0.3)"
  }); 
  
  initTriangle();
  
  // Initialize Triangle on Path
  function initTriangle(){
    var triangleGroup = snapC.g( Triangle ); // Group polyline 
    movePoint = myPathC.getPointAtLength(length);
    triangleGroup.transform( 't' + parseInt(movePoint.x - 15) + ',' + parseInt( movePoint.y - 15) + 'r' + (movePoint.alpha - 90));
  }
  
  // SVG C - Draw Path
  var lenC = myPathC.getTotalLength();

  // SVG C - Animate Path
  function animateSVG() {
    
    myPathC.attr({
      stroke: 'rgba(117,78,249,0.3)',
      strokeWidth: 1,
      fill: 'none',
      // Draw Path
      "stroke-dasharray": "5 10",
      "stroke-dashoffset": "180"
    }).animate({"stroke-dashoffset": 10}, 2500,mina.easeinout);
    
    var triangleGroup = snapC.g( Triangle ); // Group polyline

    setTimeout( function() {
      Snap.animate(0, lenC, function( value ) {
   
        movePoint = myPathC.getPointAtLength( value );
      
        triangleGroup.transform( 't' + parseInt(movePoint.x - 15) + ',' + parseInt( movePoint.y - 15) + 'r' + (movePoint.alpha - 90));
    
      }, 2500,mina.easeinout, function(){
      });
    });
    
  } 
  
  
  // Animate Button
  function kapow(){
    $(window).on('scroll', function (){       
      // Run SVG
      animateSVG();      
    });
  }

  kapow();

});


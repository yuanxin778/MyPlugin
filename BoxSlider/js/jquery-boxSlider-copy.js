(function($){
   $.fn.boxSlider = function(method){
       var methods = {
       	   init : function(options){
       	   	   return this.each(function(){
       	   	   	   _init(this, options);
       	   	   })
       	   }
       };

       var defaults = {
            align : "",
            speed : 1,
            orientation: false,
            added: function(){},
			destroyed: function(){},
       };

        var plugin_settings;
	    var plugin_element;
	    var seta_up;
	    var seta_down;
	    var seta_left;
	    var seta_right;
	    var sliderContent;
		var sliderMove;
		var interval;
		var movePosition = "";
		var speed;
		var orientation;
		var align;

		// Method calling logic
		if ( methods[method] )
		{
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		}
		else if ( typeof method === 'object' || ! method )
		{
			return methods.init.apply( this, arguments );
		}
		else
		{
			$.error( 'Method ' +  method + ' does not exist on jQuery.plugin' );
		}

		function _init($this,options){
           plugin_element = $this;
           plugin_settings = $.extend(defaults,options);
           _initialize($this); 
		}

	    function _initialize(){
	    	plugin_settings.added.call();
	    	speed = plugin_settings.speed;
	    	orientation = plugin_settings.orientation;
	    	sliderContent = $(".box-slider-content");
	    	sliderMove = $(".box-slider-move");
	    	align = plugin_settings.align;

	    	if(orientation == 'horizontal'){
                 _moveHorizontal();
	    	}
	    	if(orientation == 'vertical'){
	    		 _moveVertical();
	    	}
	    	changeSizeContainer (); 
	    } 

	    function _moveHorizontal(){
	    	seta_left = $(".box-slider-seta-left");
	    	seta_right = $(".box-slider-seta-right");

	    	seta_left.mouseover(function(){
	    		changeSizeContainer ();
				movePosition = "left";
				interval = window.setInterval(moveWrapperHorizontal,0);
				return false;
	    	})
	    	seta_right.mouseover(function(){
				changeSizeContainer ();
				movePosition = "right";
				interval = window.setInterval(moveWrapperHorizontal,0);
				return false;
			});
			seta_left.mouseout(function(){
				speed = plugin_settings.speed;
				clearInterval(interval);
			});
			seta_right.mouseout(function(){
				speed = plugin_settings.speed;
				clearInterval(interval);
			});

			seta_left.click(function(){
				speed += .4;
				return false; 
			});
			seta_right.click(function(){
				speed += .4;
				return false; 
			});
	    }

	    function moveWrapperHorizontal(){
	    	var _wid = sliderMove.width();
	    	var _pos_atual = getSizeItem(sliderMove,"left");
	    	var _posCheck = _wid - sliderContent.width();
	    	if(!_pos_atual){
               _pos_atual = 0;
	    	}
	    	if(movePosition == "left"){
                if(_pos_atual<0){
                   sliderMove.css("left",(_pos_atual+speed)+"px");
                }else{
                   sliderMove.css("left","0px"); 
                }
	    	}
	    	if(movePosition == "right"){
                if(_pos_atual>-_posCheck){
                   sliderMove.css("left",(_pos_atual-speed)+"px");
                }else{
                   sliderMove.css("left",-_posCheck+"px"); 
                }
	    	}
	    }

	    function _moveVertical (){
	    	 seta_up = $(".box-slider-seta-up");
	         seta_down = $(".box-slider-seta-down");
	         seta_down.mouseover(function(){
	         	changeSizeContainer ();
				movePosition = "down";
				interval = window.setInterval(moveWrapperVertical,0);
				return false;
	         });
	         seta_up.mouseover(function(){
	         	changeSizeContainer ();
				movePosition = "up";
				interval = window.setInterval(moveWrapperVertical,0);
				return false;
	         });
	         seta_up.mouseout(function(){
				speed = plugin_settings.speed;
				clearInterval(interval);
				//return false;
			});

			seta_down.mouseout(function(){
				speed = plugin_settings.speed;
				clearInterval(interval);
				//return false;
			});

			seta_down.click(function(){
				speed += .4;
				return false;
			});

			seta_up.click(function(){
				speed += .4;
				return false;
			});
	    }

	    function moveWrapperVertical(){
	    	var _height = sliderMove.height();

			var _pos_atual = getSizeItem(sliderMove,"top");
			var _posCheck = _height-sliderContent.height();

			if(!_pos_atual){
               _pos_atual = 0; 
			}

			if(movePosition == "down"){
               if(_pos_atual>-_posCheck){
                  sliderMove.css("top",(_pos_atual-speed)+"px");
               }else{
                  sliderMove.css("top",-_posCheck+"px");
               }
			}

			if(movePosition == "up"){
				if(_pos_atual < 0){
                   sliderMove.css("top",(_pos_atual+speed)+"px");
				}else{
                   sliderMove.css("top",0); 
				}

			}
	    }

	    function changeSizeContainer(){
	    	if(orientation == "vertical"){
               if(sliderMove.height() <= sliderContent.height()){
                   seta_up.hide();
				   seta_down.hide();
               }else{
                   seta_up.show();
				   seta_down.show();
               }
	    	}
	    	if(orientation == "horizontal"){
	    		var _widthGeral = 0;
	    		$(".item").each(function(){
	    			_widthGeral += $(this).outerWidth(true);
	    		});
	    		sliderMove.width(_widthGeral);
	    		if( sliderMove.width() <= sliderContent.width() ){
                    seta_left.hide();
					seta_right.hide();
					if(align == "left"){
					   sliderContent.css({marginLeft:0, left:0});
					}
					if(align == "center"){
                       sliderContent.css({marginLeft:0, left:0, width:"100%"});
                       var _pos = (sliderContent.width() - sliderMove.width())/2;
                       sliderMove.css({marginLeft:_pos+"px"});
					}
	    		}else{
                    seta_left.show();
					seta_right.show();
	    		}
	    	}
	    }

	    function getSizeItem(_obj,_css){
	    	if(_obj.size() > 0){
                var _regExp = new RegExp("[a-z][A-Z]","g");
                return parseFloat(_obj.css(_css).replace(_regExp, ""));
	    	}
	    }
   }
})(jQuery);
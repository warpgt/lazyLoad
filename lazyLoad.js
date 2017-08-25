/**
 * Plugin do uruchamiania akcji dopiero gdy element jest widoczny na ekranie dla urzytkownika
 *
 * @example
 $(document).ready(function(){
	
	$( window ).scroll(function() {
	  $('.lazyL').lazyLoad();
	});
	
	$( window ).resize(function() {
	  $('.lazyL').lazyLoad();
	});
});

...
function loadingCB($element){
console.log('loading...',$element.attr('class'));
}
function loadedCB($element){
console.log('loaded',$element.attr('class'));
}
function skippedCB($element){
console.log('skipped',$element.attr('class'));
}
$('#lazyL').lazyLoad({
    timeout: 5000,
    loadingCB: loadingCB,
    loadedCB: loadedCB,
    skippedCB: skippedCB
});
...
 * 
 * @author WA
 */
(function ( $ ) {

    /**
     * Timer collection for every element
     * @type {{}}
     */
	var t = {};

    /**
    * Action to override when user is looking at element
    * @param $element Each element pointed at jquery selector
    */
	function _loadingCB($element)
	{
		$element.html("loading...");
	}

    /**
    * Action to override when user look at element for $timeout period of time
    * @param $element Each element pointed at jquery selector
    */
	function _loadedCB($element)
	{
		$element.html("loaded");
	}

    /**
    * Action to override when user leave element
    * @param $element Each element pointed at jquery selector
    */
	function _skippedCB($element)
	{
		$element.html("skipped!");
	}

    /**
     * Is element visible for user
     *
     * @param windowTop window top
     * @param windowBottom window bottom
     * @param objectTop element top
     * @param objectBottom element bottom
     * @returns {boolean}
     */
    function isElementSeen(windowTop,windowBottom,objectTop,objectBottom)
    {
        return ((windowTop<=objectTop && windowBottom >= objectBottom)
            || (windowTop>=objectTop && windowBottom >= objectBottom && windowTop <= objectBottom)
            || (windowTop<=objectTop && windowBottom <= objectBottom && windowBottom >= objectTop));
    }

    /**
     * Get unique id
     * @param int i
     */
     var getUid = function (i)
     {
        return function () { 
            return 'lazyId-' + (++i); 
        };
         
    }(0);

	$.fn.lazyLoad = function(options) {

        var settings = $.extend({
            timeout: 2000,
			loadingCB: _loadingCB,
			loadedCB: _loadedCB,
			skippedCB: _skippedCB
        }, options );

		return this.each(function(){
            
            if($(this).data("lazyId") == undefined){
                $(this).data("lazyId",getUid());
            }
            
			var windowTop = $(window).scrollTop();
			var windowBottom = windowTop + $(window).outerHeight();
			var objectTop = $(this).offset().top;
			var objectBottom = objectTop + $(this).height();
			
			var lazyId = $(this).data("lazyId");

			if($(this).data("lazyLoaded") == true){
				return;
			}

			if(
                isElementSeen(windowTop,windowBottom,objectTop,objectBottom)
			){
				var that = $(this);
				
				clearTimeout(t[lazyId]);
				
				settings.loadingCB(that);
				
				t[lazyId] = setTimeout(function(){
					
					that.data("lazyLoaded",true);
					settings.loadedCB(that);
					
				},settings.timeout);

			}else{
				clearTimeout(t[lazyId]);
				$(this).data("lazyLoaded",false);
				settings.skippedCB($(this));
			}
		});
	};
}( jQuery ));
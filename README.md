# lazyLoad
jQuery plugin for performing actions on dom elements when user look at them for a period of time

@Examples

Simple
```javascript
$(document).ready(function(){
	
	$( window ).scroll(function() {
	  $('.lazyL').lazyLoad();
	});
	
	$( window ).resize(function() {
	  $('.lazyL').lazyLoad();
	});
});
```
With overrided actions and extended default look at time
```javascript
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
```

(function( $ ) {
	var methods = {
		init: function( options ) {

		}, 
		add: function( options ) {
			
		}
	}
	$.fn.jsonShedule = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.jsonShedule' );
		} 
	}
})(jQuery);
Number.prototype.zeroPad = function(length) {
   length = length || 2; // defaults to 2 if no parameter is passed
   return (new Array(length).join('0')+this).slice(length*-1);
};
(function( $ ) {
	var days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
	var methods = {
		init: function( options ) {
			var $table = $( '<table />' );
			for(j = 7; j < 24; j++) {
				$tr = $('<tr />')
				if(j == 7) {
					$tr.append( $('<td />') );
				} else {
					$tr.append("<td>" + j.zeroPad() + ":00</td>");
				}
				for(var i = 0; i < days.length; i++) {
					if(j != 7) {
						$tr.append( $('<td contenteditable="true" />') );
					} else {
						$tr.append( "<td>" + days[i] + "</td>" );
					}
				}
				$table.append( $tr) ;
			} 
			this.append( '<a href="#">Добавить событие</a>' );
			this.append( $table );
		}, 
		add: function( options ) {
			
		}
	};
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
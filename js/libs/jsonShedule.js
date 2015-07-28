Number.prototype.zeroPad = function(length) {
   length = length || 2; // defaults to 2 if no parameter is passed
   return (new Array(length).join('0')+this).slice(length*-1);
};
(function( $ ) {
	var days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
	var classes = ['mo', 'tu', 'we', 'th', 'fr', 'sat', 'san'];
	var methods = {
		init: function( options ) {
			options = $.extend({
				json: ""
			}, options);
			var data = $.parseJSON(options.json);
			var time_min = 24, time_max = 0;
			$.each(data, function( index, value ) {
				$.each(value, function( i, v ) {
					if(i < time_min) time_min = i;
					if(i > time_max) time_max = i;
				});
			});
			time_min = parseInt(time_min);
			time_max = parseInt(time_max);
			var $table = $( '<table />' );
			for(j = time_min-1; j <= time_max; j++) {
				$tr = $('<tr class="' + (j == time_min-1 ? '' : j)  + 'time" />')
				if(j == time_min-1) {
					$tr.append( $('<td />') );
				} else {
					$tr.append("<td>" + j.zeroPad() + ":00</td>");
				}
				for(var i = 0; i < days.length; i++) {
					if(j != time_min-1) {
						$tr.append( $('<td class="' + classes[i] + '" />') );
					} else {
						$tr.append( "<td>" + days[i] + "</td>" );
					}
				}
				$table.append( $tr ) ;
			} 
			$.each(data, function( index, value ) {
				$.each(value, function( i, v ) {
					$.each(v, function( _i, _v ) {
						$($table).jsonShedule( "add", {name: _v.name, start: _v.start, duration: _v.duration, timec: i, dayw: index} );
					});
				});
			});
			this.before( '<a href="#" id="event_add">Добавить событие</a>' );
			this.append( $table );
		}, 
		add: function( options ) {
			options = $.extend({
				name: "Без имени",
				start: "08:00",
				duration: "60",
				timec: "8",
				dayw: "mo"
			}, options);

			var $div = $('<div class="event" />').append('<div class="time">' + options.start + '</div>').append('<div class="name">' + options.name + '</div>').append('<div class="duration">' + options.duration + '</div>');
			$(this).find('tr.' + options.timec + 'time > td.' + options.dayw).append($div);
		},
		parse: function( options ) {

		}
	};
	$.fn.jsonShedule = function( method ) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Метод с именем ' +  method + ' не существует для jQuery.jsonShedule' );
		} 
	}
})(jQuery);
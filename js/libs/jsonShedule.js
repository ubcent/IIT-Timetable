Number.prototype.zeroPad = function(length) {
   length = length || 2; // defaults to 2 if no parameter is passed
   return (new Array(length).join('0')+this).slice(length*-1);
};
(function( $ ) {
	var template, partial;
	var methods = {
		init: function( options ) {
			options = $.extend({
				json: "",
				template_path: "views/table.mustache",
				partial_template_path: "views/event.mustache",
				time_range: [8, 12]
			}, options);
			var _this = this;
			var events = $.parseJSON(options.json);

			events.sort(function(a, b) {
				var m1 = a.time.split(':', 2), m2 = b.time.split(':', 2);
				m1 = parseInt(m1[0]) * 60 + parseInt(m1[1]);
				m2 = parseInt(m2[0]) * 60 + parseInt(m2[1]);
				if(m1 < m2) return -1;
				if(m1 > m2) return 1;
				return 0;
			});

			$.get(options.template_path, function(_template) {
				template = _template;
				$.get(options.partial_template_path, function(_partial) {
					partial = _partial;
					var rendered = Mustache.render(template, {events: events}, {event: partial});
					$(_this).append( rendered );
				});
			});
		}, 
		add: function( options ) {
			options = $.extend({
				timec: "08:00",
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
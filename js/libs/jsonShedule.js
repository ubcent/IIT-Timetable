Number.prototype.zeroPad = function(length) {
   length = length || 2; // defaults to 2 if no parameter is passed
   return (new Array(length).join('0')+this).slice(length*-1);
};
(function( $ ) {
	var methods = {
		init: function( options ) {
			options = $.extend({
				json: "[]",
				template_path: "views/table.mustache",
				partial_template_path: "views/event.mustache",
				time_range: [8, 12]
			}, options);
			var _this = this;
			var events = $.parseJSON(options.json);

			if($.trim(options.json) == "") options.json = "[]";

			events.sort(function(a, b) {
				var m1 = a.time.split(':', 2), m2 = b.time.split(':', 2);
				m1 = parseInt(m1[0]) * 60 + parseInt(m1[1]);
				m2 = parseInt(m2[0]) * 60 + parseInt(m2[1]);
				if(m1 < m2) return -1;
				if(m1 > m2) return 1;
				return 0;
			});

			$.get(options.template_path, function( template ) {
				$.get(options.partial_template_path, function( partial ) {
					$(_this).append( Mustache.render( template, {events: events}, {event: partial} ) );
				});
			});
		}, 
		add: function( options ) {
			options = $.extend({
				tsec: "08:00",
				dayw: "mo",
				partial_template_path: "views/event.mustache",
				template_path: "views/timeline.mustache"
			}, options);
			var _this = this;
			$.get(options.partial_template_path, function( partial ) {
				if($(_this).find('[data-propname="time"]').length < 1) {
					$.get(options.template_path, function( template ) {
						options[options.dayw] = options;
						$(_this).find('[data-root="true"]').append(Mustache.render(template, options, {event: partial}));
					});
				} else if($(_this).find('[data-time="' + options.tsec + '"]').length == 0) {
					dif = 10;
					this_time = parseInt(options.tsec.split(':')[0]);
					$.each($(_this).find('[data-propname="time"]'), function( index, value ) {
						_dif = parseInt($(value).attr('data-time').split(':')[0]) - this_time;
						if(Math.abs(_dif) < Math.abs(dif)) dif = _dif;
					});
					$.get(options.template_path, function( template ) {
						options[options.dayw] = options;
						if(dif < 0) {
							$(_this).find('[data-time="' + (this_time + dif).zeroPad() + ':00"]').after(Mustache.render(template, options, {event: partial}));
						} else {
							$(_this).find('[data-time="' + (this_time + dif).zeroPad() + ':00"]').before(Mustache.render(template, options, {event: partial}))
						}
					});
				} else {

				}
				//$(_this).find('tr[data-time="' + options.tsec + '"] > td.' + options.dayw).append( Mustache.render(partial, options) );
				//console.log(Mustache.render(partial, options));
			});
		},
		parse: function( options ) {
			options = $.extend({
			}, options);
			var events = [];
			$.each($('.timetable [data-propname="time"]'), function( index, value ) {
				timeline = {};
				timeline["time"] = $(value).attr('data-time');
				$.each($(value).children('[data-parent="true"]'), function( i, v ) {
					timeline[$(v).attr('data-propname')] = [];
					$.each($(v).find('[data-parent="true"]'), function( _i, _v) {
						props = {};
						$.each($(_v).find('[data-save="true"]'), function( _index, _value ) {
							props[$(_value).attr('data-propname')] = $(_value).text();
						});
						timeline[$(v).attr('data-propname')].push(props);
					});
				});
				events.push(timeline);
			});
			return JSON.stringify(events);
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
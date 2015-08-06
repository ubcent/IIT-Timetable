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
				multi: false
			}, options);
			var _this = this;
			if($.trim(options.json) == "") options.json = "[]";
			var events = $.parseJSON(options.json);
			if(options.multi) {
				/* TODO: Sorting */
				var buf = [];
				$.get(options.template_path, function( template ) {
					$.get(options.partial_template_path, function( partial ) {
						async.forEachOf(events, function( value, index, callback ) {
							buf.push({"index": index, "name": value[value.length - 1].basename});
							$(_this).append( Mustache.render( template, {events: value}, {event: partial} ) );
							callback();
						}, function( err ) {
							if( err ) console.error( err.message );

							$.get("views/menu.mustache", function( template ) {
								$(_this).prepend( Mustache.render(template, {li: buf}) );
								$(_this).trigger('jsonShedule.ready');
							});	
						});
					});
				});
			} else {
				/* TODO: Sorting */
				$.get(options.template_path, function( template ) {
					$.get(options.partial_template_path, function( partial ) {
						$(_this).append( Mustache.render( template, {events: events}, {event: partial} ) );
						$(_this).trigger('jsonShedule.ready');
					});
				});	
			}
			return this;
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
						$(_this).trigger('jsonShedule.change');
					});
				} else if($(_this).find('[data-time="' + options.tsec + '"]').length == 0) {
					dif = 24;
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
						$(_this).trigger('jsonShedule.change');
					});
				} else {
					$(_this).find('[data-time="' + options.tsec + '"] [data-propname="' + options.dayw + '"]').append( Mustache.render(partial, options) );
					$(_this).trigger('jsonShedule.change');
				}
			});
		},
		change: function( options ) {
			options = $.extend({

			}, options);
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
$(function() {
	$('.timetable').jsonShedule({json: $("#json").text()});
	$('.timetable').jsonShedule('add', {name: "Что-то новое", tsec: "08:00", dayw: "th", start: "08:00", duration: "45"});
});
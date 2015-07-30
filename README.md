# jQuery.jsonShedule
An simple jQuery plugin that generates timetables from json string

## Requirements
* jQuery
* Mustache

## Usage
To get started, download the plugin, unzip it and copy files to your website/application directory. Load files in the section of your HTML document. Make sure you also add the jQuery and Mustache.js libraries.
```html
<head>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.1.3/mustache.min.js"></script>
    <link rel="stylesheet" href="/css/jquery.jsonShedule.css" type="text/css" media="screen" />
    <script type="text/javascript" src="/js/jquery.jsonShedule.min.js"></script>
</head>
```
Initialise the script like this:
```javascript
<script>
	$(function() {
		$('.timetable').jsonShedule();
	});
</script>
```
May also be passed an optional options object which will extend the default values. Example:
```javascript
<script>
	$(function() {
		var json_string = $('#json_input').val();
		$('.timetable').jsonShedule({
			json: json_string
		});
	});
</script>
```
# Advanced
## Options

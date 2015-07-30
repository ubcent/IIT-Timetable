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
```html
<script>
	$(function() {
		$('.timetable').jsonShedule();
	});
</script>
```
May also be passed an optional options object which will extend the default values. Example:
```html
<script>
	$(function() {
		var json_string = $('#json_input').val();
		$('.timetable').jsonShedule({
			json: json_string
		});
	});
</script>
```
Json format example:
```json
[
  {
    "time": "08:00",
    "mo": [
      {
        "start" : "8:00",
        "duration" : "45",
        "program_id" : "1235"
      },
      {
        "start" : "8:30",
        "duration" : "30",
        "program_id" : "645"
      }
    ],
    "tu": [
      {
        "start" : "8:00",
        "duration" : "45",
        "program_id" : "1235"
      },
      {
        "start" : "8:30",
        "duration" : "30",
        "program_id" : "645"
      }
    ]

  },
  {
    "time": "09:00",
    "mo": [
      {
        "start" : "9:00",
        "duration" : "45",
        "program_id" : "1235"
      },
      {
        "start" : "9:30",
        "duration" : "30",
        "program_id" : "645"
      }
    ],
    "tu": [
      {
        "start" : "8:00",
        "duration" : "45",
        "program_id" : "1235"
      },
      {
        "start" : "8:30",
        "duration" : "30",
        "program_id" : "645"
      }
    ]

  }
]
```
## Advanced
### Options
Options provide a simple mechanism to extend/change view and behavior of timetable. Example:
```html
<script>
	$(function() {
		// Set source of a timetable
		var json_string = $('#json_input').val();
		$('.timetable').jsonShedule({
			json: json_string
		});

		// Set single event mustache partial template. Default - views/event.mustache
		$('.timetable').jsonShedule({
			partial_template_path: "views/event.mustache"
		});

		// Set table mustache template. Default - views/table.mustache
		$('.timetable').jsonShedule({
			template_path: "views/table.mustache"
		});
	});
</script>
```
## Bug tracker
Have a bug? Please create an issue on GitHub at https://github.com/ubcent/gym-timetable/issues
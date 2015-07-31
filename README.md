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
JSON format example:
```json
[
  {
    "time": "08:00",
    "mo": [
      {
      	"name" : "Event 1",
        "start" : "8:00",
        "duration" : "45"
      },
      {
      	"name" : "Event 2",
        "start" : "8:30",
        "duration" : "30"
      }
    ],
    "tu": [
      {
      	"name" : "Event 3",
        "start" : "8:00",
        "duration" : "45"
      },
      {
      	"name" : "Event 4",
        "start" : "8:30",
        "duration" : "30"
      }
    ]

  },
  {
    "time": "09:00",
    "mo": [
      {
      	"name" : "Event 5",
        "start" : "9:00",
        "duration" : "45"
      },
      {
      	"name" : "Event 6",
        "start" : "9:30",
        "duration" : "30"
      }
    ],
    "tu": [
      {
      	"name" : "Event 7",
        "start" : "8:00",
        "duration" : "45"
      },
      {
      	"name" : "Event 8",
        "start" : "8:30",
        "duration" : "30"
      }
    ]

  }
]
```
Day of week keys: mo, tu, we, th, fr, sat, san
## Advanced
### Options
Options provide a simple mechanism to extend/change view and behavior of timetable. Example:
```html
<script>
	$(function() {
		// Initialization with source of a timetable
		var json_string = $('#json_input').val();
		$('.timetable').jsonShedule({
			json: json_string
		});

		// Initialization with single event mustache partial template. Default - views/event.mustache
		$('.timetable').jsonShedule({
			partial_template_path: "views/event.mustache"
		});

		// Initialization with table mustache template. Default - views/table.mustache
		$('.timetable').jsonShedule({
			template_path: "views/table.mustache"
		});
	});
</script>
```
### Methods
Methods provide a simple mechanism to add and parse timetable. Example:
```html
<script>
	$('.timetable').jsonShedule('add', {
		// Time section
		tsec: "08:00",
		// Day of week
		dayw: "mo",
		// Table row mustache template - optional
		partial_template_path: "views/event.mustache",
		// Full table mustache template - optional
		template_path: "views/timeline.mustache"
	});

	// Returns table view in JSON format
	var json_string = $('.timetable').jsonShedule('parse');
</script>
```
## Todo
* Time formats
* Plugin events
* Remove method
* Row sparseness option

## Bug tracker
Have a bug? Please create an issue on GitHub at https://github.com/ubcent/gym-timetable/issues
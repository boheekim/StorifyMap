//everything I need to embed the map

var map = L.map('map').setView([39.82, -98.57], 3);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'boheekim.me86mog9',
    accessToken: 'pk.eyJ1IjoiYm9oZWVraW0iLCJhIjoiODUyZjcwODg1NjNlZDBmNTE0MTk4NjQzMTZjMmM4MjQifQ.ZofTNlOmfgxqHDsZk5zo2w'
}).addTo(map);


//popup attached to markers
// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

//get the story

var url = 'https://api.storify.com/v1/stories/boheekim/jeb-bush?meta=true';

var url2 = 'https://api.storify.com/v1/stories/boheekim/hillary-clinton?meta=true';

var panel1 = '#2b';

var panel2 = '#3b';

var title1 = '#first'

var title2 = '#second'

var redMarker = L.icon({
    iconUrl: 'redmarker.png',
    iconRetinaUrl: 'redmarkerretina.png',
    iconSize: [17, 25],
    iconAnchor: [6, 19],
    popupAnchor: [-3, -76],
});

var blueMarker = L.icon({
    iconUrl: 'bluemarker.png',
    iconRetinaUrl: 'bluemarkerretina.png',
    iconSize: [17, 25],
    iconAnchor: [6, 19],
    popupAnchor: [-3, -76],
});



			
//get the elements for a story and put in console
var geoLocated = function(url, icon, panel, title) {
	$.ajax({
		url: url,
		data: {
			api_key: '5579fdde8351d909067a7867'
	    },
		type: 'GET',
		dataType: 'json',
		success: function(res) { 
			console.log("Success", res.content.elements); 
			$(title).html(res.content.title);
			//$('#story').append(res.content.title);

			//show story on the side
			var markerList = [];
			var activeMarker = null;
			for (var i = 0; i < res.content.elements.length; i++) {
			    (function (j) {
			        var permalink = res.content.elements[j].permalink;
					var tweetLink = $('<a></a>').attr('href', permalink);
					var tweetDisplay = $('<blockquote></blockquote>')
										.addClass('twitter-tweet')
										.html(tweetLink);
					var anchorLink = $('<a></a>').attr('name', res.content.elements[j].eid);
					var elementDiv = $('<div></div>').append(anchorLink).append(tweetDisplay);

					$(panel).append(elementDiv);

					var coordinates = res.content.elements[i].meta.geo.coordinates;
					//to add markers
					var marker = L.marker(coordinates, {icon: icon}).addTo(map);
					twttr.widgets.load();
					markerList.push(marker);
					
					$(marker).click(function() {
						for (var k = 0; k < markerList.length; k++) {
							markerList[k].setOpacity(0.5);
						};

						marker.setOpacity(1);
						activeMarker = marker;
						function activaTab(panel){
						    $('.nav-tabs a[href="' + panel + '"]').tab('show');
						};
						

						activaTab(panel);
						//$('<a></a>').attr('href', res.content.elements[j].eid);	 
 	    				
 	    				location.hash = "#" + res.content.elements[j].eid;
 	    				
 	    // 				var selected = true;
 	    // 				if (selected) {
						// 	marker.setOpacity(1);
						// } else {
						// 	marker.setOpacity(0.4);
						// }
						// visible = !visible;

						

						//window.location = res.content.elements[j].eid;
					});
					




			    })(i);
			}



					// var tweetText = res.content.elements[i].meta.text;
					// marker.bindPopup(tweetText).openPopup();
					// //tweet in story
					// var permalink = res.content.elements[i].permalink;
					// console.log(permalink);
					// var tweetLink = $('<a></a>').attr('href', permalink);
					// var tweetDisplay = $('<blockquote></blockquote>')
					// 	.addClass('twitter-tweet')
					// 	.html(tweetLink);
					// $('#story').append(tweetDisplay);

			;

			// Refresh the tweets.
			twttr.widgets.load();

		},
		error: function(err) { console.log('Failed!', err); },
	});
};

$(function() {
    geoLocated(url, redMarker, panel1, title1);
    geoLocated(url2, blueMarker, panel2, title2);
});

//get the elements for a story and put in console





//get elements for a story and display them in story div








// $().ready(function () {
//   var url = 'https://api.twitter.com/1/statuses/oembed.json?id=609783967865286700';

//   $.get(url, function (data) {
// 	$('#story').html(data.html);  });
// });


// var tweets = $(document).ready(function(){
//     $.getJSON("https://api.twitter.com/1/statuses/oembed.json?id=609783967865286700",{},
//         function(data){$('#story').html(data.html);}, 'jsonp');
// });


//get coordinates of object


// var story = $.get('https://storify.com/boheekim/schuneman-symposium-2015',{}, function(){}, 'json');

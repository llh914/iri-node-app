var twitterKeys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
var spotify = require("spotify");
var fs = require("fs");
var command = process.argv[2];


function runApp() {
	if (command === "my-tweets") {
		myTweets();
	} else if (command === "spotify-this-song") {
		var song = process.argv[3];
		spotifyThisSong(song);
	} else if (command === "movie-this") {
		var movie = process.argv[3];
		movieThis(movie);
	} else if (command === "do-what-it-says") {
		doWhatItSays();
	};
}

runApp();

function myTweets(){
	var params = {
		screen_name: "linette_hsu",
		count: 20
	};
	var client = new twitter(twitterKeys.twitterKeys);
	client.get("statuses/user_timeline", params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++){
	  		console.log(tweets[i].text + " (created at " + tweets[i].created_at + ")");
	  	} 
	  } else {
	  	console.log("Error occured: " + error);
	  }
	});
};

function spotifyThisSong(song) {
	if (song != undefined){
		spotify.search({ type: 'track', query: song }, function(error, data) {
		    if (!error) {
		        console.log("Song Name: " + data.tracks.items[0].name);
		        console.log("Artist: " + data.tracks.items[0].artists[0].name);
		        console.log("Album: " + data.tracks.items[0].album.name);
		        console.log("Preview Link: " + data.tracks.items[0].preview_url);
			} else {
		    	console.log('Error occurred: ' + error);
		    }
		}) ;
	} else {
		spotify.search({ type: 'track', query:"track:the sign artist:ace of base" }, function(error, data) {
		    if (!error) {
		        console.log("Song Name: " + data.tracks.items[0].name);
		        console.log("Artist: " + data.tracks.items[0].artists[0].name);
		        console.log("Album: " + data.tracks.items[0].album.name);
		        console.log("Preview Link: " + data.tracks.items[0].preview_url);
			} else {
		    	console.log('Error occurred: ' + error);
		    }
		}) ;
	}
};

function movieThis(movie) {
	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json";
	if (movie != undefined){
		request(queryUrl, function (error, response, body) {
			if (!error) {
		  		console.log("Title: " + JSON.parse(body).Title);
		  		console.log("Year: " + JSON.parse(body).Year)
		  		console.log("Actors: " + JSON.parse(body).Actors)
		  		console.log("Plot: " + JSON.parse(body).Plot)
		  		console.log("Country: " + JSON.parse(body).Country)
		  		console.log("Language: " + JSON.parse(body).Language)
		  		console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
		  		// console.log("Rotten Tomatoes URL: " + JSON.parse(body).)
			} else {
				console.log('Error occurred: ' + error);
			}
		});
	} else {
		queryUrl = "http://www.omdbapi.com/?t=mr%20nobody&y=&plot=short&r=json"
		request(queryUrl, function (error, response, body) {
			if (!error) {
		  		console.log("Title: " + JSON.parse(body).Title);
		  		console.log("Year: " + JSON.parse(body).Year)
		  		console.log("Actors: " + JSON.parse(body).Actors)
		  		console.log("Plot: " + JSON.parse(body).Plot)
		  		console.log("Country: " + JSON.parse(body).Country)
		  		console.log("Language: " + JSON.parse(body).Language)
		  		console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
		  		// console.log("Rotten Tomatoes URL: " + JSON.parse(body).)
			} else {
				console.log('Error occurred: ' + error);
			}
		})
	}
};

function doWhatItSays() {
	fs.readFile("random.txt", "utf-8", function (error, data) {
		if (!error){
			var arr = data.split(", ")
			console.log(arr[0]);
			// console.log(arr[1]);

			//To Do
		} else {
			console.log('Error occurred: ' + error);
		}
	})
};



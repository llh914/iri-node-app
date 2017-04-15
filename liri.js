var twitterKeys = require("./keys.js");
var twitter = require("twitter");
var request = require("request");
var spotify = require("spotify");
var fs = require("fs");

function runApp() {
	var command = process.argv[2];
	switch (command) {
	  case "my-tweets":
	    myTweets();
	    break;

	  case "spotify-this-song":
	  	var song = process.argv[3];
	    spotifyThisSong(song);
	    break;

	  case "movie-this":
	    var movie = process.argv[3];
		movieThis(movie);
	    break;

	  case "do-what-it-says":
	    doWhatItSays();
	    break;
	}
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
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log("(created at " + tweets[i].created_at + ")");
	  		console.log(tweets[i].text);
	  	} 
	  } else {
	  	console.log("Error occured: " + error);
	  }
	});
}

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
	if (movie != undefined) {
		request(queryUrl, function (error, response, body) {
			if (!error) {
		  		console.log("Title: " + JSON.parse(body).Title);
		  		console.log("Year: " + JSON.parse(body).Year)
		  		console.log("Actors: " + JSON.parse(body).Actors)
		  		console.log("Plot: " + JSON.parse(body).Plot)
		  		console.log("Country: " + JSON.parse(body).Country)
		  		console.log("Language: " + JSON.parse(body).Language)
		  		console.log("IMDB Rating: " + JSON.parse(body).imdbRating)

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
			} else {
				console.log('Error occurred: ' + error);
			}
		});
	}
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf-8", function (error, data) {
		if (!error){
			var arr = data.split(", ")
			process.argv.splice(2,1);
			// console.log(process.argv);
			process.argv.push(arr[0]);
			process.argv.push(arr[1]);
			// console.log(process.argv);
			runApp();
		} else {
			console.log('Error occurred: ' + error);
		}
	});
}



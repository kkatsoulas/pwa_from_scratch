//create an empty array on startup
let photoHistory = []
const API_BASE = "https://api.jikan.moe/"
const API_ANIME = API_BASE + "anime/"
const HISTORY_STORAGE_KEY = 'HISTORY_KEY'

/**
 * generate gallery tag
 */
function buildPhotoMarkup(photo) {
    return `<div class="photo_item"><img class='photo_image' src=${anime.image_url} />
        <h2 class='photo_name'>${anime.title}</h2>
        <p class='photo_description'>${anime.aired_string}</p></div>`
}

/**
 * add an photo to the history and updates display
 */
function updateHistory(photo) {
    photoHistory.push(photo)

    //Save the array in the local storage. JSON.stringify allows to serialize the array to a string
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(photoHistory))

    //update display
    addPhotoToHistoryTag(photo)
}

/**
 * Update the DOM
 */
function addPhotoToHistoryTag(photo) {
    document.querySelector('#history').innerHTML = buildPhotoMarkup(photo) + document.querySelector('#history').innerHTML
}

/**
 * loadAnPhoto from the internet and place it on a target element
 */
 /*
async function onOkButtonClickAsync() {
    let targetElementId = '#main_anime'
    let animeId = document.querySelector("#anime_id_input").value
    try {
        const response = fetch(API_ANIME + animeId,{ // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors"})//(API_ANIME + animeId)
        //if (!response.ok) {
        //    return
        //}
        const anime = await response.data;
        console.log("anime", anime)
        document.querySelector(targetElementId).innerHTML = buildAnimeMarkup(anime)

        updateHistory(anime)
    } catch (err) {
        console.error(`error ${err}`)
    }
}*/

function onOkButtonClickAsync() {
	let photoId = document.querySelector("#photo_id_input").value
	let targetElementId = '#main_photo'
	var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          var response = JSON.parse(request.response);
          const photo = response;
		  console.log("photo", photo)
		  document.querySelector(targetElementId).innerHTML = buildPhotoMarkup(photo)

			updateHistory(photo)
        }
      } else {
        // Return the initial weather forecast since no data is available.
        //app.updateForecastCard(initialWeatherForecast);
      }
    };
    request.open('GET', API_ANIME + animeId);
    request.send();
}

/**
 * The history is serrialized as a JSON array. We use JSON.parse to convert is to a Javascript array
 */
function getLocalHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY))
}

async function onLoadAsync() {
    //load the history from cache
    let history = getLocalHistory()
    if (history !== null) {
        //set the photoHistory array and update the display
        photoHistory = history
        photoHistory.forEach(photo => addPhotoToHistoryTag(photo))
    }

    //Install the service worker
    /*if ('serviceWorker' in navigator) {
        try {
            let serviceWorker = await navigator.serviceWorker.register('./sw.js')
            console.log(`Service worker registered ${serviceWorker}`)
        } catch (err) {
            console.error(`Failed to register service worker: ${err}`)
        }
    }*/
	if ('serviceWorker' in navigator) {
	  navigator.serviceWorker.register("./sw.js")
	  .then(function(registration) {
		console.log('Registration successful, scope is:', registration.scope);
	  })
	  .catch(function(error) {
		console.log('Service worker registration failed, error:', error);
	  });
	}
}
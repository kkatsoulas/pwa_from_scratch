//create an empty array on startup
let photoHistory = []
const API_BASE = "https://api.jikan.moe/"
const API_ANIME = API_BASE + "anime/"
const HISTORY_STORAGE_KEY = 'HISTORY_KEY'

/**
 * generate gallery tag
 */
function buildPhotoMarkup(photo) {
    return `<div class="photo_item"><img class='photo_image' src=${photo.image_url} />
        <h2 class='photo_name'>${photo.title}</h2>
        <p class='photo_description'>${photo.aired_string}</p></div>`
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

function onOkButtonClickAsync2() {
	
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

function onOkButtonClickAsync() {
	
	let photoId = document.querySelector("#photo_id_input").value
	let targetElementId = '#main_photo'
	var files = $("#file_input").get(0).files;

		for (var i = 0; i < $("#file_input").get(0).files.length; i++) {
			const fileRef = firebase.storage().ref().child('mapImages/' + image_name);
			var uploadTask = fileRef.put(files[i], metadata);
			break;
		}
		
		uploadTask.on('state_changed', function(snapshot){
		// Observe state change events such as progress, pause, and resume
		// See below for more detail
	}, function(error) {
		// Handle unsuccessful uploads
	}, function() {
	var downloadURL = uploadTask.snapshot.downloadURL;
	var Category_txt = '';
	var SubCategory_txt = '';
	uploadTask.snapshot.ref.getDownloadURL().then(function (URL) {
   //getting the publication time
		var dayObj = new Date();
		var day = dayObj.getDate();
		
		dbObjRef.child(PostsRootName).push({
		CreatedBy: 'Kostas',
		lat: '',
		lng: '',
		ImageURL: URL,
		SourceURL: src_url,
		Category: Category_txt,
		SubCategory: SubCategory_txt,
		Comment: '',
		Status: 'ΚΑΤΑΧΩΡΗΘΗΚΕ',
		Image: src_url
		});

		console.log('User post successfully added to realtime database');
	});
	
	// Handle successful uploads on complete
	// For instance, get the download URL: https://firebasestorage.googleapis.com/...
	//$(".upload-group")[0].before("Success!");
	//$(".upload-group").hide();
	//ConvertMarkerPreview();

	});

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

$("#file_input").change(function () {
    readURL(this);
});

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        /*reader.onload = function (e) {
            $('.img_uploaded').attr('src', e.target.result);
            $('.img_uploaded').show();
        }

        reader.readAsDataURL(input.files[0]);*/
    }
}
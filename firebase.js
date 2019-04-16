	
	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyConz2-f4oLKr09_VklR009osOYOdW7Huk",
	authDomain: "photomap-de5ad.firebaseapp.com",
	databaseURL: "https://photomap-de5ad.firebaseio.com",
	projectId: "photomap-de5ad",
	storageBucket: "photomap-de5ad.appspot.com",
	messagingSenderId: "198881779510"
	};


	const app = firebase.initializeApp(config);
	
	var routeName = "route";
	var PostsRootName = "Images";
	var dbObjRef = firebase.database().ref(); // Cloud DB reference
	var routeRef = firebase.database().ref().child("route");
	var routeRef2 = firebase.database().ref().child(PostsRootName);
	var global_user;
	
	var params;

	var data_t = [];
	  
	/*$( document ).ready(function() {
	//$("#welcome").hide();
	//$(".upload-group").hide();
	const database = firebase.database();
	
	//document.getElementById("upload").addEventListener('change', handleFileSelect, false);
	});*/
	
	 //window.onload = function() {
     // initApp();
    //};

	function handleFileSelect(event) {
		$(".upload-group").show();
		selectedFile = event.target.files[0];
	};

    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      //$("#quickstart-account-details").hide();
	  
		//firebase.database.enableLogging(true);

		//firebase.auth.Auth.Persistence.LOCAL;
	  
	  app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
	
	  app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
	  app.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
		  global_user = user;
		  window.user = user;
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in as ' + email;
          document.getElementById('quickstart-sign-in').textContent = 'Signed in as ' + email;
          //document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
          if (!emailVerified) {

          }else{
			  GetAll();
		  }
		  
          // [END_EXCLUDE]
        }	 else {
          // User is signed out.
          // [START_EXCLUDE]
		  global_user = null;
          //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
          //document.getElementById('quickstart-sign-in').textContent = 'Sign in';
          //document.getElementById('quickstart-account-details').textContent = 'null';
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        //document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
	  });
      // [END authstatelistener]
      //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      //document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      //document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      //document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
	
    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        
        // [END authwithemail]
		
	  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
	  .then(function() {
		// Existing and future Auth states are now persisted in the current
		// session only. Closing the window would clear any existing state even
		// if a user forgets to sign out.
		// ...
		// New sign-in will be persisted with session persistence.
		return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
      }
	  )
	  }
      document.getElementById('quickstart-sign-in').disabled = true;
    }
    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if(errorMessage != null){
          alert(errorMessage);
        } else{
			sendEmailVerification();
		}
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
    }
    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email Verification Sent!');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Password Reset Email Sent!');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }
	
	

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function signin_submit(btn) {
	
	var user = firebase.auth().currentUser;

        var email = document.getElementById('Sign_email').value;
		var password = document.getElementById('Sign_password').value;
		//var password = $('Sign_password').val();
        if (!validateEmail(email)) {
          alert('Please enter a correct email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        
        // [END authwithemail]
		
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
		.then(function() {
		// Existing and future Auth states are now persisted in the current
		// session only. Closing the window would clear any existing state even
		// if a user forgets to sign out.
		// ...
		// New sign-in will be persisted with session persistence.
		return firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // [START_EXCLUDE]
		  if (errorCode === 'auth/wrong-password') {
			alert('Wrong password.');
		  } else {
			alert(errorMessage);
		  }
		  console.log(error);
		  document.getElementById('quickstart-sign-in').disabled = false;
		  // [END_EXCLUDE]
		});
		})
	  
      //document.getElementById('quickstart-sign-in').disabled = true;
	  //document.getElementById('quickstart-sign-in').textContent = 'Signed in as: ' + email;
	  //hideModal();
	  //$('#myModal2').modal('hide')
	  //$('body').removeClass('modal-open');
	  //$('.modal-backdrop').remove();
}	

function signInAnonymously(){
	firebase.auth().signInAnonymously().catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // ...
	});
}


/*function signup_submit(btn) {
	  var email = document.getElementById('Sign_email').value;
      var password = document.getElementById('Sign_password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else if (errorMessage != null) {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END createwithemail]
	  sendEmailVerification();
	  hideModal();
}*/

function signout_submit(btn) {
	if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
		document.getElementById('quickstart-sign-in').textContent = 'Sign in';
		alert('sign out.');
        // [END signout]
	} else {
	}

}



function GetAll() {


	var myObj = new Object();

	routeRef2.once("value")
	  .then(function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var key = childSnapshot.key;
			var childData = childSnapshot.val();
			var pos1lat = childData.lat;
			var pos1lng = childData.lng;
			var MapMarkerPosObj = new google.maps.LatLng(pos1lat,pos1lng);
			params = childData;
			//placeDbMarker(MapMarkerPosObj);
			var gridLine = {
						  RequestID:"",
						  RequestDate:"",
						  Category:"",
						  SubCategory:"",
						  Address:"",
						  Status:""
						};
						
			if (childData["RequestID"] === undefined){
				gridLine["RequestID"] = '';}
			else{
				gridLine["RequestID"] = childData["Category"];}
				
			if (childData["RequestDate"] === undefined){
				gridLine["RequestDate"] = '';}
			else{
				var date_txt = childData["RequestDate"];
				gridLine["RequestDate"] = date_txt;
			}
			
			if (childData["Category"] === undefined){ gridLine["Category"] = '';}
			else{ gridLine["Category"] = childData["Category"]; }
			
			if (childData["SubCategory"] === undefined){ gridLine["SubCategory"] = '';}
			else{ gridLine["SubCategory"] = childData["SubCategory"]; }
			
			if (childData["Address"] === undefined){ gridLine["Address"] = '';}
			else{ gridLine["Address"] = childData["Address"]; }
			
			if (childData["Status"] === undefined){ gridLine["Status"] = '';}
			else{ gridLine["Status"] = childData["Status"]; }
			data_t.push( gridLine);

	  });
	});
}

function confirmUpload(src_url, file) {
	
	var currentDt = new Date();
	var mm = currentDt.getMonth() + 1;
	var dd = currentDt.getDate();
	var yyyy = currentDt.getFullYear();
	var s = currentDt.getSeconds();
	var m = currentDt.getMinutes();
	var h = currentDt.getHours();
	const image_name = mm + '-' + dd + '-' + yyyy+"-"+h+"-"+m+"-"+s;
	var metadata = {
		contentType: 'image',
		customMetadata: {
			'uploadDate': image_name,
			'latitude': '1',
			'longitude': '2'
		},
	};

	
	//var files = $("#file_input").get(0).files;
	const fileRef = firebase.storage().ref().child('storyImages/' + image_name);
	//var uploadTask = fileRef.put(file, metadata);
	var uploadTask = fileRef.put.xhr('GET', src_url); 

	/*for (var i = 0; i < $("#file_input").get(0).files.length; i++) {
		const fileRef = firebase.storage().ref().child('storyImages/' + image_name);
		var uploadTask = fileRef.put(files[i], metadata);
		break;
	}*/
	
	
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	
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
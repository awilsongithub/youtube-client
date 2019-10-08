/**
 * OPTIONS
 */
const CLIENT_ID =
    "683892034585-dtge9o7j0k869dgo1hro0m77e42da6na.apps.googleusercontent.com";
// rest api
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
];
// no write
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
const DEFAULT_CHANNEL = 'techguyweb';
const authButton = document.getElementById("authorize-button");
const signoutButton = document.getElementById("signout-button");
const content = document.getElementById("content");
const channelForm = document.getElementById("channel-form");
const channelInput = document.getElementById("channel-input");
const videoContainer = document.getElementById("video-container");

/**
 * INIT
 * */
document.addEventListener("DOMContentLoaded", () => {
    // oauth name
    // aw-youtube-clientid
    // client id - ok to share
    // "683892034585-dtge9o7j0k869dgo1hro0m77e42da6na.apps.googleusercontent.com"
    //client secret - don't share
    // "SjpOQHAy3yu1iwfJXc8X6Nck"
});

/**
 * FNS
 * */

function handleClientLoad() {
	gapi.load("client:auth2", initClient);
	alert('handling load')
}

// init api client lib with server/api url, scope, clientid
// and setup sign in listeners
function initClient() {
	alert('inside initclient')
	
    gapi.client
        .init({
            discoveryDocs: DISCOVERY_DOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        })
        .then(() => {
            alert("init callback");
            // listen
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // handle initial
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authButton.onclick = handleAuthClick();
            signoutButton.onclick = handleSignoutClick();
        })
        // .catch((err) => {
        //     alert("error");
        // });
}

// update ui sigin in state changes
function updateSigninStatus(isSignedIn) {
	alert('updating ui')
    if (isSignedIn) {
		alert('signed in');
        authButton.style.display = "none";
        signoutButton.style.display = "block";
        content.style.display = "block";
		videoContainer.style.display = "block";
		getChannel(defaultChannel);
    } else {
		alert("NOT signed in");
		authButton.style.display = "block";
        signoutButton.style.display = "none";
        content.style.display = "none";
        videoContainer.style.display = "none";
	}
}

// Handle login. call api auth sigin/sign out methods
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

// Handle logout
function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}
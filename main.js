
const YOUR_CLIENT_ID =
    "683892034585-dtge9o7j0k869dgo1hro0m77e42da6na.apps.googleusercontent.com";
const YOUR_REDIRECT_URI = "https://awilsongithub.github.io/youtube-client/";
// rest api
const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
];
const YOUTUBE_API_KEY = "AIzaSyCLDvzBzRuXgmsA0GUFUpQNdtSG22gqSr4";
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
const DEFAULT_CHANNEL = "techguyweb";
// Request access from google oath2 here:
// response type
// redirect_uri

/*===========================
 * get hash of url when this page is requested
 parse to see if from oauth 2 server (magic)
 if token try api else start oauth2 flow
 ===========================*/
var fragmentString = location.hash.substring(1);

// Parse query string to see if page request is coming from OAuth 2.0 server.
var params = {};
var regex = /([^&=]+)=([^&]*)/g,
    m;
while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
}
if (Object.keys(params).length > 0) {
    localStorage.setItem("oauth2-test-params", JSON.stringify(params));
    if (params["state"] && params["state"] == "try_sample_request") {
        trySampleRequest();
    }
}

// If there's an access token, try an API request.
// Otherwise, start OAuth 2.0 flow.
function trySampleRequest() {
    var params = JSON.parse(localStorage.getItem("oauth2-test-params"));
    if (params && params["access_token"]) {
        var xhr = new XMLHttpRequest();
        xhr.open(
            "GET",
            "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&" +
                "access_token=" +
                params["access_token"]
        );
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.response);
            } else if (xhr.readyState === 4 && xhr.status === 401) {
                // Token invalid, so prompt for user permission.
                oauthSignIn();
            }
        };
        xhr.send(null);
    } else {
        oauthSignIn();
    }
}



/*===========================
 * Create form to request 
 access token from 
 Google's OAuth 2.0 server.
 ===========================*/d

function oauthSignIn() {
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    var params = {
        client_id: YOUR_CLIENT_ID,
        redirect_uri: YOUR_REDIRECT_URI,
        response_type: "token",
        scope: "https://www.googleapis.com/auth/youtube.force-ssl",
        include_granted_scopes: "true",
        state: "pass-through value"
    };
    submitRequestViaForm(oauth2Endpoint, params);
}

function submitRequestViaForm(oauth2Endpoint, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);
    for (var p in params) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
}

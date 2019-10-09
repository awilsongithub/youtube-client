
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
 * Create form to request 
 access token from 
 Google's OAuth 2.0 server.
 ===========================*/

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
    submitRequestViaForm(params);
}

function submitRequestViaForm(params) {
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

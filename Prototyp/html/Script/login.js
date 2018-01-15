function loginSubmit(username, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/login", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
}
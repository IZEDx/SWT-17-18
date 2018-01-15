function loginSubmit(username, password) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/api/login", false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify({
        username: username,
        password: password
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            if (response.success === true) {
                var token = response.token;
                
            } 
        }
    };
}
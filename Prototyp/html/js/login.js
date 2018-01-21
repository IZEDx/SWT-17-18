function loginSubmit() {
    var username = $("#usr").val();
    var password = $("#inputPassword").val();
    $.post("/api/login", {
            username: username,
            password: password
    }, (response) => {
        if (response.success) {
            window.location.replace("/calendar.html");
        } else {
            alert(response.error);
        }
    });
}

// Check if the user is already logged in, if so forward to the calendar view.
$.get("/api/isloggedin", function(response){
    if (response.success) {
        window.location.replace("/calendar.html");
    }
});
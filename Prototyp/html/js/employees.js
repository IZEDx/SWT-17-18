
function addEmployeeToList(key, value) {
    var str = "";
    str += '<tr>';
    str += '<td>' + "<span class='custom-checkbox'>" +
        "<input type='checkbox' id='checkbox1' name='options[]' value='1'> " +
        "<label for='checkbox1'>" + "</label>" +
        "</span>" + "</td>";
    str += '<td>' + value.username + "</td>";
    str += '<td>' + value.email + "</td>";
    str += '<td>' + value.street + "</td>";
    str += '<td>' + value.qualifications + "</td>";
    str += '<td>' + value.driverLicense + "</td>";
    str += '<td>' + "<a href=\"#editEmployeeModal\" class=\"edit\" data - toggle=\"modal\"><i class=\"material-icons\"\n" +
        "                                                                                       data - toggle=\"tooltip\"\n" +
        "                                                                                       title=\"Edit\">&#xE254;</i></a>\n" +
        "                    <a href=\"#deleteEmployeeModal\" class=\"delete\" data - toggle=\"modal\"><i class=\"material-icons\"\n" +
        "                                                                                           data - toggle=\"tooltip\"\n" +
        "                                                                                           title=\"Delete\">&#xE872;</i></a>" + "</td>";
    str += '<tr>';
    $('#employeeList').append(str);
}

$(document).ready(function() {
    $('#addEmployee').submit(function(e) {
        e.preventDefault();
        var data = {};
        for (var e of $(this).serializeArray()) {
            data[e.name] = e.value;
        }
        data.driverLicense = data.driverLicense === "on" && 1 || 0;
        data.isAdmin = data.isAdmin === "on" && 1 || 0;
        console.log(data);
        
        $.post("/api/employees", data, (response) => {
            if (response.success) {
                addEmployeeToList(null, response.data);
                $("'#addEmployee").modal('hide');
            } else {
                alert(response.error);
            }
        });
    });

    $.getJSON("/api/employees", function(data){
        $.each(data, addEmployeeToList);
    });

    // Check if the user is logged in, if not redirect to login.
    $.get("/api/isloggedin", function(response) {
        if (!response.success) {
            window.location.replace("/login.html");
        }
    });
});

$(document).ready(function () {
    if(! (localStorage.getItem('status') === "loggedin" && localStorage.getItem('person') === "admin")){
        alert('Not Logged In! Try again');
        window.location.href = "./index.html";
    }
    $(document).ajaxStart(function(){
        // Show image container
        $("#loader").show(function () {
            $("#loader").css('z-index','999999');
        });
    });
    $(document).ajaxComplete(function(){
        // Hide image container
        $("#loader").hide(function () {
            $("#loader").css('z-index','0');
        });
    });
    function addMember(json_data, loc){
        $.ajax({
            url: loc,
            type: "POST",
            crossDomain: true,
            data: json_data,
            dataType: "json",
            success:function(result){
                if(result['error'] === "false")
                {
                    alert(result['result']);
                    //window.location.href = "./addMember.html";
                }
                else
                {
                    alert(result['result']);
                }
            }
        });
    }
    $('#inputrole').on('change', function () {
        if($('#inputrole').val() === 'teacher') {
            $('#subject').css('display', 'block');
        }
        else if($('#inputrole').val() === 'student') {
            $('#subject').css('display', 'none');
        }
    });
    $('#button').on('click', function (event) {
        event.preventDefault();
        let json_data = {};
        let loc = "";
        if($('#inputrole').val() === 'teacher')
        {
            loc = "https://neweradevelopers.com/attendance/add_teacher.php";
            json_data = {
                firstname: $('#fname').val(),
                lastname: $('#lname').val(),
                id : $('#idno').val(),
                password: $('#password').val(),
                subject: $('#subject').val(),
                semester: $('#semester').val()
            };
            addMember(json_data, loc);
        }
        else if($('#inputrole').val() === 'student')
        {
            loc = "https://neweradevelopers.com/attendance/add_student.php";
            json_data = {
                firstname: $('#fname').val(),
                lastname: $('#lname').val(),
                id : $('#idno').val(),
                password: $('#password').val(),
                semester: $('#semester').val()
            };
            addMember(json_data, loc);
        }
    });
    $('#logout').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: "https://neweradevelopers.com/attendance/logout.php",
            type: "POST",
            crossDomain: true,
            data: {username: localStorage.getItem('firstname')},
            dataType: "json",
            success:function(result){
                if(result['error'] === "false")
                {
                    alert(result['result']);
                    localStorage.clear();
                    window.location.href = "./index.html";
                }
                else
                {
                    alert(result['result']);
                }
            }
        });
    });
});

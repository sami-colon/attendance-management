$(document).ready(function () {
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
    function login(loc, person, redirect_loc){
        $.ajax({
            url: loc,
            type: "POST",
            crossDomain: true,
            data: $('#formm').serialize(),
            dataType: "json",
            success:function(result){
                if(result['error'] === "false")
                {
                    localStorage.setItem("status", "loggedin");
                    localStorage.setItem("person", person);
                    localStorage.setItem("firstname", result['firstname']);
                    localStorage.setItem("id", result['id']);
                    alert(result['result']);
                    window.location.href = redirect_loc;
                }
                else
                {
                    alert(result['result']);
                }
            }
        });
    }
    $('#button').on('click', function (event) {
        event.preventDefault();
        var loc;// = "https://neweradevelopers.com/attendance/admin.php";
        if($('#inputrole').val() === 'admin')
        {
            if(localStorage.getItem("status") === "loggedin" && localStorage.getItem("person") === "admin")
            {
                alert('Logging into Previous Session!');
                window.location.href = "./addMember.html";
            }
            else{
                loc = "https://neweradevelopers.com/attendance/admin.php";
                login(loc, $('#inputrole').val(), "./addMember.html");
            }
        }
        else if($('#inputrole').val() === 'student')
        {
            if(localStorage.getItem("status") === "loggedin" && localStorage.getItem("person") === "student")
            {
                alert('Logging into Previous Session!');
                window.location.href = "./show_attendance.html";
            }
            else{
                loc = "https://neweradevelopers.com/attendance/student.php";
                login(loc, $('#inputrole').val(), "./show_attendance.html");
            }
        }
        else if($('#inputrole').val() === 'teacher')
        {
            if(localStorage.getItem("status") === "loggedin" && localStorage.getItem("person") === "teacher")
            {
                alert('Logging into Previous Session!');
                window.location.href = "./mark_attendance.html";
            }
            else{
                loc = "https://neweradevelopers.com/attendance/teacher.php";
                login(loc, $('#inputrole').val(), "./mark_attendance.html");
            }
        }
    });
});

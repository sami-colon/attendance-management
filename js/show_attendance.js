$(document).ready(function () {
    if(! (localStorage.getItem('status') === "loggedin" && localStorage.getItem('person') === "student")){
        alert('Not Logged In!');
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
    $('#logout').on('click', function (event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "./index.html";
    });
    $.ajax({
        url: "https://neweradevelopers.com/attendance/attendance_show.php",
        type: "POST",
        crossDomain: true,
        data: {
            id: localStorage.getItem('id')
        },
        dataType: "json",
        success:function(result) {
            if (result['error'] === "true") {
                alert("Records not present! Ask your teacher to update your attendance!");
            } else {
                console.log(result);
                for (var i = 0; i < result.length; i++) {
                    var html = "<tr><td>" + result[i].date + "</td><td>" + result[i].period + "</td><td>" + result[i].status + "</td><td>" + result[i].subject + "</td></tr>";
                    $('#tbody').append(html);
                }
            }
        }
    });
});

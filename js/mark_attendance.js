$(document).ready(function () {
    if(! (localStorage.getItem('status') === "loggedin" && localStorage.getItem('person') === "teacher")){
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
    $('#button').on('click', function (event) {
        event.preventDefault();
        $.ajax({
            url: "https://neweradevelopers.com/attendance/attendance_insert.php",
            type: "POST",
            crossDomain: true,
            data: {
                id: $('#id').val(),
                semester: $('#inputsem').val(),
                date: $('#date').val().toString(),
                period: $('#inputperiod').val(),
                status: $('#mark').val(),
                subject: $('#subject').val()
            },
            dataType: "json",
            success:function(result){
                if(result['error'] === "false")
                {
                    alert(result['result']);
                }
                else
                {
                    alert(result['result']);
                }
            }
        });
    });
});

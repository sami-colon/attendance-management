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
                for (var i = 0; i < result.length; i++) {
                    var html = "<tr><td>" + result[i].date + "</td><td>" + result[i].period + "</td><td>" + result[i].status + "</td><td>" + result[i].subject + "</td></tr>";
                    $('#tbody').append(html);
                }
            }
        }
    });
    $('#filterby').on('change', function (event) {
        event.preventDefault();
        if($('#filterby').val() == 'subject')
        {
            $.ajax({
                url: "https://neweradevelopers.com/attendance/attendance_show.php",
                type: "POST",
                crossDomain: true,
                data: {
                    id: localStorage.getItem('id'),
                    subject: 'subject'
                },
                dataType: "json",
                success:function(result) {
                    if (result['error'] === "true") {
                        alert("Records not present! Ask your teacher to update your attendance!");
                    } else {
                        $('#tbody').empty();
                        var subject_array = ["physics", "chemistry", "m1", "dbms", "oopm", "cn"];
                        for(var i=0;i<subject_array.length;i++)
                        {
                            var html = "<tr><td colspan='4' class='bg-primary'>"+subject_array[i]+"</td></tr>";
                            $('#tbody').append(html);
                            for(var j=0;j<result[subject_array[i]].length;j++)
                            {
                                html = "<tr><td>" + result[subject_array[i]][j].date + "</td><td>" + result[subject_array[i]][j].period + "</td><td>" + result[subject_array[i]][j].status + "</td><td>" + result[subject_array[i]][j].subject + "</td></tr>";
                                $('#tbody').append(html);
                            }
                        }
                    }
                }
            });
        }
        else if($('#filterby').val() == 'status')
        {
            $.ajax({
                url: "https://neweradevelopers.com/attendance/attendance_show.php",
                type: "POST",
                crossDomain: true,
                data: {
                    id: localStorage.getItem('id'),
                    status: 'status'
                },
                dataType: "json",
                success:function(result) {
                    if (result['error'] === "true") {
                        alert("Records not present! Ask your teacher to update your attendance!");
                    } else {
                        $('#tbody').empty();
                        var status_array = ["present", "absent"];
                        for(var i=0;i<status_array.length;i++)
                        {
                            var html = "<tr><td colspan='4' class='bg-primary'>"+status_array[i]+"</td></tr>";
                            $('#tbody').append(html);
                            for(var j=0;j<result[status_array[i]].length;j++)
                            {
                                html = "<tr><td>" + result[status_array[i]][j].date + "</td><td>" + result[status_array[i]][j].period + "</td><td>" + result[status_array[i]][j].status + "</td><td>" + result[status_array[i]][j].subject + "</td></tr>";
                                $('#tbody').append(html);
                            }
                        }
                    }
                }
            });
        }
        else
        {
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
                        $('#tbody').empty();
                        for (var i = 0; i < result.length; i++) {
                            var html = "<tr><td>" + result[i].date + "</td><td>" + result[i].period + "</td><td>" + result[i].status + "</td><td>" + result[i].subject + "</td></tr>";
                            $('#tbody').append(html);
                        }
                    }
                }
            });
        }
    });
});

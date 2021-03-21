$(function () {
    $(
        "#contactForm input,#contactForm textarea,#contactForm button"
    ).jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var childname = $("input#childname").val();
            var chilAage = $("input#childage").val();
            var message = $("textarea#message").val();
           
            var url = window.location.href;

            //For courses (used during 2021 easter break)

            var interestedCourses = "";  
            var checkboxes = document.getElementsByName("regFor");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked)
                    interestedCourses = interestedCourses+","+checkboxes[i].id
            }
            var data = {};
            data = {
                name: name,
                phone: phone,
                email: email,
                childname: childname,
                childage: chilAage,
                message: message,
                url: url,
                courses: interestedCourses,
            }
            //formElements.map(input => (data[input.name] = input.value));
            // Log what our lambda function will receive
            console.log(JSON.stringify(data));
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(" ") >= 0) {
                firstName = name.split(" ").slice(0, -1).join(" ");
            }
            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
            $.ajax({
                //url: "https://6ep0lwrymb.execute-api.eu-west-1.amazonaws.com/interestedfolks", //This is DEV API Gateway URL that invokes dev lambdas
                url: "https://3y7hukbus9.execute-api.eu-west-1.amazonaws.com/interestedfolks", //This is PROD API Gateway URL that invokes prod lambdas
                type: "POST",
                headers: { 'Accept': 'application/json; charset=utf-8', 'Content-Type': 'application/json; charset=utf-8' },
                data: JSON.stringify(data),

                cache: false,
                success: function () {
                    // Success message
                    $("#success").html("<div class='alert alert-success'>");
                    $("#success > .alert-success")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-success").append(
                        "<strong>Your registration is successful. Thank you. </strong>"
                    );
                    $("#success > .alert-success").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                error: function () {
                    // Fail message
                    $("#success").html("<div class='alert alert-danger'>");
                    $("#success > .alert-danger")
                        .html(
                            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                        )
                        .append("</button>");
                    $("#success > .alert-danger").append(
                        $("<strong>").text(
                            "Sorry " +
                            firstName +
                            ", something went wrong. Please try again later!"
                        )
                    );
                    $("#success > .alert-danger").append("</div>");
                    //clear all fields
                    $("#contactForm").trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                    }, 1000);
                },
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $('a[data-toggle="tab"]').click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

/*When clicking on Full hide fail/success boxes */
$("#name").focus(function () {
    $("#success").html("");
});

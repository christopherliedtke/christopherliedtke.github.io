(function() {
    $(document).ready(function() {
        formSubmissionWORedirect();
        collapseNavbarAfterClick();
    });

    $(window).resize(function() {});

    $(window).scroll(function() {
        changeNavbar();
        // jumpToSection();
    });

    // Jump to next/previous section on scroll
    // var sections = $("section");
    // var screenHeight = $(window).outerHeight();
    // var previousPositionY2 = $(document).scrollTop();

    // function jumpToSection() {
    //     // const currentPositionY2 = $(document).scrollTop();
    //     // // console.log("previousPositionY2: ", previousPositionY2);
    //     // // console.log("currentPositionY2: ", currentPositionY2);
    //     // for (let i = 0; i < sections.length; i++) {
    //     //     const sectionTopPosition = sections.eq(i).offset().top;
    //     //     const sectionOuterHeight = sections.eq(i).outerHeight();
    //     //     const sectionBottomPosition = sectionTopPosition + sectionOuterHeight;
    //     //     if (currentPositionY2 > previousPositionY2 && sectionBottomPosition < currentPositionY2 + screenHeight && sectionBottomPosition > currentPositionY2) {
    //     //         // console.log("section:", i);
    //     //         $(document).scrollTop(sections.eq(i + 1).offset().top);
    //     //     }
    //     //     // console.log("sectionTopPosition", i, ": ", topPosition);
    //     //     // console.log(previousPositionY);
    //     //     // console.log("sectionOuterHeight", i, ": ", sectionOuterHeight);
    //     // }
    //     // previousPositionY2 = currentPositionY2;
    // }

    // Collapse navbar menu after click
    function collapseNavbarAfterClick() {
        $(".navbar-nav>a").on("click", function() {
            $(".navbar-collapse").collapse("hide");
        });
    }

    // Hide/Show navbar on scroll
    var previousPositionY = $(document).scrollTop();

    function changeNavbar() {
        var currentPositionY = $(document).scrollTop();
        // console.log(currentPositionY);
        var heightNavbar = $("#navbar1").outerHeight();

        if (currentPositionY >= previousPositionY) {
            $("#navbar1").css("top", -heightNavbar);
        } else {
            $("#navbar1").css("top", 0);
        }

        if (currentPositionY > heightNavbar + 10) {
            $("#navbar1").css("background", "rgba(252, 251, 250, 0.98)");
        } else {
            $("#navbar1").css("background", "rgba(0, 0, 0, 0)");
        }
        previousPositionY = currentPositionY;
    }

    // Form submission w/o redirecting
    function formSubmissionWORedirect() {
        $("#contactForm").submit(function() {
            var formdata = $(this).serialize();
            $.ajax({
                type: "POST",
                url: "contact.php",
                data: formdata
            });
            // Reset form after submission
            $("#contactForm")[0].reset();
            $("#contactFormSubmit").blur();
            $("#contactFormSuccessMessage").css("display", "inline");
            return false;
        });
    }
})();

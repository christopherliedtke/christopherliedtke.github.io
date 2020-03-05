(function() {
    $(document).ready(function() {
        formSubmissionWORedirect();
        collapseNavbarAfterClick();
        animateBlock();
    });

    $(window).resize(function() {});

    $(window).scroll(function() {
        changeNavbar();
        animateBlock();
        // jumpToSection();
    });

    // #Toggle button on click
    var toggleButton = $('.toggle-button');
    var flipCard = $('.flip-card');

    toggleButton.click(function() {
        toggleButton.each(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).blur();
            } else {
                $(this).addClass('active');
            }
        });
        flipCard.each(function() {
            if ($(this).hasClass('hidden')) {
                $(this).removeClass('hidden');
            } else {
                $(this).addClass('hidden');
            }
        });
    });

    // #Collapse navbar menu after click
    function collapseNavbarAfterClick() {
        $('.navbar-nav>a').on('click', function() {
            $('.navbar-collapse').collapse('hide');
        });
    }

    // #Hide/Show navbar on scroll
    var previousPositionY = $(document).scrollTop();

    function changeNavbar() {
        var currentPositionY = $(document).scrollTop();
        // console.log(currentPositionY);
        var heightNavbar = $('#navbar1').outerHeight();

        if (currentPositionY >= previousPositionY) {
            $('#navbar1').css('top', -heightNavbar);
        } else {
            $('#navbar1').css('top', 0);
        }

        if (currentPositionY > heightNavbar + 10) {
            $('#navbar1').css('background', 'rgba(252, 251, 250, 0.98)');
        } else {
            $('#navbar1').css('background', 'rgba(0, 0, 0, 0)');
        }
        previousPositionY = currentPositionY;
    }

    // #Animate elements with .animateblock
    var $animatedElements = $('.animateblock');

    function animateBlock() {
        // Get window height, document height, current distande from top of window
        var windowHeight = $(window).height();
        var documentHeight = $(document).height();
        var winTop = $(window).scrollTop();
        // console.log(winTop);

        // loop through each item to check when it animates
        $animatedElements.each(function() {
            var $element = $(this);
            // Get element's distance from top of page in pixels
            var elementOffsetTop = $element.offset().top;
            // console.log(elementOffsetTop);

            if ($element.hasClass('animated') && winTop > elementOffsetTop - windowHeight * 0.75) {
                return true;
            } else if ($element.hasClass('animated') && winTop < elementOffsetTop - windowHeight * 0.75) {
                $element.removeClass('animated');
                return true;
            } else if (winTop > elementOffsetTop - windowHeight * 0.75) {
                $element.addClass('animated');
            }
        });
    }

    // #Form submission w/o redirecting
    function formSubmissionWORedirect() {
        $('#contactForm').submit(function() {
            var formdata = $(this).serialize();
            $.ajax({
                type: 'POST',
                url: 'https://formspree.io/xdozaolp',
                data: { message: formdata },
                dataType: 'json',
                success: function() {
                    // Reset form after submission
                    $('#contactForm')[0].reset();
                    $('#contactFormSubmit').blur();
                    $('#contactFormErrorMessage').css('display', 'none');
                    $('#contactFormSuccessMessage').css('display', 'inline-block');
                },
                error: function(error) {
                    console.log(error);

                    $('#contactFormErrorMessage').css('display', 'inline-block');
                }
            });
            return false;
        });
    }

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
})();

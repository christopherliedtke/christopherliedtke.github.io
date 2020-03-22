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

    // #Typewriter
    var TypeWriter = function(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    };

    // Type Method
    TypeWriter.prototype.type = function() {
        // Current index of word
        var current = this.wordIndex % this.words.length;
        // Get full text of current word
        var fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        var typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;

            if (this.wait === 9999) {
                this.txtElement.firstChild.classList.remove('txt');
                return;
            }

            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    };

    // Init On DOM Load
    document.addEventListener('DOMContentLoaded', init);

    // Init App
    function init() {
        var txtElement = document.querySelector('.txt-type');
        var words = JSON.parse(txtElement.getAttribute('data-words'));
        var wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }
})();

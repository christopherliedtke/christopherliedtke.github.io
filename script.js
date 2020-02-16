(function() {
    collapseNavbarAfterClick();
    // Collapse navbar menu after click
    function collapseNavbarAfterClick() {
        $(".navbar-nav>a").on("click", function() {
            $(".navbar-collapse").collapse("hide");
        });
    }
})();

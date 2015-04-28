$(function () {
    //Load metisMenu
    $('#sideMenu').metisMenu();
});

//Set the page height.And resize window.
$(function () {
    function setPageWrapper() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        var height = height - topOffset - 1;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    }

    setPageWrapper();

    $(window).bind("load resize", function () {
        setPageWrapper();
    });
});

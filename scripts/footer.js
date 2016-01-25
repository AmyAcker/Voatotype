// Text toggling
$.fn.toggleText = function(t1, t2){
  if (this.text() == t1) this.text(t2);
  else                   this.text(t1);
  return this;
};




// Open and close sidebar
$(".jsOpenSidebar").click(function () {
    $("body").toggleClass("sidebar_-is-open");

    $(".main, .footer").click (function () {
        $("body").removeClass("sidebar_-is-open");
    });
});




// Better-looking file upload input
$(".jsUploadInputHidden").change(function () {
    var filename = $(this).val();
    var $displayFilename = $(this).parent().find(".jsUploadInputFilename");

    $displayFilename.text(filename);
});




// Expand and collapse comments
$(".jsCollapseThisComment").click(function (e) {
    var container = "box--comment";
    var $thisComment = $(this).closest("." + container);

    e.preventDefault();
    $thisComment.toggleClass(container + "_-is-collapsed");
    $(this).toggleText("[+]", "[-]");
});




// Expand and collapse submission media
(function ( $ ) {
    $.fn.expandSubmission = function () {
        this.addClass("box--submission_-is-expanded");
        this.find(".jsExpandThisSubmission").html("collapse");
        return this;
    };
}( jQuery ));

(function ( $ ) {
    $.fn.collapseSubmission = function () {
        this.removeClass("box--submission_-is-expanded");
        this.find(".jsExpandThisSubmission").html("expand");
        return this;
    };
}( jQuery ));

$(".jsExpandThisSubmission").click(function (e) {
    var $targetSubmission = $(this).parents(".box--submission");

    e.preventDefault();
    if ($targetSubmission.hasClass("box--submission_-is-expanded")) {
        $targetSubmission.collapseSubmission();
    } else {
        $targetSubmission.expandSubmission();
    }
});

$(".jsExpandAllSubmissions").click(function (e) {
    var $targetSubmission = $(this).closest(".box--page-section").find(".box--submission");

    e.preventDefault();
    if ($(this).hasClass("jsButtonActive")) {
        $targetSubmission.collapseSubmission();
        $(this).html("Expand all");
        $(this).removeClass("jsButtonActive");
    } else {
        $targetSubmission.expandSubmission();
        $(this).html("Collapse all");
        $(this).addClass("jsButtonActive");
    }
});




// Open and close modals
$(".jsOpenModal").click(function (e) {

    var targetModalID = $(this).attr("data-open-modal");
    var wrapper = "body__backdrop";
    var content = "box--modal";
    var $wrapper = $("#" + wrapper);
    var $content = $("." + content);

    e.preventDefault();
    $("body").addClass("body_-modal-is-open");
    $("#" + targetModalID).addClass(content + "_-is-open");
    $("#" + targetModalID + " .input__input:first").focus();

    $wrapper.click(function (e) {
        // if click is outside content box
        if (!$(e.target).closest($content).length) {
            closeModal();
        }
    });

    function closeModal() {
        $("body").removeClass("body_-modal-is-open");
        $content.removeClass(content + "_-is-open");
    }

    $(".jsCloseModal").click(function (e) {
        e.preventDefault();
        closeModal();
    });

    $(document).keydown(function(e){
        if (e.keyCode == 27) {
            closeModal();
        }
    });
});




// Launcher
$(document).ready(function () {
    var $launchButton = $("#header__logo");
    var container = "launcher";
    var $container = $("#" + container);
    var $input = $("#" + container + "__input");
    var list = container + "__list";

    function resetLauncher () {
        $(document).unbind();
        $("body").removeClass("body_-launcher-is-open");
        $input.blur();
        $input.val("");
        $("#launcher__list > li").show();
        $container.css("min-height", "none");

        // Open with click / touch
        $launchButton.bind("click touchstart touchend", function (e) {
            e.preventDefault();
            openLauncher();
        });

        // Open with keyboard shortcut ("v")
        $(document).keydown(function(e){
            if (e.keyCode == 86) {
                if ($("input, textarea").is(":focus")) return;
                openLauncher();
                return false; // prevent initial "v" from being typed into input
            }
        });
    }

    function openLauncher () {
        $("body").addClass("body_-" + container + "-is-open");
        $input.fastLiveFilter("#" + list);
        $input.focus();
        $launchButton.unbind();

        // Set launcher height
        var height = $container.innerHeight();
        $container.css("min-height", height);

        // Reset on click or touch backdrop
        $("#body__backdrop").bind("click touchstart touchend", function () {
            resetLauncher();
        });

        // Reset on escape key
        $(document).keydown(function(e){
            if (e.keyCode == 27) {
                resetLauncher();
            }
        });

        // Reset on unload
        $(window).unload(resetLauncher);


        // Go to...
        $(document).keydown( function(event) {
            var target = $("#" + list + "> li:visible > a").attr("href");

            // target/new/ in new tab (shift + ctrl + enter)
            if ( event.which === 13 && event.shiftKey && event.ctrlKey ) {
                event.preventDefault();
                window.open(target + "new/", "_blank");
                resetLauncher();
                return;
            }

            // target/new/ in this tab (shift + enter)
            if ( event.which === 13 && event.shiftKey ) {
                event.preventDefault();
                window.location = target + "new/";
            }

            // target/ in new tab (ctrl + enter)
            if ( event.which === 13 && event.ctrlKey ) {
                event.preventDefault();
                window.open(target, "_blank");
                resetLauncher();
            }
        });

        // target/ in this tab (enter / mobile keyboard submit button)
        $container.submit(function (event) {
            var target = $("#" + list + "> li:visible > a").attr("href");
            event.preventDefault();
            window.location = target;
        });
    }

    resetLauncher();



});

$(document).ready(function () {

    $('.js-answer').on('click', function () {
        var thisBlock = $(this).closest('.comm-inner');
        var makeComment = $('#make-comment');
        makeComment.remove();
        thisBlock.after(makeComment);
        makeComment.after('<div class="clearfix"></div>');

    });


});

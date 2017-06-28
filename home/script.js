/**
 * Created by AHMED on 05-01-2017.
 */
$(window).resize(function () {
    if ($(this).width() < 768) {
        $("#group-list").hide();
    } else {
        $("#group-list").show();
    }
});


$(function () {
    function reposition() {
        var modal = $(this),
            dialog = modal.find('.modal-dialog');
        modal.css('display', 'block');
        dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
    }

    $('.modal').on('show.bs.modal', reposition);
    $(window).on('resize', function () {
        $('.modal:visible').each(reposition);
    });

});

function d(url, data) {
    $.post(url, data)
        .done(function (data) {
            console.log(data);
        });
}


/****************** Croppie *********************/


$(function () {

    var objects = $('.stars');
    objects.combostars();
    objects.on('change', function () {
        //console.log(($(this).val()));
    });

});

/*
 var uploadCrop = $('#upload-demo').croppie({
 enableExif: true,
 viewport: {
 width: 200,
 height: 200,
 type: 'circle'
 },
 boundary: {
 width: 300,
 height: 300
 }
 });

 uploadCrop.croppie('bind', {
 url: '/images/bann.jpg'
 });

 uploadCrop.result('blob').then(function(blob) {
 console.log(blob);
 });
 */

function upload() {

}

var applyMEditor = function (editorSelector) {
    var editor = new MediumEditor(editorSelector, {
        buttons: ['b', 'i', 'u', 'super', 'sub'],
        extensions: {
            'i': new MediumButton({
                label: '<i>I</i>',
                start: '<i>',
                end: '</i>'
            }),
            'b': new MediumButton({
                label: '<b>B</b>',
                start: '<b>',
                end: '</b>'
            }),
            'u': new MediumButton({
                label: '<u>U</u>',
                start: '<u>',
                end: '</u>'
            }),
            'super': new MediumButton({
                label: 'x<sup>2</sup>',
                start: '<sup>',
                end: '</sup>',
                action: function (html, mark) {
                    return html;
                }
            }),
            'sub': new MediumButton({
                label: 'x<sub>2</sub>',
                start: '<sub>',
                end: '</sub>'
            })
        }
    });
    return true;
};

var focusMEditor = function (editorSelector) {
    $(editorSelector + ' > div.editable').focus();
    $('body').animate({
        scrollTop: $(editorSelector).offset().top - 100
    }, 1000);
};

var openQCommentBox = function (qId) {
    $('#qcomment' + qId).remove();
    $('#qblock').append(
        '<div id="qcomment' + qId + '" class="qframe comment">' +
        '<div class="content editable" data-placeholder="Comment"></div>' +
        '<ul class="btn-group pull-right">' +
        '<li class="btn btn-default btn-sm" ng-click="sendQComment(' + qId + ')">Post</li>' +
        '<li class="btn btn-default btn-sm" onclick="clearQCommentBox(' + qId + ')">Clear</li>' +
        '<li class="btn btn-default btn-sm" onclick="closeQCommentBox(' + qId + ')">Cancel</li>' +
        '</ul>' +
        '<div class="clearfix"></div>' +
        '</div>'
    );
    applyMEditor('#qcomment' + qId + ' > div.editable');
    focusMEditor('#qcomment' + qId);
};

var closeQCommentBox = function (qId) {
    $('#qcomment' + qId).remove();
};

var clearQCommentBox = function (qId) {
    var ob = $('#qcomment' + qId + ' > div.editable');
    ob.html('');
    ob.focus();
    ob.blur();
    ob.focus();
};

var openACommentBox = function (aId) {
    //console.log(aId);

    $('#acomment' + aId).remove();
    $('#ansid' + aId).append(
        '<div id="acomment' + aId + '" class="qframe comment">' +
        '<div class="content editable" data-placeholder="Comment"></div>' +
        '<ul class="btn-group pull-right">' +
        '<li class="btn btn-default btn-sm" ng-click="sendAComment(' + aId + ')">Post</li>' +
        '<li class="btn btn-default btn-sm" onclick="clearACommentBox(' + aId + ')">Clear</li>' +
        '<li class="btn btn-default btn-sm" onclick="closeACommentBox(' + aId + ')">Cancel</li>' +
        '</ul>' +
        '<div class="clearfix"></div>' +
        '</div>'
    );
    applyMEditor('#acomment' + aId + ' > div.editable');
    focusMEditor('#acomment' + aId);
};

var closeACommentBox = function (aId) {
    $('#acomment' + aId).remove();
};

var clearACommentBox = function (aId) {
    var ob = $('#acomment' + aId + ' > div.editable');
    ob.html('');
    ob.focus();
    ob.blur();
    ob.focus();
};

var openSolutionBox = function (qId) {
    $('#soln' + qId).remove();
    $('#ablock').append(
        '<div id="soln' + qId + '" class="qframe answer">' +
        '<div class="content editable" data-placeholder="Solution"></div>' +
        '<ul class="btn-group pull-right">' +
        '<li class="btn btn-default btn-sm" ng-click="sendSolution(' + qId + ')">Post</li>' +
        '<li class="btn btn-default btn-sm" onclick="clearSolutionBox(' + qId + ')">Clear</li>' +
        '<li class="btn btn-default btn-sm" onclick="closeSolutionBox(' + qId + ')">Cancel</li>' +
        '</ul>' +
        '<div class="clearfix"></div>' +
        '</div>'
    );
    applyMEditor('#soln' + qId + ' > div.editable');
    focusMEditor('#soln' + qId);
};

var closeSolutionBox = function (qId) {
    $('#soln' + qId).remove();
};

var clearSolutionBox = function (qId) {
    var ob = $('#soln' + qId + ' > div.editable');
    ob.html('');
    ob.focus();
    ob.blur();
    ob.focus();
};


$(function () {
    $("#toggleGroupButton").click(function () {
        $("#group-list").animate({width: 'toggle'}, 0);
    });
});
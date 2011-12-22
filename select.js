(function ($) {
    $.fn.selectFix = function (options) {
        $(this).each(function () {

            var settings = $.extend({ 'extraStyles': true, 'arrow': true, 'arrowWidth': 20, 'arrowContent': '', 'className': 'select', 'classText': 'text', 'classArrow': 'arrow', 'classFocus': 'focused', 'classEnd': 'selected' }, options);

            var className = "." + settings.className;
            var selectField = $(this);

            var initVal;
            if (selectField.children("option:selected").size() > 0) {
                initVal = selectField.children("option:selected").eq(0).text();
            } else {
                initVal = selectField.children("option").eq(0).text();
            }

            var height = selectField.css("height").replace("px", "");
            var width = selectField.css("width").replace("px", "");

            var arrow;
            var arrowWidth = String(settings.arrowWidth);

            if (arrowWidth.indexOf('px') < 0 && arrowWidth.indexOf('%')<0) {
                arrowWidth = arrowWidth+"px";
            }
            console.log(arrowWidth);
            if (settings.arrow == true) {
                arrow = "<span style=\"display: block; height: " + height + "px; position: absolute; right: 0; width: " + arrowWidth + ";\" class=\"" + settings.classArrow + "\">" + settings.arrowContent + "</span>";
            } else {
                arrow = "";
            }

            selectField.css({ "left": 0, "position": "absolute", "top": 0, "z-index": 1 }).wrap("<div class=\"" + settings.className + "\"style=\"overflow: hidden; position: relative; height: " + height + "px; width: " + width + "px;\"></div>").closest(className).append("<div class=\"select\"style=\"height: " + height + "px; left: 0; position: absolute; top: 0; width: " + width + "px; z-index: 0;\"><span style=\"display: block;  left: 0; line-height:" + height + "px; position: absolute; top: 0; width: " + width + "px;\" class=\"" + settings.classText + "\">" + initVal + "</span>" + arrow + "</div>");
            selectField.closest("select").css({ "opacity": 0, "width": width });

            selectField.bind({
                change: function () {
                    selectField.siblings(className).children("." + settings.classText).html(selectField.children("option[value=" + selectField.val() + "]").text());
                    if (settings.extraStyles == true) {
                        selectField.parent(className).addClass(settings.classEnd).removeClass(settings.classFocus); //optional styling to be used once a selection has been made
                    }
                    if (selectField.val() == '' || selectField.val() == undefined || selectField.val() == null) {
                        selectField.parent(className).removeClass(settings.classEnd);
                    }
                },
                focus: function () {
                    if (settings.extraStyles == true) {
                        selectField.parent(className).addClass(settings.classFocus);
                    }
                },
                blur: function () {
                    if (settings.extraStyles == true) {
                        selectField.parent(className).removeClass(settings.classFocus);
                    }
                }
            });

        });
    }
})(jQuery)
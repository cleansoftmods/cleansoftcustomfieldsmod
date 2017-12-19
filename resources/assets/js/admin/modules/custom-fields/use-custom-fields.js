class WebEd {
    /**
     * Detect IE
     * @param callback
     */
    static isIE(callback) {
        let isIE8 = !!navigator.userAgent.match(/MSIE 8.0/);
        let isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
        let isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);
        let isIE11 = !!navigator.userAgent.match(/rv:11.0/);

        if (isIE10) {
            $('html').addClass('ie10'); // detect IE10 version
        }

        if (isIE11) {
            $('html').addClass('ie11'); // detect IE11 version
        }

        if (isIE9) {
            $('html').addClass('ie9'); // detect IE9 version
        }

        if (isIE8) {
            $('html').addClass('ie8'); // detect IE8 version
        }

        if (isIE11 || isIE10 || isIE9 || isIE8) {
            $('html').addClass('ie'); // detect IE version
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    /**
     * Handle select media box
     */
    static handleSelectMediaBox() {
        let $body = $('body');
        $body.on('click', '.show-add-media-popup', function (event) {
            event.preventDefault();
            let $isFileBrowser = '';
            let fileType = 'image';

            document.currentMediaBox = $(this).closest('.select-media-box');
            document.mediaModal = $('#select_media_modal');

            if ($(this).hasClass('select-file-box')) {
                $isFileBrowser = '&type=file';
                fileType = 'file';
            }
            if (fileType == 'file') {
                document.mediaModal.find('.nav-tabs .external-image').hide();
                document.mediaModal.find('.nav-tabs .external-file').show();
            } else {
                document.mediaModal.find('.nav-tabs .external-image').show();
                document.mediaModal.find('.nav-tabs .external-file').hide();
            }

            $('#select_media_modal .modal-body .iframe-container').html('<iframe src="' + FILE_MANAGER_URL + '?method=standalone' + $isFileBrowser + '"></iframe>');
            document.mediaModal.modal('show');
        });
        $body.on('click', '.select-media-box .remove-image', function (event) {
            event.preventDefault();
            document.currentMediaBox = $(this).closest('.select-media-box');
            document.currentMediaBox.find('img.img-responsive').attr('src', 'admin/images/no-image.png');
            document.currentMediaBox.find('.input-file').val('');
        });
        $body.on('click', '.select-media-modal-external-asset .btn', function (event) {
            event.preventDefault();
            let $current = $(this);
            let $textField = $current.closest('.select-media-modal-external-asset').find('.input-asset');
            let url = Helpers.asset($textField.val());
            let fileType = ($current.closest('.select-media-modal-external-asset').attr('id') == 'select_media_modal_external_file') ? 'file' : 'image';

            let $modal = document.mediaModal;
            let $target = document.currentMediaBox;
            if (fileType == 'file') {
                $target.find('a .title').html(url);
            } else {
                $target.find('.img-responsive').attr('src', url);
            }

            $target.find('.input-file').val(url);
            $modal.find('iframe').remove();
            $modal.modal('hide');
            $textField.val('');
        });
    }

    /**
     * Show notifications
     * @param message
     * @param type
     * @param options
     */
    static showNotification(message, type, options) {
        options = options || {};

        switch (type) {
            case 'success': {
                type = 'lime';
            }
                break;
            case 'info': {
                type = 'teal';
            }
                break;
            case 'warning': {
                type = 'tangerine';
            }
                break;
            case 'danger': {
                type = 'ruby';
            }
                break;
            case 'error': {
                type = 'ruby';
            }
                break;
            default: {
                type = 'ebony';
            }
                break;
        }
        $.notific8('zindex', 11500);

        let settings = $.extend(true, {
            theme: type,
            sticky: false,
            horizontalEdge: 'bottom',
            verticalEdge: 'right',
            life: 10000
        }, options);

        if (message instanceof Array) {
            message.forEach(function (value) {
                $.notific8($.trim(value), settings);
            });
        }
        else {
            $.notific8($.trim(message), settings);
        }
    }

    /**
     * Handle slim scroll
     * @param $element
     * @returns {null}
     */
    static slimScroll($element) {
        if (!$().slimScroll) {
            return null;
        }

        $element.each(function () {
            if ($(this).attr("data-initialized")) {
                return null; // exit
            }
            let height;

            if ($(this).attr("data-height")) {
                height = $(this).attr("data-height");
            } else {
                height = $(this).css('height');
            }

            $(this).slimScroll({
                allowPageScroll: true, // allow page scroll when the element scroll is ended
                size: '7px',
                color: ($(this).attr("data-handle-color") ? $(this).attr("data-handle-color") : '#bbb'),
                wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                railColor: ($(this).attr("data-rail-color") ? $(this).attr("data-rail-color") : '#eaeaea'),
                position: 'right',
                height: height,
                alwaysVisible: $(this).attr("data-always-visible") == "1",
                railVisible: $(this).attr("data-rail-visible") == "1",
                disableFadeOut: true
            });

            $(this).attr("data-initialized", "1");
        });
    }

    /**
     * Distroy slim scroll
     * @param $element
     */
    static destroySlimScroll($element) {
        if (!$().slimScroll) {
            return;
        }

        $element.each(function () {
            if ($(this).attr("data-initialized") === "1") { // destroy existing instance before updating the height
                $(this).removeAttr("data-initialized");
                $(this).removeAttr("style");

                let attrList = {};

                // store the custom attribures so later we will reassign.
                if ($(this).attr("data-handle-color")) {
                    attrList["data-handle-color"] = $(this).attr("data-handle-color");
                }
                if ($(this).attr("data-wrapper-class")) {
                    attrList["data-wrapper-class"] = $(this).attr("data-wrapper-class");
                }
                if ($(this).attr("data-rail-color")) {
                    attrList["data-rail-color"] = $(this).attr("data-rail-color");
                }
                if ($(this).attr("data-always-visible")) {
                    attrList["data-always-visible"] = $(this).attr("data-always-visible");
                }
                if ($(this).attr("data-rail-visible")) {
                    attrList["data-rail-visible"] = $(this).attr("data-rail-visible");
                }

                $(this).slimScroll({
                    wrapperClass: ($(this).attr("data-wrapper-class") ? $(this).attr("data-wrapper-class") : 'slimScrollDiv'),
                    destroy: true
                });

                let the = $(this);

                // reassign custom attributes
                $.each(attrList, function (key, value) {
                    the.attr(key, value);
                });
            }
        });
    }

    /**
     * Block UI
     * @param options
     */
    static blockUI(options) {
        options = $.extend(true, {
            animate: false,
            iconOnly: true,
            textOnly: true,
            boxed: true,
            message: 'Loading...',
            target: undefined,
            zIndex: 1000,
            centerY: false,
            overlayColor: '#555',
        }, options);

        let html = '';
        if (options.animate) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '">' + '<div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + '</div>';
        } else if (options.iconOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="admin/images/global/loading-spinner-grey.gif" align=""></div>';
        } else if (options.textOnly) {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        } else {
            html = '<div class="loading-message ' + (options.boxed ? 'loading-message-boxed' : '') + '"><img src="admin/images/global/loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;' + (options.message ? options.message : 'LOADING...') + '</span></div>';
        }

        if (options.target) { // element blocking
            let el = $(options.target);
            if (el.height() <= ($(window).height())) {
                options.cenrerY = true;
            }
            el.block({
                message: html,
                baseZ: options.zIndex,
                centerY: options.cenrerY,
                css: {
                    top: '10%',
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.boxed ? 0.05 : 0.1,
                    cursor: 'wait'
                }
            });
        } else { // page blocking
            $.blockUI({
                message: html,
                baseZ: options.zIndex,
                css: {
                    border: '0',
                    padding: '0',
                    backgroundColor: 'none'
                },
                overlayCSS: {
                    backgroundColor: options.overlayColor,
                    opacity: options.boxed ? 0.05 : 0.1,
                    cursor: 'wait'
                }
            });
        }
    }

    /**
     * Unblock UI
     * @param $target
     */
    static unblockUI($target) {
        if (!$target instanceof jQuery) {
            $target = $($target);
        }
        $target.unblock({
            onUnblock: function () {
                $target.css('position', '');
                $target.css('zoom', '');
            }
        });
        $.unblockUI();
    }

    /**
     * Render a WYSIWYG editor
     * @param $elements
     * @param config
     */
    static wysiwyg($elements, config) {

        window.initializedEditor = window.initializedEditor || 0;

        $elements.each(function () {
            let $_self = $(this);

            $_self.attr('id', 'editor_initialized_' + window.initializedEditor);

            window.initializedEditor++;

            setTimeout(function () {
                config = $.extend(true, {
                    forcePasteAsPlainText: true,
                    extraPlugins: 'codeTag,insertpre',
                    allowedContent: true,
                    htmlEncodeOutput: false,
                    protectedSource: [
                        /<\?[\s\S]*?\?>/g,
                        /<%[\s\S]*?%>/g,
                        /(<asp:[^\>]+>[\s|\S]*?<\/asp:[^\>]+>)|(<asp:[^\>]+\/>)/gi,
                    ],
                    filebrowserBrowseUrl: FILE_MANAGER_URL + '?method=ckeditor',
                    height: $_self.data('height') || '400px',
                    toolbar: $_self.data('toolbar') || 'full',
                }, config);

                config = $.extend(true, config, $_self.data());

                if (config.toolbar === 'basic') {
                    config.toolbar = [['mode', 'Source', 'Image', 'TextColor', 'BGColor', 'Styles', 'Format', 'Font', 'FontSize', 'CreateDiv', 'PageBreak', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'RemoveFormat']];
                }

                CKEDITOR.replace($_self.attr('id'), config);
            }, 100);
        });
    }

    static wysiwygGetContent($element) {
        return CKEDITOR.instances[$element.attr('id')].getData();
    }

    /**
     * Confirmation
     */
    static confirmation() {
        if (!$().confirmation) {
            return;
        }
        $('[data-toggle=confirmation]').each(function () {
            let $current = $(this);
            $('[data-toggle=confirmation]').confirmation({
                container: 'body',
                btnOkClass: 'btn btn-sm green',
                btnCancelClass: 'btn btn-sm red-sunglo',
                placement: $current.data('placement') || 'left',
                btnOkLabel: 'OK',
                btnCancelLabel: 'Cancel',
                popout: true,
                singleton: true
            });
        });
    }

    /**
     * String to slug
     * @param text
     * @param separator
     * @returns {string}
     */
    static stringToSlug(text, separator) {
        separator = separator || '-';
        return text.toString()
        /*To lower case*/
            .toLowerCase()
            /*Vietnamese string*/
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
            .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
            .replace(/đ/gi, 'd')
            /*Replace spaces with -*/
            .replace(/\s+/g, separator)
            /*Remove all non-word chars*/
            .replace(/[^\w\-]+/g, '')
            /*Replace multiple - with single -*/
            .replace(/\-\-+/g, separator)
            /*Trim - from start of text*/
            .replace(/^-+/, '')
            /*Trim - from end of text*/
            .replace(/-+$/, '');
    }

    /**
     * Change url when user change tab
     */
    static tabChangeUrl() {
        $('body').on('click', '.tab-change-url a[data-toggle="tab"]', function (event) {
            window.history.pushState('', '', $(this).attr('href'));
        });
    }

    /**
     * Tags input
     * @param $element
     * @param options
     */
    static tagsInput($element, options) {
        "use strict";
        options = $.extend(true, {
            'tagClass': 'label label-default'
        }, options);
        if (!$element || !$element instanceof jQuery) {
            $element = $('.js-tags-input');
        }
        if ($element.length) {
            $element.tagsinput(options);
        }
    }


    /**
     * Scroll to top
     * @param event
     */
    static scrollToTop(event) {
        if (event) {
            event.preventDefault();
        }
        $('html, body').stop().animate({
            scrollTop: 0
        }, 800);
    }

    /**
     * Show loading
     */
    static showLoading() {
        $('body').addClass('on-loading');
    }

    /**
     * Hide loading
     */
    static hideLoading() {
        $('body').removeClass('on-loading');
    }

    static fixedTopFormActions() {
        if ($('#waypoint').length > 0) {
            new Waypoint({
                element: document.getElementById('waypoint'),
                handler: function (direction) {
                    if (direction == 'down') {
                        $('.form-actions-fixed-top').removeClass('hidden');
                    } else {
                        $('.form-actions-fixed-top').addClass('hidden');
                    }
                }
            });
        }
    }

    /**
     * Init ajax
     */
    static initAjax() {
        WebEd.confirmation();
        WebEd.tagsInput();
        WebEd.slimScroll($('.scroller'));
    }
}


class UseCustomFields {
    constructor() {
        this.$body = $('body');

        /**
         * Where to show the custom field elements
         */
        this.$_UPDATE_TO = $('#custom_fields_container');
        /**
         * Where to export json data when submit form
         */
        this.$_EXPORT_TO = $('#custom_fields_json');

        this.CURRENT_DATA = Helpers.jsonDecode(this.base64Helper().decode(this.$_EXPORT_TO.text()), []);

        if (this.CURRENT_DATA) {
            this.handleCustomFields();
            this.exportData();
        }
    }

    base64Helper() {
        if (!this.base64) {
            let Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (e) {
                    let t = "";
                    let n, r, i, s, o, u, a;
                    let f = 0;
                    e = Base64._utf8_encode(e);
                    while (f < e.length) {
                        n = e.charCodeAt(f++);
                        r = e.charCodeAt(f++);
                        i = e.charCodeAt(f++);
                        s = n >> 2;
                        o = (n & 3) << 4 | r >> 4;
                        u = (r & 15) << 2 | i >> 6;
                        a = i & 63;
                        if (isNaN(r)) {
                            u = a = 64
                        } else if (isNaN(i)) {
                            a = 64
                        }
                        t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
                    }
                    return t
                },
                decode: function (e) {
                    let t = "";
                    let n, r, i;
                    let s, o, u, a;
                    let f = 0;
                    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                    while (f < e.length) {
                        s = this._keyStr.indexOf(e.charAt(f++));
                        o = this._keyStr.indexOf(e.charAt(f++));
                        u = this._keyStr.indexOf(e.charAt(f++));
                        a = this._keyStr.indexOf(e.charAt(f++));
                        n = s << 2 | o >> 4;
                        r = (o & 15) << 4 | u >> 2;
                        i = (u & 3) << 6 | a;
                        t = t + String.fromCharCode(n);
                        if (u != 64) {
                            t = t + String.fromCharCode(r)
                        }
                        if (a != 64) {
                            t = t + String.fromCharCode(i)
                        }
                    }
                    t = Base64._utf8_decode(t);
                    return t
                },
                _utf8_encode: function (e) {
                    e = e.replace(/rn/g, "n");
                    let t = "";
                    for (let n = 0; n < e.length; n++) {
                        let r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r)
                        } else if (r > 127 && r < 2048) {
                            t += String.fromCharCode(r >> 6 | 192);
                            t += String.fromCharCode(r & 63 | 128)
                        } else {
                            t += String.fromCharCode(r >> 12 | 224);
                            t += String.fromCharCode(r >> 6 & 63 | 128);
                            t += String.fromCharCode(r & 63 | 128)
                        }
                    }
                    return t
                },
                _utf8_decode: function (e) {
                    let t = "";
                    let n = 0;
                    let r = 0,
                        c1 = 0,
                        c2 = 0;
                    while (n < e.length) {
                        r = e.charCodeAt(n);
                        if (r < 128) {
                            t += String.fromCharCode(r);
                            n++
                        } else if (r > 191 && r < 224) {
                            c2 = e.charCodeAt(n + 1);
                            t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                            n += 2
                        } else {
                            c2 = e.charCodeAt(n + 1);
                            let c3 = e.charCodeAt(n + 2);
                            t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                            n += 3
                        }
                    }
                    return t
                }
            };

            this.base64 = Base64;
        }

        /**
         * @doc
         * There are 2 methods: encode & decode
         */

        return this.base64;
    }


    handleCustomFields() {
        let _self = this;

        let repeaterFieldAdded = 0;
        /**
         * The html template of custom fields
         */
        let FIELD_TEMPLATE = {
            fieldGroup: $('#_render_customfield_field_group_template').html(),
            globalSkeleton: $('#_render_customfield_global_skeleton_template').html(),
            text: $('#_render_customfield_text_template').html(),
            number: $('#_render_customfield_number_template').html(),
            email: $('#_render_customfield_email_template').html(),
            password: $('#_render_customfield_password_template').html(),
            textarea: $('#_render_customfield_textarea_template').html(),
            checkbox: $('#_render_customfield_checkbox_template').html(),
            radio: $('#_render_customfield_radio_template').html(),
            select: $('#_render_customfield_select_template').html(),
            image: $('#_render_customfield_image_template').html(),
            file: $('#_render_customfield_file_template').html(),
            wysiwyg: $('#_render_customfield_wysiswg_template').html(),
            repeater: $('#_render_customfield_repeater_template').html(),
            repeaterItem: $('#_render_customfield_repeater_item_template').html(),
            repeaterFieldLine: $('#_render_customfield_repeater_line_template').html()
        };

        let initWYSIWYG = function ($element, type) {
            WebEd.wysiwyg($element, {
                toolbar: type
            });
            return $element;
        };

        let initCustomFieldsBoxes = function (boxes, $appendTo) {
            boxes.forEach(function (box, indexBox) {
                let skeleton = FIELD_TEMPLATE.globalSkeleton;
                skeleton = skeleton.replace(/__type__/gi, box.type || '');
                skeleton = skeleton.replace(/__title__/gi, box.title || '');
                skeleton = skeleton.replace(/__instructions__/gi, box.instructions || '');

                let $skeleton = $(skeleton);
                let $data = registerLine(box);

                $skeleton.find('.meta-box-wrap').append($data);

                $skeleton.data('lcf-registered-data', box);

                $appendTo.append($skeleton);

                if (box.type === 'wysiwyg') {
                    initWYSIWYG($skeleton.find('.meta-box-wrap .wysiwyg-editor'), box.options.wysiwygToolbar || 'basic');
                }
            });
        };

        let registerLine = function (box) {
            let result = FIELD_TEMPLATE[box.type],
                $wrapper = $('<div class="lcf-' + box.type + '-wrapper"></div>');
            $wrapper.data('lcf-registered-data', box);
            switch (box.type) {
                case 'text':
                case 'number':
                case 'email':
                case 'password':
                    result = result.replace(/__placeholderText__/gi, box.options.placeholderText || '');
                    result = result.replace(/__value__/gi, box.value || box.options.defaultValue || '');
                    break;
                case 'textarea':
                    result = result.replace(/__rows__/gi, box.options.rows || 3);
                    result = result.replace(/__placeholderText__/gi, box.options.placeholderText || '');
                    result = result.replace(/__value__/gi, box.value || box.options.defaultValue || '');
                    break;
                case 'image':
                    result = result.replace(/__value__/gi, box.value || box.options.defaultValue || '');
                    if (!box.value) {
                        let defaultImage = $(result).find('img').attr('data-default');
                        result = result.replace(/__image__/gi, defaultImage || box.options.defaultValue || '');
                    } else {
                        result = result.replace(/__image__/gi, box.value || box.options.defaultValue || '');
                    }
                    break;
                case 'file':
                    result = result.replace(/__value__/gi, box.value || box.options.defaultValue || '');
                    break;
                case 'select': {
                    let $result = $(result);
                    let choices = parseChoices(box.options.selectChoices);
                    choices.forEach(function (choice, index) {
                        $result.append('<option value="' + choice[0] + '">' + choice[1] + '</option>');
                    });
                    $result.val(Helpers.arrayGet(box, 'value', box.options.defaultValue));
                    $wrapper.append($result);
                    return $wrapper;
                }
                    break;
                case 'checkbox': {
                    let choices = parseChoices(box.options.selectChoices);
                    let boxValue = Helpers.jsonDecode(box.value);
                    choices.forEach(function (choice, index) {
                        let template = result.replace(/__value__/gi, choice[0] || '');
                        template = template.replace(/__title__/gi, choice[1] || '');
                        template = template.replace(/__checked__/gi, ($.inArray(choice[0], boxValue) != -1) ? 'checked' : '');
                        $wrapper.append($(template));
                    });
                    return $wrapper;
                }
                    break;
                case 'radio': {
                    let choices = parseChoices(box.options.selectChoices);
                    let isChecked = false;
                    choices.forEach(function (choice, index) {
                        let template = result.replace(/__value__/gi, choice[0] || '');
                        template = template.replace(/__id__/gi, box.id + box.slug + repeaterFieldAdded);
                        template = template.replace(/__title__/gi, choice[1] || '');
                        template = template.replace(/__checked__/gi, (box.value === choice[0]) ? 'checked' : '');
                        $wrapper.append($(template));

                        if (box.value === choice[0]) {
                            isChecked = true;
                        }
                    });
                    if (isChecked === false) {
                        $wrapper.find('input[type=radio]:first').prop('checked', true);
                    }
                    return $wrapper;
                }
                    break;
                case 'repeater': {
                    let $result = $(result);
                    $result.data('lcf-registered-data', box);

                    $result.find('> .repeater-add-new-field').html(box.options.buttonLabel || 'Add new item');
                    $result.find('> .sortable-wrapper').sortable();
                    registerRepeaterItem(box.items, box.value || [], $result.find('> .field-group-items'));
                    return $result;
                }
                    break;
                case 'wysiwyg': {
                    result = result.replace(/__value__/gi, box.value || '');

                    let $result = $(result);

                    $result.attr('data-toolbar', box.options.wysiwygToolbar || 'basic');
                }
                    break;
            }
            $wrapper.append($(result));
            return $wrapper;
        };

        let registerRepeaterItem = function (items, data, $appendTo) {
            $appendTo.data('lcf-registered-data', items);
            data.forEach(function (dataItem, indexData) {
                let indexCss = $appendTo.find('> .ui-sortable-handle').length + 1;
                let result = FIELD_TEMPLATE.repeaterItem;
                result = result.replace(/__position__/gi, indexCss);

                let $result = $(result);
                $result.data('lcf-registered-data', items);

                registerRepeaterFieldLine(items, dataItem, $result.find('> .field-line-wrapper > .field-group'));

                $appendTo.append($result);
            });
            return $appendTo;
        };

        let registerRepeaterFieldLine = function (items, data, $appendTo) {
            data.forEach(function (item, index) {
                repeaterFieldAdded++;

                let result = FIELD_TEMPLATE.repeaterFieldLine;
                result = result.replace(/__title__/gi, item.title || '');
                result = result.replace(/__instructions__/gi, item.instructions || '');

                let $result = $(result);
                let $data = registerLine(item);
                $result.data('lcf-registered-data', item);
                $result.find('> .repeater-item-input').append($data);

                $appendTo.append($result);

                if (item.type === 'wysiwyg') {
                    initWYSIWYG($result.find('> .repeater-item-input .wysiwyg-editor'), item.options.wysiwygToolbar || 'basic');
                }
            });
            return $appendTo;
        };

        let parseChoices = function (choiceString) {
            let choices = [];
            choiceString.split('\n').forEach(function (item, index) {
                let currentChoice = item.split(':');
                if (currentChoice[0] && currentChoice[1]) {
                    currentChoice[0] = currentChoice[0].trim();
                    currentChoice[1] = currentChoice[1].trim();
                }
                choices.push(currentChoice);
            });
            return choices;
        };

        /**
         * Remove field item
         */
        this.$body.on('click', '.remove-field-line', function (event) {
            event.preventDefault();
            let current = $(this);
            current.parent().animate({
                    opacity: 0.1
                },
                300, function () {
                    current.parent().remove();
                });
        });

        /**
         * Collapse field item
         */
        this.$body.on('click', '.collapse-field-line', function (event) {
            event.preventDefault();
            let current = $(this);
            current.toggleClass('collapsed-line');
        });

        /**
         * Add new repeater line
         */
        this.$body.on('click', '.repeater-add-new-field', function (event) {
            event.preventDefault();
            let $groupWrapper = $.extend(true, {}, $(this).prev('.field-group-items'));
            let registeredData = $groupWrapper.data('lcf-registered-data');

            repeaterFieldAdded++;

            registerRepeaterItem(registeredData, [registeredData], $groupWrapper);
        });

        /**
         * Init data when page loaded
         */
        this.CURRENT_DATA.forEach(function (group, indexGroup) {
            let groupTemplate = FIELD_TEMPLATE.fieldGroup;
            groupTemplate = groupTemplate.replace(/__title__/gi, group.title || '');

            let $groupTemplate = $(groupTemplate);

            initCustomFieldsBoxes(group.items, $groupTemplate.find('.meta-boxes-body'));

            $groupTemplate.data('lcf-field-group', group);

            _self.$_UPDATE_TO.append($groupTemplate);
        });
    }

    exportData() {
        let _self = this;

        let getFieldGroups = function () {
            let fieldGroups = [];

            $('#custom_fields_container').find('> .meta-boxes').each(function () {
                let $current = $(this);
                let currentData = $current.data('lcf-field-group');
                let $items = $current.find('> .meta-boxes-body > .meta-box');
                currentData.items = getFieldItems($items);
                fieldGroups.push(currentData);
            });
            return fieldGroups;
        };

        let getFieldItems = function ($items) {
            let items = [];
            $items.each(function () {
                items.push(getFieldItemValue($(this)));
            });
            return items;
        };

        let getFieldItemValue = function ($item) {
            let customFieldData = $.extend(true, {}, $item.data('lcf-registered-data'));
            switch (customFieldData.type) {
                case 'text':
                case 'number':
                case 'email':
                case 'password':
                case 'image':
                case 'file':
                    customFieldData.value = $item.find('> .meta-box-wrap input').val();
                    break;
                case 'wysiwyg':
                    customFieldData.value = WebEd.wysiwygGetContent($item.find('> .meta-box-wrap textarea'));
                    break;
                case 'textarea':
                    customFieldData.value = $item.find('> .meta-box-wrap textarea').val();
                    break;
                case 'checkbox':
                    customFieldData.value = [];
                    $item.find('> .meta-box-wrap input:checked').each(function () {
                        customFieldData.value.push($(this).val());
                    });
                    break;
                case 'radio':
                    customFieldData.value = $item.find('> .meta-box-wrap input:checked').val();
                    break;
                case 'select':
                    customFieldData.value = $item.find('> .meta-box-wrap select').val();
                    break;
                case 'repeater':
                    customFieldData.value = [];
                    let $repeaterItems = $item.find('> .meta-box-wrap > .lcf-repeater > .field-group-items > li');
                    $repeaterItems.each(function () {
                        let $current = $(this);
                        let fieldGroup = $current.find('> .field-line-wrapper > .field-group');
                        customFieldData.value.push(getRepeaterItemData(fieldGroup.find('> li')));
                    });
                    break;
                default:
                    customFieldData = null;
                    break;
            }
            return customFieldData;
        };

        let getRepeaterItemData = function ($where) {
            let data = [];
            $where.each(function () {
                let $current = $(this);
                data.push(getRepeaterItemValue($current));
            });
            return data;
        };

        let getRepeaterItemValue = function ($item) {
            let customFieldData = $.extend(true, {}, $item.data('lcf-registered-data'));
            switch (customFieldData.type) {
                case 'text':
                case 'number':
                case 'email':
                case 'password':
                case 'image':
                case 'file':
                    customFieldData.value = $item.find('> .repeater-item-input input').val();
                    break;
                case 'wysiwyg':
                    customFieldData.value = WebEd.wysiwygGetContent($item.find('> .repeater-item-input > .lcf-wysiwyg-wrapper > .wysiwyg-editor'));
                    break;
                case 'textarea':
                    customFieldData.value = $item.find('> .repeater-item-input textarea').val();
                    break;
                case 'checkbox':
                    customFieldData.value = [];
                    $item.find('> .repeater-item-input input:checked').each(function () {
                        customFieldData.value.push($(this).val());
                    });
                    break;
                case 'radio':
                    customFieldData.value = $item.find('> .repeater-item-input input:checked').val();
                    break;
                case 'select':
                    customFieldData.value = $item.find('> .repeater-item-input select').val();
                    break;
                case 'repeater':
                    customFieldData.value = [];
                    let $repeaterItems = $item.find('> .repeater-item-input > .lcf-repeater > .field-group-items > li');
                    $repeaterItems.each(function () {
                        let $current = $(this);
                        let fieldGroup = $current.find('> .field-line-wrapper > .field-group');
                        customFieldData.value.push(getRepeaterItemData(fieldGroup.find('> li')));
                    });
                    break;
                default:
                    customFieldData = null;
                    break;
            }
            return customFieldData;
        };

        _self.$_EXPORT_TO.closest('form').on('submit', function (event) {
            _self.$_EXPORT_TO.val(Helpers.jsonEncode(getFieldGroups()));
        });
    }
}

(function ($) {
    $(document).ready(function () {
        new UseCustomFields();
    });
})(jQuery);

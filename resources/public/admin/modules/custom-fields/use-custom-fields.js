!function(e){function a(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,a),r.l=!0,r.exports}var t={};a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},a.p="",a(a.s=24)}({2:function(e,a,t){"use strict";function i(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}t.d(a,"a",function(){return n});var r=function(){function e(e,a){for(var t=0;t<a.length;t++){var i=a[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(a,t,i){return t&&e(a.prototype,t),i&&e(a,i),a}}(),n=function(){function e(){i(this,e)}return r(e,null,[{key:"isIE",value:function(e){var a=!!navigator.userAgent.match(/MSIE 8.0/),t=!!navigator.userAgent.match(/MSIE 9.0/),i=!!navigator.userAgent.match(/MSIE 10.0/),r=!!navigator.userAgent.match(/rv:11.0/);i&&$("html").addClass("ie10"),r&&$("html").addClass("ie11"),t&&$("html").addClass("ie9"),a&&$("html").addClass("ie8"),(r||i||t||a)&&($("html").addClass("ie"),"function"==typeof e&&e())}},{key:"handleSelectMediaBox",value:function(){var e=$("body");e.on("click",".show-add-media-popup",function(e){e.preventDefault();var a="",t="image";document.currentMediaBox=$(this).closest(".select-media-box"),document.mediaModal=$("#select_media_modal"),$(this).hasClass("select-file-box")&&(a="&type=file",t="file"),"file"==t?(document.mediaModal.find(".nav-tabs .external-image").hide(),document.mediaModal.find(".nav-tabs .external-file").show()):(document.mediaModal.find(".nav-tabs .external-image").show(),document.mediaModal.find(".nav-tabs .external-file").hide()),$("#select_media_modal .modal-body .iframe-container").html('<iframe src="'+FILE_MANAGER_URL+"?method=standalone"+a+'"></iframe>'),document.mediaModal.modal("show")}),e.on("click",".select-media-box .remove-image",function(e){e.preventDefault(),document.currentMediaBox=$(this).closest(".select-media-box"),document.currentMediaBox.find("img.img-responsive").attr("src","admin/images/no-image.png"),document.currentMediaBox.find(".input-file").val("")}),e.on("click",".select-media-modal-external-asset .btn",function(e){e.preventDefault();var a=$(this),t=a.closest(".select-media-modal-external-asset").find(".input-asset"),i=Helpers.asset(t.val()),r="select_media_modal_external_file"==a.closest(".select-media-modal-external-asset").attr("id")?"file":"image",n=document.mediaModal,l=document.currentMediaBox;"file"==r?l.find("a .title").html(i):l.find(".img-responsive").attr("src",i),l.find(".input-file").val(i),n.find("iframe").remove(),n.modal("hide"),t.val("")})}},{key:"showNotification",value:function(e,a,t){switch(t=t||{},a){case"success":a="lime";break;case"info":a="teal";break;case"warning":a="tangerine";break;case"danger":case"error":a="ruby";break;default:a="ebony"}$.notific8("zindex",11500);var i=$.extend(!0,{theme:a,sticky:!1,horizontalEdge:"bottom",verticalEdge:"right",life:1e4},t);e instanceof Array?e.forEach(function(e){$.notific8($.trim(e),i)}):$.notific8($.trim(e),i)}},{key:"slimScroll",value:function(e){if(!$().slimScroll)return null;e.each(function(){if($(this).attr("data-initialized"))return null;var e=void 0;e=$(this).attr("data-height")?$(this).attr("data-height"):$(this).css("height"),$(this).slimScroll({allowPageScroll:!0,size:"7px",color:$(this).attr("data-handle-color")?$(this).attr("data-handle-color"):"#bbb",wrapperClass:$(this).attr("data-wrapper-class")?$(this).attr("data-wrapper-class"):"slimScrollDiv",railColor:$(this).attr("data-rail-color")?$(this).attr("data-rail-color"):"#eaeaea",position:"right",height:e,alwaysVisible:"1"==$(this).attr("data-always-visible"),railVisible:"1"==$(this).attr("data-rail-visible"),disableFadeOut:!0}),$(this).attr("data-initialized","1")})}},{key:"destroySlimScroll",value:function(e){$().slimScroll&&e.each(function(){if("1"===$(this).attr("data-initialized")){$(this).removeAttr("data-initialized"),$(this).removeAttr("style");var e={};$(this).attr("data-handle-color")&&(e["data-handle-color"]=$(this).attr("data-handle-color")),$(this).attr("data-wrapper-class")&&(e["data-wrapper-class"]=$(this).attr("data-wrapper-class")),$(this).attr("data-rail-color")&&(e["data-rail-color"]=$(this).attr("data-rail-color")),$(this).attr("data-always-visible")&&(e["data-always-visible"]=$(this).attr("data-always-visible")),$(this).attr("data-rail-visible")&&(e["data-rail-visible"]=$(this).attr("data-rail-visible")),$(this).slimScroll({wrapperClass:$(this).attr("data-wrapper-class")?$(this).attr("data-wrapper-class"):"slimScrollDiv",destroy:!0});var a=$(this);$.each(e,function(e,t){a.attr(e,t)})}})}},{key:"blockUI",value:function(e){e=$.extend(!0,{animate:!1,iconOnly:!0,textOnly:!0,boxed:!0,message:"Loading...",target:void 0,zIndex:1e3,centerY:!1,overlayColor:"#555"},e);var a="";if(a=e.animate?'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>':e.iconOnly?'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><img src="admin/images/global/loading-spinner-grey.gif" align=""></div>':e.textOnly?'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><span>&nbsp;&nbsp;'+(e.message?e.message:"LOADING...")+"</span></div>":'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><img src="admin/images/global/loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;'+(e.message?e.message:"LOADING...")+"</span></div>",e.target){var t=$(e.target);t.height()<=$(window).height()&&(e.cenrerY=!0),t.block({message:a,baseZ:e.zIndex,centerY:e.cenrerY,css:{top:"10%",border:"0",padding:"0",backgroundColor:"none"},overlayCSS:{backgroundColor:e.overlayColor,opacity:e.boxed?.05:.1,cursor:"wait"}})}else $.blockUI({message:a,baseZ:e.zIndex,css:{border:"0",padding:"0",backgroundColor:"none"},overlayCSS:{backgroundColor:e.overlayColor,opacity:e.boxed?.05:.1,cursor:"wait"}})}},{key:"unblockUI",value:function(e){!e instanceof jQuery&&(e=$(e)),e.unblock({onUnblock:function(){e.css("position",""),e.css("zoom","")}}),$.unblockUI()}},{key:"wysiwyg",value:function(e,a){window.initializedEditor=window.initializedEditor||0,e.each(function(){var e=$(this);e.attr("id","editor_initialized_"+window.initializedEditor),window.initializedEditor++,setTimeout(function(){a=$.extend(!0,{forcePasteAsPlainText:!0,extraPlugins:"codeTag,insertpre",allowedContent:!0,htmlEncodeOutput:!1,protectedSource:[/<\?[\s\S]*?\?>/g,/<%[\s\S]*?%>/g,/(<asp:[^\>]+>[\s|\S]*?<\/asp:[^\>]+>)|(<asp:[^\>]+\/>)/gi],filebrowserBrowseUrl:FILE_MANAGER_URL+"?method=ckeditor",height:e.data("height")||"400px",toolbar:e.data("toolbar")||"full"},a),a=$.extend(!0,a,e.data()),"basic"===a.toolbar&&(a.toolbar=[["mode","Source","Image","TextColor","BGColor","Styles","Format","Font","FontSize","CreateDiv","PageBreak","Bold","Italic","Underline","Strike","Subscript","Superscript","RemoveFormat"]]),CKEDITOR.replace(e.attr("id"),a)},100)})}},{key:"wysiwygGetContent",value:function(e){return CKEDITOR.instances[e.attr("id")].getData()}},{key:"confirmation",value:function(){$().confirmation&&$("[data-toggle=confirmation]").each(function(){var e=$(this);$("[data-toggle=confirmation]").confirmation({container:"body",btnOkClass:"btn btn-sm green",btnCancelClass:"btn btn-sm red-sunglo",placement:e.data("placement")||"left",btnOkLabel:"OK",btnCancelLabel:"Cancel",popout:!0,singleton:!0})})}},{key:"stringToSlug",value:function(e,a){return a=a||"-",e.toString().toLowerCase().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi,"a").replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi,"e").replace(/i|í|ì|ỉ|ĩ|ị/gi,"i").replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi,"o").replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi,"u").replace(/ý|ỳ|ỷ|ỹ|ỵ/gi,"y").replace(/đ/gi,"d").replace(/\s+/g,a).replace(/[^\w\-]+/g,"").replace(/\-\-+/g,a).replace(/^-+/,"").replace(/-+$/,"")}},{key:"tabChangeUrl",value:function(){$("body").on("click",'.tab-change-url a[data-toggle="tab"]',function(e){window.history.pushState("","",$(this).attr("href"))})}},{key:"tagsInput",value:function(e,a){a=$.extend(!0,{tagClass:"label label-default"},a),(!e||!e instanceof jQuery)&&(e=$(".js-tags-input")),e.length&&e.tagsinput(a)}},{key:"scrollToTop",value:function(e){e&&e.preventDefault(),$("html, body").stop().animate({scrollTop:0},800)}},{key:"showLoading",value:function(){$("body").addClass("on-loading")}},{key:"hideLoading",value:function(){$("body").removeClass("on-loading")}},{key:"fixedTopFormActions",value:function(){$("#waypoint").length>0&&new Waypoint({element:document.getElementById("waypoint"),handler:function(e){"down"==e?$(".form-actions-fixed-top").removeClass("hidden"):$(".form-actions-fixed-top").addClass("hidden")}})}},{key:"initAjax",value:function(){e.confirmation(),e.tagsInput(),e.slimScroll($(".scroller"))}}]),e}()},24:function(e,a,t){e.exports=t(25)},25:function(e,a,t){"use strict";function i(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var r=t(2),n=function(){function e(e,a){for(var t=0;t<a.length;t++){var i=a[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(a,t,i){return t&&e(a.prototype,t),i&&e(a,i),a}}(),l=function(){function e(){i(this,e),this.$body=$("body"),this.$_UPDATE_TO=$("#custom_fields_container"),this.$_EXPORT_TO=$("#custom_fields_json"),this.CURRENT_DATA=Helpers.jsonDecode(this.$_EXPORT_TO.val(),[]),this.CURRENT_DATA&&(this.handleCustomFields(),this.exportData())}return n(e,[{key:"handleCustomFields",value:function(){var e=this,a=0,t={fieldGroup:$("#_render_customfield_field_group_template").html(),globalSkeleton:$("#_render_customfield_global_skeleton_template").html(),text:$("#_render_customfield_text_template").html(),number:$("#_render_customfield_number_template").html(),email:$("#_render_customfield_email_template").html(),password:$("#_render_customfield_password_template").html(),textarea:$("#_render_customfield_textarea_template").html(),checkbox:$("#_render_customfield_checkbox_template").html(),radio:$("#_render_customfield_radio_template").html(),select:$("#_render_customfield_select_template").html(),image:$("#_render_customfield_image_template").html(),file:$("#_render_customfield_file_template").html(),wysiwyg:$("#_render_customfield_wysiswg_template").html(),repeater:$("#_render_customfield_repeater_template").html(),repeaterItem:$("#_render_customfield_repeater_item_template").html(),repeaterFieldLine:$("#_render_customfield_repeater_line_template").html()},i=function(e,a){return r.a.wysiwyg(e,{toolbar:a}),e},n=function(e,a){e.forEach(function(e,r){var n=t.globalSkeleton;n=n.replace(/__type__/gi,e.type||""),n=n.replace(/__title__/gi,e.title||""),n=n.replace(/__instructions__/gi,e.instructions||"");var o=$(n),s=l(e);o.find(".meta-box-wrap").append(s),o.data("lcf-registered-data",e),a.append(o),"wysiwyg"===e.type&&i(o.find(".meta-box-wrap .wysiwyg-editor"),e.options.wysiwygToolbar||"basic")})},l=function(e){var i=t[e.type],r=$('<div class="lcf-'+e.type+'-wrapper"></div>');switch(r.data("lcf-registered-data",e),e.type){case"text":case"number":case"email":case"password":i=i.replace(/__placeholderText__/gi,e.options.placeholderText||""),i=i.replace(/__value__/gi,e.value||e.options.defaultValue||"");break;case"textarea":i=i.replace(/__rows__/gi,e.options.rows||3),i=i.replace(/__placeholderText__/gi,e.options.placeholderText||""),i=i.replace(/__value__/gi,e.value||e.options.defaultValue||"");break;case"image":if(i=i.replace(/__value__/gi,e.value||e.options.defaultValue||""),e.value)i=i.replace(/__image__/gi,e.value||e.options.defaultValue||"");else{var n=$(i).find("img").attr("data-default");i=i.replace(/__image__/gi,n||e.options.defaultValue||"")}break;case"file":i=i.replace(/__value__/gi,e.value||e.options.defaultValue||"");break;case"select":var l=$(i);return c(e.options.selectChoices).forEach(function(e,a){l.append('<option value="'+e[0]+'">'+e[1]+"</option>")}),l.val(Helpers.arrayGet(e,"value",e.options.defaultValue)),r.append(l),r;case"checkbox":var s=c(e.options.selectChoices),d=Helpers.jsonDecode(e.value);return s.forEach(function(e,a){var t=i.replace(/__value__/gi,e[0]||"");t=t.replace(/__title__/gi,e[1]||""),t=t.replace(/__checked__/gi,-1!=$.inArray(e[0],d)?"checked":""),r.append($(t))}),r;case"radio":var u=c(e.options.selectChoices),p=!1;return u.forEach(function(t,n){var l=i.replace(/__value__/gi,t[0]||"");l=l.replace(/__id__/gi,e.id+e.slug+a),l=l.replace(/__title__/gi,t[1]||""),l=l.replace(/__checked__/gi,e.value===t[0]?"checked":""),r.append($(l)),e.value===t[0]&&(p=!0)}),!1===p&&r.find("input[type=radio]:first").prop("checked",!0),r;case"repeater":var f=$(i);return f.data("lcf-registered-data",e),f.find("> .repeater-add-new-field").html(e.options.buttonLabel||"Add new item"),f.find("> .sortable-wrapper").sortable(),o(e.items,e.value||[],f.find("> .field-group-items")),f;case"wysiwyg":i=i.replace(/__value__/gi,e.value||"");$(i).attr("data-toolbar",e.options.wysiwygToolbar||"basic")}return r.append($(i)),r},o=function(e,a,i){return i.data("lcf-registered-data",e),a.forEach(function(a,r){var n=i.find("> .ui-sortable-handle").length+1,l=t.repeaterItem;l=l.replace(/__position__/gi,n);var o=$(l);o.data("lcf-registered-data",e),s(e,a,o.find("> .field-line-wrapper > .field-group")),i.append(o)}),i},s=function(e,r,n){return r.forEach(function(e,r){a++;var o=t.repeaterFieldLine;o=o.replace(/__title__/gi,e.title||""),o=o.replace(/__instructions__/gi,e.instructions||"");var s=$(o),c=l(e);s.data("lcf-registered-data",e),s.find("> .repeater-item-input").append(c),n.append(s),"wysiwyg"===e.type&&i(s.find("> .repeater-item-input .wysiwyg-editor"),e.options.wysiwygToolbar||"basic")}),n},c=function(e){var a=[];return e.split("\n").forEach(function(e,t){var i=e.split(":");i[0]&&i[1]&&(i[0]=i[0].trim(),i[1]=i[1].trim()),a.push(i)}),a};this.$body.on("click",".remove-field-line",function(e){e.preventDefault();var a=$(this);a.parent().animate({opacity:.1},300,function(){a.parent().remove()})}),this.$body.on("click",".collapse-field-line",function(e){e.preventDefault(),$(this).toggleClass("collapsed-line")}),this.$body.on("click",".repeater-add-new-field",function(e){e.preventDefault();var t=$.extend(!0,{},$(this).prev(".field-group-items")),i=t.data("lcf-registered-data");a++,o(i,[i],t)}),this.CURRENT_DATA.forEach(function(a,i){var r=t.fieldGroup;r=r.replace(/__title__/gi,a.title||"");var l=$(r);n(a.items,l.find(".meta-boxes-body")),l.data("lcf-field-group",a),e.$_UPDATE_TO.append(l)})}},{key:"exportData",value:function(){var e=this,a=function(){var e=[];return $("#custom_fields_container").find("> .meta-boxes").each(function(){var a=$(this),i=a.data("lcf-field-group"),r=a.find("> .meta-boxes-body > .meta-box");i.items=t(r),e.push(i)}),e},t=function(e){var a=[];return e.each(function(){a.push(i($(this)))}),a},i=function(e){var a=$.extend(!0,{},e.data("lcf-registered-data"));switch(a.type){case"text":case"number":case"email":case"password":case"image":case"file":a.value=e.find("> .meta-box-wrap input").val(),a.value=a.value.replace(/"/gi,"''");break;case"wysiwyg":a.value=r.a.wysiwygGetContent(e.find("> .meta-box-wrap textarea"));break;case"textarea":a.value=e.find("> .meta-box-wrap textarea").val(),a.value=a.value.replace(/"/gi,"''");break;case"checkbox":a.value=[],e.find("> .meta-box-wrap input:checked").each(function(){a.value.push($(this).val())});break;case"radio":a.value=e.find("> .meta-box-wrap input:checked").val();break;case"select":a.value=e.find("> .meta-box-wrap select").val();break;case"repeater":a.value=[];e.find("> .meta-box-wrap > .lcf-repeater > .field-group-items > li").each(function(){var e=$(this),t=e.find("> .field-line-wrapper > .field-group");a.value.push(n(t.find("> li")))});break;default:a=null}return a},n=function(e){var a=[];return e.each(function(){var e=$(this);a.push(l(e))}),a},l=function(e){var a=$.extend(!0,{},e.data("lcf-registered-data"));switch(a.type){case"text":case"number":case"email":case"password":case"image":case"file":a.value=e.find("> .repeater-item-input input").val(),a.value=a.value.replace(/"/gi,"''");break;case"wysiwyg":a.value=r.a.wysiwygGetContent(e.find("> .repeater-item-input > .lcf-wysiwyg-wrapper > .wysiwyg-editor"));break;case"textarea":a.value=e.find("> .repeater-item-input textarea").val(),a.value=a.value.replace(/"/gi,"''");break;case"checkbox":a.value=[],e.find("> .repeater-item-input input:checked").each(function(){a.value.push($(this).val())});break;case"radio":a.value=e.find("> .repeater-item-input input:checked").val();break;case"select":a.value=e.find("> .repeater-item-input select").val();break;case"repeater":a.value=[];e.find("> .repeater-item-input > .lcf-repeater > .field-group-items > li").each(function(){var e=$(this),t=e.find("> .field-line-wrapper > .field-group");a.value.push(n(t.find("> li")))});break;default:a=null}return a};e.$_EXPORT_TO.closest("form").on("submit",function(t){e.$_EXPORT_TO.val(Helpers.jsonEncode(a()))})}}]),e}();!function(e){e(document).ready(function(){new l})}(jQuery)}});
//# sourceMappingURL=use-custom-fields.js.map
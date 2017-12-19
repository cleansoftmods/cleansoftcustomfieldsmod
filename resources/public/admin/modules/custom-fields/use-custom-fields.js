var LaravelElixirBundle=function(e){"use strict";var a=function(){};a.isIE=function(e){var a=!!navigator.userAgent.match(/MSIE 8.0/),t=!!navigator.userAgent.match(/MSIE 9.0/),i=!!navigator.userAgent.match(/MSIE 10.0/),r=!!navigator.userAgent.match(/rv:11.0/);i&&$("html").addClass("ie10"),r&&$("html").addClass("ie11"),t&&$("html").addClass("ie9"),a&&$("html").addClass("ie8"),(r||i||t||a)&&($("html").addClass("ie"),"function"==typeof e&&e())},a.handleSelectMediaBox=function(){var e=$("body");e.on("click",".show-add-media-popup",function(e){e.preventDefault();var a="",t="image";document.currentMediaBox=$(this).closest(".select-media-box"),document.mediaModal=$("#select_media_modal"),$(this).hasClass("select-file-box")&&(a="&type=file",t="file"),"file"==t?(document.mediaModal.find(".nav-tabs .external-image").hide(),document.mediaModal.find(".nav-tabs .external-file").show()):(document.mediaModal.find(".nav-tabs .external-image").show(),document.mediaModal.find(".nav-tabs .external-file").hide()),$("#select_media_modal .modal-body .iframe-container").html('<iframe src="'+FILE_MANAGER_URL+"?method=standalone"+a+'"></iframe>'),document.mediaModal.modal("show")}),e.on("click",".select-media-box .remove-image",function(e){e.preventDefault(),document.currentMediaBox=$(this).closest(".select-media-box"),document.currentMediaBox.find("img.img-responsive").attr("src","admin/images/no-image.png"),document.currentMediaBox.find(".input-file").val("")}),e.on("click",".select-media-modal-external-asset .btn",function(e){e.preventDefault();var a=$(this),t=a.closest(".select-media-modal-external-asset").find(".input-asset"),i=Helpers.asset(t.val()),r="select_media_modal_external_file"==a.closest(".select-media-modal-external-asset").attr("id")?"file":"image",n=document.mediaModal,o=document.currentMediaBox;"file"==r?o.find("a .title").html(i):o.find(".img-responsive").attr("src",i),o.find(".input-file").val(i),n.find("iframe").remove(),n.modal("hide"),t.val("")})},a.showNotification=function(e,a,t){switch(t=t||{},a){case"success":a="lime";break;case"info":a="teal";break;case"warning":a="tangerine";break;case"danger":a="ruby";break;case"error":a="ruby";break;default:a="ebony"}$.notific8("zindex",11500);var i=$.extend(!0,{theme:a,sticky:!1,horizontalEdge:"bottom",verticalEdge:"right",life:1e4},t);e instanceof Array?e.forEach(function(e){$.notific8($.trim(e),i)}):$.notific8($.trim(e),i)},a.slimScroll=function(e){return $().slimScroll?void e.each(function(){if($(this).attr("data-initialized"))return null;var e;e=$(this).attr("data-height")?$(this).attr("data-height"):$(this).css("height"),$(this).slimScroll({allowPageScroll:!0,size:"7px",color:$(this).attr("data-handle-color")?$(this).attr("data-handle-color"):"#bbb",wrapperClass:$(this).attr("data-wrapper-class")?$(this).attr("data-wrapper-class"):"slimScrollDiv",railColor:$(this).attr("data-rail-color")?$(this).attr("data-rail-color"):"#eaeaea",position:"right",height:e,alwaysVisible:"1"==$(this).attr("data-always-visible"),railVisible:"1"==$(this).attr("data-rail-visible"),disableFadeOut:!0}),$(this).attr("data-initialized","1")}):null},a.destroySlimScroll=function(e){$().slimScroll&&e.each(function(){if("1"===$(this).attr("data-initialized")){$(this).removeAttr("data-initialized"),$(this).removeAttr("style");var e={};$(this).attr("data-handle-color")&&(e["data-handle-color"]=$(this).attr("data-handle-color")),$(this).attr("data-wrapper-class")&&(e["data-wrapper-class"]=$(this).attr("data-wrapper-class")),$(this).attr("data-rail-color")&&(e["data-rail-color"]=$(this).attr("data-rail-color")),$(this).attr("data-always-visible")&&(e["data-always-visible"]=$(this).attr("data-always-visible")),$(this).attr("data-rail-visible")&&(e["data-rail-visible"]=$(this).attr("data-rail-visible")),$(this).slimScroll({wrapperClass:$(this).attr("data-wrapper-class")?$(this).attr("data-wrapper-class"):"slimScrollDiv",destroy:!0});var a=$(this);$.each(e,function(e,t){a.attr(e,t)})}})},a.blockUI=function(e){e=$.extend(!0,{animate:!1,iconOnly:!0,textOnly:!0,boxed:!0,message:"Loading...",target:void 0,zIndex:1e3,centerY:!1,overlayColor:"#555"},e);var a="";if(a=e.animate?'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><div class="block-spinner-bar"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>':e.iconOnly?'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><img src="admin/images/global/loading-spinner-grey.gif" align=""></div>':e.textOnly?'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><span>&nbsp;&nbsp;'+(e.message?e.message:"LOADING...")+"</span></div>":'<div class="loading-message '+(e.boxed?"loading-message-boxed":"")+'"><img src="admin/images/global/loading-spinner-grey.gif" align=""><span>&nbsp;&nbsp;'+(e.message?e.message:"LOADING...")+"</span></div>",e.target){var t=$(e.target);t.height()<=$(window).height()&&(e.cenrerY=!0),t.block({message:a,baseZ:e.zIndex,centerY:e.cenrerY,css:{top:"10%",border:"0",padding:"0",backgroundColor:"none"},overlayCSS:{backgroundColor:e.overlayColor,opacity:e.boxed?.05:.1,cursor:"wait"}})}else $.blockUI({message:a,baseZ:e.zIndex,css:{border:"0",padding:"0",backgroundColor:"none"},overlayCSS:{backgroundColor:e.overlayColor,opacity:e.boxed?.05:.1,cursor:"wait"}})},a.unblockUI=function(e){!e instanceof jQuery&&(e=$(e)),e.unblock({onUnblock:function(){e.css("position",""),e.css("zoom","")}}),$.unblockUI()},a.wysiwyg=function(e,a){a=$.extend(!0,{filebrowserBrowseUrl:FILE_MANAGER_URL+"?method=ckeditor",extraPlugins:"codeTag,insertpre",allowedContent:!0,height:"400px"},a),e.each(function(){var e=$(this),t=e.data()||{};"basic"!=e.data("toolbar")&&"basic"!=t.toolbar||(t.toolbar=[["mode","Source","Image","TextColor","BGColor","Styles","Format","Font","FontSize","CreateDiv","PageBreak","Bold","Italic","Underline","Strike","Subscript","Superscript","RemoveFormat"]]),e.ckeditor($.noop,$.extend(!0,a,t))})},a.confirmation=function(){$().confirmation&&$("[data-toggle=confirmation]").confirmation({container:"body",btnOkClass:"btn btn-sm green",btnCancelClass:"btn btn-sm red-sunglo",btnOkLabel:"OK",btnCancelLabel:"Cancel",popout:!0,singleton:!0})},a.stringToSlug=function(e,a){return a=a||"-",e.toString().toLowerCase().replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi,"a").replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi,"e").replace(/i|í|ì|ỉ|ĩ|ị/gi,"i").replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi,"o").replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi,"u").replace(/ý|ỳ|ỷ|ỹ|ỵ/gi,"y").replace(/đ/gi,"d").replace(/\s+/g,a).replace(/[^\w\-]+/g,"").replace(/\-\-+/g,a).replace(/^-+/,"").replace(/-+$/,"")},a.tabChangeUrl=function(){$("body").on("click",'.tab-change-url a[data-toggle="tab"]',function(e){window.history.pushState("","",$(this).attr("href"))})},a.tagsInput=function(e,a){a=$.extend(!0,{tagClass:"label label-default"},a),(!e||!e instanceof jQuery)&&(e=$(".js-tags-input")),e.length&&e.tagsinput(a)},a.scrollToTop=function(e){e&&e.preventDefault(),$("html, body").stop().animate({scrollTop:0},800)},a.showLoading=function(){$("body").addClass("on-loading")},a.hideLoading=function(){$("body").removeClass("on-loading")},a.fixedTopFormActions=function(){$("#waypoint").length>0&&new Waypoint({element:document.getElementById("waypoint"),handler:function(e){"down"==e?$(".form-actions-fixed-top").removeClass("hidden"):$(".form-actions-fixed-top").addClass("hidden")}})},a.initAjax=function(){a.confirmation(),a.tagsInput(),a.slimScroll($(".scroller"))};var t=function(){this.$body=$("body"),this.$_UPDATE_TO=$("#custom_fields_container"),this.$_EXPORT_TO=$("#custom_fields_json"),this.CURRENT_DATA=Helpers.jsonDecode(this.base64Helper().decode(this.$_EXPORT_TO.text()),[]),this.CURRENT_DATA&&(this.handleCustomFields(),this.exportData())};return t.prototype.base64Helper=function(){if(!this.base64){var e={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var t,i,r,n,o,l,s,d=this,c="",u=0;for(a=e._utf8_encode(a);u<a.length;)t=a.charCodeAt(u++),i=a.charCodeAt(u++),r=a.charCodeAt(u++),n=t>>2,o=(3&t)<<4|i>>4,l=(15&i)<<2|r>>6,s=63&r,isNaN(i)?l=s=64:isNaN(r)&&(s=64),c=c+d._keyStr.charAt(n)+d._keyStr.charAt(o)+d._keyStr.charAt(l)+d._keyStr.charAt(s);return c},decode:function(a){var t,i,r,n,o,l,s,d=this,c="",u=0;for(a=a.replace(/[^A-Za-z0-9+\/=]/g,"");u<a.length;)n=d._keyStr.indexOf(a.charAt(u++)),o=d._keyStr.indexOf(a.charAt(u++)),l=d._keyStr.indexOf(a.charAt(u++)),s=d._keyStr.indexOf(a.charAt(u++)),t=n<<2|o>>4,i=(15&o)<<4|l>>2,r=(3&l)<<6|s,c+=String.fromCharCode(t),64!=l&&(c+=String.fromCharCode(i)),64!=s&&(c+=String.fromCharCode(r));return c=e._utf8_decode(c)},_utf8_encode:function(e){e=e.replace(/rn/g,"n");for(var a="",t=0;t<e.length;t++){var i=e.charCodeAt(t);i<128?a+=String.fromCharCode(i):i>127&&i<2048?(a+=String.fromCharCode(i>>6|192),a+=String.fromCharCode(63&i|128)):(a+=String.fromCharCode(i>>12|224),a+=String.fromCharCode(i>>6&63|128),a+=String.fromCharCode(63&i|128))}return a},_utf8_decode:function(e){for(var a="",t=0,i=0,r=0;t<e.length;)if(i=e.charCodeAt(t),i<128)a+=String.fromCharCode(i),t++;else if(i>191&&i<224)r=e.charCodeAt(t+1),a+=String.fromCharCode((31&i)<<6|63&r),t+=2;else{r=e.charCodeAt(t+1);var n=e.charCodeAt(t+2);a+=String.fromCharCode((15&i)<<12|(63&r)<<6|63&n),t+=3}return a}};this.base64=e}return this.base64},t.prototype.handleCustomFields=function(){var e=this,t=0,i={fieldGroup:$("#_render_customfield_field_group_template").html(),globalSkeleton:$("#_render_customfield_global_skeleton_template").html(),text:$("#_render_customfield_text_template").html(),number:$("#_render_customfield_number_template").html(),email:$("#_render_customfield_email_template").html(),password:$("#_render_customfield_password_template").html(),textarea:$("#_render_customfield_textarea_template").html(),checkbox:$("#_render_customfield_checkbox_template").html(),radio:$("#_render_customfield_radio_template").html(),select:$("#_render_customfield_select_template").html(),image:$("#_render_customfield_image_template").html(),file:$("#_render_customfield_file_template").html(),wysiwyg:$("#_render_customfield_wysiswg_template").html(),repeater:$("#_render_customfield_repeater_template").html(),repeaterItem:$("#_render_customfield_repeater_item_template").html(),repeaterFieldLine:$("#_render_customfield_repeater_line_template").html()},r=function(e,t){return a.wysiwyg(e,{toolbar:t}),e},n=function(e,a){e.forEach(function(e,t){var n=i.globalSkeleton;n=n.replace(/__type__/gi,e.type||""),n=n.replace(/__title__/gi,e.title||""),n=n.replace(/__instructions__/gi,e.instructions||"");var l=$(n),s=o(e);l.find(".meta-box-wrap").append(s),l.data("lcf-registered-data",e),a.append(l),"wysiwyg"===e.type&&r(l.find(".meta-box-wrap .wysiwyg-editor"),e.options.wysiwygToolbar||"basic")})},o=function(e){var a=i[e.type],r=$('<div class="lcf-'+e.type+'-wrapper"></div>');switch(r.data("lcf-registered-data",e),e.type){case"text":case"number":case"email":case"password":a=a.replace(/__placeholderText__/gi,e.options.placeholderText||""),a=a.replace(/__value__/gi,e.value||e.options.defaultValue||"");break;case"textarea":a=a.replace(/__rows__/gi,e.options.rows||3),a=a.replace(/__placeholderText__/gi,e.options.placeholderText||""),a=a.replace(/__value__/gi,e.value||e.options.defaultValue||"");break;case"image":if(a=a.replace(/__value__/gi,e.value||e.options.defaultValue||""),e.value)a=a.replace(/__image__/gi,e.value||e.options.defaultValue||"");else{var n=$(a).find("img").attr("data-default");a=a.replace(/__image__/gi,n||e.options.defaultValue||"")}break;case"file":a=a.replace(/__value__/gi,e.value||e.options.defaultValue||"");break;case"select":var o=$(a),s=d(e.options.selectChoices);return s.forEach(function(e,a){o.append('<option value="'+e[0]+'">'+e[1]+"</option>")}),o.val(Helpers.arrayGet(e,"value",e.options.defaultValue)),r.append(o),r;case"checkbox":var c=d(e.options.selectChoices),u=Helpers.jsonDecode(e.value);return c.forEach(function(e,t){var i=a.replace(/__value__/gi,e[0]||"");i=i.replace(/__title__/gi,e[1]||""),i=i.replace(/__checked__/gi,$.inArray(e[0],u)!=-1?"checked":""),r.append($(i))}),r;case"radio":var p=d(e.options.selectChoices),f=!1;return p.forEach(function(i,n){var o=a.replace(/__value__/gi,i[0]||"");o=o.replace(/__id__/gi,e.id+e.slug+t),o=o.replace(/__title__/gi,i[1]||""),o=o.replace(/__checked__/gi,e.value===i[0]?"checked":""),r.append($(o)),e.value===i[0]&&(f=!0)}),f===!1&&r.find("input[type=radio]:first").prop("checked",!0),r;case"repeater":var m=$(a);return m.data("lcf-registered-data",e),m.find("> .repeater-add-new-field").html(e.options.buttonLabel||"Add new item"),m.find("> .sortable-wrapper").sortable(),l(e.items,e.value||[],m.find("> .field-group-items")),m;case"wysiwyg":a=a.replace(/__value__/gi,e.value||"");var h=$(a);h.attr("data-toolbar",e.options.wysiwygToolbar||"basic")}return r.append($(a)),r},l=function(e,a,t){return t.data("lcf-registered-data",e),a.forEach(function(a,r){var n=t.find("> .ui-sortable-handle").length+1,o=i.repeaterItem;o=o.replace(/__position__/gi,n);var l=$(o);l.data("lcf-registered-data",e),s(e,a,l.find("> .field-line-wrapper > .field-group")),t.append(l)}),t},s=function(e,a,n){return a.forEach(function(e,a){t++;var l=i.repeaterFieldLine;l=l.replace(/__title__/gi,e.title||""),l=l.replace(/__instructions__/gi,e.instructions||"");var s=$(l),d=o(e);s.data("lcf-registered-data",e),s.find("> .repeater-item-input").append(d),n.append(s),"wysiwyg"===e.type&&r(s.find("> .repeater-item-input .wysiwyg-editor"),e.options.wysiwygToolbar||"basic")}),n},d=function(e){var a=[];return e.split("\n").forEach(function(e,t){var i=e.split(":");i[0]&&i[1]&&(i[0]=i[0].trim(),i[1]=i[1].trim()),a.push(i)}),a};this.$body.on("click",".remove-field-line",function(e){e.preventDefault();var a=$(this);a.parent().animate({opacity:.1},300,function(){a.parent().remove()})}),this.$body.on("click",".collapse-field-line",function(e){e.preventDefault();var a=$(this);a.toggleClass("collapsed-line")}),this.$body.on("click",".repeater-add-new-field",function(e){e.preventDefault();var a=$.extend(!0,{},$(this).prev(".field-group-items")),i=a.data("lcf-registered-data");t++,l(i,[i],a)}),this.CURRENT_DATA.forEach(function(a,t){var r=i.fieldGroup;r=r.replace(/__title__/gi,a.title||"");var o=$(r);n(a.items,o.find(".meta-boxes-body")),o.data("lcf-field-group",a),e.$_UPDATE_TO.append(o)})},t.prototype.exportData=function(){var e=this,t=function(){var e=[];return $("#custom_fields_container").find("> .meta-boxes").each(function(){var a=$(this),t=a.data("lcf-field-group"),r=a.find("> .meta-boxes-body > .meta-box");t.items=i(r),e.push(t)}),e},i=function(e){var a=[];return e.each(function(){a.push(r($(this)))}),a},r=function(e){var t=$.extend(!0,{},e.data("lcf-registered-data"));switch(t.type){case"text":case"number":case"email":case"password":case"image":case"file":t.value=e.find("> .meta-box-wrap input").val();break;case"wysiwyg":t.value=a.wysiwygGetContent(e.find("> .meta-box-wrap textarea"));break;case"textarea":t.value=e.find("> .meta-box-wrap textarea").val();break;case"checkbox":t.value=[],e.find("> .meta-box-wrap input:checked").each(function(){t.value.push($(this).val())});break;case"radio":t.value=e.find("> .meta-box-wrap input:checked").val();break;case"select":t.value=e.find("> .meta-box-wrap select").val();break;case"repeater":t.value=[];var i=e.find("> .meta-box-wrap > .lcf-repeater > .field-group-items > li");i.each(function(){var e=$(this),a=e.find("> .field-line-wrapper > .field-group");t.value.push(n(a.find("> li")))});break;default:t=null}return t},n=function(e){var a=[];return e.each(function(){var e=$(this);a.push(o(e))}),a},o=function(e){var t=$.extend(!0,{},e.data("lcf-registered-data"));switch(t.type){case"text":case"number":case"email":case"password":case"image":case"file":t.value=e.find("> .repeater-item-input input").val();break;case"wysiwyg":t.value=a.wysiwygGetContent(e.find("> .repeater-item-input > .lcf-wysiwyg-wrapper > .wysiwyg-editor"));break;case"textarea":t.value=e.find("> .repeater-item-input textarea").val();break;case"checkbox":t.value=[],e.find("> .repeater-item-input input:checked").each(function(){t.value.push($(this).val())});break;case"radio":t.value=e.find("> .repeater-item-input input:checked").val();break;case"select":t.value=e.find("> .repeater-item-input select").val();break;case"repeater":t.value=[];var i=e.find("> .repeater-item-input > .lcf-repeater > .field-group-items > li");i.each(function(){var e=$(this),a=e.find("> .field-line-wrapper > .field-group");t.value.push(n(a.find("> li")))});break;default:t=null}return t};e.$_EXPORT_TO.closest("form").on("submit",function(a){e.$_EXPORT_TO.val(Helpers.jsonEncode(t()))})},function(e){e(document).ready(function(){new t})}(jQuery),e}({});
var LaravelElixirBundle=function(e){"use strict";return function(e){var r=e("body");r.on("click",".trigger-import",function(r){var o=e(this).closest("form");o.find("input[type=file]").val("")}),r.on("change","form.import-field-group input[type=file]",function(r){var o=e(this).closest("form"),t=this.files[0];if(t){var a=new FileReader;a.readAsText(t),a.onload=function(r){var t=Helpers.jsonDecode(r.target.result);e.ajax({url:o.attr("action"),type:"POST",data:{json_data:t},dataType:"json",beforeSend:function(){WebEd.showLoading()},success:function(r){if(WebEd.showNotification(r.messages,r.error?"error":"success"),!r.error){var o=e("table.datatables")[0].dataTableHelper;o&&o.getDataTable().ajax.reload()}},complete:function(e){WebEd.hideLoading()},error:function(e){WebEd.showNotification("Some error occurred","error")}})}}})}(jQuery),e}({});
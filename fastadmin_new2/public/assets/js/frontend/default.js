define(['jquery', 'bootstrap', 'frontend', 'form', 'template'], function ($, undefined, Frontend, Form, Template) {
    var validatoroptions = {
        invalid: function (form, errors) {
            $.each(errors, function (i, j) {
                Layer.msg(j);
            });
        }
    };
    var Controller = {
        add: function () {
            debugger;
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
            Fast.api.ajax({
                url: 'cms/archives/get_channel_fields',
                data: {channel_id: $("#c-channel_id").val(), archives_id: $("#archive-id").val()}
            }, function (data) {
                $("#extend").html(data.html);
                console.log("ssss",$("#extend"));
            //    Form.api.bindevent($("#extend"));
             
                return false;
            });
        },
        api: {
            formatter: {
                content: function (value, row, index) {
                    var extend = this.extend;
                    if (!value) {
                        return '';
                    }
                    var valueArr = value.toString().split(/,/);
                    var result = [];
                    $.each(valueArr, function (i, j) {
                        result.push(typeof extend[j] !== 'undefined' ? extend[j] : j);
                    });
                    return result.join(',');
                }
            },
            bindevent: function () {
                $.validator.config({
                    rules: {
                        diyname: function (element) {
                            if (element.value.toString().match(/^\d+$/)) {
                                return __('Can not be digital');
                            }
                            return $.ajax({
                                url: 'cms/archives/check_element_available',
                                type: 'POST',
                                data: {id: $("#archive-id").val(), name: element.name, value: element.value},
                                dataType: 'json'
                            });
                        }
                    }
                });
                Form.api.bindevent($("form[role=form]"), function () {
                    var obj = top.window.$("ul.nav-addtabs li.active");
                    top.window.Toastr.success(__('Operation completed'));
                    top.window.$(".sidebar-menu a[url$='/cms/archives'][addtabs]").click();
                    top.window.$(".sidebar-menu a[url$='/cms/archives'][addtabs]").dblclick();
                    obj.find(".fa-remove").trigger("click");
                });
            }
        }      
    }

    return Controller;
});
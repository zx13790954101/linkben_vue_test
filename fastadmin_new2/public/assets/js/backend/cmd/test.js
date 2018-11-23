define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'cmd/test/index',
                    add_url: 'cmd/test/add',
                    edit_url: 'cmd/test/edit',
                    del_url: 'cmd/test/del',
                    multi_url: 'cmd/test/multi',
                    table: 'cms_test',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'content', title: __('Content')},
                        {field: 'author', title: __('Author')},
                        {field: 'area', title: __('Area'), searchList: {"domestic":__('Domestic'),"overseas":__('Overseas'),"local":__('Local')}, formatter: Table.api.formatter.normal},
                        {field: 'device', title: __('Device'), searchList: {"vr":__('Vr'),"ar":__('Ar')}, formatter: Table.api.formatter.normal},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});
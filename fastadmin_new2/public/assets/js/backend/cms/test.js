define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'cms/test/index',
                    add_url: 'cms/test/add',
                    edit_url: 'cms/test/edit',
                    del_url: 'cms/test/del',
                    multi_url: 'cms/test/multi',
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
                        {field: 'username', title: __('Username')},
                        {field: 'content', title: __('Content')},
                        {field: 'area', title: __('Area'), searchList: {"domestic":__('Domestic'),"overseas":__('Overseas'),"local":__('Local')}, formatter: Table.api.formatter.normal},
                        {field: 'filestype', title: __('Filestype')},
                        {field: 'files', title: __('Files')},
                        {field: 'test_id', title: __('Test_id')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
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
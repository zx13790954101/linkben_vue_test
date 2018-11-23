layui.use(['element','form', 'flow'], function () {
	var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
	var form = layui.form;
	var flow = layui.flow;

	var active = {
		init: function () {
           
		   active.selectCity();
        },
        selectCity: function(){
                setTimeout(function(){
                    lzs_flieload.downLoadCss("/assets/plugin/baiduMap/map.css");
                    lzs_flieload.downLoadJs("/assets/plugin/baiduMap/cityJson.js");
                    lzs_flieload.downLoadJs("/assets/plugin/baiduMap/citySet.js");
                        lzs_flieload.downLoadJs("/assets/plugin/baiduMap/Popt.js");
                
                },1000);
                $("#select-city").click(function(e) {
                   var that=this;
                   SelCity(that, e);
                });
        },
	};
	active.init();

});
layui.use(['element', 'form', 'upload', 'laytpl', 'flow', 'layer'], function () {
	var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
	var form = layui.form,
		upload = layui.upload,
		laytpl = layui.laytpl,
		layer = layui.layer;
	var flow = layui.flow;

	var active = {
		init: function () {
			active.pluginInit();
			active.swiperload();
			active.buttonInit();
			var lens = 0;
			$(".edit-info .edit-text").bind('input propertychange', function () {
				lens = ($(this).val()).length;
				var lastStr = parseInt(150 - lens);
				if (lastStr <= 0) {
					lastStr = 0
				}
				$(".edit-info .font-num span").html(lastStr);
			});
	

			$("#multifile").click(function(){
				var that = this;
				var mainView = '';
				mainView = '<div class="layui-upload">' +
				'<div class="flex-c"><span class="flex-item">共<em class="num_totla">0</em>张，还能上传<em class="num_remain">4</em>张</span><button type="button" class="layui-btn" id="multifileButton">多图片上传</button> </div>' +
				'<blockquote class="layui-elem-quote layui-quote-nm" style="margin-top: 10px;"> 预览图：' +
				' <div class="layui-upload-list" id="multifileList"></div>' +
				'</blockquote>' +
				'</div>'
				lzs_dialog.locate(that, mainView, function () {
					//多图片上传
					upload.render({
						elem: '#multifileButton',
						url: '/index/ajax/upload',
						multiple: true,
						before: function (obj) {
							//预读本地文件示例，不支持ie8
							obj.preview(function (index, file, result) {
								$('#multifileList').append('<img src="' + result + '" alt="' + file.name + '" class="layui-upload-img">')
								$(".num_totla").html($("#multifileList img").length)
							});
						},
						done: function (res) {
							debugger;
							//上传完毕
							var value = $("#files-input").val()
							if (value.length > 5) {
								$("#files-input").val(value + "," + res.data.url)
							} else {
								$("#files-input").val(res.data.url);
							}
						}
					});
					$("#lzs-dialog .back").click(function () {
						$("#lzs-dialog").remove();
					});


				});
			});
			active.initEmotion();
		},
		buttonInit: function () {

			//列表的按钮功能
			$(".news-box .list-item-action button.flex-item").click(function (e) {

				var that = this;
				var index = $(this).find("span").html();

				if (index == "评论") {
					$(that).addClass("active");
					if ($(".news-box .list-item-extend").find("div").length > 0) {
						if ($(that).hasClass("active")) {
							$(that).removeClass("active");
							$(".news-box .list-item-extend").html("");
						}
						return false;
					}
					//第三步：渲染模版
					var data1 = {
						id: parseInt($(that).attr("urlid"))
					}
					var data2 = {
						title: "评论的模板"
					}
					$.post("/addons/cms/wxapp.archives/detail", data1, function (data) {

						var getTpl = $("#commentlistpanel").html();
						var view = $(that).parent().siblings(".list-item-extend");
						view.html(getTpl);
						laytpl(getTpl).render(data2, function (html) {
							view.innerHTML = html;
						});
						debugger;
						if (data.data.commentList.length == 0) {
							$(".commentlistpanel ").remove();
							return;
						}
						$(data.data.commentList).each(function (index, element) {
							var htmlView = '';
							$(".commentlistpanel .layui-tab-content ul").html("");
							$(element.data.commentList).each(function (index, element) {
								htmlView = '<li class="list-item"><div class="flex ">\
											<div class="item-l ">\
												<div class="img-c news-array-img"> <img src="' + element.user.avatar + '"> </div>\
											</div>\
											<div class="flex-item   item-r ">\
												<div class="flex-c">\
													<h5 class="title" aid="' + element.aid + '"   >' + element.user.nickname + ':</h5>\
													<h5 class="ellipsis-line-3 ">' + element.content + '</h5>\
												</div>\
												<div class="flex-c  item-bottom  group list-item-action">\
													<span class="time flex-item">' + element.create_date + '</span>\
													<span class="flex-c-y"><i class="iconfont icon-pinglun-tianchong"></i><span>评论</span></span>\
													<span class="line-bar"></span>\
													<span class="flex-c-y "><i class="iconfont icon-buoumaotubiao16"></i><span>点赞</span></span>\
												</div>\
											</div>\
										</div></li>';
								$(".commentlistpanel .layui-tab-content ul").append(htmlView);
							});
						});
					});


					return false;
				} else if (index == "分享") {

					lzs_flieload.downLoadCss("/assets/plugin/share/share.min.css");
					lzs_flieload.downLoadJs("/assets/plugin/share/jquery.share.js", function () {
						layer.open({
							type: 1,
							title: false,
							closeBtn: false,
							area: ['400px', '300px'],
							shade: 0.8,
							id: 'LAY_layuipro' //设定一个id，防止重复弹出
								,
							btn: ['关闭'],
							btnAlign: 'c',
							moveType: 1 //拖拽模式，0或者1
								,
							content: "<div class='flex-c-y  flex-c' style='height:100%;-webkit-flex-wrap: wrap;  flex-wrap: wrap; '><div id='share-2'></div></div>",
							success: function (layero) {
								var html = '<div class="center" style="width:100%"><h5>分享链接</h5><input type="text" value=""><span>复制</span></div>';
								$("#share-2").before(html);
								$('#share-2').share({
									sites: ['qzone', 'qq', 'weibo', 'wechat']
								});
							},
							yes: function (index) {
								$(that).removeClass("active");
								$(".news-box .list-item-extend").html("");
								layer.closeAll();
							},
						});
					});
				} else {
					var html = "";
					if ($(that).hasClass("checked")) {
						$(that).removeClass("checked");
						$(".news-box .list-item-extend").html("");
					} else {
						$(that).addClass("checked");
						var text = ($(that).html()).substring(0, ($(that).html()).indexOf("<span"));
						html = "<div class='list-item-action-animtion'>" + text + "</div>";
						$(".section-news .news-box .list-item").append(html);
						setTimeout(function () {
							$(".list-item-action-animtion").remove();
						}, 2000);
					}
					return false;

				}
			});

			// $("#add-edittext-flie span").click(function (e) {
			// 	var index = $(this).index();
			// 	var that = this;
			// 	var mainView = '';
			// 	if (index == 1) {


			// 	} else if (index == 2) {
			// 		lzs_dialog.locate(that);
			// 	} else if (index == 3) {
			// 		lzs_dialog.locate(that);
			// 	}
			// });

		},
		//插件初始化
		pluginInit: function () {

			//加载列表
			flow.load({
				elem: '#flow_newsList' //流加载容器
					//,scrollElem: 'body' //滚动条所在元素，一般不用填，此处只是演示需要。
					,
				done: function (page, next) { //执行下一页的回调
					//模拟数据插入
					var data = {
						page: parseInt(page)
					};
					$.post("/addons/cms/wxapp.archives/index", data, function (data) {
						if (data.code == 1) {
							var lis = [];
							$(data.data.archivesList).each(function (index, element) {
								var imgArray = "";
								if (element.files != "") {
									if (page == 1 && index <= 1) {
										$((element.files).split(",")).each(function (index, element) {
											imgArray += '<div class="img-r">\
											<img layer-pid="图片id，可以不写"  src="' + element + '" alt="图片名">\
										   </div>';
										});
									} else {
										$((element.files).split(",")).each(function (index, element) {
											imgArray += '<div class="img-r">\
											<img layer-pid="图片id，可以不写"  lay-src="' + element + '" alt="图片名">\
										   </div>';
										});
									}

								}

								if (imgArray == "") {
									if (page == 1 && index <= 1) {
										imgArray = '<div class="img-r">\
											<img layer-pid="图片id，可以不写"  src="' + element.image + '" alt="图片名">\
											</div>'
									} else {
										imgArray = '<div class="img-r">\
											<img layer-pid="图片id，可以不写"  lay-src="' + element.image + '" alt="图片名">\
											</div>'
									}

								}
								var avatar = ((element.avatar) ? (element.avatar) : '/assets/img/null-img.png');
								var username = ((element.username) ? (element.username) : (element.title));
								var description = element.description ? '<span class="flex-item auther">作者:' + element.username + '</span>' : '';
								var time = lzs_time.fromDate(element.createtime);
								var content = element.content ? element.content : element.description;
								var listveiw = '<li>\
														<div class="list-item">\
														<div class="flex">\
															<div class="item-l">\
																<div class="img-c news-array-img"><img src="' + avatar + '"></div>\
															</div>\
															<div class="flex-item  item-r ">\
																<h4 class="title ellipsis-line-1">' + username + '</h4>\
																<div class="flex-c  item-bottom  group">' + description + '<span class="time">' + time + '</span></div>\
																<a href="' + element.url + '" ><div class="ellipsis-line-3 content h5" >' + content + '</div></a>\
																<div class="layer-photos-demo  layer-img-preview row  flex-c">' + imgArray + '</div>\
															</div>\
														</div>\
														<div class="list-item-action flex-c btn-group">\
															<button    class="flex-c-y flex-item Checked"><i class="iconfont icon-shoucang2 "></i><span>点赞</span></button><span class="line-bar"></span>\
															<button class="flex-c-y flex-item"><i class="iconfont icon-shoucang3 "></i><span>收藏</span></button><span class="line-bar"></span>\
															<button urlid="' + element.id + '" class="flex-c-y flex-item"><i class="iconfont icon-pinglun"></i><span>评论</span></button><span class="line-bar"></span>\
															<button class="flex-c-y flex-item"><i class="iconfont icon-msnui-share-big"></i><span>分享</span></button>\
														</div>\
														<div class="list-item-extend"></div>\
														</div>\
									                </li>';
								lis.push(listveiw);


							});
							setTimeout(function () {
								active.buttonInit();
							}, 200);

							//执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
							//pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
							next(lis.join(''), page < (data.data.archivesList).length); //假设总页数为 10
						} else {
							layer.msg("没有数据");
						}
					});
				}
			});
			//当你执行这样一个方法时，即对页面中的全部带有lay-src的img元素开启了懒加载（当然你也可以指定相关img）
			flow.lazyimg();

			//监听导航点击
			element.on('nav(demo)', function (elem) {
				//console.log(elem)
				layer.msg(elem.text());
			});
		},
		loginView: function () {
			//登录的弹出框
			layer.open({
				type: 1,
				title: false //不显示标题栏
					,
				closeBtn: false,
				area: ['380px', '430px'],
				shade: 0.8,
				id: 'LAY_layuipro' //设定一个id，防止重复弹出
					,
				btn: ['关闭'],
				btnAlign: 'c',
				moveType: 1 //拖拽模式，0或者1
					,
				content: "<iframe src='../login.html'></iframe>",
				success: function (layero) {},
				yes: function (index) {
					$(that).removeClass("active");
					$(".news-box .list-item-extend").html("");
					layer.closeAll();
				},
			});
		},
		//初始化表情包
		initEmotion: function () {
			//初始化表情包的css和js
			lzs_flieload.downLoadCss("/assets/plugin/emotion/jquery.sinaEmotion.css");
			lzs_flieload.downLoadJs("/assets/plugin/emotion/jquery.sinaEmotion.js", function () {
				$('.emoji').SinaEmotion($('.edit-text'));
				setTimeout(function () {
					layer.photos({
						photos: '.layer-img-preview',
						anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
					});
					$(".section-news .news-box .content").each(function (index, element) {
						var content = $(this).html();
						$(this).html(AnalyticEmotion(content));
					});
				}, 500);
			});
		},
		swiperload: function () {
			var swiper = new Swiper('.swiper-header', {
				slidesPerView: 1,
				//  slidesPerColumn: 2, //显示两行
				//spaceBetween: 20,//
				//			      slidesPerGroup: 5,
				//			      loop: true,
				//			      loopFillGroupWithBlank: true,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				paginationClickable: true,
				simulateTouch: true, //禁止鼠标模拟
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
					//hideOnClick: true,
				},
				//滑到最后一个隐藏前进按钮
				on: {
					slideChangeTransitionEnd: function () {
						if (this.isEnd) {
							this.navigation.$nextEl.css('display', 'none');
						} else {
							this.navigation.$nextEl.css('display', 'block');
						}
					},
				},
			});

		}

	};
	active.init();
	//监听提交
	form.on('submit(edit-info1)', function (data) {
		if ( $(".edit-text").val()== '') {
			return false;
		}
		$.post("/admin.php/cms.archives/add?addtabs=1", data.field, function (data) {
			layer.msg(" 提交成功");
			location.reload();
			return true;
		});

		return false;
	});
	return false;
});
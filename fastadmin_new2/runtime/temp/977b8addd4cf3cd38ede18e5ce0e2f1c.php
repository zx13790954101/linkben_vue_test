<?php if (!defined('THINK_PATH')) exit(); /*a:6:{s:73:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\index.html";i:1541263388;s:81:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\layout.html";i:1541636802;s:80:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\right.html";i:1541265820;s:82:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\sidebar.html";i:1540783351;s:81:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\script.html";i:1541654913;s:81:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\footer.html";i:1540605217;}*/ ?>
<!DOCTYPE html>
<html lang="zh-CN">
<!-- 更加标准的 lang 属性写法 http://zhi.hu/XyIa -->

<head>
	<meta charset="utf-8">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<!-- 优先使用 IE 最新版本和 Chrome -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="不超过150个字符" />
	<!-- 页面描述 -->
	<meta name="keywords" content="" />
	<!-- 页面关键词 -->
	<meta name="author" content="name, email@gmail.com" />
	<!-- 网页作者 -->
	<meta name="robots" content="index,follow" />
	<!-- 搜索引擎抓取 -->
	<title>linkben的资讯</title>
	<link rel="icon" href="/assets/img/favicon2.ico" type="image/x-icon" />
	<link rel="stylesheet" href="//at.alicdn.com/t/font_719754_ic3eapb8t6.css" />
	<!--swiper的引用-->
	<link rel="stylesheet" href="/assets/plugin/swiper/swiper.min.css" />
	<link rel="stylesheet" href="/assets//plugin/layui/css/layui.css"/>
	<link rel="stylesheet" href="/assets/plugin/linzesen/linzesen.css" />
	<link rel="stylesheet" href="/assets/addons/cms/new/common/public.css" />


</head>

<body style=" background-color: #f2f2f2;">

	<nav>
		<ul class=" flex-c layui-nav">
		</ul>
	</nav>
	<header class="lzs-nav">

		<div class="container ">
			<div class="header-r flex-c">
				<ul class="nav-ul   flex-c layui-nav">
					<li class="layui-nav-item ">
						<!-- <?php echo \think\Config::get("cms.actionname"); ?> -->
						<a href="<?php echo \think\Config::get("cms.indexurl"); ?>" class="" style="font-size: 1.80rem; font-weight: 600;color: #fff;">
							LinkBen</a>
					</li>
					<?php $__LIST__ = \addons\cms\model\Channel::getChannelList(["id"=>"nav","type"=>"top"]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$nav): $mod = ($i % 2 );++$i;?>
					<li class="layui-nav-item">
						<a href="<?php echo $nav['url']; ?>"><?php echo $nav['name']; ?> </a>
					</li>
					<?php endforeach; endif; else: echo "" ;endif; ?>
					<li class=" flex-item search-form">
						<form class=" flex-r" action="<?php echo addon_url('cms/search/index'); ?>" method="get">
							<div class="box-searchInput">
								<input type="text" name="search" />
							</div>
							<button class="button position-a-center"><i class="iconfont icon-sousuokuang "></i> </button>
						</form>
					</li>
					<li class="layui-nav-item flex-c">
						<?php if($user): ?>
						<a href="<?php echo url('index/user/index'); ?>" class="flex-c img-c" style="height:30px;">
						<img src="<?php echo $user['avatar']; ?>">
						</a>
						<dl class="layui-nav-child">
							<dd>
								<a href="<?php echo url('index/user/index'); ?>">会员中心</a>
							</dd>
							<dd>
								<a href="<?php echo url('index/user/logout'); ?>">退出</a>
							</dd>
						</dl>
						<?php else: ?>
						<a href="<?php echo url('index/user/index'); ?>">用户登录</a>
						<?php endif; ?>
		
					</li>
				</ul>
			</div>
		</div>
	</header>


	
<link rel="stylesheet" href="/assets/addons/cms/new/index/news.css" />
<section class="section-news container margin-20">
        <div class="row">

            <div class="col-lg-8 col-xs-12">
                <div class="banner-wrapper ">

                    <div class="swiper-container swiper-header">
                        <div class="swiper-wrapper">
                            <?php $__LIST__ = \addons\cms\model\Block::getBlockList(["id"=>"block","name"=>"focus","row"=>"5"]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$block): $mod = ($i % 2 );++$i;?>
                            <div class="swiper-slide">
                                <div class="position-r">
                                    <div class="img-r  swiper-header-img">
                                        <img src="<?php echo $block['image']; ?>" />
                                    </div>
                                    <a href="<?php echo $block['url']; ?>" class="center text position-a-center">第一个</a>
                                </div>
                            </div>
                            <?php endforeach; endif; else: echo "" ;endif; ?>
                        </div>
                        <!-- Add Pagination -->
                        <div class="swiper-pagination"></div>
                        <!-- Add Arrows -->
                        <div class="swiper-button-next" style="background-image: none;">
                            <i class="layui-icon layui-icon-right"></i>
                        </div>
                        <div class="swiper-button-prev" style="background-image: none;">
                            <i class="layui-icon layui-icon-left"></i>
                        </div>
                    </div>

                </div>

                <div class="news-select-type flex-c">

                    <ul class="layui-nav flex-item" lay-filter="news-select-type">
                        <li class="layui-nav-item layui-this">
                            <a href="">全部</a>
                        </li>
                        <li class="layui-nav-item">
                            <a href="javascript:;">说说</a>
                        </li>
                        <li class="layui-nav-item">
                            <a href="javascript:;">文章</a>
                        </li>
                        <li class="layui-nav-item">
                            <a href="javascript:;">话题</a>
                        </li>
                        <li class="layui-nav-item">
                            <a href="javascript:;">音乐</a>
                        </li>
                    </ul>
                    <form class="flex-c search-form layui-form" action="">
                        <div class="box-searchInput">
                            <input type="text" />
                        </div>
                        <button class="button position-a-center">
                            <i class="iconfont icon-sousuokuang "></i>
                        </button>
                    </form>
                </div>
                <div class="news-box">
                    <ul class="news-array flow-default" id="flow_newsList">
                        <!-- S 首页列表  model="1" 在标签里面来判断类型 -->
                        <!-- cms:arclist id="item"  addon="true" -->
                            <!-- include file="common/item" -->
                        <!-- /cms:arclist  -->
						<!-- E 首页列表 -->
						
                    </ul>
                </div>
            </div>

           
            <div class="news-r col-lg-4 col-xs-0">
    
	   <?php if($user): ?>
	   <div class="edit-info">
        <div class="edit-type btn-group flex-c">
            <button class="active flex-item">说说</button>
            <button class="flex-item">提问</button>
            <button class="flex-item">写文章</button>
            <button class="flex-item">话题</button>
        </div>
        
        <form class="layui-form " action="">
            <div class="layui-form-item flex-c">
                <h3 class="edit-title1 flex-item">有什么新鲜事想告诉大家?</h3>
                <h6 class="font-num">输入<span>0</span>字</h6>
                <input type="hidden" value="0" name="row[filestype]" lay-verify="" class="layui-input" />
                <input type="hidden" value="56" name="row[channel_id]" lay-verify="" class="layui-input" />
                <input type="hidden"  id="files-input" value="" name="row[files]" lay-verify="" class="layui-input" />
                <input type="hidden"  id="files-input" value="<?php echo $user['username']; ?>" name="row[username]" lay-verify="" class="layui-input" />
                <input type="hidden"  id="files-input" value="<?php echo $user['avatar']; ?>" name="row[avatar]" lay-verify="" class="layui-input" />
            </div>
            <div class="layui-form-item layui-form-text">
                <textarea placeholder="请输入内容" lay-verify="required"  maxlength="150" name="row[content]" class="layui-textarea edit-text"></textarea>
            </div>
            <div class="btn-group flex-c flie-select" id="add-edittext-flie">
                <span class="emoji pointer flex-item"><i class="iconfont icon-biaoqing" style="color: #ffac1a;"></i><label>表情</label></span>
                <span class="photo pointer flex-item" id="multifile"><i class="iconfont icon-tupian" style="color: #8cc413;"></i><label>图片</label></span>
                <span class="music pointer flex-item"><i class="iconfont icon-yinle" style="color: #c67ec2;"></i><label>音乐</label></span>
                <span class="topic pointer  flex-item"><i class="iconfont icon-huati" style="color: #5a8ce6;"></i><label>话题</label></span>
            </div>
            <div class="layui-form-item flex-c">
                <!-- 
                    <div class="layui-inline flex-item">
                    <select name="" lay-filter="aihao">
                        <option value="0" selected="">说说</option>
                        <option value="1">文章</option>
                        <option value="2" >音乐</option>
                        <option value="3">图片</option>
                    </select>
                </div>
             -->
                <div class="layui-inline flex-item">
                    <button class="submit"  lay-submit=""   lay-filter="edit-info1">发布</button>
                </div>
            </div>
		</form>
	</div>
		<?php else: ?>
		<iframe src="" id="login_iframe" style=" height: 395px;"></iframe>
		<script>
				function setIframeSrc() {
					var s = "/index/userdetail/login.html";
					var iframe1 = document.getElementById('login_iframe');
					if ( - 1 == navigator.userAgent.indexOf("MSIE")) {
						iframe1.src = s;
					} else {
						iframe1.location = s;
					}
				}
				setTimeout(setIframeSrc,1000);
		</script>
        <?php endif; ?>

    
    
    <div class="hotspot  margin-20">
            <div class="flex-c">
                <span class="span-mark"></span>
                <h5 class="title flex-item">24小时</h5>
                <span class="all-btn">查看全部</span>
            </div>
            <ul class="ul-array">
               <?php $__LIST__ = \addons\cms\model\Archives::getArchivesList(["id"=>"new","row"=>"8","orderby"=>"id","orderway"=>"desc"]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$new): $mod = ($i % 2 );++$i;?>
                <li>
                    <div class="header flex-c">
                        <div class="img-r hotspot-img">
                            <img src="<?php echo $new['avatar']; ?>" />
                        </div>
                        <a class="content  flex-item" href="<?php echo $new['url']; ?>">
                            <h5 class="block ellipsis-line-2">
                                    <?php echo $new['content']; ?>
                            </h5>
                            <span class="flex-c block">
                                <h6 class="auther flex-item"><?php echo $new['username']; ?> </h6>
                                <h6 class="time"><?php echo date('d',$new['createtime']); ?></h6>
                            </span>
    
                        </a>
    
                    </div>
                </li>
                <?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
        </div>
    
        <div class="recommend-auther">
    
            <div class="flex-c">
                <span class="span-mark"></span>
                <h5 class="title flex-item">热门推荐</h5>
                <span class="">换一批</span>
            </div>
            <ul class="ul-array">
                    <?php $__LIST__ = \addons\cms\model\Archives::getArchivesList(["id"=>"hot","row"=>"10","orderby"=>"id","orderway"=>"asc"]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$hot): $mod = ($i % 2 );++$i;?>
                <li>
                    <a href="#">
                        <div class="item flex-c">
                            <div class="img-r auther-img">
                                <img src="<?php echo $hot['avatar']; ?>" />
                            </div>
                            <div class="content flex-item">
                                <h5 class="name"><?php echo $hot['username']; ?> </h5>
                                <div class="flex-c">
                                    <span class="flex-item">122人关注</span>
                                    <span>122人喜欢</span>
                                </div>
                            </div>
                            <h5 class="attention">+关注</h5>
                        </div>
                    </a>
                </li>
                <?php endforeach; endif; else: echo "" ;endif; ?>
            </ul>
    
        </div>
</div>

        
            
        </div>
    </section>

    		<!--评论的列表模板-->
		<script id="commentlistpanel" type="text/html">
			<div class="flex">
				<div class="img-c  news-array-img"><img src="../../../img/hua.png"></div>
				<form class="layui-form flex-item " action="">
					<div class="layui-form-item layui-form-text flex">
						<textarea placeholder="请输入内容" class="layui-textarea edit-text"></textarea>
					</div>
					<div class=" flex-c flie-select" id="add-edittext-flie">
						<span class="emoji pointer margin-right"><i class="iconfont icon-biaoqing" style="color: #ffac1a;"></i><label>表情</label></span>
						<span class="photo pointer " id="multifile"><i class="iconfont icon-tupian" style="color: #8cc413;"></i><label>图片</label></span>
						<span class="flex-item"></span><button class="submit"  lay-submit="" lay-filter="edit-info">发布</button>
					</div>
				</form>
			</div>
			<div class="layui-tab commentlistpanel">
				<ul class="layui-tab-title">
					<li class="layui-this">按热度</li>
					<li>按时间</li>
				</ul>
				<div class="layui-tab-content">
					<div class="layui-tab-item layui-show">
						<ul>
							<li class="list-item">
								<div class="flex ">
									<div class="item-l ">
										<div class="img-c news-array-img"> <img src="../../../img/hua.png"> </div>
									</div>
									<div class="flex-item   item-r ">
										<div class="flex-c">
											<h5 class="title">我是题目 :</h5>

											<h5 class="ellipsis-line-3 ">你的</h5>
										</div>

										<div class="flex-c  item-bottom  group list-item-action">
											<span class="time flex-item">今天（2018年8月14日）</span>
											<span class="flex-c-y"><i class="iconfont icon-pinglun-tianchong"></i><span>评论</span></span>
											<span class="line-bar"></span>
											<span class="flex-c-y "><i class="iconfont icon-buoumaotubiao16"></i><span>点赞</span></span>

										</div>

										<div class="flex-item   item-r commentlistpanel-reply2 ">
											<div class="flex-c">
												<h5 class="title">我是题目 :</h5>
												<h5 class="ellipsis-line-3 ">你的</h5>
											</div>
											<div class="flex-c  item-bottom  group list-item-action">
												<span class="time flex-item">今天（2018年8月14日）</span>
												<span class="flex-c-y"><i class="iconfont icon-pinglun-tianchong"></i><span>评论</span></span>
												<span class="line-bar"></span>
												<span class="flex-c-y "><i class="iconfont icon-buoumaotubiao16"></i><span>点赞</span></span>
											</div>
											<div class="reply-more-content flex-c">
												<a href="#">一共1200条回复</a>
											</div>
										</div>

									</div>
								</div>
							</li>
						</ul>
						<h5 class="center">
								<a href="#">查看更多</a>
							</h5>
					</div>
					<div class="layui-tab-item">内容2</div>
				</div>
			</div>
		</script>
		<!--评论的列表模板-->
		<script id="login-panel" type="text/html">
			<iframe src="../login.html"></iframe>
		</script>
		<script src="https://cdn.staticfile.org/jquery/2.2.1/jquery.min.js"></script>
<script>
    window.jQuery || document.write(
        '<script  charset="utf-8" type="text/javascript"  src="/assets/plugin/jquery/jquery.min.js"  >\x3C/script>')
</script>
<script type="text/javascript" src="/assets/plugin/layui/layui.js" charset="utf-8"></script>
<!--	<script type="text/javascript" src="../plugin/linzesen/linzesen.js"></script>-->
<script type="text/javascript" src="/assets/plugin/swiper/swiper.min.js"></script>
<script type="text/javascript" src="/assets/plugin/linzesen/linzesen.js"></script>
		<script type="text/javascript" src="/assets/addons/cms/new/index/news.js"></script>

	<!--页脚-->
	<footer>

    <div class="footer-site flex  container ">
        <div class="f-left flex ">
            <dl class="flex-item">
                <dt>
                    <a href="#" class="h4">帮助中心</a></dt>
                <dd>
                    <a href="#">关于我们</a>
                </dd>
                <dd>
                    <a href="#">技术经济方案分享</a>
                </dd>
                <dd>
                    <a href="#">外包项目合作方案</a>
                </dd>

            </dl>
            <dl class="flex-item">
                <dt>
                    <a href="#" class="h4">关注我们</a></dt>
                <dd>
                    微博:
                    <a href="#">805650999@qq.com</a>
                </dd>
                <dd>
                    邮箱 :
                    <a href="#">
                        805650999@qq.com
                    </a>
                </dd>
                <dd>
                    qq :
                    <a href="#">
                        805650999
                    </a>
                </dd>
                <dd>联系微信号：
                    <a href="#">
                        lin_805650999
                    </a>
                </dd>
                <dd>github：
                    <a href="#">
                        zx13790954101
                    </a>
                </dd>
                <dd>合作电话：
                    <a href="#">
                        13790954101
                    </a>
                </dd>
            </dl>

        </div>
        <div class="f-right flex-r     flex-item ">
            <dl class=" ">
                <dt class="center">
                    <a href="#" class="h4">官方微信服务号</a></dt>
                <dd class="center">
                    <a href="#">
                        <div class="img-r wechat-code center">
                            <img src="/assets/img/qrcode_wecaht.jpg" />
                        </div>
                    </a>
                </dd>
            </dl>
            <dl class=" ">
                <dt class="center">
                    <a href="#" class="h4">官方微信小程序</a></dt>
                <dd class="center">
                    <a href="#">
                        <div class="img-r wechat-code center">
                            <img src="/assets/img/qrcode_wecaht.jpg" />
                        </div>
                    </a>
                </dd>
            </dl>

        </div>

    </div>

    <div class="footer-info   center container  margin-20 ">
        <span>© 2010- 2018 · All Rights Reserved ·
            <a href="http://www.linkben.com">连接基本</a>
        </span>
        <span> 粤ICP备15117005号-1 版权所有 © 广州连接基本信息科技有限公司</span>
    </div>

</footer>

	<!--js的引入-->


</body>

</html>
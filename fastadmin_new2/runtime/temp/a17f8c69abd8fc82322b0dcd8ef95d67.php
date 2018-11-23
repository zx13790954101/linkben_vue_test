<?php if (!defined('THINK_PATH')) exit(); /*a:5:{s:74:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\circle.html";i:1542164929;s:88:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\layout_circle.html";i:1542726283;s:82:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\sidebar.html";i:1540783351;s:81:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\script.html";i:1541654913;s:81:"D:\phpstudy\PHPTutorial\WWW\fastadmin_new2\addons\cms\view\new\common\footer.html";i:1540605217;}*/ ?>
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
    <link rel="stylesheet" href="/assets//plugin/layui/css/layui.css" />
    <link rel="stylesheet" href="/assets/plugin/linzesen/linzesen.css" />
    <link rel="stylesheet" href="/assets/addons/cms/new/common/public.css" />


</head>

<body style="background-color:white;">

    <nav>
        <ul class=" flex-c layui-nav container-fluid ">
            <li class="layui-nav-item flex-item">
               <input type="text" id="select-city" class="select-city h5  pointer " value="全国"  size="15">
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
    </nav>
    <header class="lzs-nav head-c">

        <div class="container ">
            <div class="header-r flex-c">
                <ul class="nav-ul   flex-c layui-nav">
                    <li class="layui-nav-item ">
                        <!-- <?php echo \think\Config::get("cms.actionname"); ?> -->
                        <a href="<?php echo \think\Config::get("cms.indexurl"); ?>" class="" style="font-size: 1.80rem; font-weight: 600;color: #e85206;">
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
                            <button class="button position-a-center"><i class="iconfont icon-sousuokuang "></i>
                            </button>
                        </form>
                    </li>

                </ul>
            </div>
        </div>
    </header>


    

<section class="container channel  margin-20" > 
    
    <div class="row">
        <div class="col-lg-8 col-xs-12 ">
            <div class="flex-c margin-20">
                    <h1 class="flex-item">
                            <?php echo $__CHANNEL__['name']; ?>
                    </h1>
                    <ol class="flex-c">
                            <!-- S 面包屑导航 -->
                            <?php $__LIST__ = \addons\cms\model\Channel::getBreadcrumb(isset($__CHANNEL__)?$__CHANNEL__:[], isset($__ARCHIVES__)?$__ARCHIVES__:[], isset($__TAGS__)?$__TAGS__:[], isset($__PAGE__)?$__PAGE__:[]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$item): $mod = ($i % 2 );++$i;?>
                            <li><a href="<?php echo $item['url']; ?>"><?php echo $item['name']; ?></a></li>
                            <?php endforeach; endif; else: echo "" ;endif; ?>
                            <!-- E 面包屑导航 -->
                        </ol>
            </div>
            <div class="article-section channel-list">
                <div class="row">
                    <!-- S 栏目列表 -->
                    <?php $__LIST__ = \addons\cms\model\Channel::getChannelList(["id"=>"channel","type"=>"son","typeid"=>$__CHANNEL__['id']]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$channel): $mod = ($i % 2 );++$i;?>
                    <div class="col-lg-6 ul-array">
                        <div class="flex-c">
                            <h3 class="title flex-item"><?php echo $channel['textlink']; ?> </h3>
                            <a href="<?php echo $channel['url']; ?>"><?php echo __('More'); ?></a>
                        </div>
                        

                        <?php $__LIST__ = \addons\cms\model\Archives::getArchivesList(["id"=>"row","channel"=>$channel['id'],"limit"=>"0,1"]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$row): $mod = ($i % 2 );++$i;?>
                        <div class="media flex-c">
                            <a href="<?php echo $row['url']; ?>" class="img-r channel-img">
                                <img class="" src="<?php echo $row['image']; ?>" alt="64x64" >
                            </a>
                            <div class="media-body">
                                <h4 class="media-heading"><?php echo $row['textlink']; ?></h4>
                                <p><?php echo mb_substr($row['description'],0,40); ?></p>
                            </div>
                        </div>
                        <?php endforeach; endif; else: echo "" ;endif; ?>
                        <ul class="list-unstyled">
                            <?php $__LIST__ = \addons\cms\model\Archives::getArchivesList(["id"=>"row","channel"=>$channel['id'],"limit"=>"1,5"]); if(is_array($__LIST__) || $__LIST__ instanceof \think\Collection || $__LIST__ instanceof \think\Paginator): $i = 0; $__LIST__ = $__LIST__;if( count($__LIST__)==0 ) : echo "" ;else: foreach($__LIST__ as $key=>$row): $mod = ($i % 2 );++$i;?>
                            <li class="flex-c">
                                <span class="flex-item  ellipsis-line-1"><?php echo $row['textlink']; ?></span> 
                                <span class="pull-right"><?php echo date('m-d',$row['createtime']); ?></span>
                            </li>
                            <?php endforeach; endif; else: echo "" ;endif; ?>
                        </ul>
                    </div>
                    <?php endforeach; endif; else: echo "" ;endif; ?>
                    <!-- E 栏目列表 -->
                </div>
            </div>
        </div>

        <aside class="col-lg-4 col-xs-0">
            
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
        </aside>
    </div>
</section>

<script src="https://cdn.staticfile.org/jquery/2.2.1/jquery.min.js"></script>
<script>
    window.jQuery || document.write(
        '<script  charset="utf-8" type="text/javascript"  src="/assets/plugin/jquery/jquery.min.js"  >\x3C/script>')
</script>
<script type="text/javascript" src="/assets/plugin/layui/layui.js" charset="utf-8"></script>
<!--	<script type="text/javascript" src="../plugin/linzesen/linzesen.js"></script>-->
<script type="text/javascript" src="/assets/plugin/swiper/swiper.min.js"></script>
<script type="text/javascript" src="/assets/plugin/linzesen/linzesen.js"></script>
<script type="text/javascript" src="/assets/addons/cms/new/citcle/index.js"></script>
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
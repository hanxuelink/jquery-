// authors:HX

var nav = (function($) {
    'use strict';

    var $nav = ""; // 菜单jquery对象

    /**
     * 获取url参数
     */
    function getParam(b) {
        var c = document.location.search;
        if (!b) {
            return c
        }
        var d = new RegExp("[?&]" + b + "=([^&]+)", "g");
        var g = d.exec(c);
        var a = null;
        if (null != g) {
            try {
                a = decodeURIComponent(decodeURIComponent(g[1]))
            } catch (f) {
                try {
                    a = decodeURIComponent(g[1])
                } catch (f) {
                    a = g[1]
                }
            }
        }
        return a;
    }

    /**
     * 动态提取菜单关系json串
     */
    function getMenu() {
      $.ajaxSettings.async = false; 
        /**
        $.ajax({
           url:"",
           type:"get",
           dataType:"json",
           async:false,//同步 这里必须要用
           success:function(result){
             
           }
        });
        */
        //为了效果 这里采用静态数据
        var _menuList = [
          { id: 1, name: "首页",icon:"fa-home",url: "demo.html"},
          { id: 1, name: "网络配置",icon:"fa-folder-o",url: "", 
            children: [
              {id:2,name:"网卡配置",icon:"fa-file-text-o",url:"active.html"},
              {id:3,name:"网络地址",icon:"fa-file-text-o",url:"active.html"},
              {id:4,name:"双机与负载",icon:"fa-folder-o",url:"",
                children:[
                  {id:5,name:"基本配置",icon:"fa-file-text-o",url:"active.html"},
                  {id:6,name:"双机检测",icon:"fa-folder-o",url:"",children:[
                    {id:7,name:"基本配置",icon:"fa-file-text-o",url:"active.html"}
                  ]}
                ]
              }
            ]
          }];
        //这里采用动态读取json文件的方式
        // var _menuList = [];
        // $.getJSON("data/menu.json",function(result){
        //   _menuList = result;
        // });
        $.ajaxSettings.async = true;  
        return _menuList;
    }

    // 组织代码菜单导航需要的菜单静态的
    function organizationCode() {
        var _menuList = getMenu();
        var _menuHtml = '<div class="menu left">' +
            '<aside id="nav-public">' +
            '<section  class="sidebar">' +
            '<ul class="sidebar-menu">';
            //动态附加菜单关系
            $(_menuList).each(function(i){
                if(!this.children || this.children.length == 0)
                {
                  //无子菜单
                  _menuHtml += '<li class="treeview" >' +
                                  '<a id="a_'+this.id+'" href="'+(this.url?this.url+"?id="+this.id:"#")+'" '+(i==0?'class="active"':'')+'>' +
                                    '<i class="fa '+this.icon+'"></i><span>'+this.name+'</span>' +
                                  '</a>' +
                                '</li>'
                }else{
                  //有二级子菜单
                  _menuHtml += '<li class="treeview">' +
                                  '<a id="a_'+this.id+'" href="'+(this.url?this.url+"?id="+this.id:"#")+'"><i class="fa '+this.icon+'"></i><span>'+this.name+'</span></a>';
                  _menuHtml += '<ul class="treeview-menu">';
                  $(this.children).each(function(){ 
                      _menuHtml += '<li><a id="a_'+this.id+'" href="'+(this.url?this.url+"?id="+this.id:"#")+'"><i class="fa '+this.icon+'"></i>'+this.name+'</a>';
                      //有三级自子菜单
                      if(this.children && this.children.length > 0)
                      {
                          _menuHtml += '<ul class="treeview-menu">';
                          $(this.children).each(function(){
                              _menuHtml += '<li><a id="a_'+this.id+'" href="'+(this.url?this.url+"?id="+this.id:"#")+'"><i class="fa '+this.icon+'"></i>'+this.name+'</a>';
                              //有四级自子菜单
                              if(this.children && this.children.length > 0)
                              {
                                  _menuHtml += '<ul class="treeview-menu">';
                                  $(this.children).each(function(){
                                      _menuHtml += '<li><a id="a_'+this.id+'" href="'+(this.url?this.url+"?id="+this.id:"#")+'"><i class="fa '+this.icon+'"></i>'+this.name+'</a></li>';
                                  });
                                  _menuHtml += '</ul>';
                              }                  
                              _menuHtml += '</li>'; 
                          });
                          _menuHtml += '</ul>';
                      }                  
                      _menuHtml += '</li>'; 
                  });
                  _menuHtml += '</ul>';                            
                  _menuHtml += '</li>';                                
                }
            });
            _menuHtml +=  '</ul>' +
                          '</section>' +
                          '</aside>' +
                          '</div>';

        return _menuHtml;   
        /*                     
        var _nav_code =
            '<div class="menu left">' +
            '<aside id="nav-public">' +
            '<section  class="sidebar">' +
            '<ul class="sidebar-menu">' +
               '<li class="treeview" >' +
                '<a href="#" class="active">' +
                  '<i class="fa fa-home"></i><span>首页</span>' +
                '</a>' +
                '</li>' +
                '<li class="treeview">' +
                  '<a href="#"><i class="fa fa-folder-o"></i><span>网络配置</span></a>' +
                  '<ul class="treeview-menu">' +
                    '<li><a href="#"><i class="fa fa-file-text-o"></i>网卡配置</a></li>' +
                    '<li><a href="#"><i class="fa fa-file-text-o"></i>网络地址</a></li>' +
                    '<li>' +
                      '<a href="#"><i class="fa fa-folder-o"></i>双机与负载</a>' +
                      '<ul class="treeview-menu">' +
                        '<li><a href="#"><i class="fa fa-file-text-o"></i>基本配置</a></li>' +
                        '<li><a href="#"><i class="fa fa-file-text-o"></i>双机检测</a></li>' +
                        '<li>' +
                          '<a href="#"><i class="fa fa-folder-o"></i>配置同步</a>' +
                          '<ul class="treeview-menu">' +
                            '<li><a href="#"><i class="fa fa-file-text-o"></i> 模块选择</a></li>' +
                            '<li>' +
                              '<a href="#"><i class="fa fa-file-text-o"></i>服务配置</a>' +
                            '</li>' +
                          '</ul>' +
                        '</li>' +
                      ' </ul>' +
                    '</li>' +
                  '</ul>' +
                ' </li>' +
            '<li class="treeview">' +
            '<a href="/editor"><i class="fa fa-folder-o"></i><span>管理员配置</span></a>' +
            ' <ul class="treeview-menu">' +
            '<li><a href="#"><i class="fa fa-file-text-o"></i>访问控制</a></li>' +
            '<li><a href="#"><i class="fa fa-file-text-o"></i>管理员组配置</a></li>' +
            ' </ul>' +
            ' </li>' +
            '</ul>' +
            '</section>' +
            '</aside>' +
            '</div>';
        return _nav_code;
        */
    }
    // 加载事件
    function eventListening() {
        //加载完成后  根据当前页面url内传递的id定位左侧菜单
        var id = getParam("id");
        if(id)
        {
            //删除所有菜单的active选中颜色
            $(".treeview a").removeClass("active");
            //找到对应的菜单
            $("#a_"+id).addClass("active");
            //遍历父节点 模拟点击事件进行展开操作
            $("#a_"+id).parent().parent().fadeIn();
            $("#a_"+id).parent().parent().parent().parent().fadeIn();
            $("#a_"+id).parent().parent().parent().parent().parent().parent().fadeIn();
        }
    }

    // 向页面输出我的公共部分
    function render(type) {

        var code = organizationCode(type);

        // 写入页面 - 获取容器
        var pgContent = $(".pg-content").size() > 0 ? $(".pg-content") : $("body");
        if ($(".pg-content").size() > 0) {
            pgContent.append(code);
        } else {
            pgContent.last().after(code);
        }
        $nav = pgContent.find(".nav");

        // 加载事件这个事件
        eventListening();
        // 点击菜单事件
        var animationSpeed = 300;

        $('.menu').on('click', 'li a', function(e) {
            var $this = $(this);
            var checkElement = $this.next();
            if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
                checkElement.slideUp(animationSpeed, function() {
                    checkElement.removeClass('menu-open');
                });
                checkElement.parent("li").removeClass("active").find('.fa-folder-open-o').removeClass('fa-folder-open-o').addClass('fa-folder-o');
            } else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {

                var parent = $this.parents('ul').first();

                var ul = parent.find('ul:visible').slideUp(animationSpeed);

                ul.removeClass('menu-open');

                var parent_li = $this.parent("li");

                checkElement.slideDown(animationSpeed, function() {
                    checkElement.addClass('menu-open').removeClass('active');
                    parent_li.addClass('active');
                    $('.active').children('a').children('.fa-folder-o').removeClass('fa-folder-o').addClass('fa-folder-open-o');
                    parent.find('li.active') //.removeClass('active').find('.fa-folder-open-o').removeClass('fa-folder-open-o').addClass('fa-folder-o');;
                    parent_li.addClass('active');
                });
            }
            //if this isn't a link, prevent the page from being redirected
            if (checkElement.is('.treeview-menu')) {
                e.preventDefault();
            }
        });
        // }
        // $(".guarantee").click(function() {
        //     window.top.location.href = "/help/#guarantee";
        //     window.location.reload();
        // });
    }

    //读取
    return {
        render: render
    };
})(jQuery)
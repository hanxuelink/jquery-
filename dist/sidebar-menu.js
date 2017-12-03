// (function($) {
// $.sidebarMenu = function(menu) {
//   var animationSpeed = 300;
//
//   $(menu).on('click', 'li a', function(e) {
//     var $this = $(this);
//     var checkElement = $this.next();
//     if (checkElement.is('.treeview-menu') && checkElement.is(':visible')) {
//         checkElement.slideUp(animationSpeed, function() {
//         checkElement.removeClass('menu-open');
//       });
//       checkElement.parent("li").removeClass("active").find('.fa-folder-open-o').removeClass('fa-folder-open-o').addClass('fa-folder-o');
//       // $(checkElement.parent("li").find('a')).removeClass('childli')
//       // if(checkElement.parent("li").find('a').find('i').hasClass('fa-file-text-o')){
//       //   $(checkElement.parent("li").find('a')).addClass('childli');
//       // }
//     }
//
//
//     else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
//
//       var parent = $this.parents('ul').first();
//
//       var ul = parent.find('ul:visible').slideUp(animationSpeed);
//
//       ul.removeClass('menu-open');
//
//       var parent_li = $this.parent("li");
//
//         checkElement.slideDown(animationSpeed, function() {
//         checkElement.addClass('menu-open').removeClass('active');
//         parent_li.addClass('active');$('.active').children('a').children('.fa-folder-o').removeClass('fa-folder-o').addClass('fa-folder-open-o');
//         parent.find('li.active')//.removeClass('active').find('.fa-folder-open-o').removeClass('fa-folder-open-o').addClass('fa-folder-o');;
//         parent_li.addClass('active');
//         // if(parent_li.find('a').find('i').hasClass('fa-file-text-o')){
//         //   $(parent_li.find('a')).addClass('childli');
//         // }
//       });
//     }
//     //if this isn't a link, prevent the page from being redirected
//     if (checkElement.is('.treeview-menu')) {
//       e.preventDefault();
//     }
//   });
// }
// 控制默认首页按钮
// $(function(){
//     $(".sidebar-menu").click(function() {
//       $(this).find('a').css({'color':'#000'});
//       $(this).find('a').children('.fa-home').removeClass('fa-home').addClass('fa-folder-o');
//     });
// });

if (location.pathname != "/" && window.location.pathname.split("/").length <= 2) {
    var _this = $(".treeview-menu").children('li').find("a[data-act=" + location.pathname.substr(1) + "]");
    if (_this.length > 0) {
        _this.addClass("actives");
        var right = _this.offset().left;
        var width = Number(_this.width()) + 30;
        $("#xq_move").css({ "left": right, "width": width + "px" });
    } else {
        var left = $(window).width();
        // $("#xq_move").css({ "left": left, "width": "94px" });
    }
} else if (location.pathname == "/") {
    var _this = $(".treeview-menu").children('li').find("a[data-act=editor]");
    if (_this.length > 0) {
        _this.addClass("actives");
        var right = _this.offset().left;
        var width = Number(_this.width()) + 30;
        // $("#xq_move").css({ "left": right, "width": width + "px" });
    }
}

"use strict";window.onload=function(){var e=0;function n(){clearInterval(document.querySelector(".jd_banner_imgbox").timer),document.querySelector(".jd_banner_imgbox").timer=setInterval(function(){7<++e&&(e=0),$(".jd_banner_img a").stop(),$(".jd_banner_img a").eq(e).siblings().animate({opacity:0}),$(".jd_banner_img a").eq(e).animate({opacity:1}),$(".banner_list li").eq(e).siblings().removeClass("add_listColor"),$(".banner_list li").eq(e).addClass("add_listColor")},2e3)}$(".jd_banner_imgbox .banner_left").on("click",function(){--e<0&&(e=7),$(".jd_banner_img a").stop(),$(".jd_banner_img a").eq(e).siblings().animate({opacity:0}),$(".jd_banner_img a").eq(e).animate({opacity:1}),$(".banner_list li").eq(e).siblings().removeClass("add_listColor"),$(".banner_list li").eq(e).addClass("add_listColor")}),$(".jd_banner_imgbox .banner_right").on("click",function(){7<++e&&(e=0),$(".jd_banner_img a").stop(),$(".jd_banner_img a").eq(e).siblings().animate({opacity:0}),$(".jd_banner_img a").eq(e).animate({opacity:1}),$(".banner_list li").eq(e).siblings().removeClass("add_listColor"),$(".banner_list li").eq(e).addClass("add_listColor")}),$(".banner_list li").on("mouseenter",function(){$(".jd_banner_img a").stop(),$(".jd_banner_img a").eq($(this).index()).siblings().animate({opacity:0}),$(".jd_banner_img a").eq($(this).index()).animate({opacity:1}),$(".banner_list li").eq($(this).index()).siblings().removeClass("add_listColor"),$(".banner_list li").eq($(this).index()).addClass("add_listColor")}),$(".jd_banner_imgbox").on("mouseenter",function(){clearInterval(document.querySelector(".jd_banner_imgbox").timer)}),$(".jd_banner_imgbox").on("mouseleave",function(){n()}),n();var t=0;$(".jd_banner_imgbox2 .banner_left").on("click",function(){--t<0&&(t=2),$.each($(".imgbox2_box"),function(e,n){$(n).children().eq(t).stop(),$(n).children().eq(t).siblings().animate({opacity:0}),$(n).children().eq(3).animate({opacity:1},0),$(n).children().eq(t).animate({opacity:1})})}),$(".jd_banner_imgbox2 .banner_right").on("click",function(){2<++t&&(t=0),$.each($(".imgbox2_box"),function(e,n){$(n).children().eq(t).stop(),$(n).children().eq(t).siblings().animate({opacity:0}),$(n).children().eq(3).animate({opacity:1},0),$(n).children().eq(t).animate({opacity:1})})});new Swiper(".ms_content_center.swiper-container",{loop:!0,slidesPerView:4,slidesPerGroup:4,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}}),new Swiper(".ms_content_right.swiper-container",{autoplay:{delay:1e3},loop:!0,pagination:{el:".swiper-pagination"}});function i(){clearInterval($(".hh_content_imgbox")[0].timer),$(".hh_content_imgbox")[0].timer=setInterval(function(){parseInt($(".hh_content_imgbox")[0].style.left)<-720?$(".hh_content_imgbox")[0].style.left="0px":0<parseInt($(".hh_content_imgbox")[0].style.left)?$(".hh_content_imgbox")[0].style.left="-720px":($(".hh_content_imgbox")[0].style.left=$(".hh_content_imgbox")[0].offsetLeft-1+"px",$(".hh_content_right .swiper-scrollbar1 span")[0].style.left=-parseInt($(".hh_content_imgbox")[0].style.left)/720*880+"px",console.log($(".hh_content_imgbox")[0].style.left))},1e3/60)}$(".hh_content_right .swiper-scrollbar1 span").on("mousedown",function(e){var i=window.event||e;$(this).on("mousemove",function(e){var n=window.event||e;$(this)[0].target=n.clientX-374-i.offsetX,$(this)[0].target>$(this).parent()[0].offsetWidth-$(this)[0].offsetWidth?$(this)[0].target=$(this).parent()[0].offsetWidth-$(this)[0].offsetWidth:$(this)[0].target<0&&($(this)[0].target=0),$(this)[0].style.left=$(this)[0].target+"px";var t=$(this)[0].target/($(this).parent()[0].offsetWidth-$(this)[0].offsetWidth);$(".hh_content_imgbox")[0].style.left=720*-t+"px"})}),$(window).on("mouseup",function(){$(".hh_content_right .swiper-scrollbar1 span").off("mousemove")}),i(),$(".hh_content_right").on("mouseenter",function(){clearInterval($(".hh_content_imgbox")[0].timer)}),$(".hh_content_right").on("mouseleave",function(){i()}),$.each($(".hh_content_imgbox .swiper-slide a"),function(e,n){n.onmousemove=function(e){var n;(n=e)&&n.preventDefault?n.preventDefault():window.event.returnValue=!1}})};
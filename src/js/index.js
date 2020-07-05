window.onload = function(){
    // 商品轮播图区域
    // 点击左按钮时，图片淡入淡出
    var jd_banner_index = 0;

    $(".jd_banner_imgbox .banner_left").on("click",function(){
        jd_banner_index--;
        if(jd_banner_index < 0){
            jd_banner_index = 7;
        }    
        //先清除上一次的淡入淡出动画，然后增加本次淡入淡出的动画效果
        $(".jd_banner_img a").stop();
        $(".jd_banner_img a").eq(jd_banner_index).siblings().animate({opacity:0});
        $(".jd_banner_img a").eq(jd_banner_index).animate({opacity:1});

        //给小图标添加样式
        $(".banner_list li").eq(jd_banner_index).siblings().removeClass("add_listColor");
        $(".banner_list li").eq(jd_banner_index).addClass("add_listColor");
    })

    $(".jd_banner_imgbox .banner_right").on("click",function(){
        jd_banner_index++;
        if(jd_banner_index > 7){
            jd_banner_index = 0;
        }
        $(".jd_banner_img a").stop();
        $(".jd_banner_img a").eq(jd_banner_index).siblings().animate({opacity:0});
        $(".jd_banner_img a").eq(jd_banner_index).animate({opacity:1});

        $(".banner_list li").eq(jd_banner_index).siblings().removeClass("add_listColor");
        $(".banner_list li").eq(jd_banner_index).addClass("add_listColor");
          
    })
    // 移动到banner小按钮上时，切换图片改变样式
    $(".banner_list li").on("mouseenter",function(){
        $(".jd_banner_img a").stop();
        $(".jd_banner_img a").eq($(this).index()).siblings().animate({opacity:0});
        $(".jd_banner_img a").eq($(this).index()).animate({opacity:1});

        $(".banner_list li").eq($(this).index()).siblings().removeClass("add_listColor");
        $(".banner_list li").eq($(this).index()).addClass("add_listColor");
    })


    // 自动轮播
    function autoPlay(){
        clearInterval(document.querySelector(".jd_banner_imgbox").timer);
        document.querySelector(".jd_banner_imgbox").timer = setInterval(function(){
        jd_banner_index++;
        if(jd_banner_index > 7){
            jd_banner_index = 0;
        }
        $(".jd_banner_img a").stop();
        $(".jd_banner_img a").eq(jd_banner_index).siblings().animate({opacity:0});
        $(".jd_banner_img a").eq(jd_banner_index).animate({opacity:1});

        $(".banner_list li").eq(jd_banner_index).siblings().removeClass("add_listColor");
        $(".banner_list li").eq(jd_banner_index).addClass("add_listColor");
        },2000);
    }

    // 鼠标移入，停止自动轮播
    $(".jd_banner_imgbox").on("mouseenter",function(){
        clearInterval(document.querySelector(".jd_banner_imgbox").timer);
    })
    // 鼠标移出，继续自动轮播
    $(".jd_banner_imgbox").on("mouseleave",function(){
        autoPlay();
    })

    autoPlay();
    
    // jd_banner轮播图 <!-- 三个图片展示区域 -->
    var imgbox2_box_index = 0;
    $(".jd_banner_imgbox2 .banner_left").on("click",function(){
        imgbox2_box_index--;
        if(imgbox2_box_index < 0){
            imgbox2_box_index = 2;
        }
        $.each($(".imgbox2_box"),function(index,value){
            $(value).children().eq(imgbox2_box_index).stop();
            $(value).children().eq(imgbox2_box_index).siblings().animate({opacity:0});
            $(value).children().eq(3).animate({opacity:1},0);
            $(value).children().eq(imgbox2_box_index).animate({opacity:1});
        });
    })
    $(".jd_banner_imgbox2 .banner_right").on("click",function(){
        imgbox2_box_index++;
        if(imgbox2_box_index > 2){
            imgbox2_box_index = 0;
        }
        $.each($(".imgbox2_box"),function(index,value){
            $(value).children().eq(imgbox2_box_index).stop();
            $(value).children().eq(imgbox2_box_index).siblings().animate({opacity:0});
            $(value).children().eq(3).animate({opacity:1},0);
            $(value).children().eq(imgbox2_box_index).animate({opacity:1});
        });
    })

    // 京东秒杀轮播图
    var mySwiper = new Swiper('.ms_content_center.swiper-container', {
        // autoplay: true,//可选选项，自动滑动
        loop:true,
        slidesPerView : 4,
        slidesPerGroup : 4,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })
    // 京东秒杀右侧小轮播图
    var mySwiper2 = new Swiper('.ms_content_right.swiper-container', {
        autoplay: {
            delay:1000,
        },//可选选项，自动滑动
        loop:true,
        pagination: {
            el: '.swiper-pagination',
        }
    })

    // 发现好货右侧轮播图
    $(".hh_content_right .swiper-scrollbar1 span").on("mousedown",function(eve){
        var evt = window.event || eve;
        $(this).on("mousemove",function(e){
            var evt2 = window.event|| e;
            $(this)[0].target = evt2.clientX - 374 -evt.offsetX;
            // $(this).parent()[0].offsetWidth - $(this)[0].offsetWidth == 880px
            if($(this)[0].target > $(this).parent()[0].offsetWidth - $(this)[0].offsetWidth){
                $(this)[0].target = $(this).parent()[0].offsetWidth - $(this)[0].offsetWidth;
            }else if($(this)[0].target < 0){
                $(this)[0].target = 0;
            }       
            $(this)[0].style.left = $(this)[0].target + "px";
            // 移动的比例 
            var bl = $(this)[0].target / ($(this).parent()[0].offsetWidth - $(this)[0].offsetWidth);
            $(".hh_content_imgbox")[0].style.left = - bl *720 + "px";
        });  
    });
    $(window).on("mouseup",function(){
        $(".hh_content_right .swiper-scrollbar1 span").off("mousemove");  
    });


    function hhAutoplay(){
        clearInterval($(".hh_content_imgbox")[0].timer);
        $(".hh_content_imgbox")[0].timer = setInterval(function(){
            if(parseInt($(".hh_content_imgbox")[0].style.left) < -720){
                $(".hh_content_imgbox")[0].style.left = 0 + "px";
            }else if(parseInt($(".hh_content_imgbox")[0].style.left) > 0){
                $(".hh_content_imgbox")[0].style.left = -720 + "px";
            }else{
                $(".hh_content_imgbox")[0].style.left = $(".hh_content_imgbox")[0].offsetLeft - 1 + "px";
                $(".hh_content_right .swiper-scrollbar1 span")[0].style.left = - (parseInt($(".hh_content_imgbox")[0].style.left) / 720 * 880) + "px"
                console.log($(".hh_content_imgbox")[0].style.left)
            }
        },1000/60);
    }
    hhAutoplay();

    $(".hh_content_right").on("mouseenter",function(){
        clearInterval($(".hh_content_imgbox")[0].timer);
    })
    $(".hh_content_right").on("mouseleave",function(){
        hhAutoplay();
    })

    // 阻止默认事件
    $.each($(".hh_content_imgbox .swiper-slide a"),function(index,value){
        value.onmousemove = function(e){
            stopDefault( e );
        }
    });

    function stopDefault( e ) { 
        //阻止默认浏览器动作(W3C) 
        if ( e && e.preventDefault ) 
            e.preventDefault(); 
        //IE中阻止函数器默认动作的方式 
        else 
            window.event.returnValue = false; 
        return false; 
    }
}


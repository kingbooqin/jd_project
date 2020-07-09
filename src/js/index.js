window.onload = function(){
    // decodeURI())转译URL编码
    // 根据cookie设置登录
    if(document.cookie){
        var cookieArr = document.cookie.split("; ");
        for(var i=0;i<cookieArr.length;i++){
            var newArr = cookieArr[i].split("="); 
            if(newArr[0] == "username"){
                $(".top_content_center").html("<a href='#'>欢迎您,尊敬的"+decodeURI(newArr[1])+" </a>")
            } 
            if(newArr[0] == "productNum"){
                $(".mycar em").html(newArr[1]);
                $(".nav_top_right em").html(newArr[1]);
            } 
        }
    }

    // 商品轮播图区域
    // 鼠标移入li时，隐藏详细列表出现
    $(".jd_banner_list").children().on("mousemove",function(){
        $(".banner_list_con").css({
            display:"block",
        })
    })
    $(".jd_banner_list").on("mouseout",function(){
        $(".banner_list_con").css({
            display:"none",
        })
    })
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
                $(".hh_content_right .swiper-scrollbar1 span")[0].style.left = - (parseInt($(".hh_content_imgbox")[0].style.left) / 720 * 880) + "px";
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

    // 楼层跳跃
    window.onscroll = function(){
        // 如果蜷曲距离大于jd秒杀距离顶部的大小，则让右边的导航条变为固定定位
        if($(window).scrollTop() > $("#jd_ms")[0].offsetTop){
            $(".ms_dingwei li:last").css({display:"block"})
            $(".ms_dingwei").css({
                position:"fixed",
                right:"94px"
            });
            if($(".ms_dingwei").css("position") == "fixed"){
                $(".ms_dingwei").stop().animate({
                    top:"100px",
                },100)
            }
        }else{
            $(".ms_dingwei").css({
                position:"absolute",
                top:0,
                right:"-66px",
            }).stop()
        }    

        // 根据滚动条的位置，添加颜色
        if($(window).scrollTop() < $("#jd_ms")[0].offsetTop - 180){
            $(".ms_dingwei li:last").css({display:"none"})
            $("#fixed_nav").css({display:"none"}).animate({top:"-52px"}).finish();
            $(".ms_dingwei li").removeClass("active");

        }else if($(window).scrollTop() >= $("#jd_ms").offset().top - 180 && $(window).scrollTop() < $("#jd_tj").offset().top -70 ){

            $("#fixed_nav").css({display:"block"}).animate({top:0});
            $(".ms_dingwei li").eq(0).addClass("active").siblings().removeClass("active");

        }else if($(window).scrollTop() >= $("#jd_tj").offset().top - 70 && $(window).scrollTop() < $(".jd_tit").eq(0).offset().top - 70){
            $(".ms_dingwei li").eq(1).addClass("active").siblings().removeClass("active");

        }else if($(window).scrollTop() >= $(".jd_tit").eq(0).offset().top - 70 && $(window).scrollTop() < $(".jd_tit").eq(1).offset().top - 70){
            $(".ms_dingwei li").eq(2).addClass("active").siblings().removeClass("active");

        }else if($(window).scrollTop() >= $(".jd_tit").eq(1).offset().top - 70){
            $(".ms_dingwei li").eq(3).addClass("active").siblings().removeClass("active");
        }

        // 为你推荐懒加载
        // 窗口可视高度
        var clientHeight = document.documentElement.clientHeight;
        // 大盒子距离顶部的距离
        var eleTop = $("#jd_wn").offset().top;
        // 想要生成的小盒子的数量
        var wantNum =  $(".jd_wn_box").children().length;

        if($(window).scrollTop() > eleTop && wantNum <= 60){
                var str = "";
                for(var i=0;i<5;i++){
                    str = `
                                <div class="wn_xh_img">
                                    <img src=".././images/xs1.webp" alt="">
                                </div>
                                <p>OPPO Reno4 5G新品手机超清夜景视频防抖智能拍照游戏闪充全网通</p>
                                <h3>$3799.00</h3>
                            `;
                    var newSection = document.createElement("section");
                    newSection.innerHTML = str;
                    newSection.className = "wn_box_xh";
                    $(".jd_wn_box").append($(newSection));
                    $(newSection).css({display:"none"});
                }
        }
    
        var eleHeight = 324;
        $.each($(".wn_box_xh"),function(index,value){
            var nowFloor = Math.ceil(index/5);    
            if(nowFloor * eleHeight + eleTop  <= clientHeight + $(window).scrollTop()){
                $(value).css({display:"block",});
            }
        })
    }

    $(".ms_dingwei li").on("click",function(){
        if($(this).index() == 0){
            $(this).addClass("active").siblings().removeClass("active");
            var itemTop = $("#jd_ms").offset();
            $("body,html").animate({
                scrollTop:itemTop.top - 69,
            })
        }else if($(this).index() == 1){
            $(this).addClass("active").siblings().removeClass("active");
            var itemTop = $("#jd_tj").offset();
            $("body,html").animate({
                scrollTop:itemTop.top - 69,
            })
        }
        else if($(this).index() == 2){
            $(this).addClass("active").siblings().removeClass("active");
            var itemTop = $(".jd_tit").eq(0).offset();
            $("body,html").animate({
                scrollTop:itemTop.top - 69,
            })
        }
        else if($(this).index() == 3){
            $(this).addClass("active").siblings().removeClass("active");
            var itemTop = $(".jd_tit").eq(1).offset();
            $("body,html").animate({
                scrollTop:itemTop.top - 69,
            })
        }else if($(this).index() == 6){
            $(this).siblings().removeClass("active");
            var itemTop = $(".jd_tit").eq(1).offset();
            $("body,html").animate({
                scrollTop:0,
            })
        }
    });





}


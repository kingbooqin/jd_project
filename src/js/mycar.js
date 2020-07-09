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
        }   
    }
    // 初始cookie:  poductNum值为0
    var time = new Date;
    //2.2 把time设置成20秒以后的时间
    //注意:我们在东八区,获取到时的9:32分,此时标准应该是1:32分,
    //但是他在设置的时候把你的9:32分当标准时间使用,所有为了和当前时间一致,要减去8个小时
    time.setTime(time.getTime()-8*60*60*1000+60*1000*60*24*7);
    //2.3 设置有时效的cookie
    document.cookie = "productNum=0;expires="+time;
 
    function getCookie(name){
        var cookieArr = document.cookie.split("; ");
        for(var i=0;i<cookieArr.length;i++){
            var newArr = cookieArr[i].split("="); 
            if(newArr[0] == name){
                return parseInt(newArr[1]);
            }
        }    
    }
    // 显示数据库里面的商品
    $.get("../interface/showlist.php",function(data){
        var json = JSON.parse(data);
        if(json.code == 1){
            $(".toshop_box").css({display:"none"});
            $(".product_list").css({display:"block"});
            var str = "";
            for(var i=0;i<json.data.length;i++){
                str += `
                <div class="product_item" product_id="${json.data[i].product_id}">
                            <div class="product_check">
                                <input type="checkbox" name="ck1" id="check1">
                            </div>
                            <div class="product_img">
                                <img src="${json.data[i].product_img}" alt="">
                            </div>
                            <div class="product_name">
                                ${json.data[i].product_name}
                            </div>
                            <div class="product_one_price">${json.data[i].product_price}</div>
                            <div class="product_number"> 
                                <span>-</span><strong>${json.data[i].product_num}</strong><em>+</em>
                            </div>
                            <div class="product_sum_price">￥${json.data[i].product_price.slice(1)*json.data[i].product_num}</div>
                            <div class="product_operation">
                                    删除
                            </div>
                </div>               
                `;
                var porductList = document.getElementsByClassName("product_list_main")[0];
                porductList.innerHTML = str;
                // 添加商品数量cookie
                document.cookie = "productNum=" +(getCookie("productNum") + parseInt(json.data[i].product_num)) + ";expires="+time;
            }
        }else{
            console.log("请求数据失败或者无数据")
            $(".toshop_box").css({display:"block"});
        }
        // 减少商品数量
        $(".product_number span").on("click",function(){
            if($(this).next()[0].innerHTML <= 1){
                $(this).css({color:"#ccc"});
                return;
            }else{
                $(this).next()[0].innerHTML--;
                $(this).parent().next()[0].innerHTML = "￥" + $(this).parent().prev().text().slice(1) * $(this).next().text();
                document.cookie = "productNum=" + (getCookie("productNum") - 1) + ";expires="+time;
                $.get('../interface/updatewq.php',{
                    id:$(this).parent().parent().attr("product_id"),
                    type:"cut"
                },function(data){
                    var json = JSON.parse(data);
                    if(json.code==1){
                        console.log('商品数量减少成功');
                    }
                })
            }
        })
        // 增加商品数量
        $(".product_number em").on("click",function(){
            $(this).prev().prev().css({color:"#000"});
            $(this).prev()[0].innerHTML++;
            document.cookie = "productNum=" + (getCookie("productNum") + 1) + ";expires="+time;
            $(this).parent().next()[0].innerHTML = "￥" + $(this).parent().prev().text().slice(1) * $(this).prev().text();
            $.get('../interface/updatewq.php',{
                id:$(this).parent().parent().attr("product_id"),
                type:"add"
            },function(data){
                var json = JSON.parse(data);
                if(json.code==1){
                    console.log('商品数量增加成功')
                }
            })
        })
        // 移除商品
        $(".product_operation").on("click",function(){
            $(this).parent().addClass("remove_now");
            document.cookie = "productNum=" + (getCookie("productNum") - $(this).prev().prev().children().eq(1).text()) + ";expires="+time;
            $(".remove_now").remove();
            if(!$(".product_item")[0]){
                $(".product_list_tit").css({display:"none"});
            }
            $.get("../interface/delwq.php",{
                id:$(this).parent().attr("product_id"),
            },function(data){
                if(JSON.parse(data).code == 1){
                    console.log("移除商品成功")
                     // 购物车里面无商品时，显示去购物
                    //  如果还存在product_item，则表示还有商品
                    if(!$(".product_item")[0]){
                        $(".toshop_box").css({display:"block"});
                    }
                }
            })
        })


        
    })
    













}
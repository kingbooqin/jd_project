window.onload = function(){
// 添加商品数量，到1时不能再减少
$(".select_add_in .now_as header").on("click",function(){
    var numAdd = $(".now_num").html();
    $(".now_num").html(++numAdd);
    $(this).next().css({
        cursor:"pointer"
    })
});

$(".select_add_in .now_as footer").on("mouseenter",function(){
    var numAdd = $(".now_num").html();
    if(numAdd == 1){
        $(this).css({
            cursor:"not-allowed"
        });
    }
})
$(".select_add_in .now_as footer").on("click",function(){
    var numAdd = $(".now_num").html();
    if(numAdd == 1){
        return;
    }else{
        $(".now_num").html(--numAdd);
        console.log(numAdd)
        if(numAdd == 1){
            $(this).css({
                cursor:"not-allowed"
            })
        }
    }   
});

//商品信息选择区域，点击添加selectedItem类名，增加边框样式
$(".select_box_item").on("click",function(){
    $(this).addClass("selectedItem").siblings().removeClass("selectedItem");
})

$(".select_add ul li").on("click",function(){
    $(this).addClass("selectedItem").siblings().removeClass("selectedItem");
})

$(".select_bt ul li").on("click",function(){
    $(this).addClass("selectedItem").siblings().removeClass("selectedItem");
})

// console.log($(".select_box_item").hasClass("selectedItem"))
$.each($(".select_box_item"),function(index,item){
    // console.log($(".select_box_item")[index])
    // console.log($(".select_box_item").eq(index).attr("product_id"))
    // console.log($(".select_box_item").eq(index).children("p").text())
});
// 在详情页加入购物车
$(".add_in_car").on("click",function(){
    var select_index = 0;
    $.each($(".select_box_item"),function(index,item){
        if($(item).hasClass("selectedItem")){
            select_index = index;
        }
    });
    $.get("../interface/addwq.php",{
        id:$(".select_box_item").eq(select_index).attr("product_id") + "",
        name:$(".select_box_item").eq(select_index).children("p").text() + "",
        img:$(".select_box_item").eq(select_index).children("img").attr("src") +"",
        price:$(".price_one strong").text() + "",
    },function(data){
        if(JSON.parse(data).code ==1){
            console.log("加入成功");
            // 加入成功后跳转到购物车页面
            location.href = "./mycar.html";
        }else{
            console.log("加入失败")
        }
    })
})
















}
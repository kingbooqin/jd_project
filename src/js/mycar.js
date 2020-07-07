window.onload = function(){
    $.get("../interface/showlist.php",function(data){
        var json = JSON.parse(data);
        if(json.code == 1){
            $(".toshop_box").css({display:"none"});
            $(".product_list").css({display:"block"});
            var str = "";
            for(var i=0;i<json.data.length;i++){
                str = `
                <div class="product_item">
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
                            <div class="product_sum_price">
                                ${json.data[i].product_price}
                            </div>
                            <div class="product_operation">
                                    删除
                            </div>
                </div>               
                `;
                var newItem =  document.createElement("div");
                newItem.className = "product_item";
                newItem.innerHTML = str;
                var productList = document.getElementsByClassName("product_list_main")[0];
                productList.appendChild(newItem);
            }
        }else{
            console.log("请求数据失败")
        }
    })











}
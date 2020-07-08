window.onload = function(){
    $(".input_con #sub").on("click",function(){
        $.get("../interface/register.php",{
            username:$("#uname").val(),
            password:$("#upass").val(),
        },function(data){
            if(JSON.parse(data).code == 1){
                location.href = "../pages/jd_index.html";
            }else{
                alert("注册失败")
            }
        });
    })















}
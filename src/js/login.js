window.onload = function(){
    $("#formlogin .loginbtn").on("click",function(){
        $.get("../interface/login.php",{
            username:$(".login_username").val(),
            password:$(".login_password").val(),
        },function(data){
            if(JSON.parse(data).code == 1){
                location.href = "../pages/jd_index.html";
            }else{
                alert("您的账号或者密码错误！")
            }
        })
    })











}
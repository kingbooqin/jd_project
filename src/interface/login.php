<?php
    header('content-type:text/html;charset=utf8');
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];

    //创建连接
    $conn = mysqli_connect("localhost","root","root","shop");

    //根据前端参数插入数据
    $sql = "SELECT * FROM `user` WHERE `username`='$username' AND `password`= '$password'";

    $res = mysqli_query($conn,$sql);

    // 关闭数据库
    mysqli_close($conn);

    //把结果转成json,然后输出
    $json = json_encode($res);
    //谁想php要数据,php就输出给谁
    if($json){
        setcookie("username",$username,time()+3600,"/");
        setcookie("password",$password,time()+3600,"/");
        echo json_encode(array("code"=>1));  
    }else{
        echo json_encode(array("code"=>0));
    }

?>
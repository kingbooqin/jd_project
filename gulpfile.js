//1 导入gulp
const gulp = require('gulp');
//2 导入del
const del = require('del'); 
//3 导入gulp-autoprefixer
const autoprefixer = require('gulp-autoprefixer');
//4 导入gulp-cssmin
const cssmin = require('gulp-cssmin');
//5 导入gulp-htmlmin
const htmlmin = require('gulp-htmlmin');
//6 导入gulp-babel
const babel = require('gulp-babel')
// ==>注意:这个包还依赖了另外两个包,也需要你下载
// =>@babel/core和@babel/preset-env
//7 导入gulp-uglify
const uglify = require('gulp-uglify');
//8 导入gulp-webserver
const webserver = require('gulp-webserver');

const cssHandler = ()=>{
    return gulp.src("./src/css/*.css")
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest("./dist/css"))
}
//书写scss压缩规则
const scssHandler = ()=>{
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))  //编译好的scss就是css文件要统一放在dist的css文件夹下面
}

//书写关于html压缩的规则
const htmlHandler = ()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        removeAttributeQuotes:true,//移除属性上的双引号
        removeComments:true,//移除注释
        collapseWhitespace:true,//移除所有空格,会变成一行代码
        minifyCSS:true,//把页面里面style标签里面的css样式也去空格
        minifyJS:true,//把页面里面script标签里面的js代码也去空格
        collapseBooleanAttributes:true//把值为布尔值的属性简写
    }))
    .pipe(gulp.dest('./dist/pages'))
}
//书写关于js压缩的规则
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())  //uglify不认识es6,一定要先转语法,再压缩
    .pipe(gulp.dest('./dist/js'))
}

//书写关于lib的移动的规则
const libHandler = ()=>{
    //我打算把src处理完成以后,都放到dist文件夹下
    return gulp.src('./src/lib/**')
    .pipe(gulp.dest('./dist/lib'))
}
//书写关于images的移动的规则
const imagesHandler = ()=>{
    return gulp.src('./src/images/**') //"**"表示images下面的所有文件
    .pipe(gulp.dest('./dist/images'))  
}
//书写关于删除的规则
const delHandler = ()=>{
    return del(['./dist'])
}
//书写webserver的规则
const webserverHandler = ()=>{
    return gulp.src('./dist')   //找到要作为服务器根目录的文件夹
    .pipe(webserver({
        port:8090,//端口号,0-6635之间,尽量不要用0-1023
        open:'./pages/index.html',//你默认打开的首页,路径从dist开始书写
        livereload:true,//热更新,就是当dist里面代码有变化的时候自动刷新浏览器
        proxies:[ //这个第三方模块还可以帮助我们配置代理
            //直接在使用webserver的时候添加一个配置项:   proxies:[]
            {
                source: '/abc', //表示请求的地址
                target: 'http://127.0.0.1/json.php'//你要代理的地址
            },
            {
                source: '/eee', //表示请求的地址
                target: 'http://127.0.0.1/json.php'//你要代理的地址
            }
        ]
    }))
}
//书写自动监控任务
const watchHandler = ()=>{
    /*
        当我在src里面书写代码的时候,只要我修改我的代码,就会被gulp监听到,
        一旦监听到,就重新帮我删除以前的和压缩现在的,一旦压缩,dist文件夹里面内容就变化了
        变化了以后服务器就会热更新
    */
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/js/*.js',jsHandler);
    gulp.watch('./src/pages/*.html',htmlHandler);
    gulp.watch('./src/images/**',imagesHandler);
    gulp.watch('./src/lib/**',libHandler)
}

// 最终优化任务导出
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(libHandler,imagesHandler,cssHandler,htmlHandler,jsHandler),
    watchHandler
)
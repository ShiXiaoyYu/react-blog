/**
 * Created by Administrator on 2016/3/1.
 */
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');/**/
var config = require('./webpack.config');
var express = require('express');
var path = require('path');
var app =express();

//
var bodyParser = require('body-parser');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var crypto = require('crypto');
var User =  require('./models/user.js');
var Post = require('./models/post.js');
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret:settings.cookieSecret,
    key:settings.db,//cookie name
    cookie:{maxAge:1000*60*60*24*30,secure: false},//30 days
    store:new MongoStore({
        /* db:settings.db,
        host:settings.host,
        port:settings.port*/
        url: "mongodb://" + settings.host + "/" + settings.db
})
}));

//注册  登录
app.post('/api/reg',function(req,res){
  //  console.log(req.body);
  var name  = req.body.name;
    var password = req.body.password;
    var password_re = req.body['password_re'];
  //  console.log( req.body['password-repat']);
    //检验用户两次输入的密码是否一致、
    if(password_re != password){
     //   console.log('false');
        req.flash('error','两次输入密码不一致');
        return res.redirect('./');//返回注册页  注意是'./'还是'/'
    }
    //生成密码的md5值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name:name,
        password:password,
        email:req.body.email
    });
//检查用户名是否已经存在
    User.get(newUser.name,function(err,user){
      //  console.log('newUser');
        if(err){
            req.flash('error',err);
            return res.redirect('/');
        }
        if(user){
            req.flash('error',err);
          res.send('USERREAPT');//用户已经存在 用来做登录验证
            return res.redirect('/');//应该是返回注册页的
        }
       //如果不存在则新增用户
        newUser.save(
            function(err,user){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/');//注册失败应该返回注册页的
                }
            //    console.log(server);
                req.session.user = newUser;//用户信息存入 session
           //     req.flash('success','注册成功');

               var Account = newUser.name;
                console.log('ACCOUNT');
                 console.log(Account);
              res.send(Account);
                //   res.send('注册成功');
             //   res.redirect('/');//注册成功返回主页
            }
        );
    })
});


app.post('/api/login',function(req,res){
    //生成密码的md5值

    console.log('LOGIN的请求');
console.log(req.body);
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    console.log(req.body.password);
    //检查用户是否存在
     User.get(req.body.name,function(err,user){
         if (!user) {
             req.flash('error', '用户不存在!');
             res.send('用户不存在!');
             return;
           //  return res.redirect('/login');//用户不存在则跳转到登录页
         }
         //检查密码是否一致
         if (user.password != password) {
             req.flash('error', '密码错误!');
        //     res.send('password wrong');
             res.send('LOGIN');//为使前端逻辑判断一致 所以这里也采用 前端每次已登录获取用户名（没获取到）相同的返回
             return;
            // return res.redirect('/login');//密码错误则跳转到登录页
         }
       //   console.log('登录成功///////////////////////');
        //  console.log(req.session.user);
        //  console.log(user.name);
         //用户名密码都匹配后，将用户信息存入 session
         req.session.user = user;
         req.flash('success', '登陆成功!');
          var Account = user.name;
         console.log('ACCCCCOUNTA');
         console.log(Account);
         res.send(Account);
         //   res.redirect('/');//登陆成功后跳转到主页
         //  res.redirect('/');//登录成功后跳转到主页
     })
});

app.get('/api/logout',function(req,res){
    if(req.session.user){
     //   console.log('logout');
     //   console.log(req.session.user.name);//undefined
        User.get(req.session.user.name,function(err,user){
       //     console.log(req.session.user);//{object}
         //   console.dir(user);
            if( req.session.user.password == user.password){
                 req.session.user = null;/*  ? 数据库中的user是否也为null*/
                req.flash('success', '退出');
               console.log('logout');
                res.send('LOGOUT');
                //   res.redirect('/');//登陆成功后跳转到主页
                //  res.redirect('/');//登录成功后跳转到主页
            }
        });
        //     res.send('nouser');
    }else{
        res.send('已经退出，请勿重复发送')
    }
});


app.get('/api/account',function(req,res){
   if(req.session.user){
      // console.log('3');
      // console.log('getReq');
      // console.log(req.session.user.name);//undefined
       User.get(req.session.user.name,function(err,user){
        //   console.log(req.session.user);//{object}
         //  console.dir('user');
         //  console.dir(user);
           if( req.session.user.password == user.password){
           //    console.log('match');
               req.flash('success', '登陆成功!');
             //  console.log(user.name);
               var Account = user.name;
              // console.log(Account);
               res.send(Account);
               //   res.redirect('/');//登陆成功后跳转到主页  单页面不用跳转
               //  res.redirect('/');//登录成功后跳转到主页
           }else {
               //防止获得的密码为undefined问题
               return
           }
       });
  //     res.send('nouser');
   }else{
       res.send('LOGIN');
   }
    return
});

var titleI = 0;
app.get('/api/editor',function(req,res){
    titleI++;
    var title = 'title'+titleI;
    var content = req.query.content;
    var currentUser = req.session.user;
    console.log('存储文章lalalalalalalalalalalalalalalal');
    console.log(content);
    console.log(currentUser);
    var post =new Post(currentUser.name,title,content);
    post.save(function(err){
        if(err){
            req.flash('error',err);
            res.send('fail')
        }
        req.flash('success','发布成功');
        res.send('success');
        return
    });
  /*  if(req.session.user){
        var content =req.query.content;




        console.log(content);;
        res.send('已经存储')

    }else{
        res.send('登录先')
    }
*/

});


app.get('/api/posts',function(req,res){
    Post.get(null,function(err,posts){
        if(err){
            console.log('is error');
            posts = [];
        }
        posts = posts;
        console.log('所有文章lalalalallalalalal所有文章');
        console.log(posts);
        res.send(posts);
        return;
    })
});

app.get('/api/account/articlede',function(req,res) { //获取文章详情
    console.log('到服务端了到服务端到服务端了');
    var name = req.query.gt.name;
    var title = req.query.gt.title;
    var time = req.query.gt.time;

    console.log(name);
    console.log(title);
    console.log(time);
    console.log('文章详情');
    Post.getOne(name, time, title, function (err, posts) {
            if (err) {
                console.log('noe error');
                return
           //     res.send('cuowu')
            }
           console.log('发送文章lalalalalallalalla是详情');
            console.log(posts);
       res.send(posts);
  //   res.send('123');

    });

});
/*
app.get('/api/logout',function(){
   if(req.session.user){

   }
});
*/


app.set('port', process.env.PORT || 3300);
app.use(express.static(path.join(__dirname, 'app')));


var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.set('views',__dirname);
//console.log(__dirname);
//console.log(path);
app.get('/*',function(req,res){
 //   console.log(req);v
    if(req.session.user){
     //   console.log(req.session.user);
            //  res.redirect('/');//登录成功后跳转到主页
    }
   res.sendFile(__dirname+'/build/index.html');

});
var server = app.listen(app.get('port'), function() {
    // debug('Express server listening on port ' + server.address().port);
    console.log('start'+server.address().port+'get'+app.get('port'));
});


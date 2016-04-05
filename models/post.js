/**
 * Created by Administrator on 2016/3/10.
 */
var mongodb = require('./db');

function Post(name,title,post){
    this.name = name;
    this.title = title;
    this.post = post;
}

module.exports = Post;
//存储一篇文章及其相关信息
//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        date: date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    //要存入数据库的文档
    var post = {
        name: this.name,
        time: time,
        title: this.title,
        post: this.post
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //将文档插入 posts 集合
            collection.insert(post, {
                safe: true
            }, function (err) {
                mongodb.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null);//返回 err 为 null
            });
        });
    });
};
/*Post.prototype.save = function(callback){
    var date = new Date();
    //存储各种时间格式，方便以后扩展

    var time = {
        data:date,
        year:date.getFullYear(),
        month:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
        day:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
        minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    //要存入数据库的文档
    var post = {
         name:this.name,
         time:time,
         title:this.title,
         post:this.post
    }
  //打开数据库
    mongodb.open(function(err,db){
        if(err){
            console.log('error1');
            return callback(err);
        }
        //读取posts集合
        db.collection('posts',function(err,collection){
            if(err){
                console.log('error2');
                mongodb.close();
                return callback(err);
            }
            //将文档插入posts集合
            collection.insert(post,{
                safe:true
            },function(err){
                console.log('error2');
                mongodb.close();
                if(err){
                    return callback(err);//失败! 返回err
                }
                callback(null)//返回err为null
            })
        });
    })
};*/

//读取文章及相关信息
/*
Post.get = function(name,callback){
    //打开数据库
    mongodb.open(function(err,db){
        if(err){
            return callback(err)
        }
//读取posts集合
        db.collection('posts',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if(name){
                query.name = name;
            }
            //根据query对象查询文章
            console.log('next is collection');
            console.log(collection.find(query).sort({
                time:-1
            }));
            collection.find(query).sort({
                time:-1
            }).toArray(function(err,docs){
                mongodb.close();
                if(err){
                    return callback(err);////失败! 返回err
                }
                console.log('next is docs');
                console.log(docs);
                callback(nul,docs);//成功！以数组形式返回查询的结果
            })
        });
    })
};
*/


//读取文章及其相关信息
Post.get = function(name, callback) {
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        //读取 posts 集合
        db.collection('posts', function(err, collection) {
            if (err) {
                mongodb.close();
                console.log(err);
                console.log('156');
                return callback(err);
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //根据 query 对象查询文章
           /* console.log('next is collection');
            console.log(collection.find(query));
            console.log(collection.find(query).sort({
                time: -1
            }));*/

            collection.find(query).sort({
                time: -1
            }).toArray(function (err, docs) {
          // mongodb.close();
                if (err) {
                    console.log(err);
                    console.log('error error');
                    return callback(err);//失败！返回 err
                }
                console.log('arraryornot');
                console.log(docs);
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};


//获取一篇文章
Post.getOne = function(name,day,title,callback) {

    console.log('open mongodb');

    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            console.log('mongodb error');
            console.log(err);
            return callback(err);
        }
        //读取 posts 集合
        console.log('读取posts集合');
        db.collection('posts', function (err, collection) {
            console.log('its here');

            if (err) {
                mongodb.close();
                console.log('last errer');
                console.log(err);
                return callback(err);
            }
            //根据用户名、发表日期及文章名进行查询
            collection.findOne({
                "name": name,
                "time.day": day,
                "title": title
            }, function (err, doc) {
                mongodb.close();
                if (err) {
                    console.log('last error');
                    console.log(err);
                    return callback(err);
                }
                console.log('没有找到');
                console.log(doc);//数据正常找到 为什么前端接受不到
                //解析 markdown 为 html
         //       doc.post = markdown.toHTML(doc.post);
                console.dir(callback);
                callback(null, doc);//返回查询的一篇文章

            });
        });
    });
};


/*Post.getOne = function(name,day,title,callback){
    //打开数据库
    if(err){
        return callback(err);
    }
    //读取posts集合
    db.collection('posts',function(err,collection){
               if(err){
                   mongodb.close();
                   return callback(err);
               }
        //根据用户名，发表日期及文章名进行查询
        collection.findOne({
            'name':name,
            'time.day':day,
            'title':title
        },function(err,doc){
            mongodb.close();
            if(err){
                return callback(err);
            }
            //解析markdown为html （暂不再后端添加，放到前端）
            callback(null,doc);//返回查询的一篇文章
        })


    })

};*/



























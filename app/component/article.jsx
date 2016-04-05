import React from 'react';
import ReactDOM from 'react-dom'
import {Component } from 'react';
import { connect } from 'react-redux';
import $ from  'jquery';
class Article extends Component{
    constructor() {
        super();
    }
    componentDidMount(){
        const self  =this;
        console.log('检测是否被实例化');
        console.log('aricle的propspppppppppppppppppppropsrops');
            console.log(this.props);
        const geturlDate = this.props.GetpostDetail;
        $.ajax({
            url: '/api/account/articlede',
            type:'GET',
            data:{gt:geturlDate},
            success:function(data){
                const articleDetail  = data;
            console.log('下面是文章详情文章详情是是是是是是文章详情详情详情');
                console.log(articleDetail);
                const article = self.refs.article;
                console.log('articlecelel');
                console.log(article);
                article.innerText = articleDetail.post;
            },
            error:function(err){
            }}
        );
    }
    render(){
        return(
            <div>
                <p className='posts-detail' ref='article'>
                    this is my post
                </p>
            </div>
        )
    }
}
export default connect(state =>state)(Article);
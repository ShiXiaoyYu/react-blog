import React from 'react';
import ReactDOM from 'react-dom';
import PostList from '../component/postList.jsx';
import Article from '../component/article.jsx';
import { connect } from 'react-redux';
import $ from  'jquery';
class Content extends React.Component{
    componentDidMount() {
        const dispatch = this.props.dispatch;
        $.ajax({
            url:'/api/posts',
            method:'GET',
            data:{},
            success:function(data){
                const posts = data;
                console.log('所有前端文章详情lalallalalalal');
               console.log(posts);
                dispatch({
                    type:'CONTENT_COLUMN',
                    post: posts
                })
            },
            error:function(err){
            }
        })
    }

    render(){
        const dispatch = this.props.dispatch;
        const posts = this.props.ContentColumn;
        return(
            <div>
                <PostList posts = {posts}/>
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {

}
export default connect(state =>state)(Content);
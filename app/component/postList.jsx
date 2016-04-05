import React from 'react';
import ReactDOM from 'react-dom';
import $ from  'jquery';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';

class PostList extends React.Component {
    render() {
        const store = this.props.store;
        const dispatch = this.props.dispatch;
        console.log(this.props);
        const posts = this.props.posts;
        const articleDetail = this.props.articleDetail;
        //   console.log('postList');
        //   console.log(posts);
        const markedresult = (string) => {
            var markedresult = marked(string, {sanitize: true});
            return {__html: markedresult};
        };
        if (postss) {
            // console.log('存在');
            var commentNodes = posts.map(function (post, index) {
                return (
                    <div onClick = {
                ()=>{
                    const postDate = {name:post.name,title:post.title,time:post.time.day};
                   dispatch({
                    type:'GETPOST',
                    postDate:postDate
                    });
                         }
                         } key={index} className='link-post-card'>
                        <Link to="/article">
                            <h2 className="post-neta-header">
                                {post.title}</h2>
                            <h5>{post.name}</h5>
                            <span>{post.time.minute}</span>

                            <div>
                                <h5 className="flash">markdown</h5>
                                {post.post}
                            </div>
                        </Link>
                    </div>
                );
            });
        }
        return (
            <div className="content">
                {commentNodes}
            </div>
        )
    };
}
export default connect(state =>state)(PostList);
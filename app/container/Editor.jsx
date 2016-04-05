/**
 * Created by zhouss on 16-3-4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import marked  from 'marked';
import $ from  'jquery'

var RichEditor = React.createClass({
    getInitialState: function () {
        return {
            unmarked: '  Markdown'
        }
    },
    update: function (modified) {
        this.setState({
            unmarked: modified
        })
    },
    markedresult: function (string) {
        var markedresult = marked(string, {sanitize: true});
        return {__html: markedresult};
    },
    render: function () {
        return (
            <div className="container-out">

                <input className = 'post-title' placeholder='请输入文章标题'/>

                <div className="con-out-ins">
                    <Inputstring   ref = 'content'  value={this.state.unmarked} changed={this.update}/>
                </div>

                <div className="con-out-pt">
                    <div id="output"  ref = 'OutPut'  dangerouslySetInnerHTML={this.markedresult(this.state.unmarked)}/>
                </div>

                <div className="btn-share" onClick={
                ()=>{
                  const OutPut =  this.refs.OutPut;
                  const content = this.refs.content;
                   console.log(content.props.value);
                   const contents  =  content.props.value;
                   $.ajax({
            url: '/api/editor',
            type:'GET',
            data:{'content':contents},
            success:function(data){
            },
            error:function(err){
            }});
                }
                }>Share</div>
            </div>
        )
    }
});
/*
 */
var Inputstring = React.createClass({
    updateString: function () {
        var modifiedstring = this.refs.input.value;
        this.props.changed(modifiedstring);
    },
    render: function () {
        return (
            <textarea   type="text" onChange={this.updateString} className="form-control"
                      value={this.props.value}  ref="input"/>
        )
    }
});
export default RichEditor;




import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Link} from 'react-router-dom';

@inject('stores')
@observer
class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: 1,
            content: '',
            userAccount: '',
            goToMain: false
        };

        if(this.props.match && this.props.match.params.idx && this.props.stores.BoardStore.item !== null) {
            this.state = {
                ...this.state,
                idx: this.props.stores.BoardStore.item.idx,
                title: this.props.stores.BoardStore.item.title,
                content: this.props.stores.BoardStore.item.content,
                category: this.props.stores.BoardStore.item.category,
                userAccount: this.props.stores.BoardStore.item.userAccount
            }
        }
    }

    render() {
        if(this.props.stores.UserStore.user === null) {
            alert("게시글 작성을 위해서 로그인이 필요합니다.");
            return <Redirect to='/login'/>
        }

        if(this.state.goToMain)
            return <Redirect to='/'/>

        return (
            <div className='post'>
                <div className='post-title'>
                    제목: <input value={this.state.title} onChange={this.updateTitle}/>
                    &nbsp;
                    <div>
                        카테고리: <select value={this.state.category} onChange={this.updateCategory}>
                                     <option value="1">자유</option>
                                     <option value="2">익명</option>
                                     <option value="3">토론</option>
                                 </select>
                    </div>
                </div>
                <div className='post-content'>
                    <div>
                        <CKEditor editor={ClassicEditor}
                                  data={this.state.content}
                                  onChange={this.updateContent}
                        />
                    </div>
                </div>
                <div><button onClick={this.writePost}>작성</button></div>
            </div>
        );
    }

    updateTitle = event => {
        this.setState({
            ...this.state,
            title: event.target.value
                      });
    }

    updateCategory = event => {
        this.setState({
            ...this.state,
            category: event.target.value
                      });
    }

    updateContent = (event, editor) => {
        this.setState({
            ...this.state,
            content: editor.getData()
                      });
    }

    writePost = async () => {
        if(this.props.match.params.idx) {
            if(!window.confirm("수정하시겠습니까?"))
                return;

            if(await this.props.stores.BoardStore.update(this.state)) {
                await this.props.stores.BoardStore.fetchItems();
                this.setState({
                                  ...this.state,
                                  goToMain: true
                              });
            }
        } else {
            if(!window.confirm("작성하시겠습니까?"))
                return;

            if(await this.props.stores.BoardStore.write(this.state, this.props.stores.UserStore.user.account)) {
                await this.props.stores.BoardStore.fetchItems();
                this.setState({
                                  ...this.state,
                                  goToMain: true
                              });

        }
        }
    }

}

export default Post;
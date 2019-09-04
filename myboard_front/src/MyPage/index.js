import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link, Redirect} from 'react-router-dom';

@inject('stores')
@observer
class MyPage extends Component {

    state = {
        name: '',
        age: '',
        password: '',
        myRecommend: 0
    }

    componentDidMount() {
        if(this.props.stores.UserStore.user) {
            this.props.stores.BoardStore.getMyRecommend(this.props.stores.UserStore.user.account).then((totalRecommend) => {
                this.setState({
                    ...this.state,
                    myRecommend: totalRecommend
                });
            });
        }
    }

    render() {
        if(this.state.goToMain)
            return <Redirect to='/'/>

        if(!this.props.stores.UserStore.user)
            return <Redirect to='/'/>
        let user = this.props.stores.UserStore.user;

        return (
            <div className='join'>
                <div className='joinNotice'>
                    <div>마이 페이지</div>
                    <hr/>
                </div>
                <div>아이디 : {user.account}</div>
                <div>
                    이름: <input placeholder={user.name} value={this.state.name} onChange={this.updateName}/>
                </div>
                <div>
                    나이: <input placeholder={user.age} value={this.state.age}
                                   onChange={this.updateAge}/>
                </div>
                <div>
                    성별: {user.gender === 0 ? '여자' : '남자'}
                </div>
                <div>
                    프로필 사진: <img src={`http://localhost:8080/api/image/download/${user.profileImage}`}/>
                </div>
                <div>
                    비밀번호 검증: <input type='password' placeholder='비밀번호' value={this.state.password}
                               onChange={this.updatePassword}/>
                </div>
                <div>
                    <button onClick={this.update}>회원정보 수정</button>
                    <Link to='/'>
                        <button>취소</button>
                    </Link>
                </div>
                <hr/>
                <div>내가 받은 총 추천 : {this.state.myRecommend}</div>
            </div>
        );

    }

    updateName = event => {
        this.setState({
            ...this.state,
            name: event.target.value
                      });
    }

    updateAge = event => {
        this.setState({
            ...this.state,
            age: event.target.value
                      });
    }

    updatePassword = event => {
        this.setState({
            ...this.state,
            password: event.target.value
                      });
    }

    update = async() => {
        if((this.state.name && this.state.age && this.state.password) && await this.props.stores.UserStore.update(this.state)) {
            await this.props.stores.BoardStore.fetchItems();
            this.setState({
                ...this.state,
                goToMain: true
                          });
        }
    }

}
export default MyPage;
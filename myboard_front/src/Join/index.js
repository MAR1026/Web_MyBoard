import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect, Link} from 'react-router-dom';

@inject('stores')
@observer
class Join extends Component {

    state = {
        account: '',
        checkAccount: '',
        password: '',
        checkPassword: '',
        noticePassword: '패스워드를 한번 더 입력해주세요.',
        name: '',
        gender: '0',
        age: '',
        selectedFile: null,
        goToHome: false
    };

    render () {
        if(this.state.goToMain)
            return <Redirect to='/'/>

        return (
            <div className='join'>
                <div className='joinNotice'>
                    <div>회원가입</div>
                    <hr/>
                    <p>DGSW 학생을 위한 게시판로 기발한 게시글을 통해 사용자 재미를 최우선으로 합니다.<br/> 게시판에 회원으로 가입하시면 보다 나은 서비스를 경험하실 수 있습니다.</p>
                    <hr/>
                </div>
                <div>
                    희망아이디: <input placeholder='아이디' value={this.state.account} onChange={this.updateAccount}/> <button onClick={this.checkAccount}>중복확인</button> {this.state.checkAccount}
                </div>
                <div>
                    희망패스워드: <input type='password' placeholder='비밀번호' value={this.state.password} onChange={this.updatePassword}/>
                </div>
                <div>
                    패스워드확인: <input type='password' placeholder='비밀번호 확인' value={this.state.checkPassword} onChange={this.updateCheckPassword}/> {this.state.noticePassword}
                </div>
                <div>
                    성명: <input placeholder='이름' value={this.state.name} onChange={this.updateName}/> (이름에 공백은 제거해주세요)
                </div>
                <div>
                    성별: <select value={this.state.gender} onChange={this.updateGender}>
                            <option value="0">여성</option>
                            <option value="1">남성</option>
                          </select>
                </div>
                <div>
                    나이: <input placeholder='나이' value={this.state.age} onChange={this.updateAge}/>
                </div>
                <div>
                    프로필 사진: <input type="file" placeholder='프로필 사진' onChange={this.updateProfile}/>
                </div>
                <div>
                    <button onClick={this.join}>회원가입</button>
                    <Link to='/'><button>취소</button></Link>
                </div>
            </div>
        );
    }

    updateAccount = event => {
        this.setState({
                          ...this.state,
                          account: event.target.value,
                      });
    }

    updatePassword = event => {
        this.setState({
                          ...this.state,
                          password: event.target.value,
                          noticePassword: event.target.value === this.state.checkPassword ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'
                      });
    }

    updateCheckPassword = event => {
        this.setState({
                          ...this.state,
                          checkPassword: event.target.value,
                          noticePassword: event.target.value === this.state.password ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.'
                      });
    }

    updateName = event => {
        this.setState({
                          ...this.state,
                          name: event.target.value,
                      });
    }

    updateGender = event => {
        this.setState({
                          ...this.state,
                          gender: event.target.value,
                      });
    }

    updateAge = event => {
        this.setState({
                          ...this.state,
                          age: event.target.value,
                      });
    }

    updateProfile = event => {
        this.setState({
            ...this.state,
            selectedFile: event.target.files[0]
                      })
    }

    checkAccount = async () => {
        console.log(this.state.account);
        if(this.state.account) {
            if(await this.props.stores.UserStore.checkAccount(this.state.account)) {
                this.setState({
                                  ...this.state,
                                  checkAccount: '이미 존재하는 아이디입니다.'
                              });
            } else {
                this.setState({
                                  ...this.state,
                                  checkAccount: '사용가능한 아이디입니다.'
                              });
            }
        }
    }

    join = async () => {

        console.log(this.state.gender, this.state.age);
        if (this.state.account && this.state.password && this.state.name && this.state.age
            && this.state.gender && await this.props.stores.UserStore.register(this.state))
        {
            this.setState(
                {
                    ...this.state,
                    goToMain: true
                });
        }
    }


};


export default Join;
import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component {

    state = {
        password: '',
        account: '',
        goToHome: false
    };

    render () {
        if(this.state.goToHome)
            return <Redirect to='/'/>

        let p = this.props.stores.UserStore;
        return (
            <div className='login'>
                <div className='form'>
                    <div>
                        <input placeholder='아이디' value={this.state.account} onChange={this.updateAccount}/>
                    </div>
                    <div>
                        <input type='password' placeholder='비밀번호' value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                </div>
                <div>
                    <button className="loginbtn" onClick={this.login}>로그인</button>
                </div>
            </div>
        )
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
                          password: event.target.value
                      });
    }

    login = async () => {
        if (this.state.account && this.state.password && await this.props.stores.UserStore.login(this.state)) {
            this.setState({
                              ...this.state,
                              goToHome: true
                          });
        }
    }

}


export default Login;
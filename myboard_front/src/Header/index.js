import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';
import Category from "../Category";

@inject('stores')
@observer
class Header extends Component {

    render() {
        if (this.props.stores.UserStore.user === null) {
            return (
                <header className="app-header">
                    <Link to='/login'>
                        <button className='loginbtn'>로그인</button>
                    </Link>
                    <Link to='/join'>
                        <button className='loginbtn'>회원가입</button>
                    </Link>
                    <Category/>
                </header>
            );
        } else {
            return (
                <header className="app-header">
                    <Link to='/'>
                        <button className='loginbtn' onClick={this.logout}>
                            로그아웃
                        </button>
                    </Link>
                    <Link to='/mypage'>
                        <button className='loginbtn'>내 정보</button>
                    </Link>
                    <Category/>
                </header>
            )
        }
    }


    logout = async () => {
        this.props.stores.UserStore.logout();

    }
}

export default Header;
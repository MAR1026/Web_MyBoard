import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from 'react-router-dom';

@inject('stores')
@observer
class Category extends Component {
    componentDidMount() {
        this.props.stores.BoardStore.fetchItems();
    }

    render() {
        return (
            <ul className='menubar'>
                <li>DGSW 게시판&nbsp;|</li>
                <li><Link to='/'>전체 게시판</Link></li>
                <li>
                    <Link to='/category/1'>자유 게시판</Link>
                </li>
                <li>
                    <Link to='/category/2'>익명 게시판</Link>
                </li>
                <li>
                    <Link to='/category/3'>토론 게시판</Link>
                </li>
            </ul>
        );
    }

}

export default Category;
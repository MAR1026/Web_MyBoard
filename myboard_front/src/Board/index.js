import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Link, Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Board extends Component {

    componentDidMount() {
        const boardIdx = this.props.location.pathname.split("/").slice(-1)[0];
        this.props.stores.BoardStore.fetchItem(boardIdx).then((item) => {
            if(item.recommends.length > 0) {
                let loved = 0;
                let liked = 0;
                let stared = 0;
                item.recommends.map(x => {
                    if(x.love)
                        loved += 1;
                    if(x.good)
                        liked += 1;
                    if(x.star)
                        stared += 1;
                });

                this.setState({
                                  ...this.state,
                                  totalLove: loved,
                                  totalLike: liked,
                                  totalStar: stared
                              });
                if(this.props.stores.UserStore.user) {
                    const myRecommend = item.recommends.find(x => parseInt(x.userIdx) === parseInt(this.props.stores.UserStore.user.idx));

                    if(myRecommend !== undefined) {
                        this.setState({
                                          ...this.state,
                                          love: myRecommend.love,
                                          good: myRecommend.good,
                                          star: myRecommend.star
                                      });
                    }
                }

            }
        });
    }

    state = {
        goToMain: false,
        love: false,
        good: false,
        star: false,
        totalLove: 0,
        totalLike: 0,
        totalStar: 0
    }

    render() {

        if(this.state.goToMain)
            return <Redirect to="/"/>

        const board = this.props.stores.BoardStore.item;

        if(!board || !this.props.stores.BoardStore.items)
            return ( <div></div> );

        if(this.props.stores.UserStore.user && this.props.stores.UserStore.user.account === board.userAccount) {
            const link = '/write/' + board.idx;
            return (
                <div className='board-view'>
                    <table className='board-header'>
                        <thead>
                        <tr>
                            <th colSpan='3' className='board-title'>제목 : {board.title}</th>
                        </tr>
                        <tr>
                            <td className='board-writer'>작성자 : {board.userAccount}</td>
                            <td className='board-created'>작성일 : {board.created}</td>
                        </tr>
                        </thead>
                        <tbody className='board-body'>
                        <tr>
                            <th colSpan='3' className='board-content'>{board.content}</th>
                        </tr>
                        </tbody>
                    </table>
                    <div className='edit'>
                        <Link to={link}><button>수정</button></Link>
                        <button onClick={this.deletePost}>삭제</button>
                    </div>
                </div>
            );
        }

        return (
            <div className='board-view'>
                <table className='board-header'>
                    <thead>
                        <tr>
                            <th colSpan='3' className='board-title'>제목 : {board.title}</th>
                        </tr>
                        <tr>
                            <td className='board-writer'>작성자 : {board.userAccount}</td>
                            <td className='board-created'>작성일 : {board.created}</td>
                            <td>조회수 : {board.viewed}</td>
                        </tr>
                    </thead>
                    <tbody className='board-body'>
                        <tr>
                            <th colSpan='3' className='board-content'>{board.content}</th>
                        </tr>
                    </tbody>
                </table>
                <div className='recommend'>
                    <button className={this.state.good ? 'done' : 'recommendBtn'} onClick={this.LikeBtnClicked}>👍&nbsp;{this.state.totalLike}</button>
                    <button className={this.state.love ? 'done' : 'recommendBtn'} onClick={this.LoveBtnClicked}>❤️&nbsp;{this.state.totalLove}</button>
                    <button className={this.state.star ? 'done' : 'recommendBtn'} onClick={this.StarBtnClicked}>⭐&nbsp;{this.state.totalStar}</button>
                </div>
            </div>
        );
    }

    LikeBtnClicked = event => {
        if(!this.props.stores.UserStore.user) {
            alert("로그인 후 추천이 가능합니다.");
            return;
        }

        this.setState({
            ...this.state,
            good: this.state.good ? false : true,
            totalLike: this.state.good ? (this.state.totalLike - 1) : (this.state.totalLike + 1)
        }, () => this.update());

    }

    LoveBtnClicked = event => {
        if(!this.props.stores.UserStore.user) {
            alert("로그인 후 추천이 가능합니다.");
            return;
        }
        this.setState({
            ...this.state,
            love: this.state.love ? false : true,
            totalLove: this.state.love ? (this.state.totalLove - 1) : (this.state.totalLove + 1)
        }, () => this.update());
    }

    StarBtnClicked = event => {
        if(!this.props.stores.UserStore.user) {
            alert("로그인 후 추천이 가능합니다.");
            return;
        }

        this.setState({
            ...this.state,
            star: this.state.star ? false : true,
            totalStar: this.state.star ? (this.state.totalStar - 1) : (this.state.totalStar + 1)
        }, () => this.update());
    }

    update = async () => {
        if(await this.props.stores.BoardStore.updateRecommend(this.state, this.props.stores.UserStore.user.idx)) {
            this.setState({
                ...this.state
                          });
        }
    }

    deletePost = async() => {
        if(!window.confirm("정말 삭제하시겠습니까?"))
            return;

        if(await this.props.stores.BoardStore.delete()) {
            await this.props.stores.BoardStore.fetchItems();
            this.setState({
                goToMain: true
                          });
        }
    }
}

export default Board;
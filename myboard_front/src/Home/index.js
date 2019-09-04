import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import BoardList from "../Board/BoardList";

@inject('stores')
@observer
class Home extends Component {

    componentDidMount() {
        this.props.stores.BoardStore.fetchItems();
        const category = this.props.location.pathname.split("/").slice(-1)[0];

        if(category === '1' || category === '2' || category === '3') {

            this.setState( {
                ...this.state,
                category: category
                           });
        } else {
            this.setState({
                              ...this.state,
                              category: 'none',
                          });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const category = this.props.location.pathname.split("/").slice(-1)[0];
        if(category === '1' || category === '2' || category === '3') {

        if(this.state.category !== category) {
            this.setState({
                              ...this.state,
                              category: category ? category : 'none',
                          });
        }
    }
    }

    state = {
        category: 'none',
        align: 'latest'
    };

    alignLatest = event => {
        this.setState({
            ...this.state,
            align: 'latest'
        });
    }

    alignClicked = event => {
        this.setState({
            ...this.state,
            align: 'clicked'
        });
    }


    render() {
        return (
            <div className='home'>
                <div className='writeBtn'>
                    정렬 :
                    <button onClick={this.alignLatest}>최신순</button>
                    <button onClick={this.alignClicked}>조회순</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>글 번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <th>조회수</th>
                            <th>추천수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.stores.BoardStore.items && <BoardList items={this.props.stores.BoardStore.items} category={this.state.category} align={this.state.align}/>}
                    </tbody>
                </table>
                <div className="writeBtn"><Link to="/write"><button >새 글 쓰기</button></Link></div>
            </div>
        );
    }
}

export default Home;
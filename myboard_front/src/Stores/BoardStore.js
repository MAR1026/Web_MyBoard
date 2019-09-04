import {action, observable} from "mobx";
import axios from 'axios';

class BoardStore {
    static __instance = null;

    static getInstance() {
        if (BoardStore.__instance === null)
            BoardStore.__instance = new BoardStore();
        return BoardStore.__instance;
    }

    constructor() {
        BoardStore.__instance = this;
    }

    @observable myTotalRecommend = 0;
    @action getMyRecommend = async (account) => {
        if(!this.items)
            return;

        else {
            this.items.filter(board => {return board.userAccount === account}).map(x => {
                if(x.recommends.length > 0) {
                    x.recommends.map(y => {
                        if(y.love)
                            this.myTotalRecommend += 1;
                        if(y.good)
                            this.myTotalRecommend += 1;
                        if(y.star)
                            this.myTotalRecommend += 1;
                    })
                }
            });

            return this.myTotalRecommend;
        }
    }

    @action updateRecommend = async (recommend, userIdx) => {
        try {
            recommend.boardIdx = this.item.idx;
            recommend.userIdx = userIdx;
            let response = await axios({
                                           url: 'http://localhost:8080/api/recommend/update',
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'put',
                                           timeout: 3000,
                                           data: JSON.stringify(recommend)
                                       });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                return true;
            }
        } catch (e) {
            return false;
        }
    }

    @observable items = null;
    @action fetchItems = async () => {
        try {
            let response = await axios({
                                           url: 'http://localhost:8080/api/board/getallboard',
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'get',
                                           timeout: 3000
                                       });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                this.items = response.data;
            }
        } catch (error) {
            alert(error.toString());
        }
    }

    @observable item = null;
    @action fetchItem = async (boardIdx) => {
        try {
            let response = await axios({
                                     url: `http://localhost:8080/api/board/getboard/${boardIdx}`,
                                     headers: {
                                         'Content-Type': 'application/json; charset=UTF-8'
                                     },
                                     method: 'get',
                                     timeout: 3000
                                 });
            console.log(response);
            if(response.status === 200 && response.data !== '') {
                this.item = response.data;
                return this.item;
            }
        } catch (error) {
            alert(error.toString());
        }
    }

    @action update = async(post) => {
        try {
            post.content = post.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
            let response = await axios({
                                           url: 'http://localhost:8080/api/board/update',
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'put',
                                           timeout: 3000,
                                           data: JSON.stringify(post)
                                       });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                alert("게시글이 수정되었습니다.");
                return true;
            }
        } catch (e) {
            alert("게시글 수정에 실패하였습니다.");
            return false;
        }
    }

    @action delete = async() => {
        try {
            let response = await axios({
                                           url: `http://localhost:8080/api/board/delete/`,
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'delete',
                                           timeout: 3000,
                                           data: JSON.stringify(this.item)
                                       });

            if(response.status === 200 && response.data) {
                alert("게시글이 삭제되었습니다!");
                return true;
            }
            else
                return false;
        } catch (e) {
            alert("게시글 삭제에 실패하였습니다!");
            return false;
        }
    }

    @action write = async (post, userAccount) => {
        try {
            post.userAccount = userAccount;
            post.content = post.content.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
            let response = await axios({
                url: 'http://localhost:8080/api/board/create',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'post',
                timeout: 3000,
                data: JSON.stringify(post)
            });

            console.log(response);
            if(response.status === 200 && response.data !== '') {
                alert("게시글이 작성되었습니다.");
                return true;
            }
        } catch (e) {
            alert("게시글 작성에 실패하였습니다.");
            return false;
        }
    }
}


export default BoardStore.getInstance();
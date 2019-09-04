import {action, observable} from "mobx";
import axios from 'axios';

class UserStore {
    static __instance = null;

    static getInstance() {
        if (UserStore.__instance === null)
            UserStore.__instance = new UserStore();
        return UserStore.__instance;
    }

    constructor() {
        UserStore.__instance = this;
    }

    @action checkAccount = async (account) => {
        try {
            let response = await axios({
                                           url: `http://localhost:8080/api/user/getuserinfo/${account}`,
                                           method: 'get',
                                           timeout: 3000,
                                       });

            console.log(response.data);

            if(response.status === 200 && response.data !== "")
                return true;
            else
                return false;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    @action register = async (createData) => {
        try {
            if(createData.selectedFile !== null) {
                const formData = new FormData();
                formData.append("srcFile", createData.selectedFile);

                let imgSrc = await axios({
                                             url: 'http://localhost:8080/api/image/upload',
                                             method: "POST",
                                             data: formData,
                                             contentType: false,
                                             processData: false
                                         });

                if(imgSrc.status === 200 && imgSrc.data !== "") {
                    createData.profileImage = imgSrc.data;
                }
            }

            let response = await axios({
                                           url: 'http://localhost:8080/api/user/create',
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'post',
                                           timeout: 3000,
                                           data: JSON.stringify(createData)
                                       });

            console.log(response);

            if(response.status === 200 && response.data !== "") {
                alert("회원가입에 성공하였습니다!");
                return true;
            } else {
                alert("회원가입에 실패하였습니다. 다시 시도하세요.");
                return false;
            }
        } catch (error) {
            alert("오류로 인한 회원가입 실패 : " + error.toString());
            return false;
        }
    }

    @observable user = null;
    @action login = async (loginData) => {
        try {
            if(!await this.checkAccount(loginData.account)) {
                alert("존재하지 않는 계정입니다.");
                return false;
            }

            this.user = null;
            let response = await axios({
                url: 'http://localhost:8080/api/user/login',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                method: 'post',
                timeout: 3000,
                data: JSON.stringify(loginData)
                                       });

            if(response.status === 200 && response.data !== "") {
                console.log(response);
                this.user = response.data;
                return true;
            } else {
                alert("잘못된 비밀번호입니다. 다시 시도하세요.");
                return false;
            }
        } catch (error) {
            alert("잘못된 비밀번호입니다. 다시 시도하세요.");
            return false;
        }
    }

    @action update = async (updateInfo) => {
        try {
            updateInfo.account = this.user.account;
            let response = await axios({
                                           url: 'http://localhost:8080/api/user/update',
                                           headers: {
                                               'Content-Type': 'application/json; charset=UTF-8'
                                           },
                                           method: 'put',
                                           timeout: 3000,
                                           data: JSON.stringify(updateInfo)
                                       });

            if(response.status === 200 && response.data) {
                alert("회원 정보가 변경되었습니다.");
                this.user = response.data;
                return true;
            } else {
                alert("비밀번호가 올바르지 않습니다.");
                return false;
            }
        } catch (e) {
            alert("회원 정보 변경에 실패하였습니다.");
            return false;
        }
    }

    @action logout = () => {
        this.user = null;
        return true;
    }
}


export default UserStore.getInstance();
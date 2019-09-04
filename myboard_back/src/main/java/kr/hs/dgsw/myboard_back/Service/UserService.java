package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.User;

import java.util.List;

public interface UserService {

    User Create(User user);
    User Login(User user);
    User GetUserInfo(String account);
    String findAccountById(Long id);
    List<User> GetAllUserInfo();
    User Update(User user);
    boolean Delete(User user);
}

package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.User;
import kr.hs.dgsw.myboard_back.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public User Create(User user) {
        if(this.userRepository.findByAccount(user.getAccount()).isPresent())
            return null;
        else {
            if(user.getProfileImage() == null)
                user.setProfileImage("null.png");

            return this.userRepository.save(user);
        }
    }

    @Override
    public User Login(User user) {
        Optional<User> found = this.userRepository.findByAccountAndPassword(user.getAccount(), user.getPassword());

        if(found.isPresent())
            return found.get();
        else
            return null;

    }

    @Override
    public User GetUserInfo(String account) {
        Optional<User> found = this.userRepository.findByAccount(account);

        if(found.isPresent())
            return found.get();
        else
            return null;
    }

    @Override
    public String findAccountById(Long id) {
        Optional<User> found = this.userRepository.findById(id);

        if(found.isPresent())
            return found.get().getAccount();
        else
            return null;
    }

    @Override
    public List<User> GetAllUserInfo() {
        return this.userRepository.findAll();
    }

    @Override
    public User Update(User user) {
        User found = Login(user);

        if(found != null) {
            found.setName(Optional.ofNullable(user.getName()).orElse(found.getName()));
            found.setAge(Optional.ofNullable(user.getAge()).orElse(found.getAge()));
            found.setGender(Optional.ofNullable(user.getGender()).orElse(found.getGender()));
            found.setProfileImage(Optional.ofNullable(user.getProfileImage()).orElse(found.getProfileImage()));

            return this.userRepository.save(found);
        } else
            return null;
    }

    @Override
    public boolean Delete(User user) {
        User found = GetUserInfo(user.getAccount());

        if(found != null) {
            this.userRepository.deleteById(found.getIdx());
            return true;
        } else {
            return false;
        }
    }
}

package kr.hs.dgsw.myboard_back.Controller;

import kr.hs.dgsw.myboard_back.Domain.User;
import kr.hs.dgsw.myboard_back.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/create")
    public User Create(@RequestBody User user) {
        return this.userService.Create(user);
    }

    @PostMapping(value = "/login")
    public User Login(@RequestBody User user) {
        return this.userService.Login(user);
    }

    @GetMapping(value = "/getuserinfo/{account}")
    public User GetUserInfo(@PathVariable String account) {
        return this.userService.GetUserInfo(account);
    }

    @GetMapping(value = "/findaccountbyidx/{idx}")
    public String FindAccountByIdx(@PathVariable Long idx) {
        return this.userService.findAccountById(idx);
    }

    @GetMapping(value = "/getalluserinfo")
    public List<User> GetAllUserInfo() {
        return this.userService.GetAllUserInfo();
    }

    @PutMapping(value = "/update")
    public User Update(@RequestBody User user) {
        return this.userService.Update(user);
    }

    @DeleteMapping(value = "/delete")
    public boolean Delete(@RequestBody User user) {
        return this.userService.Delete(user);
    }
}

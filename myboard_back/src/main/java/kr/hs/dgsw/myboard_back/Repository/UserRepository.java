package kr.hs.dgsw.myboard_back.Repository;

import kr.hs.dgsw.myboard_back.Domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByAccount(String account);
    Optional<User> findByAccountAndPassword(String account, String password);
}

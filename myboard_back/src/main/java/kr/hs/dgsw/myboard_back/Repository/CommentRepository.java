package kr.hs.dgsw.myboard_back.Repository;

import kr.hs.dgsw.myboard_back.Domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<List<Comment>> findAllByUserAccount(String userAccount);
}

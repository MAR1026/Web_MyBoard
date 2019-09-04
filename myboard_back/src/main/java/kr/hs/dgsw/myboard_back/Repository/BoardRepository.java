package kr.hs.dgsw.myboard_back.Repository;

import kr.hs.dgsw.myboard_back.Domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<List<Board>> findAllByUserAccount(String userAccount);
}

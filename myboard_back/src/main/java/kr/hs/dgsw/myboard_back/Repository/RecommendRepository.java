package kr.hs.dgsw.myboard_back.Repository;

import kr.hs.dgsw.myboard_back.Domain.Recommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecommendRepository extends JpaRepository<Recommend, Long> {
    Optional<Recommend> findByBoardIdxAndUserIdx(Long boardIdx, Long userIdx);
    Optional<List<Recommend>> findAllByUserIdx(Long userIdx);
}

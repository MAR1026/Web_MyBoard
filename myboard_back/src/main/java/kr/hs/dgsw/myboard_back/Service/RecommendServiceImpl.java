package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.Recommend;
import kr.hs.dgsw.myboard_back.Repository.RecommendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendServiceImpl implements RecommendService {

    @Autowired
    private RecommendRepository recommendRepository;

    @Override
    public Recommend Create(Long boardIdx, Long userIdx) {
        Recommend recommend = new Recommend();

        recommend.setBoardIdx(boardIdx);
        recommend.setUserIdx(userIdx);
        recommend.setGood(false);
        recommend.setLove(false);
        recommend.setStar(false);

        return this.recommendRepository.save(recommend);
    }

    @Override
    public Recommend find(Long boardIdx, Long userIdx) {
        Optional<Recommend> found = this.recommendRepository.findByBoardIdxAndUserIdx(boardIdx, userIdx);

        if(found.isPresent())
            return found.get();

        else
            return null;
    }

    @Override
    public Recommend Update(Recommend recommend)
    {
        System.out.println(recommend.getBoardIdx() + ", 유저" + recommend.getUserIdx() + " / " + recommend);

        Recommend found = find(recommend.getBoardIdx(), recommend.getUserIdx());

        if(found == null) {
            return this.recommendRepository.save(recommend);
        } else {
            found.setStar(Optional.ofNullable(recommend.isStar()).orElse(found.isStar()));
            found.setLove(Optional.ofNullable(recommend.isLove()).orElse(found.isLove()));
            found.setGood(Optional.ofNullable(recommend.isGood()).orElse(found.isGood()));
            return this.recommendRepository.save(found);
        }
    }
}

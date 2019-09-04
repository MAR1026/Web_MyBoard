package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.Recommend;

public interface RecommendService {
    Recommend Create(Long boardIdx, Long userIdx);
    Recommend find(Long boardIdx, Long userIdx);
    Recommend Update(Recommend recommend);
}

package kr.hs.dgsw.myboard_back.Controller;

import kr.hs.dgsw.myboard_back.Domain.Recommend;
import kr.hs.dgsw.myboard_back.Service.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommend")
public class RecommendController {

    @Autowired
    private RecommendService recommendService;

    @PostMapping("/create/{boardidx}/{useridx}")
    public Recommend Create(@PathVariable Long boardIdx, @PathVariable Long userIdx) {
        return this.recommendService.Create(boardIdx, userIdx);
    }

    @GetMapping("/find/{boardidx}/{useridx}")
    public Recommend Find(@PathVariable Long boardIdx, @PathVariable Long userIdx) {
        return this.recommendService.find(boardIdx, userIdx);
    }

    @PutMapping("/update")
    public Recommend Update(@RequestBody Recommend recommend) {
        return this.recommendService.Update(recommend);
    }

}

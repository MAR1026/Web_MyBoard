package kr.hs.dgsw.myboard_back.Controller;

import kr.hs.dgsw.myboard_back.Domain.Comment;
import kr.hs.dgsw.myboard_back.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/create")
    public Comment Create(@RequestBody Comment comment) {
        return this.commentService.Create(comment);
    }

    @GetMapping("/getcommentlist/{account}")
    public List<Comment> GetCommentList(String userAccount) {
        return this.commentService.GetCommentList(userAccount);
    }

    @DeleteMapping("/delete/{idx}")
    public boolean Delete(@PathVariable Long idx) {
        return this.commentService.Delete(idx);
    }

}

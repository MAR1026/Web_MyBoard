package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.Comment;

import java.util.List;

public interface CommentService {
    Comment Create(Comment comment);
    List<Comment> GetCommentList(String userAccount);
    boolean Delete(Long idx);
}

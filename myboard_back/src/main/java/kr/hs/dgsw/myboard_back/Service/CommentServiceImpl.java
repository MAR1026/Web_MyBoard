package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.Comment;
import kr.hs.dgsw.myboard_back.Repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    private CommentRepository commentRepository;


    @Override
    public Comment Create(Comment comment) {
        return this.commentRepository.save(comment);
    }

    @Override
    public List<Comment> GetCommentList(String userAccount) {

        Optional<List<Comment>> found = this.commentRepository.findAllByUserAccount(userAccount);

        if(found != null)
            return found.get();
        else
            return null;
    }

    @Override
    public boolean Delete(Long idx) {

        Optional<Comment> found = this.commentRepository.findById(idx);

        if(found != null) {
            this.commentRepository.delete(found.get());
            return true;
        }
        else
            return false;
    }
}

package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.Board;
import kr.hs.dgsw.myboard_back.Repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardServiceImpl implements BoardService {


    @Autowired
    private BoardRepository boardRepository;

    @Override
    public Board Create(Board board) {
        System.out.println(board.getUserAccount());

        if(board.getCategory() == 2)
            board.setUserAccount("익명");
        return this.boardRepository.save(board);
    }

    @Override
    public Board GetBoard(Long idx) {
        Optional<Board> found = this.boardRepository.findById(idx);

        if(found != null) {
            Board board = found.get();
            board.setViewed(found.get().getViewed() + 1);
            return this.boardRepository.save(board);
        }
        else
            return null;
    }

    @Override
    public List<Board> GetAllBoard() {
        return this.boardRepository.findAll();
    }

    @Override
    public List<Board> findBoardByUserAccount(String account) {
        Optional<List<Board>> found = this.boardRepository.findAllByUserAccount(account);

        if(found != null)
            return found.get();
        else
            return null;
    }

    @Override
    public Board Update(Board board) {
        Board found = GetBoard(board.getIdx());

        if(found != null) {
            found.setCategory(Optional.ofNullable(board.getCategory()).orElse(found.getCategory()));
            found.setTitle(Optional.ofNullable(board.getTitle()).orElse(found.getTitle()));
            found.setContent(Optional.ofNullable(board.getContent()).orElse(found.getContent()));

            if(found.getCategory() == 2)
                found.setUserAccount("익명");

            return this.boardRepository.save(found);
        }

        return null;
    }

    @Override
    public boolean Delete(Board board) {
        Board found = GetBoard(board.getIdx());

        if(found != null) {
            this.boardRepository.deleteById(board.getIdx());
            return true;
        } else {
            return false;
        }
    }
}

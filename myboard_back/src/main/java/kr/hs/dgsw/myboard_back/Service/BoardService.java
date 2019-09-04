package kr.hs.dgsw.myboard_back.Service;

import kr.hs.dgsw.myboard_back.Domain.Board;

import java.util.List;

public interface BoardService {
    Board Create(Board board);
    Board GetBoard(Long idx);
    List<Board> GetAllBoard();
    List<Board> findBoardByUserAccount(String account);
    Board Update(Board board);
    boolean Delete(Board board);
}

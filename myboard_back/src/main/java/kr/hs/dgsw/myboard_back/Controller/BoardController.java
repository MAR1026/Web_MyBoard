package kr.hs.dgsw.myboard_back.Controller;

import kr.hs.dgsw.myboard_back.Domain.Board;
import kr.hs.dgsw.myboard_back.Service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @PostMapping("/create")
    public Board Create(@RequestBody Board board) {
        return this.boardService.Create(board);
    }

    @GetMapping("/getboard/{idx}")
    public Board GetBoard(@PathVariable Long idx) {
        return this.boardService.GetBoard(idx);
    }

    @GetMapping("/getallboard")
    public List<Board> GetAllBoard() {
        return this.boardService.GetAllBoard();
    }

    @GetMapping("/findboardbyuseraccount/{account}")
    public List<Board> FindBoardByUserAccount(@PathVariable String account) {
        return this.boardService.findBoardByUserAccount(account);
    }

    @PutMapping("/update")
    public Board Update(@RequestBody Board board) {
        return this.boardService.Update(board);
    }

    @DeleteMapping("/delete")
    public boolean Delete(@RequestBody Board board) {
        return this.boardService.Delete(board);
    }

}

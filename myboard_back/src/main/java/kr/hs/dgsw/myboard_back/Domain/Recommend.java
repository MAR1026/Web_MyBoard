package kr.hs.dgsw.myboard_back.Domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Recommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Idx;

    @Column(nullable = false)
    private Long boardIdx;

    @Column(nullable = false)
    private Long userIdx;

    @Column
    private boolean good;

    @Column
    private boolean love;

    @Column
    private boolean star;
}

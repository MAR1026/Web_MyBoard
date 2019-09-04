import React from 'react';
import {Link} from 'react-router-dom';

const BoardListItem = (props) => {
    let { board } = props;
    let link = `/board/${board.idx}`;

    let totalRecommended = 0;
    if(board.recommends.length > 0) {
        board.recommends.map(x => {
            if(x.love)
                totalRecommended += 1;
            if(x.good)
                totalRecommended += 1;
            if(x.star)
                totalRecommended += 1;
        });
    }

    return (
        <tr className="boardlistitem">
            <td><Link to={link}>{board.idx}</Link></td>
            <td><Link to={link}>{board.title}</Link></td>
            <td><Link to={link}>{board.userAccount}</Link></td>
            <td><Link to={link}>{board.created}</Link></td>
            <td><Link to={link}>{board.viewed}</Link></td>
            <td><Link to={link}>{totalRecommended}</Link></td>
        </tr>

    )
}

export default BoardListItem;
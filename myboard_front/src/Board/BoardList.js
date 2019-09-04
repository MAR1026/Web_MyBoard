import React from 'react';
import BoardListItem from './BoardListItem'

const BoardList = (props) => {
    let {category, align, items} = props;

    switch (align) {
        case 'latest' :
            items = props.items.reverse();
            break;
        case 'clicked' :
            items = props.items.sort(function (a, b) {
                return a.viewed > b.viewed ? -1 : 1;
            });
            break;
    }

    if(category === 'none') {
        return (
           items.map(item => <BoardListItem key={item.idx} board={item}/>)
        );
    } else {
        return (
            items.filter(item => {
                return parseInt(item.category) === parseInt(category);
            }).map(item => <BoardListItem key={item.idx} board={item}/>)
        )
    }
}

export default BoardList;
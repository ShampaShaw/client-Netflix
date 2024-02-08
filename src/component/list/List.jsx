import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { useRef } from 'react';
import './list.css';
import ListItem from '../ListItem/ListItem';

function List({ list }) {
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef();

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;

        if (direction === "left" && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);
            listRef.current.style.transform = `translateX(${230 * slideNumber + distance}px)`;
        }

        if (direction === "right" && slideNumber < list.content.length - 5) {
            setSlideNumber(slideNumber + 1);
            listRef.current.style.transform = `translateX(${-230 * slideNumber + distance}px)`;
        }
    };

    return (
        <div className='list'>
            <span className='listTitle'>{list.title}</span>
            <div className='wrapper'>
                <ArrowBackIosOutlined
                    className='sliderArrow left'
                    onClick={() => handleClick('left')}
                    style={{ display: !isMoved && 'none' }}
                />
                <div className='container' ref={listRef}>
                  {JSON.parse(list.content[0]).map((item, i) => (
                    <ListItem key={i} index={i} item={item} />
                  ))}
                </div>
                <ArrowForwardIosOutlined className='sliderArrow right' onClick={() => handleClick('right')} />
            </div>
        </div>
    );
}

export default List;

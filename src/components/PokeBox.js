import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';

export default function PokeBox({ p }) {
    return (
        <Tilt key={`course_${p.id}`}  glareEnable={true} glareBorderRadius={"15px"} perspective={800} className="drag-item">
            <h5 className='drag-name'>{p.name}</h5>
            <img className='drag-img' src={p.img_url_1} alt={p.name} />
        </Tilt>
    )
}

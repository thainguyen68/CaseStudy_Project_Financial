import React, {Component, useRef, useState} from "react";
import Slider from "react-slick";

export default function AsNavFor() {
    let [nav1,setNav1]=useState();
   let [nav2,setNav2]=useState();
        return (
            <div>
                    <h2>Slick Go To</h2>
                    <input
                        onChange={e => nav1.slickGoTo(e.target.value)}
                        type="range"
                        min={0}
                        max={3}
                    />
                <h2>Slider Syncing (AsNavFor)</h2>
                <h4>First Slider</h4>
                <Slider
                    asNavFor={nav2}
                    ref={slider => (setNav1(slider))}
                >
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
                <h4>Second Slider</h4>
                <Slider
                    asNavFor={nav1}
                    ref={slider => (setNav2(slider))}
                    slidesToShow={3}
                    swipeToSlide={true}
                    focusOnSelect={true}
                >
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        );
}
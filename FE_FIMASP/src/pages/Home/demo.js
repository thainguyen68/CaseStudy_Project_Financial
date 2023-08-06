import React, {Component, useState} from "react";
import Slider from "react-slick";
import axios from "axios";
import "./slick/slick.css";
import "./slick/slick-theme.css";
import AWalletElement from "./AWalletElement";
import DashBoardWalletElement from "./DashBoardWallet";
import WalletDetailContent from "./WalletDetailContent";
export default function  SimpleSlider({wallets,nav1,setNav1,setIsUpdate,setWalletChoice,setUpdate})  {
    // let [nav1,setNav1]=useState();
    let [nav2,setNav2]=useState(null);
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            // adaptiveHeight: true
        };
        return (
            <>
            <div className={"wallet-detail"}>
                <Slider {...settings} asNavFor={nav2} ref={slider => (setNav1(slider))}>
                        {wallets?.map(wallet=>{
                            return <DashBoardWalletElement key={wallet.id}  wallet={wallet} ></DashBoardWalletElement>
                        })
                        }
                </Slider>
            </div>
            <div className={"wallet-chart"}>
                <Slider {...settings} asNavFor={nav1} ref={slider => (setNav2(slider))}>
                    {wallets?.map(wallet=>{
                        return   <WalletDetailContent key={wallet.id} wallet={wallet} setIsUpdate={setIsUpdate} setUpdate={setUpdate} setWalletChoice={setWalletChoice}></WalletDetailContent>
                    })}
                </Slider>
            </div>
            </>
                );
}
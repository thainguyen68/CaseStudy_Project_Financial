import React, {Component, useEffect, useState} from "react";
import Slider from "react-slick";
import axios from "axios";
import "./slick/slick.css";
import "./slick/slick-theme.css";
import DashBoardWalletElement from "./DashBoardWallet";
export default function  DashboardWalletSlider()  {
    const [wallets,setWallets]=useState([])
    const idUser = localStorage.getItem("id");
    useEffect(()=>{
        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res)=> {
            setWallets(res.data.content)
        })
    },[])
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:2000,
        cssEase: "linear"
        // adaptiveHeight: true
    };
    return (
            <div  className={"wallet-detail dashboard-wallet"}>
                <Slider {...settings} >
                    {wallets?.map(wallet=>{
                        return <DashBoardWalletElement key={wallet.id}  wallet={wallet} ></DashBoardWalletElement>
                    })
                    }
                </Slider>
            </div>
    );
}
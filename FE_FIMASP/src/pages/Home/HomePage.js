import './Homepage.css'
import {useState} from "react";
import LoginForm from "./LoginForm";
import {Link} from "react-router-dom";
export default function HomePage(){
    const [shown,setShown]=useState(false);

    function showForm(){
        setShown(true)
    }
    return (<>
            <header>
                <div className={"header"}>
                <p>Fimasp</p>
                <ul className={"header_list"}>
                    <li><a href={"#"}>Kế toán</a></li>
                    <span id={"header-span"}></span>
                    <li><a id={"btn-overview"} href={"#"}>Tổng quan</a></li>
                    <li><a href={"#"}>Tự động hóa</a></li>
                    <li><a href={"#"}>Đặc trưng</a></li>
                </ul>
                    <div className={"header_signIn"}>
                        <a onClick={showForm} id={"btn-signIn"} >Đăng Nhập</a>
                        <a id={"btn-free"} href={"#"}>Dùng thử miễn phí</a>

                    </div>
                </div>
            </header>
            <div className={"container"} style={!shown?{filter: "blur(0px)"}:{filter: "blur(3px)"}}>
                <div className={"left-container"}>
                    <h1>The fastest online Accounting app</h1>
                    <h4 className="mb-5">Accessible wherever, whenever.</h4>
                    <a id={"btn-free-start"} href={"#"}>Start Now - It's Free</a>
                    <div>
                        <a id={"btn-free-meet"} href={"#"}> Meet an Expert</a>
                    </div>
                    <p className="small mt-4">Free, forever, with unlimited users.
                        <a href="#"
                           className="o_internal_tooltip_link"
                           data-bs-placement="right"
                           data-bs-delay="0" title=""
                           data-bs-original-title="Your first app is always free with Odoo, including free hosting &amp; support. You'll only have to pay if you install more applications.">
                            (see why)
                        </a>
                    </p>
                </div>
                <div className="right-container">
                                    <span className="s_panel_video" data-video-id="7bgMGWQFlAA">
                                        <a href="#" className="btn_video_play position-relative">
                                            {/*<i className="fa fa-2x fa-play btn_video_play_icon rounded-circle bg-primary text-white ps-2"></i>*/}
                                            <img
                                                src="https://odoocdn.com/openerp_website/static/src/img/2022/accounting/accounting_img_01.png"
                                                className="btn_video_play_img" alt=""/>
                                        </a>
                                    </span>
                </div>
            </div>
            {shown&&<LoginForm setShown={setShown}></LoginForm>}
        </>
    )
}
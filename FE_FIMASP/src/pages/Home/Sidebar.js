import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Sidebar({active,setActive}){
    let navigate = useNavigate();

    const [activeSetting,setActiveSetting] = useState('profile');
    return(
        <div id="sidebar">
            <ul id="menu-sidebar">
                <li onClick={isActive}>
                    <i className="fa-solid fa-chart-simple" style={{color:(active ==='dashboard'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="dashboard" className={active ==='dashboard'?"active-sidebar":""} to={'/dashboard'}>Trang chủ</Link>
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-user" style={{color:(active ==='exchange'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="exchange" className={active ==='exchange'?"active-sidebar":""} to={`/transaction`}>Giao dịch</Link>
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-chart-mixed" style={{color:(active ==='analytic'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="analytic" className={active ==='analytic'?"active-sidebar":""} to={`/analytic`}>Thống kê chi tiêu</Link>
                    {/*<a id="plan"  href="#">Lập kế hoạch</a>*/}
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-ruler" style={{color:(active ==='category'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="category" className={active ==='category'?"active-sidebar":""} to={`/category`}>Danh mục</Link>
                    {/*<a id="plan"  href="#">Lập kế hoạch</a>*/}
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-piggy-bank" style={{color:(active ==='wallet'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="wallet" className={active ==='wallet'?"active-sidebar":""} to={`/wallet`}>Quản lý ví</Link>
                </li>
                <li onClick={isActive}>
                    <i className="fa-solid fa-gear" style={{color:(active ==='setting'?"#ffffff":"#8d8d8d")}}></i>
                    <Link id="setting" className={active ==='setting'?"active-sidebar":""} to={`/profile`}>Cài đặt</Link>
                </li>
                <li onClick={isActiveSetting} style={{display:(active==='setting'?'block':'none')}}>

                    <Link id="profile" className={activeSetting ==='profile'?"active-setting":""} to={`/profile`}>Hồ sơ cá nhân</Link>
                </li>
                <li onClick={isActiveSetting} style={{display:(active==='setting'?'block':'none')}}>

                    <Link id="changePassword" className={activeSetting ==='changePassword'?"active-setting":""} to={`/changePassword`}>Đổi mật khẩu</Link>
                </li>
                <li onClick={isActiveSetting} style={{display:(active==='setting'?'block':'none')}}>
                    <a id="logout" className={activeSetting ==='logout'?"active-setting":""} href={""} onClick={logout}>Đăng xuất</a>
                </li>
            </ul>
        </div>
    )
    function isActive(e){
        setActive(e.target.id);
    }

    function isActiveSetting(e){
        setActiveSetting(e.target.id);
    }

    function logout() {
        localStorage.clear();
        navigate('/home')
    }
}
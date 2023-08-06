import {useState} from "react";
import toast, {Toaster} from 'react-hot-toast';
import axios from "axios";
import $ from 'jquery';
import {Link} from "react-router-dom";

export default function ChangePassword() {
    const [pw, setPw] = useState("");
    const [idAcc, setIdAcc] = useState(localStorage.getItem('id'))
    const token = localStorage.getItem('token');

    axios.get(`http://localhost:8080/user/${idAcc}`).then((resp) => {
        setPw(resp.data.password)
    })

    const notify = () => {
        toast.success("Đổi mật khẩu thành công", {
            position: "bottom-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }

    const notify1 = () => {
        toast.error("Wrong password!", {
            position: "bottom-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }
    const [eye1, setEye1] = useState(false)
    const [eye2, setEye2] = useState(false)

    function eyeIcon1() {
        setEye1(!eye1);
    }

    function eyeIcon2() {
        setEye2(!eye2);
    }

    if (localStorage.getItem('id') === '2' || localStorage.getItem('id') === '3') {
        return (
            <>
                <h2>Bạn đang sử dụng tài khoản mạng xã hội</h2>
                <Link to={'/home'}>Trở về trang chủ để đăng nhập</Link>
            </>
        )
    } else {

        return (
            <div id='change-password-block'>
                <h2>Thay đổi mật khẩu</h2>
                <div className='input-password-box'>
                    <input type={eye1 === false ? "password" : "text"} id='password' placeholder='mật khẩu cũ'/>
                    <i className={eye1 === false ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={eyeIcon1}></i>
                </div>
                <div className='input-password-box'>
                    <input type={eye2 === false ? "password" : "text"} id='re-password' placeholder='mật khẩu mới'/>
                    <i className={eye2 === false ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"} onClick={eyeIcon2}></i>

                </div>
                <div id='button-change-password'>
                    <button onClick={save}>Đổi mật khẩu</button>
                </div>

                <Toaster/>
            </div>
        )
    }


    function save() {

        if (idAcc === "" || idAcc === null) {
            window.alert("You are not logged in!")
            return
        }

        if ($("#password").val() !== pw) {
            notify1()
            return;
        }

        let account = {
            id: idAcc,
            username: localStorage.getItem('username'),
            password: $("#re-password").val()
        }

        axios.put(`http://localhost:8080/user/changePassword`, account
            , {headers: {"Authorization": `Bearer ${token}`}}
        ).then((resp) => {
            console.log(resp)
            setPw(resp.data.password)
            notify()
            $("#password").val("");
            $("#re-password").val("");
        }).catch(err => window.alert("Wrong password!"))

    }
}
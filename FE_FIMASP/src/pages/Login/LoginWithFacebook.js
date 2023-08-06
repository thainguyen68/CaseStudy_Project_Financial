import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {LoginSocialFacebook} from "reactjs-social-login";
import {FacebookLoginButton} from "react-social-login-buttons";
import axios from "axios";
import Swal from "sweetalert2";

const LoginWithFacebook = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});


    function loginByFacebook() {
        let accountFacebook = {
            username: 'facebook',
            password: '1'
        }
        console.log(accountFacebook)

        axios.post(`http://localhost:8080/user/login`, accountFacebook).then((resp) => {

            localStorage.setItem('id', resp.data.id)
            localStorage.setItem('token', resp.data.token)
            setUser(resp)

            Swal.fire({
                icon: 'success',
                title: 'Login success!',
                showConfirmButton: false,
                timer: 1300
            })
            navigate('/dashboard')
        }).catch(err => Swal.fire({
            icon: 'error',
            text: 'Wrong the password!',
        }));
    }
    return (
        <LoginSocialFacebook appId={'629665355887749'}
                             onReject={err => {
                                 console.log(err)
                             }}
                             onResolve={resp => {
                                 loginByFacebook();
                                 localStorage.setItem('avatar', resp.data.picture.data.url);
                                 console.log(resp);

                             }}>
            <FacebookLoginButton/>

        </LoginSocialFacebook>

    );

};

export default LoginWithFacebook;
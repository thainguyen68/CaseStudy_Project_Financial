import React, {useState} from 'react';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const LoginWithGoogle = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});

    function loginByGoogle(info) {
        let accountGoogle = {
            username: 'google',
            password: '1'
        }
        console.log(accountGoogle)

        axios.post(`http://localhost:8080/user/login`, accountGoogle).then((resp) => {

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
        <GoogleOAuthProvider
            clientId={'363111230623-rq5m8tqc8pb5c9lj5jkv7v1v28mdn4aa.apps.googleusercontent.com'}>
            <GoogleLogin

                onSuccess={credentialResponse => {
                    const info = jwt_decode(credentialResponse.credential);
                    console.log(info)
                    localStorage.setItem('avatar', info.picture)
                   loginByGoogle(info);
                }}
                onError={() => {
                    window.alert('login fail')
                }}></GoogleLogin>
        </GoogleOAuthProvider>
    )

};

export default LoginWithGoogle;
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import '../../assets/css/home.css'

export default function ConfirmAccount() {

    const param = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/user/confirm/${param.id}`).then((response) => {
            console.log(response)
        })
    }, [param.id])

    return(
        <>
            <h1>Confirm success!</h1>
            <Link className={'button-save-profile'} to={'/home'}>Home</Link> &nbsp;
        </>
    )

}
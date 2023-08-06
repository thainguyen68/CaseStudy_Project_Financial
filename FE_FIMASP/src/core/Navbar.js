import {Link, redirect, Route, Routes} from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginWithGoogle from "../pages/Login/LoginWithGoogle";
import ConfirmAccount from "../pages/Login/ConfirmAccount";

export default function Navbar() {
    return (
        <>
            <Route path={'/dashboard'} element={<Home content="Dashboard"/>}></Route>
            <Route path={'/transaction'} element={<Home content="Transaction"/>}></Route>
            <Route path={'/plan'} element={<Home content="Plan"/>}></Route>
            <Route path={'/wallet'} element={<Home content="Wallet"/>}></Route>
            <Route path={'/setting'} element={<Home content="Setting"/>}></Route>
            <Route path={'/profile'} element={<Home content="Profile"/>}></Route>
            <Route path={'/changePassword'} element={<Home content="ChangePassword"/>}></Route>
            <Route path={'/logout'} element={<LoginWithGoogle/>}></Route>
            <Route path={'confirm-email/:id'} element={<ConfirmAccount/>}></Route>
        </>
    );
}

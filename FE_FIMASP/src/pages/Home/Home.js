
import '../../assets/css/reset.css'
import '../../assets/css/home.css'
import '../../v6.3.0/css/all.css'
import '../../v6.3.0/css/sharp-regular.css'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Transaction from "./Transaction";
import  React, {useEffect, useMemo, useState} from "react";
import Plan from "./Plan";
import Wallet from "./Wallet";
import CreateTransaction from "./CreateTransaction";
import context from "../../store/Context";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";
import UpdateTransaction from "./UpdateTransactionIncome";
import UpdateTransactionIncome from "./UpdateTransactionIncome";
import UpdateTransactionExpence from "./UpdateTransactionExpence";
import Category from "./Category";
import CreateCategory from "./CreateCategory";
import UpdateCategory from "./UpdateCategory";
import Analytic from "./Analytic";
export default React.memo(function Home(props) {
    let content = props.content;
    const [dialog,setDialog] = useState(false);
    const [dialogCategory,setDialogCategory] = useState(false);
    const [createCategorySuccess,setCreateCategorySuccess] = useState(false);
    const [updateCategorySuccess,setUpdateCategorySuccess] = useState(false);
    const [dialogUpdateCategory,setDialogUpdateCategory] = useState(false);
    const [idCategoryUpdate,setIdCategoryUpdate] = useState(0)
    const [dialogUpdateIncome,setDialogUpdateIncome] = useState(false);
    const [dialogUpdateExpence,setDialogUpdateExpence] = useState(false);
    const [idCashUpdate,setIdCashUpdate] = useState(0)
    const [idIconCategoryUpdate,setIdIconCategoryUpdate] = useState("");
    const [active,setActive] = useState('dashboard');
    const [createTransactionSuccess,setCreateTransactionSuccess] = useState(false);
    const [updateTransactionSuccess,setUpdateTransactionSuccess] = useState(false);

    const [imgHeader,setImgHeader] = useState(localStorage.getItem("avatar"));


    function openUpdateTransactionSuccess() {
        setUpdateTransactionSuccess(true);
    }
    function closeUpdateTransactionSuccess() {
        setUpdateTransactionSuccess(false)
    }

    function openUpdateCategorySuccess() {
        setUpdateCategorySuccess(true);
    }
    function closeUpdateCategorySuccess() {
        setUpdateCategorySuccess(false)
    }

    function openCreateTransactionSuccess() {
        setCreateTransactionSuccess(true);
    }
    function closeCreateTransactionSuccess() {
        setCreateTransactionSuccess(false)
    }

    function openCreateCategorySuccess() {
        setCreateCategorySuccess(true);
    }
    function closeCreateCategorySuccess() {
        setCreateCategorySuccess(false)
    }

    function openDialog() {
        setDialog(true);
    }
    function closeDialog() {
        setDialog(false)
    }

    function openDialogCategory() {
        setDialogCategory(true);
    }
    function closeDialogCategory() {
        setDialogCategory(false)
    }
    function openDialogUpdateIncome(id,icon) {
        setDialogUpdateIncome(true);
        setIdCashUpdate(id);
        setIdIconCategoryUpdate(icon);
    }
    function closeDialogUpdateIncome() {
        setDialogUpdateIncome(false)
    }

    function openDialogUpdateCategory(id,icon) {
        setDialogUpdateCategory(true);
        setIdCategoryUpdate(id);
        setIdIconCategoryUpdate(icon);
    }
    function closeDialogUpdateCategory() {
        setDialogUpdateCategory(false)
    }
    function openDialogUpdateExpence(id,icon) {
        setDialogUpdateExpence(true);
        setIdCashUpdate(id);
        setIdIconCategoryUpdate(icon);
    }
    function closeDialogUpdateExpence() {
        setDialogUpdateExpence(false)
    }
    function renderSwitch() {
        switch(content) {
            case 'Dashboard':

                return <Dashboard setActive={setActive}/>;

            case 'Transaction':

                return <Transaction updateSuccess={updateTransactionSuccess} closeUpdate={closeUpdateTransactionSuccess} createSuccess={createTransactionSuccess} closeCreate={closeCreateTransactionSuccess} dialog={dialog} close={closeDialog} open={openDialog}
                        openUpdateIncome={openDialogUpdateIncome} dialogUpdateIncome={dialogUpdateIncome} closeUpdateIncome={closeDialogUpdateIncome}
                        openUpdateExpence={openDialogUpdateExpence} dialogUpdateExpence={dialogUpdateExpence} closeUpdateExpence={closeDialogUpdateExpence}/>;
            case 'Category':

                return <Category updateSuccess={updateCategorySuccess} closeUpdate={closeUpdateCategorySuccess} createSuccess={createCategorySuccess} closeCreate={closeCreateCategorySuccess} dialog={dialogCategory} close={closeDialogCategory} open={openDialogCategory}
                                 openUpdate={openDialogUpdateCategory} dialogUpdate={dialogUpdateCategory} closeUpdateDialog={closeDialogUpdateCategory}
                />;
            case 'Analytic':

                return <Analytic/>;
            case 'Wallet':

                return <Wallet/>;

            case 'Profile':

                return <Profile setImageHeader={setImgHeader} />;
            case 'ChangePassword':

                return <ChangePassword/>;
            default:
                return 'foo';
        }
    }
    return (
        <>
            <div id='Wrapper'>
                <UpdateCategory updateSuccess={openUpdateCategorySuccess} dialogUpdateCategory={dialogUpdateCategory} idCategoryUpdate={idCategoryUpdate} icon={idIconCategoryUpdate}  closeUpdateCategory={closeDialogUpdateCategory}/>
                <CreateCategory createSuccess={openCreateCategorySuccess} dialog={dialogCategory} close={closeDialogCategory} open={openDialogCategory}/>
                <UpdateTransactionIncome updateSuccess={openUpdateTransactionSuccess} dialogUpdateIncome={dialogUpdateIncome} idCashUpdate={idCashUpdate} icon={idIconCategoryUpdate} closeUpdateIncome={closeDialogUpdateIncome} />
                <UpdateTransactionExpence updateSuccess={openUpdateTransactionSuccess} dialogUpdateExpence={dialogUpdateExpence} idCashUpdate={idCashUpdate} icon={idIconCategoryUpdate}  closeUpdateExpence={closeDialogUpdateExpence} />
                <CreateTransaction createSuccess={openCreateTransactionSuccess} dialog={dialog} close={closeDialog} open={openDialog}/>
                <Header imageHeader={imgHeader} dialog={dialog} close={closeDialog}/>
            </div>
            <div id='WrapperContent'>
                <Sidebar active={active} setActive={setActive}/>
                <div id='content'>
                    {renderSwitch()}
                </div>
            </div>
        </>

    );

})




import React,{useEffect, useRef, useState} from "react";
import * as Yup from 'yup'
import axios from "axios";
import {useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import toast, {Toaster} from "react-hot-toast";
import "./../../assets/css/popupTransaction.css";
export default React.memo(function UpdateTransactionExpence(props){
    const[cash,setCash] = useState({})
    const [wallets,setWallets] = useState([]);
    const [categories,setCategories] = useState([]);
    const [categoriesExpenseByUser,setCategoriesExpenseByUser] = useState([])
    const [activeCategory,setActiveCategory] = useState("")
    const [categorygetId,setCategoryGetId] = useState("1");
    const [popupCategory,setPopupCategory] = useState(false);
    const [displayCategoryPick,setDisplayCategoryPick]=useState(false);
    const [idCategoryPick,setIdCategoryPick] = useState("")
    const token = localStorage.getItem("token");
    const wrapperRef = useRef(null);
    const categoryRef = useRef(null);
    const idUser = localStorage.getItem("id");


    function openDetailCategory(){
        setPopupCategory(true)
    }
    function closeDetailCategory(){
        setPopupCategory(false)
    }

    useEffect(() => {

        setActiveCategory(props.icon);
        axios.get(`http://localhost:8080/user${idUser}/cashes/detail/${props.idCashUpdate}`).then((response) => {
            setCash(response.data)
        })
        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res)=>{
            setWallets(res.data.content)
        })
        axios.get(`http://localhost:8080/user${idUser}/categories/default/ex`).then((res)=>{
            setCategories(res.data)
        })
        axios.get(`http://localhost:8080/user${idUser}/categories/expenseUserId`).then((res)=>{
            setCategoriesExpenseByUser(res.data)
        })
        /*
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.closeUpdateExpence()
            }
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
                closeDetailCategory()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [props,wrapperRef,categoryRef]);

    function categoryActive(e){
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
    }
    const Validation = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 20 ký tự"),
        money: Yup.string().required("Vui lòng nhập chi tiêu!").matches(/^[0-9]+$/, "Không đúng định dạng số!"),
        wallet: Yup.object().shape({
            id: Yup.string().required("Vui lòng chọn ví!"),
        })
    })
    function categoryActivePick(e){
        closeDetailCategory();
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
        setIdCategoryPick(e.currentTarget.classList.item(0))
        setDisplayCategoryPick(true);
    }

    function GetTotalMoney({id}){
        for(let i=0;i<wallets.length;i++){
            if(id == wallets[i].id){
                if(wallets[i].limitMoney == 0){
                    return `Tổng tiền: ${wallets[i].totalMoney.toLocaleString('en-US', {style : 'currency', currency : 'VND'})} Giới hạn chi tiêu của ví đã hết`
                }else{
                    return `Tổng tiền: ${wallets[i].totalMoney.toLocaleString('en-US', {style : 'currency', currency : 'VND'})} Giới hạn chi tiêu: ${wallets[i].limitMoney.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}`
                }
            }
        }
    }

    function CheckToTalMoney(id,money){
        for(let i=0;i<wallets.length;i++){
            if(id == wallets[i].id){
                if(wallets[i].limitMoney<money){
                    return `Vượt quá giới hạn chi tiêu của ví`
                }
            }
        }
        return false;
    }
    function updateWalletExpense(id,moneyExpence){
        for(let i=0;i<wallets.length;i++){
            if(id == wallets[i].id){
                wallets[i].totalMoney -= moneyExpence;
                wallets[i].limitMoney -= moneyExpence;
                wallets[i].account = null;
                wallets[i].account={
                    id:idUser
                }
                return wallets[i];
            }
        }
    }
    function updateOldWalletExpense(){
        for(let i=0;i<wallets.length;i++){
            if(cash.wallet?.id == wallets[i].id){
                wallets[i].totalMoney += Number(cash.money);
                wallets[i].limitMoney += Number(cash.money);
                wallets[i].account = null;
                wallets[i].account={
                    id:idUser
                }
                return wallets[i];
            }
        }
    }
    function updateOldWalletIncome(){
        for(let i=0;i<wallets.length;i++){
            if(cash.wallet?.id == wallets[i].id){
                wallets[i].totalMoney -= cash.money;
                wallets[i].account = null;
                wallets[i].account={
                    id:idUser
                }
                return wallets[i];
            }
        }
    }
    function updateWalletIncome(id,moneyIncome){
        for(let i=0;i<wallets.length;i++){
            if(id == wallets[i].id){
                wallets[i].totalMoney += Number(moneyIncome);
                wallets[i].account = null;
                wallets[i].account={
                    id:idUser
                }
                return wallets[i];
            }
        }
    }

    return(
        <>
            <div id="popup" ref={wrapperRef} style={{display:props.dialogUpdateExpence?"block":"none"}}>
                <div className="tab-header">
                    <div className={"active"} id="expense" style={{width:"100%",fontSize:"20px"}}>
                        Chi phí
                    </div>
                </div>
                        <Formik initialValues={{
                            date: cash.date,
                            money: cash.money,
                            type:"expence",
                            name: cash.name,
                            wallet: {
                                "id":cash.wallet?.id
                            },
                            account:{
                                id:idUser
                            },
                            category:{
                                "id":props.idCashUpdate
                            },
                        }}
                                onSubmit={(values) => {
                                        if(CheckToTalMoney(values.wallet.id,values.money)==false){
                                            save(values)
                                        }
                                    }
                                }
                            validationSchema={Validation}
                                enableReinitialize={true}
                        >
                            {({ errors, touched,values,initialValues }) => (
                                <Form style={{width:"95%"}}>
                                    <div className='container-popup-transaction'>
                                        <div className='row-form'>

                                            <div className='col-form'>
                                                <div className='inputBox'>
                                                    <span>Số tiền :</span>
                                                    <Field
                                                        type="text"
                                                        name={"money"}
                                                    />
                                                    <span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>
                                                        <ErrorMessage name={'money'}  />
                                                    </span>
                                                    <span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>
                                                        {/*<CheckToTalMoney id={values.wallet.id} money={values.money}/>*/}
                                                        {CheckToTalMoney(values.wallet.id,values.money)}
                                                    </span>
                                                </div>
                                                <div className='inputBox'>
                                                    <span>Ghi chú :</span>
                                                    <Field type="text" name={'name'}/>
                                                    <span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>
                                                        <ErrorMessage name={'name'}  />
                                                    </span>
                                                </div>
                                                <div className='inputBox'>
                                                    <span>Chọn ví :</span>
                                                    <Field as="select" name={"wallet.id"} id="select-box1" className="select">
                                                        <option value={''}>-- Chọn ví --</option>
                                                        {wallets.map((item,id)=>{
                                                            return(
                                                                <option key={id} value={item.id}>{item.name}</option>
                                                            )
                                                        })
                                                        }
                                                    </Field>
                                                    <span style={{color:"blue", fontSize:"15px",margin:0,position:"absolute",bottom:"-30px",width:"350px"}}><GetTotalMoney id={values.wallet.id}/></span>
                                                    {/*<span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>*/}
                                                    {/*    Tổng tiền: {values.wallet.id}*/}
                                                    {/*</span>*/}
                                                    <span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>
                                                        <ErrorMessage name={'wallet.id'}  />
                                                    </span>
                                                </div>
                                            </div>
                                            <div ref={categoryRef} className='popup-detail-category' style={popupCategory?{display:"block"}:{display:"none"}}>
                                                {categoriesExpenseByUser.map((item)=>{
                                                    return(
                                                        <div  className="block-category" id={"block-"+item.icon} >
                                                            {activeCategory===item.icon&&setCategoryGetId(item.id)}
                                                            <div className={item.id +' icon-border'} id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActivePick}>
                                                                <i id={item.id} className={"fa-light " + item.icon} ></i>
                                                            </div>
                                                            <p >{item.name}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='col-form'>
                                                <div className='inputBox'>
                                                    <span>Ngày giao dịch :</span>
                                                    <Field type="date" name={"date"}/>
                                                </div>
                                                <div className='inputBox'>
                                                    <span>Danh mục :</span>
                                                    {categoriesExpenseByUser.map((item)=>{
                                                        return(
                                                            <>
                                                                {idCategoryPick == item.id?
                                                                    <div  className="block-category" id={"block-"+item.icon} style={displayCategoryPick?{display:"inline-block"}:{display:"none"}}>

                                                                        {activeCategory===item.icon&&setCategoryGetId(item.id)}

                                                                        <div className={item.id +' icon-border'} id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActive}>
                                                                            <i id={item.id} className={"fa-light " + item.icon} ></i>
                                                                        </div>
                                                                        <p >{item.name}</p>
                                                                    </div>:<></>}
                                                            </>
                                                        )
                                                    })}
                                                    {categories.map((item)=>{
                                                        return(
                                                            <div  className="block-category" id={"block-"+item.icon} >
                                                                {activeCategory===item.icon&&setCategoryGetId(item.id)}
                                                                <div className={item.id +' icon-border'} id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActive}>
                                                                    <i id={item.id} className={"fa-light " + item.icon} ></i>
                                                                </div>
                                                                <p >{item.name}</p>
                                                            </div>
                                                        )
                                                    })}
                                                    <div className='block-category' id='block-fa-plus' onClick={openDetailCategory}>
                                                        <div className={'icon-border'} id='fa-plus' style={{width:"32px",height:"30px"}}>
                                                            <i className="fa-light fa-plus"></i>
                                                        </div>
                                                        <p >Xem thêm</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{display:"inline-flex",width:"100%",marginTop:"20px"}}>
                                            <input value="Lưu" style={(Object.keys(errors).length!==0 || CheckToTalMoney(values.wallet.id,values.money)!=false)
                                                ?{background:"6BBD8EFF",cursor:"not-allowed"}:{background:"#3ab06c",cursor:"pointer"}} type="submit" className={'btn-submit-transaction'}/>
                                            <input value="Hủy" type="button" className={'btn-reject-transaction'} onClick={props.closeUpdateExpence}/>
                                        </div>

                                    </div>
                                </Form>)}
                        </Formik>
            </div>
        </>
    )
    function save(values) {
        values.id = props.idCashUpdate;
        values.category.id = categorygetId;
        console.log(values);
        axios.put(`http://localhost:8080/user${idUser}/cashes/${props.idCashUpdate}`,values,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
            if(values.type === "expence"){
                let wallet = updateWalletExpense(values.wallet.id,values.money);
                let oldWallet = updateOldWalletExpense();
                console.log(wallet);
                axios.put(`http://localhost:8080/user${idUser}/wallets/${values.wallet.id}`,wallet,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                })
                axios.put(`http://localhost:8080/user${idUser}/wallets/${values.wallet.id}`,oldWallet,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                })
            }else{
                let walletIncome = updateWalletIncome(values.wallet.id,values.money);
                let oldWalletIncome = updateOldWalletIncome();
                console.log(walletIncome);
                axios.put(`http://localhost:8080/user${idUser}/wallets/${values.wallet.id}`,walletIncome,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                })
                axios.put(`http://localhost:8080/user${idUser}/wallets/${values.wallet.id}`,oldWalletIncome,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                })
            }
            props.updateSuccess()
            props.closeUpdateExpence()
        })
    }
})
import React,{useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import "./../../assets/css/popupTransaction.css";
export default React.memo(function CreateTransaction(props){
    const[active,setActive] = useState(true)
    const [wallets,setWallets] = useState([]);
    const [categories,setCategories] = useState([]);
    const [categoriesIncome,setCategoriesIncome] = useState([])
    const [categoriesIncomeByUser,setCategoriesIncomeByUser] = useState([])
    const [categoriesExpenseByUser,setCategoriesExpenseByUser] = useState([])
    const [activeCategory,setActiveCategory] = useState("fa-dumbbell")
    const [categorygetId,setCategoryGetId] = useState("1")
    const [popupCategory,setPopupCategory] = useState(false);
    const [popupCategory1,setPopupCategory1] = useState(false);
    const [displayCategoryPick,setDisplayCategoryPick]=useState(false);
    const [displayCategoryPick1,setDisplayCategoryPick1]=useState(false);
    const [idCategoryPick,setIdCategoryPick] = useState("")
    const [idCategoryPick1,setIdCategoryPick1] = useState("")
    const token = localStorage.getItem("token");
    const wrapperRef = useRef(null);
    const categoryRef = useRef(null);
    const categoryRef1 = useRef(null);
    function openDetailCategory(){
        setPopupCategory(true)
    }
    function closeDetailCategory(){
        setPopupCategory(false)
    }
    function openDetailCategory1(){
        setPopupCategory1(true)
    }
    function closeDetailCategory1(){
        setPopupCategory1(false)
    }
    const idUser = localStorage.getItem("id");
    useEffect(() => {
        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res)=>{
            setWallets(res.data.content)
        })
        axios.get(`http://localhost:8080/user${idUser}/categories/default/ex`).then((res)=>{
            setCategories(res.data)
        })
        axios.get(`http://localhost:8080/user${idUser}/categories/default/in`).then((res)=>{
            setCategoriesIncome(res.data)
        })
        axios.get(`http://localhost:8080/user${idUser}/categories/expenseUserId`).then((res)=>{
            setCategoriesExpenseByUser(res.data)
        })
        axios.get(`http://localhost:8080/user${idUser}/categories/incomeUserId`).then((res)=>{
            setCategoriesIncomeByUser(res.data)
        })
        /*
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.close()
            }
            if (categoryRef.current && !categoryRef.current.contains(event.target)) {
               closeDetailCategory()
            }
            if (categoryRef1.current && !categoryRef1.current.contains(event.target)) {
                closeDetailCategory1()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef,props,categoryRef,categoryRef1]);

    function openIncome(){
        setActive(true);
    }
    function openExpences(){
        setActive(false);
    }
    function categoryActive(e){
        closeDetailCategory();
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
    }

    function categoryActivePick(e){
        closeDetailCategory();
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
        setIdCategoryPick(e.currentTarget.classList.item(0))
        setDisplayCategoryPick(true);
    }
    function categoryActivePick1(e){
        closeDetailCategory1();
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
        setIdCategoryPick1(e.currentTarget.classList.item(0))
        setDisplayCategoryPick1(true);
    }
    const Validation = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 20 ký tự"),
        money: Yup.string().required("Vui lòng nhập chi tiêu!").matches(/^[0-9]+$/, "Không đúng định dạng số!"),
        wallet: Yup.object().shape({
            id: Yup.string().required("Vui lòng chọn ví!"),
        })
    })
    const Validation1 = Yup.object().shape({
        name: Yup.string().max(20, "Không quá 20 ký tự"),
        money: Yup.string().required("Vui lòng nhập thu nhập!").matches(/^[0-9]+$/, "Không đúng định dạng số!"),
        wallet: Yup.object().shape({
            id: Yup.string().required("Vui lòng chọn ví!"),
        })
    })

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
                    <div id="popup" ref={wrapperRef} style={{display:props.dialog==true?"block":"none"}}>
                        <div className="tab-header">
                            <div className={active?"active":""} id="expense" onClick={openIncome}>
                                Chi phí
                            </div>
                            <div className={!active?"active":""} id="income" onClick={openExpences}>
                                Thu nhập
                            </div>
                        </div>
                        <div className="tab-indicator" style={{left:active?`calc(calc(100%/2)*${0})`:`calc(calc(100%/2)*${1})`}}/>
                        <div className="tab-body">
                            <div className={active?"active":""} style={{width:"95%"}}>
                            <Formik initialValues={{
                                date: new Date().toISOString().slice(0, 10),
                                money: "",
                                type:"expence",
                                name:"",
                                wallet: {
                                    id:""
                                },

                                account:{
                                    id:idUser
                                },
                                category:{
                                    id:'1'
                                }
                            }}

                                    onSubmit={(values,actions) => {
                                        if(CheckToTalMoney(values.wallet.id,values.money)==false){
                                            save(values)
                                            actions.resetForm()
                                        }
                                    }}

                                validationSchema={Validation}
                                    enableReinitialize={true}
                            >
                                {({ errors, touched,values,initialValues  }) => (
                                    <Form>
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
                                                    <Field as="select" name={"wallet.id"} id="select-box1"  className="select">
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
                                                <input value="Hủy" type="button" className={'btn-reject-transaction'} onClick={props.close}/>
                                            </div>

                                        </div>
                                    </Form>)}
                            </Formik>
                            </div>
                            <div id="tab-expences" className={!active?"active":""} style={{width:"95%"}}>
                            <Formik initialValues={{
                                date: new Date().toISOString().slice(0, 10),
                                money: "",
                                type:"income",
                                name:"",
                                wallet: {
                                    id:""
                                },

                                account:{
                                    id:idUser
                                },
                                category:{
                                    id:'1'
                                }
                            }}
                                    onSubmit={(values) => {
                                        save(values)}
                                    }
                                validationSchema={Validation1}
                                    enableReinitialize={true}
                            >
                                {({ errors, touched,values,initialValues }) => (
                                    <Form>
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
                                                        <span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>
                                                            <ErrorMessage name={'wallet.id'}  />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div ref={categoryRef1} className='popup-detail-category' style={popupCategory1?{display:"block"}:{display:"none"}}>
                                                {categoriesIncomeByUser.map((item)=>{
                                                    return(
                                                        <div  className="block-category" id={"block-"+item.icon} >
                                                            {activeCategory===item.icon&&setCategoryGetId(item.id)}
                                                            <div className={item.id +' icon-border'} id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActivePick1}>
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
                                                        {categoriesIncomeByUser.map((item)=>{
                                                            return(
                                                                <>
                                                                    {idCategoryPick1 == item.id?
                                                                        <div  className="block-category" id={"block-"+item.icon} style={displayCategoryPick1?{display:"inline-block"}:{display:"none"}}>

                                                                            {activeCategory===item.icon&&setCategoryGetId(item.id)}

                                                                            <div className={item.id +' icon-border'} id={item.icon} style={{borderRadius:activeCategory===item.icon?"2px":"100px"}} onClick={categoryActive}>
                                                                                <i id={item.id} className={"fa-light " + item.icon} ></i>
                                                                            </div>
                                                                            <p >{item.name}</p>
                                                                        </div>:<></>}
                                                                </>
                                                            )
                                                        })}
                                                        {categoriesIncome.map((item)=>{
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
                                                        <div className='block-category' id='block-fa-plus' onClick={openDetailCategory1}>
                                                            <div className={'icon-border'} id='fa-plus' style={{width:"32px",height:"30px"}}>
                                                                <i className="fa-light fa-plus"></i>
                                                            </div>
                                                            <p >Xem thêm</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div style={{display:"inline-flex",width:"100%",marginTop:"20px"}}>
                                                <input value="Lưu" style={Object.keys(errors).length!==0
                                                    ?{background:"6BBD8EFF",cursor:"not-allowed"}:{background:"#3ab06c",cursor:"pointer"}} type="submit" className={'btn-submit-transaction'}/>
                                                <input value="Hủy" type="button" className={'btn-reject-transaction'} onClick={props.close}/>
                                            </div>

                                        </div>
                                    </Form>)}
                            </Formik>
                            </div>
                        </div>
                    </div>
    </>
)
    function save(values) {
        values.category.id = categorygetId;
        axios.post(`http://localhost:8080/user${idUser}/cashes`,values,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
            if(values.type === "expence"){
                let wallet = updateWalletExpense(values.wallet.id,values.money);
                console.log(wallet);
                axios.put(`http://localhost:8080/user${idUser}/wallets/${values.wallet.id}`,wallet,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{

                })
            }else{
                let walletIncome = updateWalletIncome(values.wallet.id,values.money);
                console.log(walletIncome);
                axios.put(`http://localhost:8080/user${idUser}/wallets/${values.wallet.id}`,walletIncome,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{

                })
            }
            props.createSuccess()
            props.close()
        })
    }
})
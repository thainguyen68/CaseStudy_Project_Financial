
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import React,{useEffect, useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import "../../assets/css/transaction.css";
import arrow  from "./../../assets/img/448-arrow.png"
import BarChartCashType from "./BarChartByCashType";
import HorizontalBarChart from "./HorizontalBarChart";
import PieCategoryChart from "./pieCategoryChart";
import Swal from "sweetalert2";
export default function Transaction(props) {
    const [cash,setCash]  = useState(undefined);
    const [transactions,setTransactions] = useState([]);
    const [transactionsAll,setTransactionsAll] = useState([]);
    const [wallets,setWallets] = useState([]);
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");
    const [searchDate,setSearchDate] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [numOfPage,setNumOfPage] = useState(7);
    const [totalPage,setTotalPage] = useState(1);
    const [totalElement,setTotalElement] = useState(0);
    const [valuesSearch,setValuesSearch] = useState({});
    // const [totalMoneyAll,setTotalMoneyAll] = useState(0);
    let totalMoneyAll = 0
    let totalIncomeFollowTime = 0;
    let totalExpenseFollowTime = 0;
    const notifyUpdate = () => {
        toast.success("Cập nhật giao dịch thành công", {
            position: "top-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }
    const notify = () => {
        toast.success("Thêm giao dịch thành công", {
            position: "top-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }
    useEffect(() =>{
        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res)=>{
            setWallets(res.data.content)
        })
        setSearchDate(false);
        if (props.createSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Tạo giao dịch thành công!',
                showConfirmButton: false,
                timer: 1000
            })
            props.closeCreate();
        }
        if (props.updateSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật giao dịch thành công!',
                showConfirmButton: false,
                timer: 1000
            })
            props.closeUpdate();
        }
        let current =currentPage- 1
        axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
            setTransactionsAll(response.data.content);
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes?page=${current}&size=${numOfPage}`).then((response)=>{
            setTransactions(response.data.content);
            setTotalPage(response.data.totalPages);
            setTotalElement(response.data.totalElements);
            setCurrentPage(response.data.number+1);
        })
    },[props.close,props.createSuccess,props.updateSuccess])

    useEffect(()=>{
        if(cash!==undefined){
        axios.delete(`http://localhost:8080/user${idUser}/cashes/${cash.id}`,{headers: {"Authorization": `Bearer ${token}`}}).then((response)=>{
            if(cash.type === "expence"){
                let oldWallet = updateOldWalletExpense();
                let current =currentPage- 1
                axios.put(`http://localhost:8080/user${idUser}/wallets/${cash.wallet?.id}`,oldWallet,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                    axios.get(`http://localhost:8080/user${idUser}/cashes?page=${current}&size=${numOfPage}`).then((response)=>{
                        setTransactions(response.data.content);
                    })
                    axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
                        setTransactionsAll(response.data.content);
                    })
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa giao dịch thành công!',
                    showConfirmButton: false,
                    timer: 1000
                })
            }else{
                let oldWalletIncome = updateOldWalletIncome();
                let current =currentPage- 1
                axios.put(`http://localhost:8080/user${idUser}/wallets/${cash.wallet?.id}`,oldWalletIncome,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                    axios.get(`http://localhost:8080/user${idUser}/cashes?page=${current}&size=${numOfPage}`).then((response)=>{
                        setTransactions(response.data.content);
                    })
                    axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
                        setTransactionsAll(response.data.content);
                    })
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Xóa giao dịch thành công!',
                    showConfirmButton: false,
                    timer: 1000
                })
            }
            // axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
            //     setTransactions(response.data.content);
            // })
            // axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
            //     setTransactionsAll(response.data.content);
            // })

        })
        }
    },[cash])

    function totalMoney(){
        for(let i=0;i<wallets.length;i++){
            totalMoneyAll+=wallets[i].totalMoney
        }
        return totalMoneyAll;
    }

    function totalIncomeTime(){
        for(let i=0;i<transactionsAll.length;i++){
            if(transactionsAll[i].type == "income" && transactionsAll[i].wallet !==null){
                totalIncomeFollowTime+=transactionsAll[i].money
            }
        }
        return totalIncomeFollowTime;
    }
    function totalExpenseTime(){
        for(let i=0;i<transactionsAll.length;i++){
            if(transactionsAll[i].type == "expence" && transactionsAll[i].wallet !==null){
                totalExpenseFollowTime+=transactionsAll[i].money
            }
        }
        return totalExpenseFollowTime;
    }
    function findAllTransaction(currentPage){
        currentPage-=1;
        axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
            setTransactionsAll(response.data.content);
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes?page=${currentPage}&size=${numOfPage}`).then((response)=>{
            setTransactions(response.data.content);
            setTotalPage(response.data.totalPages);
            setTotalElement(response.data.totalElements);
            setCurrentPage(response.data.number+1);
        })
    }
    function search(values,currentPage) {
        setValuesSearch(values);
        currentPage-=1;
        if(values.dateEnd==="" || values.dateStart===""){
            setSearchDate(false)
            findAllTransaction(currentPage)
        }else{
            axios.get(`http://localhost:8080/user${idUser}/cashes/${values.dateStart}/${values.dateEnd}`).then((response)=>{
                setTransactionsAll(response.data.content);
            })
            axios.get(`http://localhost:8080/user${idUser}/cashes/${values.dateStart}/${values.dateEnd}?page=${currentPage}&size=${numOfPage}`).then((response)=>{
                setSearchDate(true);
                setTransactions(response.data.content);
                setTotalPage(response.data.totalPages);
                setTotalElement(response.data.totalElements);
                setCurrentPage(response.data.number+1);
            })
        }
    }
    const Validation = Yup.object().shape({
        dateStart: Yup.date(),
        dateEnd: Yup.date().min(
            Yup.ref('dateStart'),
            "Ngày kết thúc phải lớn hơn ngày bắt đầu"
        )
    })
    function prevPage() {
        let prevPage =1
        if(currentPage>prevPage){
            if(searchDate){
                search(valuesSearch,currentPage-prevPage)
            }else{
                findAllTransaction(currentPage-prevPage);
            }
        }
    }
    function nextPage() {
        if(currentPage<Math.ceil(totalElement/numOfPage)){
            if(searchDate){
                search(valuesSearch,currentPage+1)
            }else{
                findAllTransaction(currentPage+1);
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
    return(
        <>
            <div id="content-transaction" style={{filter:props.dialog || props.dialogUpdateIncome || props.dialogUpdateExpence?"blur(10px)":"blur(0px)"}}>
                <div id="header-transaction">
                    <div id="header-transaction-title">
                        <h1>Giao dịch</h1>
                        <p>Trang chủ </p><span>/ Giao dịch</span>
                    </div>
                    <div id="header-transaction-button-add" onClick={props.open}>
                        <i className="fa-solid fa-plus"/>
                        <p>Thêm giao dịch</p>
                    </div>
                </div>
                <Toaster/>
                <div id='statistical-transaction-time'>
                    <div className='statistical-total-money-transaction'>
                        <div className={'statistical-transaction-title'}>
                            <h3>Tổng tiền</h3>
                            <p>Tổng tiền còn lại trên các ví</p>
                        </div>
                        <div className={'statistical-transaction-number'}>
                            <h4>{totalMoney().toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</h4>
                        </div>
                    </div>
                    <div>
                        <div className='statistical-income-money-transaction'>
                            <div className={'statistical-transaction-title'}>
                                <h3>Chi tiêu</h3>
                                <p>Tổng chi tiêu</p>
                            </div>
                            <div className={'statistical-transaction-number'}>
                                <h4>{totalExpenseTime().toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='statistical-expense-money-transaction'>
                            <div className={'statistical-transaction-title'}>
                                <h3>Thu nhập</h3>
                                <p>Tổng thu nhập</p>
                            </div>
                            <div className={'statistical-transaction-number'}>
                                <h4>{totalIncomeTime().toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <BarChartCashType cash={cash}/>
                <div id='block-search-transaction'>
                         <Formik initialValues={{
                            dateStart:"",
                            dateEnd:""
                        }}
                                onSubmit={(values) => {
                                    search(values,currentPage)}
                                }
                            validationSchema={Validation}
                                enableReinitialize={true}
                        >
                            {({ errors, touched,values,initialValues }) => (
                                <Form style={{display:'inline-flex'}}>
                                    <div>
                                        <div id='label-input-date-transaction'
                                              >
                                            <label>Ngày bắt đầu</label>
                                             <br/>
                                            <Field
                                                type="date"
                                                id="dateStart"
                                                name={"dateStart"}/>
                                        </div>
                                        <div style={{color:"red",fontSize:"13px"}}>

                                        </div>
                                    </div>
                                    <div>
                                        <div id='label-input-date-transaction'
                                             >
                                            <label>Ngày kết thúc</label><br/>
                                                <Field type="date" id="dateEnd" name={'dateEnd'}/>
                                        </div>
                                        <div style={{color:"red",fontSize:"13px"}}>
                                            <ErrorMessage name={'dateEnd'}  />
                                        </div>
                                    </div>
                                    <button id="btn-search-transaction-date" type={'submit'} className="edit">Tìm kiếm</button>
                                </Form>)}
                        </Formik>
                </div>
                <div id='list-transaction'>
                    <table id='table-list-transaction'>
                        <thead>
                           <tr>
                               <th style={{paddingLeft: "50px"}} >Danh mục</th>
                               <th>Ngày</th>
                               <th>Ghi chú</th>
                               <th>Số tiền</th>
                               <th>Ví</th>
                               <th>Loại giao dịch</th>
                               <th>Hành động</th>
                           </tr>
                        </thead>
                        <tbody>
                        {transactions.map((item)=>{
                            {totalMoneyAll+=item.money}
                                        return(
                                            item.wallet !== null?
                                            <tr key={item.id} className={'active-row'}>
                                                <td className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "25px"}}>
                                                    <div style={{float: "left"}} className="icon-border-bus-dashboard" id={item.category?.icon}>
                                                        <i className={item.category?.icon+' fa-light'}/>
                                                    </div>
                                                    <p style={{display:"inline-block",marginLeft:"10px",marginTop:"5px"}}>{item.category===null? 'Danh mục này đã xóa': item.category.name }</p>
                                                </td>
                                                <td className={'feature-field'} style={{color: "#8d8d8d"}}>{item.date.slice(0,10)}</td>
                                                <td>{item.name}</td>
                                                <td className={'feature-field'}>{item.money.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</td>
                                                <td>{item.wallet&&item.wallet.name||"Thuộc ví đã bị xóa"}</td>
                                                <td>{item.type=="expence"?"Chi phí":"Thu nhập"}</td>
                                                <td style={{position:"relative"}}>
                                                    <i className="fa-regular fa-pen-to-square" onClick={()=>item.type=="expence"?(window.scrollTo(0,0),props.openUpdateExpence(item.id,item.category.icon)):(window.scrollTo(0,0),props.openUpdateIncome(item.id,item.category.icon))}></i>
                                                    <i className="fa-solid fa-trash-can" onClick={() => deleteTransaction(item.id)}></i>
                                                </td>
                                            </tr>:<></>
                                        )
                                    })}
                        </tbody>
                    </table>
                </div>
                <div id='pagination'>
                    <button className='btn-pre-next1' onClick={prevPage}><img src={arrow} alt=""/>Trước</button>
                    <ul>
                        <li className='link-pagination active active-link' >{currentPage}</li>
                    </ul>

                    <button className='btn-pre-next2' onClick={nextPage}>Sau <img src={arrow} alt=""/></button>
                </div>
            </div>
        </>
    )
    function deleteTransaction(id){
        Swal.fire({
            title: 'Bạn có muốn xóa giao dịch này không?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Có, tôi muốn xóa!',
            cancelButtonText:"Hủy"
        }).then((result) => {
            if (result.isConfirmed) {
            axios.get(`http://localhost:8080/user${idUser}/cashes/detail/${id}`).then((response) => {
                setCash(response.data)
            })
            }
        }).catch(err => Swal.fire('Có lỗi xảy ra, bạn không thể xóa danh mục này!'))
    }

}
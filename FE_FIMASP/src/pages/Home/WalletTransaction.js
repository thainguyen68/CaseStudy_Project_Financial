import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import arrow from "../../assets/img/448-arrow.png";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
export default function WalletTransaction({wallet,setCurrentIndex}){
    const [transactions,setTransaction]=useState([])
    const [page,setPage]=useState(0)
    const [totalPages,setTotalPages]=useState(0)
    const [pageChoice,setPageChoice]=useState(0)
    const [currenWallet,setCurrentWallet]=useState()
    // const [pageChoice,setPageChoice]=useState(0)
    let index=page*5;
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");
    const [searchDate,setSearchDate] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const [numOfPage,setNumOfPage] = useState(7);
    const [totalPage,setTotalPage] = useState(1);
    const [totalElement,setTotalElement] = useState(0);
    const [valuesSearch,setValuesSearch] = useState({});
    let totalMoneyAll = 0
    let totalIncomeFollowTime = 0;
    let totalExpenseFollowTime = 0;
    useEffect(()=>{
        setSearchDate(false);
        let current =currentPage- 1
        if(wallet!==undefined) {
            axios.get(`http://localhost:8080/user${idUser}/cashes/${wallet?.id}/page${page}`).then((res) => {
                setTransaction(res.data.content)
                setTotalPages(res.data.totalPages)
                setPage(0)
            })
        }
        // axios.get(`http://localhost:8080/user${idUser}/cashes/${wallet?.id}/page${page}`).then((response)=>{
        //     setTransaction(response.data.content);
        //     setTotalPage(response.data.totalPages);
        //     setTotalElement(response.data.totalElements);
        //     setCurrentPage(response.data.number+1);
        // })
    },[page,wallet])
    // function findAllTransaction(currentPage){
    //     currentPage-=1;
    //     axios.get(`http://localhost:8080/user${idUser}/cashes/${wallet?.id}/page${page}`).then((response)=>{
    //         setTransaction(response.data.content);
    //         setTotalPage(response.data.totalPages);
    //         setTotalElement(response.data.totalElements);
    //         setCurrentPage(response.data.number+1);
    //     })
    // }
    function createPageArray(value){
       let array=[]
        if(totalPages>=6) {
            if (4 < value && value < totalPages - 3) {
                for (let i = 0; i < 5; i++) {
                    array.push(i + value - 2)
                }
                return array
            } else if (value <= 4) {
                array = [1, 2, 3, 4, 5]
                return array
            } else {
                array = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
                return array
            }
        } else{
            for (let i = 1; i <= totalPages; i++) {
                array.push(i)
            }
            return array
        }
    }
    function createPageDiv(arrays){
        return<div>
            {((page>=totalPages-3)||(4<page+1))&&(totalPages>6)&&<><button style={{border:"none",background:"#fff"}} id={"1"} onClick={(e)=>{setPage(+e.currentTarget.id-1)}}>1</button><p style={{display:"inline-block"}}>...</p></>}
            {arrays.map(arr=>{
                return <button style={arr!==page+1?{backgroundColor:"white",display:"inline-block",border:"none"}:{background:"#ff4568",display:"inline-block",border:"none",padding:"5px 10px",color:"#fff",borderRadius:"50px"}} id={""+arr} onClick={(e)=>{setPage(+e.currentTarget.id-1)}}>{arr}</button>
            })}
            {((totalPages-3>page+1)||(page+1<=4))&&(totalPages>6)&&<><p style={{display:"inline-block"}}>...</p>< button style={{border:"none",background:"#fff"}} id={""+totalPages} onClick={(e)=>{setPage(+e.currentTarget.id-1)}}>{totalPages}</button></>}
        </div>
    }

    function search(values,currentPage) {
        // setValuesSearch(values);
        // currentPage-=1;
        // if(values.dateEnd==="" || values.dateStart===""){
        //     setSearchDate(false)
        //     findAllTransaction(currentPage)
        // }else{
        //     axios.get(`http://localhost:8080/user${idUser}/cashes/${values.dateStart}/${values.dateEnd}?page=${currentPage}&size=${numOfPage}`).then((response)=>{
        //         setSearchDate(true);
        //         setTransaction(response.data.content);
        //         setTotalPage(response.data.totalPages);
        //         setTotalElement(response.data.totalElements);
        //         setCurrentPage(response.data.number+1);
        //     })
        // }
    }
    const Validation = Yup.object().shape({
        dateStart: Yup.date(),
        dateEnd: Yup.date().min(
            Yup.ref('dateStart'),
            "Ngày kết thúc phải lớn hơn ngày bắt đầu"
        )
    })
    // function prevPage() {
    //     let prevPage =1
    //     if(currentPage>prevPage){
    //         if(searchDate){
    //             search(valuesSearch,currentPage-prevPage)
    //         }else{
    //             findAllTransaction(currentPage-prevPage);
    //         }
    //     }
    // }
    // function nextPage() {
    //     if(currentPage<Math.ceil(totalElement/numOfPage)){
    //         if(searchDate){
    //             search(valuesSearch,currentPage+1)
    //         }else{
    //             findAllTransaction(currentPage+1);
    //         }
    //     }
    // }
return(
    <>
        <div className={"wallet-transaction-list"}>
            <div className={"wallet-head"}>
                <div className={"wallet-head-between"}>
                    <div className={"wallet-head-content"}><h2>Lịch sử thu chi</h2></div>
                    <div className={"wallet-head-content"}>
                        <div id='block-search-transaction'>
                            <Formik initialValues={{
                                dateStart:"",
                                dateEnd:""
                            }}
                                    onSubmit={(values) => {
                                        search(values)}
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
                    </div>
                </div>
            </div>
            <div id='list-transaction'>
                <table id='table-list-transaction' style={{minWidth:"769px",fontSize:"15px"}}>
                    <thead>
                    <tr>
                        <th style={{paddingLeft: "30px"}} >Danh mục</th>
                        <th>Ngày</th>
                        <th>Ghi chú</th>
                        <th>Số tiền</th>
                        <th>Ví</th>
                        <th>Loại</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((item)=>{

                        return(
                            item.wallet !== null?
                            <tr key={item.id} className={'active-row'}>
                                <td  className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "17px",minWidth:"150px"}}>
                                    <div style={{float: "left"}} className="icon-border-bus-dashboard" id={item.category.icon}>
                                        <i className={item.category.icon+' fa-light'}/>
                                    </div>
                                    <p style={{display:"inline-block",marginLeft:"5px",marginTop:"5px"}}>{item.category.name}</p>
                                </td>
                                <td className={'feature-field'} style={{color: "#8d8d8d"}}>{item.date.slice(0,10)}</td>
                                <td>{item.name}</td>
                                <td className={'feature-field'}>{item.money.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</td>
                                <td>{item.wallet.name}</td>
                                <td>{item.type=="expence"?"Chi phí":"Thu nhập"}</td>
                            </tr>:<></>
                        )
                    })}

                    </tbody>
                </table>
            </div>
            <div id='pagination'>
                <button className='btn-pre-next1' style={{cursor:page===0?"not-allowed":"pointer",fontSize:"15px"}}  onClick={page===0?null:()=>{setPage(page-1)}} ><img style={{width:"12px"}} src={arrow} alt=""/>Trước</button>
                    {createPageDiv(createPageArray(page+1))}
                <button className='btn-pre-next2' style={{cursor:page===totalPages-1?"not-allowed":"pointer",fontSize:"15px"}} onClick={page===totalPages-1?null:()=>{setPage(page+1)}}>Sau <img style={{width:"12px"}} src={arrow} alt=""/></button>
            </div>
            {/*<div id='pagination'>*/}
            {/*    <button className='btn-pre-next1' style={{cursor:page===0?"not-allowed":"pointer",fontSize:"12px"}} onClick={prevPage}><img style={{width:"10px"}} src={arrow} alt=""/>Trước</button>*/}
            {/*    <ul>*/}
            {/*        <li className='link-pagination active active-link' style={{width:"25px",height:"25px",paddingTop:"0px",lineHeight:"22px",fontSize:"15px"}} >{currentPage}</li>*/}
            {/*    </ul>*/}
            {/*    <button className='btn-pre-next2' style={{cursor:page===totalPages-1?"not-allowed":"pointer",fontSize:"12px"}} onClick={nextPage}>Sau <img  style={{width:"10px"}} src={arrow} alt=""/></button>*/}
            {/*</div>*/}
        </div>
    </>
)
}
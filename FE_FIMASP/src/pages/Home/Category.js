
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import React,{useEffect, useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import "../../assets/css/transaction.css";
import arrow  from "./../../assets/img/448-arrow.png"
import Swal from "sweetalert2";
export default function Category(props) {
    const [category,setCategory]  = useState(undefined);
    const [categories,setCategories] = useState([]);
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");
    const [currentPage,setCurrentPage] = useState(1);
    const [numOfPage,setNumOfPage] = useState(3);
    const [totalPage,setTotalPage] = useState(1);
    const [totalElement,setTotalElement] = useState(0);
    const notifyUpdate = () => {
        toast.success("Cập nhật danh mục thành công", {
            position: "top-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }
    const notify = () => {
        toast.success("Thêm danh mục thành công", {
            position: "top-center", style: {
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }
    useEffect(() =>{
        if (props.createSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Tạo danh mục thành công!',
                showConfirmButton: false,
                timer: 1000
            })
            props.closeCreate();
        }
        if (props.updateSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật danh mục thành công!',
                showConfirmButton: false,
                timer: 1000
            })
            props.closeUpdate();
        }
        let current =currentPage- 1
        axios.get(`http://localhost:8080/user${idUser}/categories?page=${current}&size=${numOfPage}`).then((response)=>{
            setCategories(response.data.content);
            setTotalPage(response.data.totalPages);
            setTotalElement(response.data.totalElements);
            setCurrentPage(response.data.number+1);
        })
    },[props.close,props.createSuccess,props.updateSuccess])


    function findAllTransaction(currentPage){
        currentPage-=1;
        axios.get(`http://localhost:8080/user${idUser}/categories?page=${currentPage}&size=${numOfPage}`).then((response)=>{
            setCategories(response.data.content);
            setTotalPage(response.data.totalPages);
            setTotalElement(response.data.totalElements);
            setCurrentPage(response.data.number+1);
        })
    }
    function prevPage() {
        let prevPage =1
        if(currentPage>prevPage){
                findAllTransaction(currentPage-prevPage);

        }
    }
    function nextPage() {
        if(currentPage<Math.ceil(totalElement/numOfPage)){

                findAllTransaction(currentPage+1);

        }
    }
    return(
        <>
            <div id="content-transaction" style={{filter:props.dialog || props.dialogUpdate?"blur(10px)":"blur(0px)"}}>
                <div id="header-transaction">
                    <div id="header-transaction-title">
                        <h1>Danh mục</h1>
                        <p>Trang chủ </p><span>/ Danh mục</span>
                    </div>
                    <div id="header-transaction-button-add" onClick={props.open}>
                        <i className="fa-solid fa-plus"/>
                        <p>Thêm Danh mục</p>
                    </div>
                </div>
                <Toaster/>
                <div id='list-transaction'>
                    <table id='table-list-transaction'>
                        <thead>
                        <tr>
                            <th style={{paddingLeft: "50px"}} >Tên danh mục</th>
                            <th>Icon</th>
                            <th>Loại danh mục</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((item)=>{
                            return(
                                <tr key={item.id} className={'active-row'}>
                                    <td className={'feature-field'} style={{color: "#8d8d8d",paddingLeft:"55px",width:"280px"}}>{item.name}</td>
                                    <td className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "5px",width:"280px"}}>
                                        <div style={{float: "left"}} className="icon-border-bus-dashboard" id={item.icon}>
                                            <i className={item.icon+' fa-light'}/>
                                        </div>
                                        {/*<p style={{display:"inline-block",marginLeft:"10px",marginTop:"5px"}}>{item.category.name}</p>*/}
                                    </td>
                                    <td style={{width:"280px"}}>{item.typeCategory=="expense"?"Chi phí":"Thu nhập"}</td>
                                    <td style={{position:"relative",width:"280px",display:item.account==null?"none":""}} >
                                        <i className="fa-regular fa-pen-to-square" onClick={()=>(window.scrollTo(0,0),props.openUpdate(item.id,item.icon))}></i>
                                    </td>
                                </tr>
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
}
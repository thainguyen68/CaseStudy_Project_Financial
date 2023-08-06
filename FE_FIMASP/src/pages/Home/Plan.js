import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Swal from "sweetalert2";
import "../../assets/css/transaction.css";

export default function Plan() {
    const idAcc = localStorage.getItem('id');
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/user${idAcc}/categories`).then((resp) => {
            console.log(resp)
            setCategories(resp.data)
        }).catch(err => {
            Swal.fire('Data not found')
        })
    },[])


    if (localStorage.getItem('id') === '' || localStorage.getItem('id') === null) {
        return (
            <>
                <h2>Bạn không có quyền truy cập link này</h2>
                <Link to={'/home'}>Trở về trang chủ để đăng nhập</Link>
            </>
        )
    } else {
        return (
            <div id="content-plan">
                <h1 id="page-title-plan">Hiện tại có {categories.length} danh mục</h1>
                <hr id="hr-search-plan"/>
                <div style={{display: "inline-block", marginTop: 15}}>
                    <h1 id="page-title-list-plan" style={{float: "left"}}>Thêm danh mục</h1>
                    <div
                        className="icon-border-dashboard"
                        style={{cursor: "pointer"}}>
                        <Link to={'/createCategory'}><i className="fa-solid fa-plus"/></Link>
                    </div>
                </div>
                <hr id="hr-list-plan"/>
                <table id="table-list-plan">
                    <tbody>
                    <tr>
                        <th>STT</th>
                        <th>Icon</th>
                        <th>Danh mục</th>
                        <th>Kiểu danh mục</th>
                        <th>Hành động</th>
                    </tr>
                    </tbody>
                    <tbody id="data-plan">
                    {categories.map((item)=>{
                        return(
                            <tr key={item.id} className={'active-row'}>
                                <td>{categories.indexOf(item) +1}</td>
                                <td className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "25px"}}>
                                    <div style={{float: "left"}} className="icon-border-bus-dashboard" >
                                        <i className={item.icon +' fa-light'}/>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.typeCategory}</td>
                                <td id={'showIcon'}  style={{position:"relative"}} >
                                    {item.id>8? (<>

                                        <Link className={'button-save-profile'} to={"/updateCategory/"+ item.id}>
                                            <i className="fa-regular fa-pen-to-square" ></i></Link>
                                        <i className="fa-solid fa-trash-can" onClick={() => deleteCategory(item.id)}></i>

                                    </>): ''}

                                </td>

                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    }


    function deleteCategory(id) {

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/user${idAcc}/categories/${id}`
                    , {headers: {"Authorization": `Bearer ${token}`}}).then((resp) =>{
                    console.log(resp)
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    axios.get(`http://localhost:8080/user${idAcc}/categories`).then((resp) => {
                        console.log(resp)
                        setCategories(resp.data)
                    }).catch(err => {
                        Swal.fire('Data not found')
                    })

                }).catch(err => Swal.fire('Có lỗi xảy ra, bạn không thể xóa danh mục này!'))

            }
        })

    }
}
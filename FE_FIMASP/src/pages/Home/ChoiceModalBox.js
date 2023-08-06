import axios from "axios";
import {useState} from "react";
import Swal from "sweetalert2";

export default function  ChoiceModalBox({wallet,setIsUpdate,setWalletChoice,setUpdate}){
    const  userId = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    function deleteWallet() {

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8080/user${userId}/wallets/${wallet.id}`,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
                    setIsUpdate(true)
                    setWalletChoice(null)

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        showConfirmButton: false,
                        timer: 1000
                    })

                }).catch(err => Swal.fire('Có lỗi xảy ra, bạn không thể xóa danh mục này!'))

            }
        })

    }
    function scrollTransaction() {
        window.scrollTo(0,720)
    }

    return(
    <div className={"choice-modal-box"}>
        <ul>
            <li onClick={()=>{setUpdate(true)}}><i className={"far fa-edit"}></i><span>Sửa ví</span></li>
            <li onClick={deleteWallet}><i className={"fa fa-trash"} ></i><span>Xóa ví</span></li>
            <li onClick={scrollTransaction}><i className={"fas fa-angle-double-down"} ></i><span>Giao dịch</span></li>
        </ul>
    </div>
)
}
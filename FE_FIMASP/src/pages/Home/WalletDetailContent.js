
import {Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import axios from "axios";
import ChoiceModalBox from "./ChoiceModalBox";
import("./WalletDetailContent.css");
export default function WalletDetailContent({wallet,setIsUpdate,setWalletChoice,click,setClick,setUpdate}){
    const [editActive,setEditActive]=useState(false)
    const [activeIcon,setActiveIcon] = useState("")
    const [activeColor,setActiveColor] = useState("")
    const [shown,setShown]=useState(false)
    const token = localStorage.getItem("token");

    const idUser = localStorage.getItem("id");


    useEffect(()=>{
        if(click){
        setActiveIcon(wallet.icon)
        setActiveColor(wallet.backgroundColor)
        setClick(false)
        }
    },[click])
    function setIcon(e){
        setActiveIcon(e.currentTarget.id);
    }
    function setColor(e){
        setActiveColor(e.currentTarget.style.backgroundImage)
    }
    function save(values){
      let wallet={
          id: values.id,
          name: values.name,
          totalMoney: values.totalMoney,
          icon: activeIcon,
          backgroundColor: activeColor,
          limitMoney: values.limitMoney
      }
      axios.put(`http://localhost:8080/user${idUser}/wallets/${wallet.id}`,wallet,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
            setEditActive(false)
          setIsUpdate(true)
          setWalletChoice(res.data)
        }
      )
    }
    function deleteWallet(){
        if (window.confirm("Confirm to delete")){
            axios.delete(`http://localhost:8080/user${idUser}/wallets/${wallet.id}`,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
                alert("Success to delete")
                setIsUpdate(true)
                setWalletChoice(null)
            })
        }
    }
    return wallet ===null?(<></>): (<Formik
            initialValues={{
                id: wallet.id,
                name: wallet.name,
                totalMoney: wallet.totalMoney,
                limitMoney: wallet.limitMoney
            }}
            onSubmit={(values)=>{save(values)}}
            enableReinitialize={true}
        >
        {()=>(
            <Form className={"walletDetail-content"}>
                <div className={"choice-box-icon"} onClick={()=>{setShown(!shown)}}>
                    <i className={"fa fa-ellipsis-v"} style={{fontSize: "25px",left: "0",top: "0"}}></i>
                </div>
            <table className={"walletDetail-content-table"}>
                <thead></thead>
                <tbody>
                <tr>
                    <td><p>Tên ví:</p></td>
                    <td><p>{wallet.name}</p></td>
                </tr>
                <tr>
                    <td><p>Số tiền trong ví:</p></td>
                    <td><p>{wallet.totalMoney.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</p></td>
                </tr>
                <tr>
                    <td><p>Loại ví:</p></td>
                    <td>
                        <div className="block-wallet">
                            <div className="icon-wallet" id={wallet.icon}>
                                <i className={"fa-light "+wallet.icon}></i>
                            </div>
                            <p id="2">{wallet.icon=="fa-sack-dollar"?"Tiền mặt":"Tài khoản"}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><p>Hình nền thẻ:</p></td>
                    <td><div className={"color-sample"} style={{backgroundImage: wallet.backgroundColor}}></div>
                    </td>
                </tr>
                <tr>
                    <td><p>Giới hạn chi tiêu:</p></td>
                    <td><p>{wallet.limitMoney.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</p></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        {editActive &&<button type={"submit"}>Confirm</button>}
                    </td>
                </tr>
                </tbody>
            </table>
                <div>
                    {shown&&<ChoiceModalBox wallet={wallet} setWalletChoice={setWalletChoice} setUpdate={setUpdate} setIsUpdate={setIsUpdate}></ChoiceModalBox>}
                </div>
            </Form>)}
        </Formik>
        )
}
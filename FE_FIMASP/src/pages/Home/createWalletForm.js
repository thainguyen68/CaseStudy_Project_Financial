import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup"
import {useState} from "react";
import axios from "axios";
import {ref} from "yup";
import Swal from "sweetalert2";
import("./CreateWalletForm.css")

export default function CreateWalletForm({setShow,setIsUpdate,wallet,setWalletChoice,setUpdate}){
    const [activeIcon,setActiveIcon] = useState(wallet===undefined?"":wallet.icon)
    const [activeColor,setActiveColor] = useState(wallet===undefined?"":wallet.backgroundColor)
    const [errorMsgIcon,setErrorIcon]= useState(false)
    const [errorMsgColor,setErrorColor]= useState(false)
    const validationStrict=Yup.object().shape({
        name: Yup.string().required("Không được để trống trường này").max(15,"Tên quá dài"),
        totalMoney: Yup.number().required("Không được để trống trường này").when("limitMoney",([limitMoney],schema)=>{return limitMoney? schema.min(Yup.ref("limitMoney"),"Không được nhỏ hơn"):schema}),
        limitMoney: Yup.number().max(Yup.ref("totalMoney"),"Không được lớn hơn")
    })
    const idUser = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    function setIcon(e){
        setActiveIcon(e.currentTarget.id);
        setErrorIcon(false)
    }
    function setColor(e){
        setActiveColor(e.currentTarget.style.backgroundImage)
        setErrorColor(false)
    }
    function save(values){
        let wallet={
            id: values.id,
            name: values.name,
            totalMoney: values.totalMoney,
            icon: activeIcon,
            backgroundColor: activeColor,
            limitMoney: values.limitMoney===""?values.totalMoney:values.limitMoney
        }
        axios.post(`http://localhost:8080/user${idUser}/wallets`,wallet).then(()=>{
            setIsUpdate(true)
            setShow(false)
            Swal.fire({
                icon: 'success',
                title: 'Tạo ví thành công!',
                showConfirmButton: false,
                timer: 1000
            })
        })
    }
    function update(values){
        let wallet={
            id: values.id,
            name: values.name,
            totalMoney: values.totalMoney,
            icon: activeIcon,
            backgroundColor: activeColor,
            limitMoney: values.limitMoney===""?values.totalMoney:values.limitMoney
        }

        axios.put(`http://localhost:8080/user${idUser}/wallets/${wallet.id}`,wallet,{headers: {"Authorization": `Bearer ${token}`}}).then((res)=>{
                setIsUpdate(true)
                setWalletChoice(wallet)
                setUpdate(false)
            Swal.fire({
                icon: 'success',
                title: 'Cập nhật ví thành công!',
                showConfirmButton: false,
                timer: 1000
            })
            }
        )
    }
    return (
        <div className={"form-create-wallet"}>
            <Formik
                initialValues={wallet===undefined?{
                    id: "",
                    name: "",
                    totalMoney: "",
                    limitMoney: ""
                }:{
                    id: wallet.id,
                    name: wallet.name,
                    totalMoney: wallet.totalMoney,
                    limitMoney: wallet.limitMoney
                }}
                onSubmit={(values) => {
                    if(activeIcon!==""&&activeColor!==""){
                        if(wallet===undefined){
                            save(values)
                        }else{
                            update(values)
                        }
                    }else{
                        if (activeIcon===""){ setErrorIcon(true)}
                        if (activeColor===""){ setErrorColor(true)}
                    }
                }}
                validationSchema={validationStrict}
            >
                {({values})=><Form>
                    <table className={"walletDetail-content"}>
                        <thead></thead>
                        <tbody>
                        <tr>
                            <td><p>Tên ví</p></td>
                        </tr>
                        <tr>
                            <td>
                                <Field name={"name"}></Field>
                            <ErrorMessage name={"name"}></ErrorMessage>
                            </td>
                        </tr>
                        <tr>
                            <td><p>Số tiền trong ví</p></td>
                        </tr>
                        <tr>
                            <td>
                                <Field name={"totalMoney"}></Field>
                                <div style={{fontSize:"15px",color:"red"}}>
                                    <ErrorMessage name={"totalMoney"}></ErrorMessage>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td><p>Loại ví</p></td>
                        </tr>
                        <tr>
                            <td id={'block-create-wallet'}>
                                <div className="block-wallet">
                                    <div className="icon-wallet" id="fa-credit-card" style={{borderRadius:activeIcon==="fa-credit-card"?"2px":"100px"}} onClick={setIcon}>
                                        <i className="fa-light fa-credit-card"></i>
                                    </div>
                                    <p id="1">Tài khoản</p>
                                </div>
                                <div className="block-wallet">
                                    <div className="icon-wallet" id="fa-sack-dollar" style={{borderRadius:activeIcon==="fa-sack-dollar"?"2px":"100px"}} onClick={setIcon}>
                                        <i className="fa-light fa-sack-dollar"></i>
                                    </div>
                                    <p id="2">Tiền mặt</p>
                                </div>
                               {errorMsgIcon&&"Cần chọn icon"}
                            </td>
                        </tr>
                        <tr>
                            <td><p style={{margin: "10px 0"}}>Hình nền ví:</p></td>
                        </tr>
                        <tr>
                            <td>
                                <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right bottom, green, black, blue)",opacity:activeColor==="linear-gradient(to right bottom, green, black, blue)"?"1":"0.3"}} onClick={setColor}></div>
                                <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right, red, yellow)",opacity:activeColor==="linear-gradient(to right, red, yellow)"?"1":"0.3"}} onClick={setColor}></div>
                                <div className={"color-sample"} style={{backgroundImage: "linear-gradient(to right, blue, purple)",opacity:activeColor==='linear-gradient(to right, blue, purple)'?"1":"0.3"}} onClick={setColor}></div>
                                {errorMsgColor&&"Cần chọn màu nền cho ví"}
                            </td>
                        </tr>
                        <tr>
                            <td><p style={{margin: "10px 0"}}>Giới hạn chi tiêu ví:</p></td>
                        </tr>
                        <tr>
                            <td>
                                <Field  style={{marginBottom: "10px"}}name={"limitMoney"}></Field>
                                <div style={{fontSize:"15px",color:"red"}}>
                                    <ErrorMessage name={"limitMoney"}></ErrorMessage>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} >
                                <button type={"submit"} style={{backgroundColor:"#78dd74"}}>Confirm</button>
                                <button type="button"
                                        style={{float:"right",backgroundColor:"#f44336cc"}}
                                        onClick={()=>{
                                            wallet===undefined?setShow(false):setUpdate(false)}}
                                >Close</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {/*<div className={"sample-wallet-context"}>*/}
                        {/*<p>Sample wallet</p>*/}
                        <div className={"wallet"} style={{backgroundImage: activeColor}}>
                            <p className={"logoName"}>Fimasp</p>
                            <i className={"fa-light "+activeIcon}></i>
                            <div className={"walletDetail"}>
                                <p>Wallet 's name</p>
                                <p className={"walletName"}>{values?.name}</p>
                            </div>
                            <div className={"walletMoney"}>
                                <p>{values?.totalMoney}</p>
                            </div>
                            <div className={"walletLimit"}>
                                <p>Limit</p>
                                <p className={"walletName"}>{values?.limitMoney}</p>
                            </div>
                        </div>
                    {/*</div>*/}
                </Form>
            }
            </Formik>
        </div>
    );
}
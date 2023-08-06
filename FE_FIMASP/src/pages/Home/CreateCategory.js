import React,{useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import Swal from "sweetalert2";
import toast, {Toaster} from "react-hot-toast";
import "./../../assets/css/popupTransaction.css";
export default React.memo(function CreateCategory(props){
    const[active,setActive] = useState(true)
    const [activeCategory,setActiveCategory] = useState("fa-dumbbell")
    const [categorygetId,setCategoryGetId] = useState("1")
    const [popupCategory,setPopupCategory] = useState(false);
    const [displayCategoryPick,setDisplayCategoryPick]=useState(false);
    const [iconCategoryPick,setIconCategoryPick] = useState("")
    const token = localStorage.getItem("token");
    const wrapperRef = useRef(null);
    const categoryRef = useRef(null);
    function openDetailCategory(){
        setPopupCategory(true)
    }
    function closeDetailCategory(){
        setPopupCategory(false)
    }
    const idUser = localStorage.getItem("id");
    useEffect(() => {

        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.close()
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
    }, [wrapperRef,props,categoryRef]);

    function categoryActive(e){
        closeDetailCategory();
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
    }
    function categoryActivePick(e){
        closeDetailCategory();
        setActiveCategory(e.currentTarget.id);
        setCategoryGetId(e.currentTarget.classList.item(0))
        setIconCategoryPick(e.currentTarget.classList.item(0))
        setDisplayCategoryPick(true);
    }
    const Validation = Yup.object().shape({
        name: Yup.string().max(15, "Không quá 20 ký tự"),
        typeCategory: Yup.string().required("Vui lòng chọn ví!"),

    })
    return(
        <>
            <div id="popup" ref={wrapperRef} style={{display:props.dialog==true?"block":"none",minHeight:"390px"}}>
                <div className="tab-header">
                    <div className={"active"} id="expense" style={{width:"100%",fontSize:"20px"}}>
                        Danh mục
                    </div>
                </div>
                <div className="tab-body">
                    <div className={active?"active":""} style={{width:"95%"}}>
                        <Formik initialValues={{
                            typeCategory:"",
                            name:"",
                            icon:"",
                            account:{
                                id:idUser
                            },
                        }}

                                onSubmit={(values,actions) => {
                                        save(values)
                                        actions.resetForm()
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
                                                    <span>Tên danh mục </span>
                                                    <Field type="text" name={'name'}/>
                                                    <span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>
                                                        <ErrorMessage name={'name'}  />
                                                    </span>
                                                </div>
                                                <div className='inputBox'>
                                                    <span>Chọn loại danh mục </span>
                                                    <Field as="select" name={"typeCategory"} value={values.typeCategory} id="select-box1"  className="select">
                                                        <option value="">--Chọn loại ví--</option>
                                                        <option value='expense'>Chi phí</option>
                                                        <option value='income'>Thu nhập</option>
                                                    </Field>
                                                    <span style={{color:"red", fontSize:"15px",margin:0,position:"absolute",bottom:"-25px"}}>
                                                        <ErrorMessage name={'typeCategory'}  />
                                                    </span>
                                                </div>
                                            </div>
                                            <div ref={categoryRef} className='popup-detail-category' style={popupCategory?{display:"block"}:{display:"none"}}>
                                                <div  className="block-category" id={"block-fa-family"} >
                                                    {/*{activeCategory==="fa-family"&&setCategoryGetId(item.id)}*/}
                                                    <div className={'fa-family icon-border'} id={'fa-family'} style={{borderRadius:activeCategory==="fa-family"?"2px":"100px"}} onClick={categoryActivePick}>
                                                        <i className={"fa-light fa-family"} ></i>
                                                    </div>
                                                </div>
                                                <div  className="block-category" id={"block-"+"fa-pig"} >
                                                    {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                    <div className={'fa-pig icon-border'} id={'fa-pig'} style={{borderRadius:activeCategory==="fa-pig"?"2px":"100px"}} onClick={categoryActivePick}>
                                                        <i className={"fa-light fa-pig" } ></i>
                                                    </div>
                                                </div>
                                                <div  className="block-category" id={"block-"+"fa-filter-circle-dollar"} >
                                                    {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                    <div className={'fa-filter-circle-dollar icon-border'} id={'fa-filter-circle-dollar'} style={{borderRadius:activeCategory==="fa-filter-circle-dollar"?"2px":"100px"}} onClick={categoryActivePick}>
                                                        <i className={"fa-light fa-filter-circle-dollar" } ></i>
                                                    </div>
                                                </div>
                                                <div  className="block-category" id={"block-"+"fa-graduation-cap"} >
                                                    {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                    <div className={'fa-graduation-cap icon-border'} id={'fa-graduation-cap'} style={{borderRadius:activeCategory==="fa-graduation-cap"?"2px":"100px"}} onClick={categoryActivePick}>
                                                        <i className={"fa-light fa-graduation-cap" } ></i>
                                                    </div>
                                                </div>
                                                <div  className="block-category" id={"block-"+"fa-handshake-angle"} >
                                                    {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                    <div className={'fa-handshake-angle icon-border'} id={'fa-handshake-angle'} style={{borderRadius:activeCategory==="fa-handshake-angle"?"2px":"100px"}} onClick={categoryActivePick}>
                                                        <i className={"fa-light fa-handshake-angle" } ></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-form'>
                                                <div className='inputBox'>
                                                    <span>Danh mục :</span>

                                                        {iconCategoryPick != ""?
                                                            <div  className="block-category" id={"block-"+iconCategoryPick} style={displayCategoryPick?{display:"inline-block"}:{display:"none"}}>
                                                                {/*{activeCategory==="fa-dumbbell"&&setCategoryGetId(item.id)}*/}
                                                                <div className={'icon-border'} id={iconCategoryPick} style={{borderRadius:activeCategory===iconCategoryPick?"2px":"100px"}} onClick={categoryActive}>
                                                                    <i className={"fa-light "+iconCategoryPick} ></i>
                                                                </div>
                                                            </div>:<></>}
                                                            <div  className="block-category" id={"block-"+"fa-gift-card"} >
                                                                {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                                <div className={'icon-border'} id={'fa-gift-card'} style={{borderRadius:activeCategory==="fa-gift-card"?"2px":"100px"}} onClick={categoryActive}>
                                                                    <i className={"fa-light fa-gift-card" } ></i>
                                                                </div>
                                                            </div>
                                                            <div  className="block-category" id={"block-"+"fa-hand-holding-dollar"} >
                                                                {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                                <div className={'icon-border'} id={'fa-hand-holding-dollar'} style={{borderRadius:activeCategory==="fa-hand-holding-dollar"?"2px":"100px"}} onClick={categoryActive}>
                                                                    <i className={"fa-light fa-hand-holding-dollar" } ></i>
                                                                </div>
                                                            </div>
                                                            <div  className="block-category" id={"block-"+"fa-cart-shopping"} >
                                                                {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                                <div className={'icon-border'} id={'fa-cart-shopping'} style={{borderRadius:activeCategory==="fa-cart-shopping"?"2px":"100px"}} onClick={categoryActive}>
                                                                    <i className={"fa-light fa-cart-shopping" } ></i>
                                                                </div>
                                                            </div>

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
        values.icon = activeCategory;
        console.log(values);
        axios.post(`http://localhost:8080/user${idUser}/categories`,values,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
            props.createSuccess()
            props.close()
            Swal.fire({
                icon: 'success',
                title: 'Create success!',
                showConfirmButton: false,
                timer: 1000
            })
        }).catch(err =>{
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Update failed!',
            })
        })
    }
})
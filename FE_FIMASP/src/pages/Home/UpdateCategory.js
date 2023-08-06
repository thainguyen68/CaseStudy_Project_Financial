import React,{useEffect, useRef, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import "./../../assets/css/popupTransaction.css";
export default React.memo(function UpdateCategory(props){
        const[category,setCategory] = useState({})
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
        setActiveCategory(props.icon);
        axios.get(`http://localhost:8080/user${idUser}/categories/${props.idCategoryUpdate}`).then((response) => {
            setCategory(response.data)
        })
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                props.closeUpdateCategory()
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
    })
    return(
        <>
            <div id="popup" ref={wrapperRef} style={{display:props.dialogUpdateCategory==true?"block":"none"}}>
                <div className="tab-header">
                    <div className={"active"} id="expense" style={{width:"100%",fontSize:"20px"}}>
                        Danh mục
                    </div>
                </div>
                <div className="tab-body">
                    <div className={active?"active":""} style={{width:"95%"}}>
                        <Formik initialValues={{
                            typeCategory:category.typeCategory,
                            name:category.name,
                            icon:category.icon,
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

                                                    <div  className="block-category" id={"block-"+props.icon} style={props.icon == 'fa-gift-card'?{display:"none"}:{display:"inline-block"}}>
                                                        <div className={'icon-border'} id={props.icon} style={{borderRadius:activeCategory===props.icon?"2px":"100px"}} onClick={categoryActive}>
                                                            <i className={"fa-light "+props.icon} ></i>
                                                        </div>
                                                    </div>
                                                    <div  className="block-category" id={"block-"+"fa-gift-card"} >
                                                        {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                                        <div className={'icon-border'} id={'fa-gift-card'} style={{borderRadius:activeCategory==="fa-gift-card"?"2px":"100px"}} onClick={categoryActive}>
                                                            <i className={"fa-light fa-gift-card" } ></i>
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
                                            <input value="Hủy" type="button" className={'btn-reject-transaction'} onClick={props.closeUpdateCategory}/>
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
        values.id = props.idCategoryUpdate;
        values.icon = activeCategory;
        console.log(values);
        axios.put(`http://localhost:8080/user${idUser}/categories/${props.idCategoryUpdate}`,values,{headers: {"Authorization": `Bearer ${token}`}}).then(()=>{
            props.updateSuccess()
            props.closeUpdateCategory()
        })
    }
})
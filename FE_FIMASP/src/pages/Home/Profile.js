import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../../FirebaseConfig";
import toast, {Toaster} from "react-hot-toast";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";


export default function Profile({setImageHeader}) {
    const [user, setUser] = useState({});
    const [image, setImage] = useState("");
    const [progressPercent, setProgressPercent] = useState(0);
    const [check, setCheck] = useState(false);
    const refInput = useRef(null);

    function refreshPage() {
        window.location.reload();
    }

    const token = localStorage.getItem('token');
    const notify = () => {
        toast.success("Cập nhật hồ sơ thành công", {
            position: "top-center", style: {
                position:'relative',
                top: '100px',
                minWidth: '300px',
                fontSize: "20px"
            },
        })
    }

    const [idAcc, setIdAcc] = useState(localStorage.getItem('id'))

    useEffect(() => {
        axios.get(`http://localhost:8080/user/${idAcc}`).then((response) => {
            setUser(response.data);

            setImage(response.data.avatar)
        })
    }, [idAcc])

    useEffect(()=>{
        setImageHeader(user.avatar)
    },[user])
    const Validation = Yup.object().shape({
        fullName: Yup.string().required("Không được để trống!").max(20, "Dài quá 20 kí tự!"),
        phoneNumber: Yup.string().required("Không được để trống!").min(9, "Số điện thoại không đúng định dạng!")
            .max(11, "Số điện thoại không đúng định dạng!"),
        birthday: Yup.string().required("Không được để trống!").matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/, {message: "Chưa đúng định dạng"})
    })
    const handleClick = () => {
        refInput.current.click();
    }
    if (localStorage.getItem('id') === '' || localStorage.getItem('id') === null) {
        return (
            <>
                <h2>Bạn không có quyền truy cập link này</h2>
                <Link to={'/home'}>Trở về trang chủ để đăng nhập</Link>
            </>
        )
    }else if(localStorage.getItem('id')=== '2'|| localStorage.getItem('id')==='3'){
        return (
            <>
                <h2>Bạn đang sử dụng tài khoản mạng xã hội</h2>
                <Link to={'/home'}>Trở về trang chủ để đăng nhập</Link>
            </>
        )
    } else {
        return (
            <>
                <Formik initialValues={{
                    fullName: user.fullName,
                    birthday: user.birthday,
                    phoneNumber: user.phoneNumber,
                    avatar: user.avatar,
                    address: user.address,
                    gender: user.gender,
                    email: user.username
                }}
                        onSubmit={(values) => {
                            save(values)
                        }
                        }
                        validationSchema={Validation}
                        enableReinitialize={true}
                >
                    {({errors, touched}) => (
                        <Form>
                            <div id="content-profile">
                                    <Toaster/>
                                <div id='general-information'>

                                    <h2>Thông tin chung</h2>
                                    <div className={"field-div-profile"}>
                                        <label htmlFor="fullName">Họ và tên</label><br/>
                                        <Field type="text" placeholder='Nhập tên của bạn' name={'fullName'}
                                               id='fullName'/>
                                        <div className={"field-div-profile-error"}>
                                            <ErrorMessage name={'fullName'}/>
                                        </div>

                                    </div>

                                    <div className='input-right field-div-profile'>
                                        <label htmlFor="birthday">Ngày sinh</label><br/>
                                        <Field type="date" name={'birthday'} id='birthday'/>
                                        <div className={"field-div-profile-error"}>
                                            <ErrorMessage name={'birthday'}/>
                                        </div>
                                    </div>

                                    <div className='gender-radio field-div-profile'>
                                        <label htmlFor="gender">Giới tính</label><br/>
                                        <label htmlFor="gender">Nam</label>
                                        <Field type="radio" name={"gender"} value="male"/>
                                        <label htmlFor="gender">Nữ</label>
                                        <Field type="radio" name={"gender"} value="female"/>
                                        <label htmlFor="gender">Khác</label>
                                        <Field type="radio" name={"gender"} value="other"/>
                                    </div>
                                    <div className='input-right field-div-profile'>
                                        <label htmlFor="email">Email</label><br/>
                                        <Field type="text" disabled name={'email'} id='email'/>
                                    </div>
                                    <div className={"field-div-profile"}>
                                        <label htmlFor="phoneNumber">Số điện thoại</label><br/>
                                        <Field type="text" placeholder='Số điện thoại' name={'phoneNumber'}
                                               id='phoneNumber'/>
                                        <div className={"field-div-profile-error"}>
                                            <ErrorMessage name={'phoneNumber'}/>
                                        </div>
                                    </div>
                                </div>
                                <div id='address-information'>
                                    <h2>Địa chỉ</h2>
                                    <div className='address-1'>
                                        <label htmlFor="address">Địa chỉ</label><br/>
                                        <Field type="text" placeholder='Nhập địa chỉ của bạn' name={'address'}
                                               id='address'/>
                                    </div>
                                    {/*<div className='address-2 input-right'>*/}
                                    {/*    <label htmlFor="city">Thành phố</label><br/>*/}
                                    {/*    <Field type="text" placeholder='Thành phố' name={'city'} id='city'/>*/}
                                    {/*</div>*/}
                                    {/*<div className='address-3'>*/}
                                    {/*    <label htmlFor="zip">Zip</label><br/>*/}
                                    {/*    <Field type="text" placeholder='Zip' name={'zip'} id='zip'/>*/}
                                    {/*</div>*/}
                                </div>
                                <div id='button-save-profile'>
                                    <button type={'submit'} style={Object.keys(errors).length !== 0
                                        ? {
                                            background: "rgb(141,191,114)",
                                            cursor: "not-allowed"
                                        } : {background: "rgb(79 161 34)", cursor: "pointer"}}>Lưu hồ sơ
                                    </button>
                                </div>
                            </div>
                            <div id="sidebar-profile">
                                <div className={'img8x'}>
                                    {
                                        !image && <img src="data:image/png;base64,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"
                                            alt=""/>
                                    }
                                    {
                                        image && <img src={image} alt=""/>
                                    }
                                    {/*<img src={user.avatar} alt=""/>*/}
                                </div>
                                <div className="content-profile">
                                    <div className="details-profile">
                                        <h2>{user.fullName} <br/><span>{user.username}</span></h2>
                                        <div className="descriptions-profile">
                                            <h3>{user.birthday}<br/><span>Ngày sinh</span></h3>
                                            <h3>{user.address}<br/><span>Địa chỉ</span></h3>
                                            <h3>{user.phoneNumber}<br/><span>Số điện thoại</span></h3>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='attach-avatar' onClick={handleClick}>
                                <div className='attach-title'>
                                    <h2>Chọn ảnh avatar</h2>
                                </div>
                                <div>
                                    <div className="attach-img8">
                                        {
                                            !image && <img src={user.avatar} alt=""/>
                                        }
                                        {
                                            image && <img src={image} alt=""/>
                                        }
                                        {/*<img src={user.avatar} alt=""/>*/}
                                    </div>

                                    <div className="attach-icon">
                                        <i className="fa-solid fa-paperclip"></i>
                                    </div>
                                    <div className='outer-bar'>
                                        <div className='inner-bar'
                                             style={{width: `${progressPercent}%`}}>Upload...{progressPercent}%
                                        </div>
                                    </div>
                                    <div className='attach-choose-file'>
                                        <h4>Chọn ảnh</h4>
                                        <p>JPG,GIF hoặc PNG nhỏ hơn 800KB</p>
                                    </div>
                                    <input type="file" className="form-control custom-file-input" id="image"
                                           ref={refInput}

                                           onChange={(e) => uploadFile(e)}/>
                                </div>
                            </div>

                        </Form>
                    )}
                </Formik>
            </>

        )
    }

    function save(values) {
        values.avatar = image;
        let userUpdate = {
            id: idAcc,
            username: values.email,
            password: user.password,
            fullName: values.fullName,
            birthday: values.birthday,
            phoneNumber: values.phoneNumber,
            avatar: values.avatar,
            address: values.address,
            gender: values.gender,
            role: {
                id: user.role.id
            }
        }
        console.log(user.role.id)
        console.log(userUpdate)

        axios.put(`http://localhost:8080/user/update/${idAcc}`, userUpdate
            , {headers: {"Authorization": `Bearer ${token}`}})
            .then((resp) => {
                console.log(resp)
                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật hồ sơ thành công!',
                    showConfirmButton: false,
                    timer: 1000
                })
                setUser(resp.data);

            }).catch((err) => {
            console.log(err)
        })
    }

    function uploadFile(e) {
        setCheck(true)
        if (e.target.files[0]) {
            const time = new Date().getTime()
            const storageRef = ref(storage, `image/${time}_${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImage(downloadURL)
                        setCheck(false)
                    });
                }
            );
        }
    }


}
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import "./../../assets/css/header.css"
export default function Header({imageHeader}){

 const[active,setActive] = useState(true)
 const [user, setUser] = useState({})
 const [notifications,setNotifications] = useState([])

 const [displayNotification,setDisplayNotification] = useState(false)

 const avatar = localStorage.getItem('avatar')

 const [activeCategory,setActiveCategory] = useState("fa-dumbbell")

 const wrapperRef = useRef(null);


  useEffect(() => {
   /**
    * Alert if clicked on outside of element
    */
   axios.get(`http://localhost:8080/user${idAcc}/notifications`).then((response)=>{
    setNotifications(response.data);
   })
  },[notifications]);
 const [idAcc, setIdAcc] = useState(localStorage.getItem('id'))


 useEffect(() => {
  axios.get(`http://localhost:8080/user/${idAcc}`).then((response) => {
   setUser(response.data);
  })


 }, [])

 useEffect(() => {
  /**
   * Alert if clicked on outside of element
   */
 }, [wrapperRef]);

 function openIncome(){
  setActive(true);
 }

 function openExpences(){
  setActive(false);
 }

  function openNotification(){
   setDisplayNotification(true);
  }
 function closeNotification(){
  setDisplayNotification(false);
 }
 function category(e){
  setActiveCategory(e.currentTarget.id);
 }
 return(
     <div id="Header">
      <div id="popup1">
       <div className="tab-header">
        <div className="active" id="add-account-title" /*onClick="openIncome()"*/>
         Thêm tài khoản
        </div>
       </div>
       <div className="tab-body">
        <div className="active">
         <div className="form">
          <table>
           <tbody>
           <tr>
            <td>
             <label>
              <input
                  // onFocus="this.placeholder = ''"
                  placeholder={"0"}
                  defaultValue={0}
                  type="text"
                  id="money2"
              />{" "}
              VND
             </label>
            </td>
           </tr>
           <tr>
            <td>
             <label>
              <input type="text" id="action2"/> Tên tài khoản
             </label>
            </td>
           </tr>
           <tr></tr>
           <tr>
            <td id="category-account">
             <label>Danh mục</label>
             <br/>
             <br/>
            </td>
           </tr>
           <tr>
            <td>
             <label htmlFor="date1">Hạn sử dụng thẻ(nếu có)</label>
             <input type="date" id="date3" name="date3" className="date"/>
            </td>
           </tr>
           <tr>
            <td>
             <button className="edit">OK</button>
             <button className="cancel" /*onClick="closeFormAccount()"*/>
              Huỷ
             </button>
            </td>
           </tr>
           </tbody>
          </table>
         </div>
        </div>
       </div>
      </div>
      <div id="popup2">
       <div className="tab-header">
        <div className="active" id="add-plan-title">
         Thêm kế hoạch
        </div>
       </div>
       <div className="tab-body">
        <div className="active">
         <div className="form">
          <table>
           <tbody>
           <tr>
            <td>
             <label>
              <input
                  // onFocus="this.placeholder = ''"
                  placeholder={"0"}
                  defaultValue={0}
                  type="text"
                  id="money3"
              />{" "}
              VND
             </label>
            </td>
           </tr>
           <tr>
            <td>
             <label>
              <input type="text" id="action3"/> Ghi chú
             </label>
            </td>
           </tr>
           <tr></tr>
           <tr>
            <td id="category-plan">
             <label>Danh mục</label>
             <br/>
             <br/>
            </td>
           </tr>
           <tr>
            <td>
             <label htmlFor="date4">Ngày bắt đầu</label>
             <input type="date" id="date4" name="date4" className="date"/>
            </td>
           </tr>
           <tr>
            <td>
             <label htmlFor="date5">Ngày kết thúc</label>
             <input type="date" id="date5" name="date5" className="date"/>
            </td>
           </tr>
           <tr>
            <td>
             <button className="edit">OK</button>
             <button className="cancel" /*onClick="closeFormPlan()"*/>
              Huỷ
             </button>
            </td>
           </tr>
           </tbody>
          </table>
         </div>
        </div>
       </div>
      </div>
      <div id="logo-wrapper">
       <img
           id="logo"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUFVYOKFCw-qPIrFP8__C_LGr6lIggosXNbw&usqp=CAU"
           alt=""
       />
       <h5 id="text-logo">Fimasp</h5>
      </div>
      <div id="page">
       <h1>Trang chủ</h1>
      </div>

      <div id="Notification-block" onClick={displayNotification?closeNotification:openNotification}>
       <div id="Notification" style={displayNotification?{display:"block"}:{display:"none"}}>
          <div id="Header-notification">
               Notifications
          </div>
          <div id="Body-notification">
           {notifications.map((item)=>{
            return(
                <div id="Notification-detail">
                 <div id="Notification-image-block" className={item.type === "notification"?"Notification-warning":""}>
                  <i className="fa-solid fa-house"></i>
                 </div>
                 <div id="Notification-content">
                  <h4>{item.title}</h4>
                  <p>{item.date}</p>
                 </div>
                </div>
            )
           })
           }
             <div id="Notification-detail">
                <div id="Notification-image-block">
                    <i className="fa-solid fa-house"></i>
                </div>
                <div id="Notification-content">
                   <h4>Remider:Treatment Time!</h4>
                   <p>29 July 2020 - 2:26 PM</p>
                </div>
             </div>
           <div id="Notification-detail">
            <div id="Notification-image-block" className="Notification-warning">
             <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div id="Notification-content">
             <h4>Warning:Treatment Time!</h4>
             <p>29 July 2020 - 2:26 PM</p>
            </div>
           </div>
          </div>

       </div>
        <i className="fa-light fa-bell">
          <div id="count-notification">
             <p>2</p>
          </div>
        </i>
      </div>
      <div id="avatar">
       {user.avatar === undefined || user.avatar=== null?(
            <img src={avatar} alt=""/>
       ):  <img src={imageHeader} alt=""/>}

      </div>
     </div>

 )


}


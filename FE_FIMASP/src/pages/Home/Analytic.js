import "./../../assets/css/analytic.css"
import "./../../assets/css/transaction.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import arrow from "../../assets/img/448-arrow.png";
import DashboardWalletSlider from "./dashboardWalletSlider";
export default function Analytic(){
    const [transactions,setTransactions] = useState([]);
    const [transactionsAll,setTransactionsAll] = useState([]);
    const [wallets,setWallets] = useState([]);
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");
    const [currentPage,setCurrentPage] = useState(1);
    const [numOfPage,setNumOfPage] = useState(5);
    const [totalPage,setTotalPage] = useState(1);
    const [totalElement,setTotalElement] = useState(0);
    useEffect(() =>{

        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res)=>{
            setWallets(res.data.content)
        })
        let current =currentPage- 1
        axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
            setTransactionsAll(response.data.content);
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes?page=${current}&size=${numOfPage}`).then((response)=>{
            setTransactions(response.data.content);
            setTotalPage(response.data.totalPages);
            setCurrentPage(response.data.totalPages-1)
            setTotalElement(response.data.totalElements);
            setCurrentPage(response.data.number+1);
        })

    },[currentPage])
    function findAllTransaction(currentPage){
        currentPage-=1;
        axios.get(`http://localhost:8080/user${idUser}/cashes`).then((response)=>{
            setTransactionsAll(response.data.content);
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes?page=${currentPage}&size=${numOfPage}`).then((response)=>{
            setTransactions(response.data.content);
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
            <div style={{padding:"20px"}}>
                <div id={'title-analytic'}>
                    <h2>Thống kê chi tiêu</h2>
                </div>
                <div id={'analytic-chart-time'}>
                    <div id={'parameter-analytic-chart-time'}>
                        <div id={'balance-wallet'}>
                            <h3>Số dư ví</h3>
                            <p>Tháng này</p>
                            <h2>$23,700.00 <span>+15%</span></h2>
                        </div>
                        <div id={'analytic-income-chart-time'}>
                            <div id={'icon-analytic-income'}>
                                <i className="fa-light fa-money-bill-trend-up"></i>
                            </div>
                            <div id={'parameter-analytic-income'}>
                                    <p>Thu nhập</p>
                                    <h4>$23,700.00</h4>
                            </div>
                        </div>
                        <div id={'analytic-expense-chart-time'}>
                            <div id={'icon-analytic-expense'}>
                                <i className="fa-light fa-money-bill-trend-up"></i>
                            </div>
                            <div id={'parameter-analytic-expense'}>
                                <p>Chi tiêu</p>
                                <h4>$23,700.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={'analytic-category-chart-time'}>
                    <h2>Danh mục</h2>
                    <div id={'chart-by-category-feature'}>

                    </div>
                    <div id={'list-category-most-feature'}>
                        <div className={'icon-category-feature icon-1'}>
                        </div>
                        <p style={{display:"inline-block"}}>Di chuyển <span>(27%)</span></p>
                        <p style={{display:"inline-block",position:"absolute",right:"0px"}}>$25,233.00</p>
                    </div>
                    <div id={'list-category-most-feature'}>
                        <div className={'icon-category-feature icon-2'}>
                        </div>
                        <p style={{display:"inline-block"}}>Gia đình <span>(12%)</span></p>
                        <p style={{display:"inline-block",position:"absolute",right:"0px"}}>$25,233.00</p>
                    </div>
                    <div id={'list-category-most-feature'}>
                        <div className={'icon-category-feature icon-3'}>
                        </div>
                        <p style={{display:"inline-block"}}>Sinh hoạt <span>(10%)</span></p>
                        <p style={{display:"inline-block",position:"absolute",right:"0px"}}>$25,233.00</p>
                    </div>
                    <div id={'list-category-most-feature'}>
                        <div className={'icon-category-feature icon-4'}>
                        </div>
                        <p style={{display:"inline-block"}}>Shopping <span>(5%)</span></p>
                        <p style={{display:"inline-block",position:"absolute",right:"0px"}}>$25,233.00</p>
                    </div>
                </div>
                <div id={'list-lastest-transaction'}>
                    <h2>Giao dịch gần nhất</h2>
                    <div id='list-transaction'>
                        <table id='table-list-transaction' style={{minWidth:"0px",width:"100%",boxShadow:"none",fontSize:"13px",marginTop:"0px"}}>
                            <tbody>
                            {transactionsAll.reverse().map((item,index)=>{
                                return(
                                    index < 5 ?
                                    <tr key={item.id} className={'active-row'} style={{border:"none"}}>
                                        <td className={'feature-field'} style={{paddingTop: 5, boxSizing: "border-box",paddingLeft: "5px",minWidth:"120px"}}>
                                            <div style={{float: "left"}} className="icon-border-bus-dashboard" id={item.category.icon}>
                                                <i className={item.category.icon+' fa-light'}/>
                                            </div>
                                            <p style={{display:"inline-block",marginLeft:"10px",marginTop:"5px"}}>{item.category.name}</p>
                                        </td>
                                        <td className={'feature-field'} style={{color: "#8d8d8d"}}>{item.date.slice(0,10)}</td>
                                        <td>{item.name}</td>
                                        <td className={'feature-field'}>{item.money.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</td>
                                        <td>{item.wallet&&item.wallet.name||"Thuộc ví đã bị xóa"}</td>
                                        <td>{item.type=="expence"?"Chi phí":"Thu nhập"}</td>
                                    </tr>:<></>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div id={'wallet-analytic-block'}>
                    <DashboardWalletSlider></DashboardWalletSlider>
                    <div id={'activity-wallet-lastest'}>
                        <h2>Hoạt động gần đây</h2>
                        <div style={{marginTop:"20px"}}>
                            <div  className="block-category" id={"block-"+"fa-gift-card"} style={{display:"inline-block",float:"left"}} >
                                {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                <div className={'icon-border'} id={'fa-gift-card'}>
                                    <i className={"fa-light fa-gift-card" } ></i>
                                </div>
                            </div>
                            <div style={{display:"inline-block"}}>
                                <h4>Quà tặng</h4>
                                <p>2023-20-12</p>
                            </div>
                            <div style={{display:"inline-block",float:"right",color:"#01a3ff"}}>
                                + $2000
                            </div>
                        </div>
                        <div style={{marginTop:"30px"}}>
                            <div  className="block-category" id={"block-"+"fa-family"} style={{display:"inline-block",float:"left"}} >
                                {/*{activeCategory==="fa-gift-card"&&setCategoryGetId(item.id)}*/}
                                <div className={'icon-border'} id={'fa-family'}>
                                    <i className={"fa-light fa-family" } ></i>
                                </div>
                            </div>
                            <div style={{display:"inline-block"}}>
                                <h4>Gia đình</h4>
                                <p>2023-20-12</p>
                            </div>
                            <div style={{display:"inline-block",float:"right",color:"#01a3ff"}}>
                                - $120
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
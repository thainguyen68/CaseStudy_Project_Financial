import {Link} from "react-router-dom";
import SimpleSlider from "./demo";
import "./../../assets/css/transaction.css"
import React, {useEffect, useState} from "react";
import axios from "axios";
import DashboardWalletSlider from "./dashboardWalletSlider";
import BarChartCashType from "./BarChartDashboard";
export default function Dashboard({setActive}) {
    const [transactionsAll,setTransactionsAll] = useState([]);
    const [transactionsByCategory,setTransactionsByCategory] = useState([]);
    const [totalMoneyExByTime,setTotalMoneyExByTime] = useState(0);
    const [totalMoneyByCash,setTotalMoneyByCash] = useState(0);
    const [totalMoneyByBank,setTotalMoneyByBank] = useState(0);
    const [totalExpenseToday,setTotalExpenseToday] = useState(0);
    const [wallets,setWallets] = useState([]);
    const token = localStorage.getItem("token");
    const idUser = localStorage.getItem("id");
    let totalMoneyAll = 0
    let msc=Date.now();
    let startDate,endDate
    endDate=(new Date(msc+7*60*60*1000)).toISOString().slice(0,10)
    startDate=(new Date(msc+7*60*60*1000-6*24*60*60*1000)).toISOString().slice(0,10)



    useEffect(() => {
        axios.get(`http://localhost:8080/user${idUser}/wallets`).then((res) => {
            setWallets(res.data.content)
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes/ex`).then((response) => {
            setTransactionsAll(response.data);
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes/ex/category/${startDate}/${endDate}`).then((response) => {
            setTransactionsByCategory(response.data);
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes/ex/${startDate}/${endDate}`).then((response) => {
            setTotalMoneyExByTime(response.data);
        })
        axios.get(`http://localhost:8080/user${idUser}/cashes/ex/${endDate}/${endDate}`).then((response) => {
            setTotalExpenseToday(response.data);
        })
        axios.get(`http://localhost:8080/user${idUser}/wallets/totalMoneyCash`).then((response) => {
            setTotalMoneyByCash(response.data);
        })
        axios.get(`http://localhost:8080/user${idUser}/wallets/totalMoneyBank`).then((response) => {
            setTotalMoneyByBank(response.data);
        })
    }, [])

    // function getMostExpenseByCategory(){
    //     let sortTransactionsByCategory = transactionsByCategory.sort(function(a, b){return a+b});
    //     return sortTransactionsByCategory;
    // }
    if (localStorage.getItem('id') === '' || localStorage.getItem('id') === null) {
        return (
            <>
                <h2>Bạn không có quyền truy cập link này</h2>
                <Link to={'/home'}>Trở về trang chủ để đăng nhập</Link>
            </>
        )
    } else {
        return (
            <div id="content-dashboard">
                <div id="chart-dashboard">
                    <h5 className="titles-dashboard">Thống kê biểu đồ tuần</h5>
                    <div
                        className="acquisitions1"
                        style={{position: "relative", width: 500, height: 250}}
                    >

                        <BarChartCashType/>
                    </div>
                </div>
                <div id="content-right-dashboard">
                    <div id="total-money-dashboard-right">
                        <div id="total-money">
                            <h6>Tổng tiền của tôi</h6>
                            <p>{(totalMoneyByBank+totalMoneyByCash).toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</p>
                        </div>
                        <div id="category-money">
                            <div id="income-block">
                                <h6>Chi tiêu hôm hay</h6>
                                <p>{totalExpenseToday==""?Number(0).toLocaleString('en-US', {style : 'currency', currency : 'VND'}):totalExpenseToday.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</p>
                            </div>
                            <div id="account-block">
                                <h6>Tài khoản</h6>
                                <p>{totalMoneyByBank.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</p>
                            </div>
                            <div id="cash-block">
                                <h6>Tiền mặt</h6>
                                <p>{totalMoneyByCash.toLocaleString('en-US', {style : 'currency', currency : 'VND'})}</p>
                            </div>
                        </div>
                    </div>
                    <div id="current-account">
                        <h6>Ví của tôi</h6>
                        <DashboardWalletSlider></DashboardWalletSlider>
                        <div id="add-card">
                            <Link to={"/wallet/true"} state={{active: "true"}} onClick={()=>{setActive("wallet")}}>+ Thêm ví</Link>
                        </div>
                    </div>
                    <div id="planning">
                        <h6>Chi tiêu nhiều nhất trong tuần</h6>
                        {transactionsByCategory.map((item, index) => {
                            return (
                                index < 3 ?
                                    <div className="plan-block">
                                        <div className="name-and-price-plan">
                                            <p className="name-plan">{item.name}</p>
                                            <p className="price-plan">{item.money.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</p>
                                        </div>
                                        <div className="plan-bar">
                                            <div className={'bar-' + (index + 1)}
                                                 style={{width: Math.round(item.money / totalMoneyExByTime * 100) + "%"}}>
                                                <span
                                                    className="percentage">{Math.round(item.money / totalMoneyExByTime * 100)}%</span>
                                            </div>
                                        </div>
                                    </div> : <></>
                            )
                        })}
                    </div>
                </div>
                <div className="payment-history">
                    <div style={{display: "inline-block", width: "90%"}}>
                        <h5
                            style={{display: "inline-block", float: "left"}}
                            className="titles-dashboard"
                        >
                            Lịch sử chi tiêu
                        </h5>
                        <div
                            style={{
                                display: "inline-block",
                                float: "right",
                                cursor: "pointer",
                                fontSize: 20,
                                position: "relative"
                            }}
                            // onClick="openPlan()"
                        >
                            <i
                                className="fa-sharp fa-solid fa-arrow-up-right-from-square"
                                style={{top: 0}}
                            />
                        </div>
                    </div>

                    <div id='list-transaction'>
                        <table id='table-list-transaction'
                               style={{minWidth: "630px", fontSize: "14px", boxShadow: "none"}}>
                            <thead>
                            <tr>
                                <th style={{paddingLeft: "30px"}}>Danh mục</th>
                                <th>Ngày</th>
                                <th>Ghi chú</th>
                                <th>Số tiền</th>
                                <th>Ví</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactionsAll.reverse().map((item, index) => {
                                {
                                    totalMoneyAll += item.money
                                }
                                return (
                                    index < 5 ?
                                        <tr key={item.id} className={'active-row'} id={index}>
                                            <td className={'feature-field'}
                                                style={{paddingTop: 5, boxSizing: "border-box", paddingLeft: "0px"}}>
                                                <div style={{float: "left"}} className="icon-border-bus-dashboard"
                                                     id={item.category.icon}>
                                                    <i className={item.category.icon + ' fa-light'}/>
                                                </div>
                                                <p style={{
                                                    display: "inline-block",
                                                    marginLeft: "10px",
                                                    marginTop: "5px"
                                                }}>{item.category.name}</p>
                                            </td>
                                            <td className={'feature-field'}
                                                style={{color: "#8d8d8d"}}>{item.date.slice(0, 10)}</td>
                                            <td>{item.name}</td>
                                            <td className={'feature-field'}>{item.money.toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'VND'
                                            })}</td>
                                            <td>{item.wallet && item.wallet.name || "Thuộc ví đã bị xóa"}</td>
                                        </tr> : <></>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
import {BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import PieCategoryChart from "./pieCategoryChart";
import HorizontalBarChart from "./HorizontalBarChart";

Chart.register(BarElement,BarController,Tooltip,CategoryScale,LinearScale,Legend,Title)
export default function  BarChartCashType(props){
    const [informArray,setInformArray]=useState([])
    const [endDate,setEndDate]=useState((new Date(Date.now()+7*60*60*1000)).toISOString().slice(0,10))
    const [dateRange,setDateRange]=useState(7)
    // const [elementType,setElementType]=useState("")
    const [elementDate,setElementDate]=useState("")
    let idUser=localStorage.getItem("id")
    let msc=(new Date(endDate)).getTime();
    let startDate
    let labels=[],tooltipLabels=[],expenseData=[],incomeData=[]
    startDate=(new Date(msc-(dateRange-1)*24*60*60*1000)).toISOString().slice(0,10)
    useEffect(()=>{
        axios.get(`http://localhost:8080/user${idUser}/cashes/cashSumByType/${startDate}/${endDate}`).then((req)=>{
            setInformArray(req.data)
        })
    },[endDate,startDate,props])
    if(dateRange===7){
        for (let i = 0; i <=6 ; i++) {
            let msc1 =msc+7*60*60*1000-i*24*60*60*1000
            labels.unshift((new Date(msc1)).toISOString().slice(0,10))
            expenseData.unshift(0)
            incomeData.unshift(0)
            for(let j=0;j<=informArray.length-1;j++){
                if(labels[0]===informArray[j][0]){
                    informArray[j][1]==='expence'?expenseData[0]=informArray[j][2]:incomeData[0]=informArray[j][2]
                }
            }
            tooltipLabels=labels
        }
    }
    if(dateRange===15) {
        for (let i = 0; i <= 14; i++) {
            let msc1 = msc + 7 * 60 * 60 * 1000 - i * 24 * 60 * 60 * 1000;
            let date1 = (new Date(msc1)).toISOString().slice(0, 10);
            tooltipLabels.unshift(date1);
            (i === 0 || i === 7 || i === 14) ? labels.unshift(date1) : labels.unshift("")
            expenseData.unshift(0)
            incomeData.unshift(0)
            for (let j = 0; j <= informArray.length - 1; j++) {
                if (date1 === informArray[j][0]) {
                    informArray[j][1] === 'expence' ? expenseData[0] = informArray[j][2] : incomeData[0] = informArray[j][2]
                }
            }
        }
    }
        if(dateRange===30) {
            for (let i = 0; i <= 29; i++) {
                let msc1 = msc - i * 24 * 60 * 60 * 1000;
                let date1 = (new Date(msc1)).toISOString().slice(0, 10);
                tooltipLabels.unshift(date1);
                (i === 0 || i === 14 || i === 29) ? labels.unshift(date1) : labels.unshift("")
                expenseData.unshift(0)
                incomeData.unshift(0)
                for (let j = 0; j <= informArray.length - 1; j++) {
                    if (date1 === informArray[j][0]) {
                        informArray[j][1] === 'expence' ? expenseData[0] = informArray[j][2] : incomeData[0] = informArray[j][2]
                    }
                }
            }
        }

    const data={
        labels,
        datasets:[
            {
                label: "expence",
                data:expenseData,
                backgroundColor:"red",

            },
            {
                label: "income",
                data:incomeData,
                backgroundColor:"green",

            }
        ]
    }
    const option={
            // responsive:false,
            // maintainAspectRatio:false,
        aspectRatio:1.5,
        scales:{
            x:{
                type: "category",
                grid:{
                    display:true,
                    tickColor:'red',
                    drawOnChartArea:false
                },
                ticks:{
                    maxRotation:0,
                    autoSkip:false,
                }
            },
            y:{
                ticks:{
                    callback: value=>value+" VNĐ"
                }
            }
        },
        onClick:(e,barElementArray)=>{
            if(barElementArray.length>0){
            let barElement=barElementArray[0]
            // setElementType(barElement.datasetIndex===0?"expence":"income")
            setElementDate(tooltipLabels[barElement.index])
        }else {
                setElementDate("")
            }},
        layout:{
            padding: 10
        },
        plugins:{
            title:{
                display: true,
                text: "Biểu đồ thống kê thu chi từ ngày "+tooltipLabels[0]+" đến ngày "+tooltipLabels[tooltipLabels.length-1]
            },
            tooltip:{
                callbacks:{
                    title: function (context){
                        return tooltipLabels[context[0].dataIndex]
                    }
                }
            }
        }
    }
    return <>
        <div  style={{display:"inline-block",float:"left",height:"30px",marginRight:"10px"}}>
            <input  style={{height:"27px",border:"1px solid #dbdfea"}} type={"date"} value={endDate} onChange={(e)=>{setEndDate(e.currentTarget.value)}}/>
        </div>
         <div style={{marginTop:"10px"}}>
             <ul>
                 <li style={{display:"inline-block",float:'left'}}><button style={{background: "#fff",
                     borderRight: "none",height:"30px",
                     border: "1px solid #dbdfea"}} onClick={()=>{setDateRange(7)}}>7 ngày</button></li>
                 <li style={{display:"inline-block",float:'left'}}><button style={{background: "#fff",borderLeft:"none",
                     borderRight: "none",height:"30px",
                     border: "1px solid #dbdfea"}} onClick={()=>{setDateRange(15)}}>15 ngày</button></li>
                 <li style={{display:"inline-block"}}><button style={{background: "#fff",
                     borderRight: "none",height:"30px",borderLeft:"none",
                     border: "1px solid #dbdfea"}} onClick={()=>{setDateRange(30)}}>30 ngày</button></li>
            </ul>
         </div>
        <div style={{width:"57%",height: "500px",display:"inline-block",border:"1px solid white",backgroundColor:"rgb(231,240,253)",position: "relative",left:"0px"}}>
            <Bar data={data} options={option}></Bar>
            <HorizontalBarChart props={props} elementDate={elementDate}></HorizontalBarChart>
        </div>
        <PieCategoryChart props={props} elementDate={elementDate}></PieCategoryChart>

        {/*<LineChart></LineChart>*/}
        </>
}
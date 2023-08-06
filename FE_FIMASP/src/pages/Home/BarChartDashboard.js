import {BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";

Chart.register(BarElement,BarController,Tooltip,CategoryScale,LinearScale,Legend,Title)
export default function  BarChartCashType(){
    const userId = localStorage.getItem("id")
    const [informArray,setInformArray]=useState([])
    let msc=Date.now();
    let startDate,endDate
    let labels=[],expenseData=[],incomeData=[]
    endDate=(new Date(msc+7*60*60*1000)).toISOString().slice(0,10)
    startDate=(new Date(msc+7*60*60*1000-6*24*60*60*1000)).toISOString().slice(0,10)
    useEffect(()=>{
        axios.get(`http://localhost:8080/user${userId}/cashes/cashSumByType/${startDate}/${endDate}`).then((req)=>{
            setInformArray(req.data)
        })
    },[startDate,endDate])
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
    return <Bar data={data}></Bar>
}
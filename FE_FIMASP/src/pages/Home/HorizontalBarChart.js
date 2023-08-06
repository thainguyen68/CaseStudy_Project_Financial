import {useEffect, useState} from "react";
import {BarController, BarElement, CategoryScale, Chart, Legend, LinearScale, Title, Tooltip} from "chart.js";
import axios from "axios";
import {Bar} from "react-chartjs-2";
Chart.register(BarElement,BarController,Tooltip,CategoryScale,LinearScale,Legend,Title)
export default function HorizontalBarChart({elementDate,props}){
    const [informArray,setInformArray]=useState([])
    let idUser=localStorage.getItem("id")

    useEffect(()=>{
        if (elementDate!==""){
            axios.get(`http://localhost:8080/user${idUser}/cashes/moneyByWallet/${elementDate}`).then((req)=>{
                setInformArray(req.data)
            })
        }else {
            setInformArray([])
        }},[elementDate,props])
    let labels=[],sumData=[]
    for (let informArrayElement of informArray) {
        labels.push(informArrayElement[1])
        sumData.push(informArrayElement[0])
    }
    const data={
        labels,
        datasets:[
            {
                label: "",
                data:sumData,
                borderSkipped:true,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                maxBarThickness: 25,
            },

        ]
    }
    const options = {
        aspectRatio:2.2,
        indexAxis: 'y',
        // layout:{
        //     padding: {
        //         bottom:-10,
        //     }
        // },
        scales:{
            x:{
                display:true,
                reverse:false,
                grid:{
                    display:true,
                },
                ticks:{
                    // color: "blue",
                    display:true,
                    callback: value=>value+" VNĐ"
                },
            },
            y:{
                display:true,
                grid:{
                   display:false
                },
                // suggestedMin: 50,
                // suggestedMax: 100
            }
        },
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                display:false,
                labels:{
                    boxWidth:10,
                },
                position: 'right',
            },
            title: {
                padding: {
                    top:10
                },
                display: true,
                text: 'Số tiền chi theo từng ví ngày '+elementDate,
            },
        },
    }

    return(<>
        {informArray.length>0&& <div style={{width: "500px",height: "245px", position: "absolute", top: "0px", left: "100.5%", backgroundColor: "blanchedalmond"}}>
            <Bar options={options} data={data}/>
        </div>}
    </>)
}
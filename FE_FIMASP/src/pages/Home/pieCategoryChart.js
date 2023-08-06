import {useEffect, useState} from "react";
import axios from "axios";
import {ArcElement, Chart, DoughnutController, Legend, PieController, Tooltip} from "chart.js";
import {Doughnut, Pie} from "react-chartjs-2";
Chart.register(DoughnutController, ArcElement,PieController,Legend,Tooltip)
export default function PieCategoryChart({elementDate,props}){
    const [informExArray,setInformExArray]=useState([])
    const [informInArray,setInformInArray]=useState([])
    let idUser=localStorage.getItem("id")

    useEffect(()=>{
    if (elementDate!==""){
    axios.get(`http://localhost:8080/user${idUser}/cashes/ex/category/${elementDate}/${elementDate}`).then((req)=>{
        setInformExArray(req.data)
    })
    axios.get(`http://localhost:8080/user${idUser}/cashes/in/category/${elementDate}/${elementDate}`).then((req)=>{
        setInformInArray(req.data)
    })
}else {
        setInformExArray([])
        setInformInArray([])
    }},[elementDate,props])
    let exLabels=[],exData=[],sumExCategory=0;
    let inLabels=[],inData=[],sumInCategory=0
    for (let informExArrayElement of informExArray) {
        exLabels.push(informExArrayElement.name)
        exData.push(informExArrayElement.money)
        sumExCategory+=+informExArrayElement.money
    }
    for (let informInArrayElement of informInArray) {
        inLabels.push(informInArrayElement.name)
        inData.push(informInArrayElement.money)
        sumInCategory+=+informInArrayElement.money
    }
    const exPieData={
        labels:exLabels,
        datasets:[
            {
                data:exData,
                backgroundColor:["yellow","red","green"]
            }
        ]
    }
    const exOption={
        layout:{
            padding: 10
        },
        plugins:{
            legend: {
                labels:{
                  boxWidth:10,
                },
                position: 'right',
            },
            title:{
                padding: {
                    top:10,
                    bottom:-20
                },
                display: true,
                text: "Biểu đồ khoản chi tiêu theo chủ đề ngày "+elementDate
            }
        }
    }
    const inPieData={
        labels:inLabels,
        datasets:[
            {
                data:inData,
                backgroundColor:["#36a2eb","#ff6384","#4bc0c0","#ffcd56","#ff9f40"]
            }
        ]
    }
    const inOption={
        layout:{
            padding: 10
        },
        plugins:{
            legend: {
                labels:{
                    boxWidth:10,
                },
                position: 'right',
            },
            title:{
                padding: {
                    top:10,
                    bottom:-20
                },
                display: true,
                text: "Biểu đồ khoản thu theo chủ đề ngày "+elementDate
            }
        }
    }
    return(
        <>
            {informExArray.length>0&&<div style={{display: "inline-block",border:"1px solid white",backgroundColor:"rgb(245 222 235)",width:"21%"}}>
                <div >
                <Doughnut options={exOption} data={exPieData}></Doughnut>
                </div>
                    {/*<table style={{border:"1px solid"}}>*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>Chủ đề chi tiêu</th>*/}
                    {/*        <th>Phần trăm</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    {informExArray.map(element=>{*/}
                    {/*        return (*/}
                    {/*            <tr key={element.name}>*/}
                    {/*                <td>{element.name}</td>*/}
                    {/*                <td>{Math.round((+element.money)/sumExCategory*100)}%</td>*/}
                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*    </tbody>*/}
                    {/*    <tfoot></tfoot>*/}
                    {/*</table>*/}

            </div>}
            {informInArray.length>0&&<div style={{display: "inline-block",border:"1px solid white",backgroundColor:"rgb(225 243 232)",width:"20%",height:"253px"}}>
                <div>
                    <Doughnut options={inOption} data={inPieData}></Doughnut>
                </div>
                    {/*<table style={{border:"1px solid"}}>*/}
                    {/*    <thead>*/}
                    {/*    <tr>*/}
                    {/*        <th>Chủ đề khoản thu</th>*/}
                    {/*        <th>Phần trăm</th>*/}
                    {/*    </tr>*/}
                    {/*    </thead>*/}
                    {/*    <tbody>*/}
                    {/*    {informInArray.map(element=>{*/}
                    {/*        return (*/}
                    {/*            <tr key={element.name}>*/}
                    {/*                <td>{element.name}</td>*/}
                    {/*                <td>{Math.round((+element.money)/sumInCategory*100)}%</td>*/}
                    {/*            </tr>*/}
                    {/*        )*/}
                    {/*    })}*/}
                    {/*    </tbody>*/}
                    {/*    <tfoot></tfoot>*/}
                    {/*</table>*/}

            </div>}
        </>)
}
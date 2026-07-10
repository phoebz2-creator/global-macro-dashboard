import React from "react";
import ReactECharts from "echarts-for-react";


function MarketChart({ country }) {


  const option = {

    backgroundColor: "transparent",


    tooltip: {
      trigger: "axis"
    },


    grid: {
      left: "5%",
      right: "5%",
      top: "15%",
      bottom: "15%"
    },


    xAxis: {
      type: "category",
      data: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun"
      ],

      axisLine:{
        lineStyle:{
          color:"#555"
        }
      },

      axisLabel:{
        color:"#aaa"
      }
    },


    yAxis: {

      type:"value",

      axisLabel:{
        color:"#aaa"
      },

      splitLine:{
        lineStyle:{
          color:"#222"
        }
      }

    },


    series:[
      {

        name: country,

        type:"line",

        smooth:true,

        data:
country.chartData
,


        lineStyle:{
          color:"#f5b82e",
          width:3
        },


        itemStyle:{
          color:"#f5b82e"
        }

      }
    ]

  };


  return (

    <div>

      <h2>
      📈 {country.stockIndex} Trend
      </h2>


      <ReactECharts
        option={option}
        style={{
          height:"300px",
          width:"100%"
        }}
      />


    </div>

  )


}


export default MarketChart;
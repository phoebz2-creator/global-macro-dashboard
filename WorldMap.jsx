import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";


function WorldMap({
    economicData,
    onCountryClick
    }) {

  const [loaded, setLoaded] = useState(false);


  useEffect(() => {

    fetch(
      "https://raw.githubusercontent.com/apache/echarts-examples/master/public/data/asset/geo/world.json"
    )

    .then(res => res.json())

    .then(data => {

      echarts.registerMap(
        "world",
        data
      );

      setLoaded(true);

    });


  }, []);



  const option = {

    backgroundColor:"#101010",


    tooltip:{
      trigger:"item"
    },


    series:[

      {

        type:"map",

        map:"world",

        roam:true,

        selectedMode: "single",



        itemStyle:{

          areaColor:"#1c1c1c",

          borderColor:"#555"

        },


        emphasis:{

          itemStyle:{

            areaColor:"#f5b942"

          }

        },


        data:[

          {
            name:"United States",
            value:100
          },

          {
            name:"China",
            value:90
          },

          {
            name:"Japan",
            value:80
          }

        ]

      }

    ]

  };


  if(!loaded){

    return (
      <div
        style={{
          color:"#777",
          textAlign:"center",
          paddingTop:"120px"
        }}
      >
        Loading world map...
      </div>
    )

  }



  return (

    <ReactECharts
    
    onEvents={{
    
      click:(params)=>{
    
        if(onCountryClick){
    
          onCountryClick(params.name)
    
        }
    
      }
    
    }}
    

      option={option}

      style={{
        height:"350px",
        width:"100%"
      }}

    />

  );


}


export default WorldMap;
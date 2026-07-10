import './App.css'
import WorldMap from './WorldMap'
import MarketChart from "./MarketChart";
import { useState, useEffect } from "react";
import countriesData from "./countriesData";
import { getCountryEconomicData } from "./services/worldBankAPI";
import { formatGDPData } from "./services/dataFormatter";
import companyData from "./companyData";
import companyExtra from "./companyExtra";
import countriesExtra from "./countriesExtra";
import macroSignals from "./macroSignals";
import {getSignalColor} from "./signalHelper";
import marketHeatmap from "./marketHeatmap";
import {
  getEconomicProfile
  }
  from "./services/economicService";
  import {
    getInflation
    }
    from "./services/inflationService";
  import {
    getAllCountries
    } from "./services/countryService";
    import {
      getGlobalEconomicData
      } from "./services/globalEconomicService";
  import countryCodeMap from "./countryCodeMap";

  function App() {


    const [selectedCountry, setSelectedCountry] =
    useState("United States");

    const [countryMap,setCountryMap]
=
useState({});

const [
  globalEconomicData,
  setGlobalEconomicData
  ]
  =
  useState([]);
    
    
    const [economicData, setEconomicData] =
    useState(null);

    const [inflationData,setInflationData]
=
useState(null);
    
    
    const [realGDP, setRealGDP] =
    useState(null);
    
    
    const [selectedCompany, setSelectedCompany] =
    useState(null);
    
    
    
    useEffect(()=>{


      const code =
      countryMap[selectedCountry];
      
      
      if(!code){
      return;
      }
      
      
      // Real GDP
      
      getCountryEconomicData(code)
      .then(data=>{
      
      
      const formatted =
      formatGDPData(data);
      
      
      setRealGDP(formatted);
      
      
      })
      .catch(err=>{
      console.log("GDP API ERROR:",err);
      });
      
      
      
      // Economic Profile
      
      getEconomicProfile(code)
      .then(data=>{
      
      
      console.log(
      "WORLD BANK ECONOMIC PROFILE:",
      data
      );
      
      
      setEconomicData(data);

      getInflation(code)
.then(data=>{


console.log(
"INFLATION DATA:",
data
);


setInflationData(data);


});
      
      
      })
      .catch(err=>{
      console.log("PROFILE API ERROR:",err);
      });
      
      
      },[selectedCountry,countryMap]);

      useEffect(()=>{


        getAllCountries()
        .then(data=>{
        
        
        console.log(
        "GLOBAL COUNTRY MAP:",
        data
        );
        
        
        setCountryMap(data);
        
        
        });
        
        
        },[]);

        useEffect(()=>{


          if(
          Object.keys(countryMap).length===0
          ){
          return;
          }
          
          
          
          const countries =
          Object.entries(countryMap)
          .map(
          ([name,code])=>({
          
          name,
          code
          
          })
          );
          
          
          
          getGlobalEconomicData(countries)
          .then(data=>{
          
          
          console.log(
          "GLOBAL ECONOMIC DATA:",
          data
          );
          
          
          setGlobalEconomicData(data);
          
          
          });
          
          
          },[countryMap]);
    
    
    const companyInfo =
    companyExtra[selectedCompany] || null;
    
    
    
    const allCountries = {
    
    ...countriesData,
    
    ...countriesExtra
    
    };

  const country =
  allCountries[selectedCountry] ||{

  flag:"🌍",
  
  gdp:"N/A",
  
  cpi:"N/A",
  
  policyRate:"N/A",
  
  bondYield:"N/A",
  
  stockIndex:"N/A",
  
  stockValue:"N/A",
  
  companies:[]
  
  };

  const signals =
macroSignals[selectedCountry];
const gdpRanking =
[...globalEconomicData]
.sort(
(a,b)=>
(b.growth || 0)
-
(a.growth || 0)
)
.slice(0,10);



const incomeRanking =
[...globalEconomicData]
.sort(
(a,b)=>
(b.perCapita || 0)
-
(a.perCapita || 0)
)
.slice(0,10);
countriesData["United States"];

  return (
    <div className="dashboard">

      {/* 左侧菜单 */}
      <aside className="sidebar">

        <div className="logo">
          ◉ Momentum
        </div>

        <nav>
          <div className="menu active">
            🌎 Global Markets
          </div>

          <div className="menu">
            📊 Alpha Picks
          </div>

          <div className="menu">
            📰 Finance News
          </div>

          <div className="menu">
            💻 Tech News
          </div>

          <div className="menu">
            🌐 Geopolitics
          </div>

          <div className="menu">
            📈 Macro Research
          </div>

        </nav>

      </aside>


      {/* 主区域 */}
      <main className="main">


        {/* 顶部 */}
        <header className="topbar">

          <h1>
            Global Markets
          </h1>

          <div className="ticker">

          <span
className={
allCountries[selectedCountry].marketChange.includes("▲")
?
"positive"
:
"negative"
}
>

{allCountries[selectedCountry].stockIndex}

{" "}

{allCountries[selectedCountry].marketChange}

</span>


<span className="positive">

Gold ▲0.30%

</span>


<span className="negative">

Oil ▼1.22%

</span>

</div>

        </header>


        {/* 地图区域占位 */}
        <section className="map-box">

          <h2>
            🌎 World Economic Map
          </h2>


          <WorldMap

economicData={globalEconomicData}

onCountryClick={(country)=>{

setSelectedCountry(country);

}}

/>


        </section>

        <section className="chart-box">

<MarketChart 
country={country}
/>

</section>

        {/* 数据卡片 */}
        <section className="cards">


        <div className="card">

<h3>
🌎 Economic Fundamentals
</h3>


<p>
GDP Growth:

{
economicData
?
economicData.growth?.toFixed(2)+"%"
:
"Loading..."
}
</p>

<p>
Real GDP:

{
economicData
?
"$"+(economicData.gdp/1000000000000).toFixed(2)+"T"
:
"Loading..."
}

</p>


<p>
GDP Per Capita:

{
economicData
?
"$"+
Math.round(
economicData.perCapita
).toLocaleString()
:
"Loading..."
}
</p>


<p>

CPI Inflation:

{
inflationData
?
inflationData.inflation?.toFixed(2)+"%"
:
"Loading..."
}

</p>


<p>
Unemployment:

{
economicData
?
economicData.unemployment?.toFixed(2)+"%"
:
"Loading..."
}
</p>


</div>



          <div className="card">

            <h3>
              📈 Market Overview
            </h3>

            <p>
{country.stockIndex}: {country.stockValue}
</p>

<p>
Daily Change:
{country.marketChange}
</p>

<h4>
Major Companies
</h4>

{
country.companies.map((company)=>(

<button
  key={company}
  className="company-btn"
  onClick={()=>setSelectedCompany(company)}
>

{company}

</button>

))
}

          </div>



          <div className="card">

<h3>
🛢 Commodities
</h3>


<p>
Gold:
{country.commodities.gold}
</p>


<p>
Oil:
{country.commodities.oil}
</p>


</div>

<div className="card">

<h3>
⚠️ Macro Signals
</h3>


<p>
Inflation:

<span
className={
getSignalColor(signals?.inflation)
}
>

{signals?.inflation}

</span>

</p>


<p>
Interest Rate:

<span
className={
getSignalColor(signals?.rates)
}
>

{signals?.rates}

</span>

</p>


<p>
Market Sentiment:

<span
className={
getSignalColor(signals?.sentiment)
}
>

{signals?.sentiment}

</span>

</p>


<p>
Currency:

<span
className={
getSignalColor(signals?.currency)
}
>

{signals?.currency}

</span>

</p>


</div>

</section>

<section className="ranking">


<h2>
🌍 Global Economic Ranking
</h2>


<div className="ranking-grid">


<div className="card">

<h3>
📈 GDP Growth
</h3>


{
gdpRanking
.map(
(item)=>(
<p key={item.country}>

{item.flag}
{" "}
{item.country}

:

{item.growth?.toFixed(2)}%

</p>
)
)

}


</div>




<div className="card">


<h3>
💰 GDP Per Capita
</h3>


{
incomeRanking
.map(
(item)=>(
<p key={item.country}>

{item.flag}
{" "}
{item.country}

:

${Math.round(item.perCapita).toLocaleString()}

</p>
)
)

}


</div>


</div>


</section>


        <section className="heatmap">


<h2>
🌐 Global Market Heatmap
</h2>


<div className="heatmap-grid">


{
marketHeatmap.map(
(item)=>(


<div
key={item.country}
className={
item.change >= 0
?
"market-box positive"
:
"market-box negative"
}
>


<h3>
{item.flag}
{" "}
{item.country}
</h3>


<p>
{
item.change >=0
?
"▲"
:
"▼"
}

{Math.abs(item.change)}%

</p>


</div>


)

)


}


</div>


</section>

        {
selectedCompany && (

<div className="company-detail">

<h2>
🏢 {selectedCompany}
</h2>


<p>
Ticker:
{companyData[selectedCompany].ticker}
</p>


<p>
Country:
{companyData[selectedCompany].country}
</p>


<p>
Sector:
{companyData[selectedCompany].sector}
</p>


<p>
Market Cap:
{companyData[selectedCompany].marketCap}
</p>


<p>
Stock Price:
{companyData[selectedCompany].price}
</p>

{
companyInfo && (

<div className="company-extra">


<h4>
Financial Snapshot
</h4>


<p>
Revenue Growth:
{companyInfo.revenueGrowth}
</p>


<p>
P/E Ratio:
{companyInfo.peRatio}
</p>


<p>
Dividend Yield:
{companyInfo.dividend}
</p>



<h4>
Business Focus
</h4>


{
companyInfo.focus.map(
(item)=>(
<p key={item}>
• {item}
</p>
)
)
}


</div>

)
}


<button
onClick={()=>setSelectedCompany(null)}
>
Close
</button>


</div>

)
}


      </main>


    </div>
  )
}


export default App
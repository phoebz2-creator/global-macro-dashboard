const WORLD_BANK_API =
"https://api.worldbank.org/v2/country";


// CPI Inflation
// Indicator: FP.CPI.TOTL.ZG

export async function getInflation(countryCode){


const response =
await fetch(
`${WORLD_BANK_API}/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json`
);


const data =
await response.json();


// 最新非空年份

const latest =
data[1]
.find(
(item)=>item.value !== null
);


return {


countryCode,

inflation:
latest
?
latest.value
:
null,


year:
latest
?
latest.date
:
null


};


}
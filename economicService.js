import { getIndicatorData } 
from "./worldBankAPI";



async function getLatestValue(
countryCode,
indicator
){

const data =
await getIndicatorData(
countryCode,
indicator
);


if(
!data ||
!data[1] ||
!data[1][0]
){

return null;

}


return data[1][0].value;

}



export async function getEconomicProfile(
countryCode
){


const [

gdp,

growth,

perCapita,

inflation,

unemployment

] = await Promise.all([


getLatestValue(
countryCode,
"NY.GDP.MKTP.CD"
),


getLatestValue(
countryCode,
"NY.GDP.MKTP.KD.ZG"
),


getLatestValue(
countryCode,
"NY.GDP.PCAP.CD"
),


getLatestValue(
countryCode,
"FP.CPI.TOTL.ZG"
),


getLatestValue(
countryCode,
"SL.UEM.TOTL.ZS"
)


]);



return {


countryCode,


gdp,

growth,

perCapita,

inflation,

unemployment


};


}
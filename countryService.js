const WORLD_BANK_COUNTRY_API =
"https://api.worldbank.org/v2/country?format=json&per_page=400";



export async function getAllCountries(){

try{


const response =
await fetch(WORLD_BANK_COUNTRY_API);



const data =
await response.json();



const countries =
data[1];



const countryMap = {};



countries.forEach(country=>{


if(country.region.value !== "Aggregates"){


countryMap[country.name] =
country.id;


}


});



return countryMap;


}catch(error){


console.error(
"COUNTRY API ERROR:",
error
);


return {};


}


}
const WORLD_BANK_URL =
"https://api.worldbank.org/v2";


export async function getCountryEconomicData(countryCode){

  try{

    const response =
await fetch(
`${WORLD_BANK_URL}/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&date=2023`
);


if(!response.ok){

console.log(
"World Bank request failed:",
countryCode
);

return null;

}


    const data =
    await response.json();


    return data;


  }catch(error){

    console.error(
      "World Bank API Error:",
      error
    );


    return null;

  }

}

getCountryEconomicData("USA")
.then(data=>{
  console.log(data);
});

export async function getIndicatorData(
    countryCode,
    indicator
    ){
    
    try{
    
    
    const response =
    await fetch(
    
    `${WORLD_BANK_URL}/country/${countryCode}/indicator/${indicator}?format=json`
    
    );
    
    
    const data =
    await response.json();
    
    
    return data;
    
    
    }catch(error){
    
    console.error(
    "World Bank API Error:",
    error
    );
    
    
    return null;
    
    }
    
    
    }
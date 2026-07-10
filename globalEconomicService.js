import {
    getEconomicProfile
    } from "./economicService";
    
    
    import {
    getInflation
    } from "./inflationService";
    
    
    
    export async function getGlobalEconomicData(countries){
    
    
    const requests =
    countries.map(
    async(country)=>{
    
    
    try{
    
    
    const profile =
    await getEconomicProfile(
    country.code
    );
    
    
    
    const inflation =
    await getInflation(
    country.code
    );
    
    
    
    return {
    
    
    country:
    country.name,
    
    
    code:
    country.code,
    
    
    gdp:
    profile?.gdp || null,
    
    
    growth:
    profile?.growth || null,
    
    
    perCapita:
    profile?.perCapita || null,
    
    
    inflation:
    inflation?.inflation || null,
    
    
    unemployment:
    profile?.unemployment || null
    
    
    };
    
    
    }
    
    catch(error){
    
    
    console.log(
    "FAILED:",
    country.name
    );
    
    
    return null;
    
    
    }
    
    
    });
    
    
    const results =
    await Promise.all(requests);
    
    
    
    return results.filter(
    (item)=>item !== null
    );
    
    
    }
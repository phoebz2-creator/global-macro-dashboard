export function formatGDPData(apiData){

    if(!apiData || !apiData[1]){
      return null;
    }
  
  
    const latest =
    apiData[1][0];
  
  
    return {
  
      value:
      latest.value,
  
  
      year:
      latest.date
  
    };
  
  }
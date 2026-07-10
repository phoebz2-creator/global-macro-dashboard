export function getSignalColor(value){


    if(
    value === "Cooling" ||
    value === "Bullish" ||
    value === "Strong" ||
    value === "Positive"
    ){
    return "green";
    }
    
    
    if(
    value === "Stable" ||
    value === "Neutral" ||
    value === "Moderate"
    ){
    return "yellow";
    }
    
    
    return "red";
    
    
    }
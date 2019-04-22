//var data;
//var file="csv/VD_sample.csv";
var file="csv/meraki_networks.csv";
//var file="csv/VD_networks.csv";
var found = false;
var br="<br>";
var ignorar = [];
var dataCSV = [];
var spanred = "<span class=\"badge badge-pill badge-danger text-white\">";
var spanend = "</span>";
function loadJSON() {
    ignorar=(exceptions);
    
}
function load() {
    data = loadCSV();
    
    //checkUN(dataCSV);
    //console.log(ignorar[0].name);
    //alert(ignorar[0].name);    
    //console.log(myArray);
    
    
    
}

function loadCSV(){
var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                data = $.csv.toObjects(allText);
                //console.log(data);
                data.length = data.length-1;
                processData(data);
            }
        }
    }
    rawFile.send(null);
    
}

function processData(dataCSV){
    //console.log(dataCSV);
    
    //console.log(dataCSV.length);
    
    console.log("tamanho do array: "+dataCSV.length)
   
        for (var j = 0; j < ignorar.length; j++) {
            for(var i = 0; i < dataCSV.length; i++){

                if (((dataCSV[i].Name===ignorar[j].name))) {
                    //console.log(j+"-"+ignorar[j].name);
                    //console.log(i+"-"+dataCSV[i].Name);                   
                    //console.log(ignorar[j].name+"|"+dataCSV[i].Name);                    
                    dataCSV.splice(i,1);
                    //console.log("---------------------------");
                }
            } 
            
		}
    //console.log(dataCSV);
    console.log("tamanho do array após redução: "+dataCSV.length);
    checkPrimaryCodes(dataCSV);
    checkArea(dataCSV);
    checkSector(dataCSV);
    checkCode(dataCSV);
    checkState(dataCSV);
    checkDepartment(dataCSV);
}

function checkPrimaryCodes(dadosCSV){
    //check for wrong PrimaryCodes(B,Q,T,E)
    console.log("=Check PrimaryCodes");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name;
        var pc=str.substring(0,1);        
        if ((pc != "B") && (pc != "Q") && (pc != "T") && (pc != "E")) {            
            console.log("Check PrimaryCodes: "+pc+"="+str);
            if (pc.includes(" ")){
                console.log(pc+" contém espaços em branco");
                result = result+spanred+pc+spanend+" - "+str+" contém espaço(s) em branco no inicio"+br;
            }else{
                result = result+spanred+pc+spanend+" - "+str+br;
            }
            
        }
    }
    document.getElementById("resultPC").innerHTML = result;
}

function checkArea(dadosCSV){
    //check for wrong Area(LJ, QS, ER, R)
    console.log("=Check Area");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        str=str.substring(str.indexOf("-")+1);        
        var area=str.substring(0,2);
        //console.log(str);
        if ((area != "LJ") && (area != "QS") && (area != "ER") && (area != "R")) {
            console.log("Check Area:"+str+" = "+area);
            result = result+spanred+area+spanend+" - "+str+br;
        }        
    }
    document.getElementById("resultArea").innerHTML = result;
}

function checkSector(dadosCSV){
    //check for wrong clube(CO, CP, CS, ES, EP, AM, AS)
    console.log("=Check Sector");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1); 
        var sector=str.substring(0,str.indexOf("-"));
        //console.log(str);
        if ((sector != "CO") && (sector != "CP") && (sector != "CS") && (sector != "ES") && (sector != "EP") && (sector != "AM") && (sector != "AS")) {
            //console.log("Check Sector:"+str+" = "+sector);
            if (sector.includes(" ")) {
                console.log(sector+" contém espaços em branco");
                result = result+spanred+sector+spanend+" - "+str2+" contém espaço(s) em branco"+br;
            }else{
                console.log(sector+"="+str2);
                result = result+spanred+sector+spanend+" - "+str2+br;
            }
            
        }        
    }
    document.getElementById("resultSector").innerHTML = result;

}

function checkCode(dadosCSV){
    //check for wrong codigo loja (XXXXXXX)
    console.log("=Check code");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        var cod=str.substring(0,7);  
        var jc="JC";
        var jl="JL";
        if (isNaN(cod*1) && (!cod.includes(jc)) && (!cod.includes(jl))) {
            console.log(cod*1);            
            console.log("Check code:"+str2+" = "+cod);
            result = result+spanred+cod+spanend+" - "+str2+br;
        }        
    }
    document.getElementById("resultCode").innerHTML = result;
}

function checkState(dadosCSV){
    //check for wrong  State (XX)
    console.log("=Check State");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        var st=str.substring(0,2);  
        
        if ((st != "PR") && (st != "SC") && (st != "RS") && (st != "SP") && (st != "RJ")&& (st != "ES")&& (st != "MG")&& (st != "MS")&& (st != "MT")&& (st != "GO")&& (st != "AC")&& (st != "AM")&& (st != "TO")&& (st != "PE")&& (st != "PB")&& (st != "CE")&& (st != "SE")&& (st != "MA")&& (st != "DF")&& (st != "PI")&& (st != "BA")&& (st != "AL")&& (st != "RR")&& (st != "RN")&& (st != "PA")&& (st != "AP")&& (st != "RO")) {
            console.log(st);
            console.log("Check st:"+str2+" = "+st);
            result = result+spanred+st+spanend+" - "+str2+br;
            if ((st.includes("-")) || (st.length !== 2)) {
                console.log(st);
                console.log("Check State:"+str2+" = "+st);
                result = result+spanred+st+spanend+" - "+str2+br;
            }    
        }
            
    }
    document.getElementById("resultState").innerHTML = result;
}

function checkDepartment(dadosCSV){
    //check for wrong  Department (EE, FF, EF, FE)
    console.log("=Check Department");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        var dpt=str.substring(0);  
        
        if (((dpt != "EE") && (dpt != "FF") && (dpt != "EF") && (dpt != "FE"))) {
            //console.log(dpt);
            if (dpt.includes(" ") && dpt.length == 3) {
                //console.log("Check Department:"+str2+" = "+dpt+" contém espaços em branco no final");
                result = result+spanred+dpt+spanend+" - "+str2+" contém espaço(s) em branco no final"+br;
            }else{
                //console.log("Check Department:"+str2+" = "+dpt);
                result = result+spanred+dpt+spanend+" - "+str2+br;
            }
            
            
        }        
    }
    document.getElementById("resultDepartment").innerHTML = result;
}

function limpar(){
    location.reload();
    window.location.reload(true);   
}
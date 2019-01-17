//var data;
//var file="csv/VD_sample.csv";
var file="csv/Boticario_VD_networks.csv";
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
    checkUN(dataCSV);
    checkTPV(dataCSV);
    checkClube(dataCSV);
    checkCodLoja(dataCSV);
    checkUF(dataCSV);
    checkLink(dataCSV);
}

function checkUN(dadosCSV){
    //check for wrong UN(B,Q,T,E)
    console.log("=Check UN");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name;
        var un=str.substring(0,1);        
        if ((un != "B") && (un != "Q") && (un != "T") && (un != "E")) {            
            console.log("Check UN: "+un+"="+str);
            if (un.includes(" ")){
                console.log(un+" contém espaços em branco");
                result = result+spanred+un+spanend+" - "+str+" contém espaço(s) em branco"+br;
            }else{
                result = result+spanred+un+spanend+" - "+str+br;
            }
            
        }
    }
    document.getElementById("resultUN").innerHTML = result;
}

function checkTPV(dadosCSV){
    //check for wrong TPV(LJ, QS, ER, R)
    console.log("=Check Tipo Ponto de Vendas");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        str=str.substring(str.indexOf("-")+1);        
        var tpv=str.substring(0,2);
        //console.log(str);
        if ((tpv != "LJ") && (tpv != "QS") && (tpv != "ER") && (tpv != "R")) {
            console.log("Check TPV:"+str+" = "+tpv);
            result = result+spanred+tpv+spanend+" - "+str+br;
        }        
    }
    document.getElementById("resultTPV").innerHTML = result;
}

function checkClube(dadosCSV){
    //check for wrong clube(CO, CP, CS, ES, EP, AM, AS)
    console.log("=Check clube");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1); 
        var club=str.substring(0,str.indexOf("-"));
        //console.log(str);
        if ((club != "CO") && (club != "CP") && (club != "CS") && (club != "ES") && (club != "EP") && (club != "AM") && (club != "AS")) {
            //console.log("Check clube:"+str+" = "+club);
            if (club.includes(" ")) {
                console.log(club+" contém espaços em branco");
                result = result+spanred+club+spanend+" - "+str2+" contém espaço(s) em branco"+br;
            }else{
                console.log(club+"="+str2);
                result = result+spanred+club+spanend+" - "+str2+br;
            }
            
        }        
    }
    document.getElementById("resultClube").innerHTML = result;

}

function checkCodLoja(dadosCSV){
    //check for wrong codigo loja (XXXXXXX)
    console.log("=Check cod.loja");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        var codl=str.substring(0,7);  
        var jc="JC";
        var jl="JL";
        if (isNaN(codl*1) && (!codl.includes(jc)) && (!codl.includes(jl))) {
            console.log(codl*1);            
            console.log("Check cod.loja:"+str2+" = "+codl);
            result = result+spanred+codl+spanend+" - "+str2+br;
        }        
    }
    document.getElementById("resultCodLoja").innerHTML = result;
}

function checkUF(dadosCSV){
    //check for wrong  UF (XX)
    console.log("=Check UF");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        var uf=str.substring(0,2);  
        
        if ((uf != "PR") && (uf != "SC") && (uf != "RS") && (uf != "SP") && (uf != "RJ")&& (uf != "ES")&& (uf != "MG")&& (uf != "MS")&& (uf != "MT")&& (uf != "GO")&& (uf != "AC")&& (uf != "AM")&& (uf != "TO")&& (uf != "PE")&& (uf != "PB")&& (uf != "CE")&& (uf != "SE")&& (uf != "MA")&& (uf != "DF")&& (uf != "PI")&& (uf != "BA")&& (uf != "AL")&& (uf != "RR")&& (uf != "RN")&& (uf != "PA")&& (uf != "AP")&& (uf != "RO")) {
            console.log(uf);
            console.log("Check UF:"+str2+" = "+uf);
            result = result+spanred+uf+spanend+" - "+str2+br;
            if ((uf.includes("-")) || (uf.length !== 2)) {
                console.log(uf);
                console.log("Check UF:"+str2+" = "+uf);
                result = result+spanred+uf+spanend+" - "+str2+br;
            }    
        }
            
    }
    document.getElementById("resultUF").innerHTML = result;
}

function checkLink(dadosCSV){
    //check for wrong  Link (EE, FF, EF, FE)
    console.log("=Check Link");
    var result="";
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name; 
        var str2=str;
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        str=str.substring(str.indexOf("-")+1);
        var link=str.substring(0);  
        
        if (((link != "EE") && (link != "FF") && (link != "EF") && (link != "FE"))) {
            //console.log(link);
            if (link.includes(" ") && link.length == 3) {
                //console.log("Check Link:"+str2+" = "+link+" contém espaços em branco no final");
                result = result+spanred+link+spanend+" - "+str2+" contém espaço(s) em branco no final"+br;
            }else{
                //console.log("Check Link:"+str2+" = "+link);
                result = result+spanred+link+spanend+" - "+str2+br;
            }
            
            
        }        
    }
    document.getElementById("resultLink").innerHTML = result;
}

function limpar(){
    location.reload();
    window.location.reload(true);   
}
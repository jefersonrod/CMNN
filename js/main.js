//var data;
var file="csv/VD_sample.csv";
//var file="csv/VD_networks.csv";
var found = false;
var ignorar = [];
//var dataCSV = [];
function loadJSON() {
    ignorar=(exceptions);
    
}
function load() {
    data = loadCSV();
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
    for(var i = 0; i < dataCSV.length; i++)       
		{
            for (var j = 0; j < ignorar.length; j++) {
                if (dataCSV[i].Name === ignorar[j].name) {
                    console.log(i+" = "+dataCSV[i].Name+" / "+ignorar[j].name);
                    dataCSV.splice(i,1);
                }
            } 
		}
    console.log(dataCSV);
    console.log("tamanho do array após redução: "+dataCSV.length);
    checkUN(dataCSV);
}

function checkUN(dadosCSV){
    for (let i = 0; i < dadosCSV.length; i++) {
        var str=dadosCSV[i].Name;
        var un=str.substring(0,1);
        if ((un != "B") && (un != "Q") && (un != "T")) {
            console.log(str);
        }
    }
}
var file="csv/Boticario_VD_networks.csv";
var ignore= ["Modelo_MX64_BL_3G", 
            "Modelo_MX65_BL_3G", 
            "Modelo_Eudora_MX65_BL_BL", 
            "LAB_ELSYS", 
            "Modelo_MX65_MPLS_BL", 
            "Modelo_MX65_MPLS_3G", 
            "CORE_CTX_VERDE", 
            "CORE_CTX_AM", 
            "CORE_CTX_AMARELO_OLD", 
            "LAB_AM"]
var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var data = $.csv.toObjects(allText);
                //console.log(data);
                processData(data);
            }
        }
    }
    rawFile.send(null);


function processData(dataCSV){
    //console.log(dataCSV);
    
    //console.log(dataCSV.length);
    var count = 0;
    for(var i = 0; i < dataCSV.length; i++)       
		{
            var str=dataCSV[i].Name;
            var un=str.substring(0,1);
            for (let j = 0; j < ignore.length; j++) {
                if (str !== ignore[j]) {
                    console.log(str);
                    console.log(ignore[j]);
                    count = count+1;       
                }
            }

		}
    
}


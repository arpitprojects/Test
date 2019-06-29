function loadFileAsText(){
    let max_dis = 0;let arr =[];
    const markers = [];
    var fileToLoad = document.getElementById("get-file1").files[0];
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        var textFromFileLoaded = fileLoadedEvent.target.result;
        // Got the xml file.
        // console.log(xml2json(textFromFileLoaded , 2));
        let count = 0;
        if (window.DOMParser)
        {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(textFromFileLoaded, "text/xml");
            let parsedXml =  xmlDoc.getElementsByTagName("trk")[0].getElementsByTagName("trkseg")[0].childNodes;
            console.log(parsedXml);
            // http = xmlHt
            for(let i=1;i<parsedXml.length; i = i+2){
                let temp_dis = 0;
                const parsedContent = parseFloat(parsedXml[i].childNodes[1].innerHTML);
               
                const lat = parsedXml[i].attributes[0].nodeValue;
                
                const lng = (parsedXml[i].attributes[1].nodeValue);
                
                markers.push([lat , lng])

                if(parsedXml[i + 2]){    
                    const lngD =  (parsedXml[i + 2].attributes[1].nodeValue);
                    const latD = parsedXml[i + 2].attributes[0].nodeValue;
                    temp_dis = distance(lat , lng , latD , lngD , 'K');
                }
                arr.push(parsedContent);
                max_dis = max_dis + temp_dis;

        
                count++;
                if(count === parsedXml.length)break;
            }
            //arr has elevation
            const minEle = Math.min.apply(null , arr);
            const maxEle = Math.max.apply(null , arr);
            const TotalTime =  (new Date(parsedXml[1].childNodes[3].innerHTML));
            const TotalTime1 =  (new Date(parsedXml[parsedXml.length-2].childNodes[3].innerHTML));
            // let final_time = 
            // console.log((TotalTime1 - TotalTime)/(60*60*1000));
            document.getElementById('result').innerHTML = `
                <ul>
                <li>Min Elevation :`+minEle+` </li>
                <li>Max Elevation : `+maxEle+`</li>
                <li>Total Dis : `+max_dis +` Kms</li>
                <li>Average Speed : `+max_dis/((TotalTime1 - TotalTime)/(60*60*1000)) +` Kms/hrs</li>
                <li>Total Time Elapsed : `+((TotalTime1 - TotalTime)/(60*60*1000)) +` hrs</li>
                </ul>
            `;
            //Calling markers
            map(markers);
            map1(markers);
        }
    };
  
    fileReader.readAsText(fileToLoad, "UTF-8");
  }
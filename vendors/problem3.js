function getFile(){
    // console.log('Ok');
    var fileToLoad = document.getElementById("get-file2").files[0];
  
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
    var textFromFileLoaded = fileLoadedEvent.target.result;
        const arr = textFromFileLoaded.split("\n");
        for(let i=1;i<arr.length;i++){
            // We got one number
            let temp = [];let result= 0;
            for(let j=10;j<arr[i];j++){
                let otr = "";
                for(let o = 0;o<j.toString().length - 1;o++){
                    otr+=9;
                }
                // console.log(otr);
                // for(let k =0; k<=parseInt(otr);k++){
                //     let str = j.toString();
                //     console.log(k , j.toString().length)
                //     for(let m = 0; m < j.toString().length;m++){
                //         str.splice(m);
                //         console.log('Ok' , str);
                //         if(parseInt(str) + k === arr[i]){
                //             result++;
                //         }else{
                //             str = k.toString();
                //         }
                //     }
                // }
             
            }
            console.log(result);
            break;
        }    


    }  
    fileReader.readAsText(fileToLoad, "UTF-8"); 
}
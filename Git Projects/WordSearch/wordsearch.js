//const wordArr= ["January","February","March","April","May","June","July","August","September","October","November","December"];
const wordArr= ["jan","feb","march","april","may","june","july","aug","sep","oct","nov","dec"]
const randomChar='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const wordDisplay=["h","v","hr","vr","d","dr"]; 
var cellCoord=[];
const randCell='0123456789';
var col=10;
var row=10;

window.onload=function(){
    for (i=0;i<col;i++)
       for (j=0;j<row;j++)
          cellCoord.push(""+i+j);
    console.log("cellCoord  ",cellCoord);      
    drawTable(col,row);
    addWordsToTable();
};
function drawTable(col,row){
    var tdElement;
    var trElement;
    var rnd;
    var tableElement=document.getElementById("wordTable");
    for (let i=0;i<col;i++){
        trElement= document.createElement("tr");
        trElement.setAttribute("id","tr"+i)
        trElement.setAttribute("class","trClass");
        for (let j=0;j<row;j++){
            tdElement= document.createElement("td");
            rnd  = parseInt(Math.random()*randomChar.length);
            tdElement.setAttribute("id","td"+i+j);
            tdElement.setAttribute("class","tdClass");
            tdElement.textContent=randomChar.charAt(rnd);
            trElement.appendChild(tdElement);
        }
        tableElement.appendChild(trElement);  
    }  
}

function addWordsToTable(){
   var randWord; 
   var tmpCellCoord=cellCoord;
   var coord;
   var ranWord=[];
   var nextCondition=false;
   for (let i=0;i<3;i++)
      {   
        var j=0;  
        
        nextCondition=true;
        //Select a random cell to start the word 
        let tmpCoord = tmpCellCoord[Math.floor(Math.random() * tmpCellCoord.length)];  
        //Select the random word to display in the word grid
        let tmpRandWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        wordArr.splice(tmpRandWord,1);
        console.log(tmpRandWord);
        let coordX = parseInt(tmpCoord.charAt(0));
        let coordY = parseInt(tmpCoord.charAt(1));
        //top to bottom
        cond1:
        if ((col-1) - coordX > tmpRandWord.length)
          {
              console.log("top to bottom");
              var coord=[];
              for (let k=coordX;k<coordX+tmpRandWord.length;k++){
                tmp=""+k+coordY;
                if (tmpCellCoord.indexOf(tmp)== -1){
                  nextCondition=true;
                  break cond1;
                } 
                coord.push("td"+tmp);
              }
              nextCondition = false;
              for (let i=0;i<coord.length;i++)
              {
                tmpCellCoord.splice(tmpCellCoord.indexOf(coord[i]),1)
                document.getElementById(coord[i]).textContent=tmpRandWord.charAt(j); 
                j=j+1
              }
          }
         //bottom to top 
         cond2:
         if ((coordX - (tmpRandWord.length-1) >= 0) && nextCondition) 
         {   
            
            console.log("bottom to top");
             j=tmpRandWord.length-1;
             for (let k=coordX-(tmpRandWord.length-1);k>=coordX;k--){
               tmp=""+k+coordY;
               if (tmpCellCoord.indexOf(tmp)== -1){
                nextCondition = true;
                break cond2;
              } 
              coord.push("td"+tmp);
             }
             nextCondition=false; 
             for (let i=0;i<coord.length;i++)
              {
               tmpCellCoord.splice(tmpCellCoord.indexOf(coord[i]),1)   
               document.getElementById(coord[i]).textContent=tmpRandWord.charAt(j); 
               j=j-1;
              }  
         }
         //left to right
         cond3:
         if (((row-1) - coordY > tmpRandWord.length) && nextCondition)
         {
             console.log("left to right");
             for (let k=coordY;k<coordY+tmpRandWord.length;k++){
               tmp=""+coordX+k;
               if (tmpCellCoord.indexOf(tmp)== -1){
                nextCondition = true;
                break cond3;
               } 
              coord.push("td"+tmp);
             }
             nextCondition=false; 
             for (let i=0;i<coord.length;i++)
              {
                tmpCellCoord.splice(tmpCellCoord.indexOf(coord[i]),1)  
                document.getElementById(coord[i]).textContent=tmpRandWord.charAt(j); 
                console.log(tmpCellCoord);
                j=j+1
              }
         }
          //right to left
          cond4:
          if ((coordY - (tmpRandWord.length-1)>=0)&& nextCondition)
          {
            
            console.log("right to left");  
            j=tmpRandWord.length-1;
            for (let k=coordY-(tmpRandWord.length-1);k>=coordY;k--){
              tmp=""+coordY+k;
              if (tmpCellCoord.indexOf(tmp)== -1){
                nextCondition = true;
                break cond4;
              } 
              coord.push("td"+tmp);
            }
            nextCondition=false;  
            for (let i=0;i<coord.length;i++)
            {
              tmpCellCoord.splice(tmpCellCoord.indexOf(coord[i]),1)  
              document.getElementById(coord[i]).textContent=tmpRandWord.charAt(j); 
              console.log(tmpCellCoord);
              j=j-1;
            }
          }
      } 
   for (let i=0;i<3;i++)
   {
    var arrIndex=Math.floor(Math.random() * wordArr.length);   
    randWord = wordArr[arrIndex];
    //console.log("randWord",randWord);
    wordArr.splice(arrIndex,1)
    //console.log(wordArr);
    var coord="td";
    var rnd  = parseInt(Math.random()*randCell.length);
    var coordx=randCell.charAt(rnd);
    rnd  = parseInt(Math.random()*randomChar.length);
    var coordy=randCell.charAt(rnd);
    
    // for (j=0;j<randWord.length;j++)
    //  {
    //      coord="td"+coordx+coordy;
    //      //console.log("coordinate td",coord,"   ",randWord.charAt(j))
    //      document.getElementById(coord).textContent=randWord.charAt(j);
    //      coordy=parseInt(coordy)+1;
    //  }
   }
}
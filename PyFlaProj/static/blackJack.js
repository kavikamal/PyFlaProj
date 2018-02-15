function myFunction(){
    //var cards = JSON.parse('{{ cards|safe }}'); 
    console.log(cards)
    var count = Object.keys(cards).length;
    console.log(count);
    console.log("Hello Blackjack");
    console.log(cards.player.length);
    console.log(cards.player[0]);
   
    var destination = document.getElementById("mainDiv"); 
    for (i=0;i<cards.imageName.length-1;i++){
            if (i%2==0){
                var h = document.createElement("h4") // Create a <h1> element
                if (i+2==cards.imageName.length) 
                     var t = document.createTextNode("Dealer Card");  
                else              
                     var t = document.createTextNode("Player Cards");     // Create a text node
                h.appendChild(t); 
                destination.appendChild(h);
            }
            let newImageElement = document.createElement("img");
            newImageElement.src="/static/"+cards.imageName[i];
            newImageElement.setAttribute("class","imgClass");
            destination.appendChild(newImageElement);
        }
    for (let i=0;i<cards.player.length;i++){     
        let newPlayerElement = document.createElement("input");
        newPlayerElement.setAttribute("name","player[]");
        newPlayerElement.setAttribute("type", "hidden");
        newPlayerElement.setAttribute("value",cards.player[i]);
        destination.appendChild(newPlayerElement);
    }    
    for (let i=0;i<cards.computer.length;i++){     
        let newComputerElement = document.createElement("input");
        newComputerElement.setAttribute("name","computer[]");
        newComputerElement.setAttribute("type", "hidden");
        newComputerElement.setAttribute("value",cards.computer[i]);
        destination.appendChild(newComputerElement);
    }
}

function hitAgainFunction(){
    var playerCoinInput = document.getElementById("playerCoin"); 
    playerCoinInput.setAttribute("value",(playerCoin-10));
    document.getElementById('form1').submit();
}
function myFunction(){
    //var cards = JSON.parse('{{ cards|safe }}'); 
    console.log(cards)
    var count = Object.keys(cards).length;
    console.log(count);
    console.log("Hello Blackjack");
    console.log(cards.playerCoin);
    console.log(cards.player[0]);
   
    var destination = document.getElementById("mainDiv"); 
    var h = document.createElement("p")
    var t = document.createTextNode(cards.msg); 
    var c=document.getElementById("playerCoin");
    c.value=cards.playerCoin;
    h.appendChild(t); 
    destination.appendChild(h);
    for (i=0;i<cards.imageName.length-1;i++){
            if (i%2==0){
                h = document.createElement("h4") // Create a <h1> element
                if (i+2==cards.imageName.length) 
                    t = document.createTextNode("Dealer Card");  
                else              
                    t = document.createTextNode("Player Cards");     // Create a text node
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
    
    document.getElementById('form1').submit();
}
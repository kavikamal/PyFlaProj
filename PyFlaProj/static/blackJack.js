function myFunction(){
    //var cards = JSON.parse('{{ cards|safe }}'); 
    console.log(cards)
    var count = Object.keys(cards).length;
    console.log(count);
    console.log(cards[0].imageName);
    var playerCoinInput = document.getElementById("playerCoin"); 
    playerCoinInput.setAttribute("value",playerCoin);
    for (i=0;i<count;i++)
        if (cards[i].isDealer==false){
            let newImageElement = document.createElement("img");
            newImageElement.src="/static/"+cards[i].imageName;
            newImageElement.setAttribute("class","imgClass");
            let newPlayerElement = document.createElement("input");
            newPlayerElement.setAttribute("name","player[]");
            newPlayerElement.setAttribute("type", "hidden");
            newPlayerElement.setAttribute("value",cards[i].drawnCard);
            var destination = document.getElementById("mainDiv"); 
            destination.appendChild(newImageElement);
            destination.appendChild(newPlayerElement);
        }  
        else 
        {
            let newImageElement = document.createElement("img");
            newImageElement.src="/static/"+cards[i].imageName;
            newImageElement.setAttribute("class","imgClass");
            let newComputerElement = document.createElement("input");
            newComputerElement.setAttribute("name","computer[]");
            newComputerElement.setAttribute("type", "hidden");
            newComputerElement.setAttribute("value",cards[i].drawnCard);
            var destination = document.getElementById("mainDiv");
            destination.appendChild(newImageElement);
            destination.appendChild(newComputerElement);
        }
}

function hitAgainFunction(){
    var playerCoinInput = document.getElementById("playerCoin"); 
    playerCoinInput.setAttribute("value",(playerCoin-10));
    document.getElementById('form1').submit();
}
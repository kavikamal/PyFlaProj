function myFunction(){
    //var cards = JSON.parse('{{ cards|safe }}'); 
    console.log(cards)
    var count = Object.keys(cards).length;
    console.log(count);
    console.log(cards.player.length);
    console.log(cards.player[0]);
   
    var destination = document.getElementById("mainDiv"); 
    for (i=0;i<cards.imageName.length;i++){
            let newImageElement = document.createElement("img");
            newImageElement.src="/static/"+cards.imageName[i];
            newImageElement.setAttribute("class","imgClass");
            destination.appendChild(newImageElement);
        }
    let newPlayerElement = document.createElement("input");
    newPlayerElement.setAttribute("name","player[]");
    newPlayerElement.setAttribute("type", "hidden");
    newPlayerElement.setAttribute("value",cards.player);
    destination.appendChild(newPlayerElement);
    let newComputerElement = document.createElement("input");
    newComputerElement.setAttribute("name","computer[]");
    newComputerElement.setAttribute("type", "hidden");
    newComputerElement.setAttribute("value",cards.computer);
    destination.appendChild(newComputerElement);
}

function hitAgainFunction(){
    var playerCoinInput = document.getElementById("playerCoin"); 
    playerCoinInput.setAttribute("value",(playerCoin-10));
    document.getElementById('form1').submit();
}
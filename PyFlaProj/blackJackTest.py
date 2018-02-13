from flask import Flask, render_template, jsonify, request
from random import choice as rc

import itertools 
import json


app = Flask(__name__)
#CORS(app)
cards=list(range(1,52)) 

@app.route("/blackJack",methods = ['POST', 'GET'])
def getCards():
    #cards=list(range(1,52))
    try:
        selectedCards=[]
        imageName=[]
        tmpData=[]
        playerCoin=90
        isDealer=[False,False,True,True]
        playerTotal=0
        computerTotal=0
        for i in range(0,4):
            selectedCards.append(rc(cards))
            cards.remove(selectedCards[i])
            imageName.append(getImageName(selectedCards[i]))
            # isAces.append(0)
            if isDealer[i]==False:
                playerTotal+=getCardValue(selectedCards[i])
            else:
                computerTotal+=getCardValue(selectedCards[i])   

            tmpData.append(
            {
            'drawnCard':selectedCards[i],
            'imageName': imageName[i],
            'isDealer':isDealer[i]
            })  

    except:
        print ("error :", sys.exc_info()[0])
    return render_template("index.html",cards=json.dumps(tmpData),playerCoin=json.dumps(playerCoin)) 

@app.route('/hit', methods = ['POST', 'GET'])
def result():
   if request.method == 'POST':
        player = request.form.getlist('player[]')
        computer= request.form.getlist('computer[]')
        playerCoin= request.form.get('playerCoin')
        player.append(rc(cards))
        computer.append(rc(cards))
        print("player",player)
        print("computer",computer)
        print("playerCoin",playerCoin)
        cardsDict = {1:player,2:computer}
        total=getTotalCardValue(cardsDict)
        blackJack=checkForBlackJack(total)
        for i in blackJack:
            if blackJack[i]==1:
                print("player is the winner")
            else:    
                print("player lost")   
   return render_template("second.html",data = total)

def getImageName(cardNo):
    if cardNo>0 and cardNo<14:
           imageName=str(cardNo) + "_of_spades.png"
    elif cardNo>13 and cardNo<27:
           cardNo=cardNo-13
           imageName=str(cardNo) + "_of_clubs.png" 
    elif cardNo>26 and cardNo<40:
           cardNo=cardNo-26
           imageName=str(cardNo) + "_of_hearts.png" 
    elif cardNo>39 and cardNo<53:
           cardNo=cardNo-39
           imageName=str(cardNo) + "_of_diamonds.png" 
    return imageName   

def getCardValue(cardNo):
    if cardNo>13 and cardNo<27:
           cardNo=cardNo-13
    elif cardNo>26 and cardNo<40:
           cardNo=cardNo-26
    elif cardNo>39 and cardNo<53:
           cardNo=cardNo-39
    return cardNo      

def getTotalCardValue(cards):
    totalPlayer={}
    for j in cards:
        acesCount=0
        total=0
        for i in cards[j]:
            print(i)
            tmpCardValue=getCardValue(int(i))
            if (tmpCardValue==1):
                acesCount+=1
                total=total+11
            elif (tmpCardValue>10):
                total=total+10
            else:
                total=total+tmpCardValue
        totalPlayer[j]=total
        print(totalPlayer[j])
        for  x in range(acesCount):  
            if totalPlayer[j]>21:
                totalPlayer[j]-=10
    return totalPlayer

def checkForBlackJack(total):
    blackJack=[]
    for i in total:
        if total[i]==21:
            blackJack.append(1)
        elif total[i]<21:
            blackJack.append(-1) 
        elif total[i]>21:
            blackJack.append(0)
    return blackJack              
            
if __name__ == "__main__":
    app.run()
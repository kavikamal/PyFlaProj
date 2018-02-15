from flask import Flask, render_template, jsonify, request
from random import choice as rc
import sys
import itertools 
import json


app = Flask(__name__)
#CORS(app)
cards=list(range(1,52)) 

@app.route("/",methods = ['GET'])
def firstPage():
    return render_template("index.html")

@app.route("/blackJack",methods = ['POST', 'GET'])
def getCards():
    try:
        playerHand=[]
        computerHand=[]
        imageName=[]
        data={}
        #Player Hand
        playerHand.append(rc(cards))
        cards.remove(playerHand[0])
        imageName.append(getImageName(playerHand[0]))
        playerHand.append(rc(cards))
        cards.remove(playerHand[1])
        imageName.append(getImageName(playerHand[1]))
        playerTotal=getTotalCardValue(playerHand)
        #If players total is less than 21 then select computer cards
        if playerTotal<21:
            #Computer Hand
            computerHand.append(rc(cards))
            cards.remove(computerHand[0])
            imageName.append(getImageName(computerHand[0]))
            computerHand.append(rc(cards))
            cards.remove(computerHand[1])
            imageName.append(getImageName(computerHand[1]))
            computerTotal=getTotalCardValue(computerHand)
            if computerTotal>21:
               #If computers total is greater than 21 select cards again 
               cards.append(computerHand[0])
               cards.append(computerHand[1])
               computerHand[0]= rc(cards)
               cards.remove(computerHand[0])
               computerHand[1]= rc(cards)
            data={"player":playerHand,"computer":computerHand,"imageName":imageName}
            msg="Hit?" 
        elif playerTotal==21: 
            msg="You won"  
        elif playerTotal>21:
            msg="Computer Won"    
        data.update({"msg":msg})  
    except ImportError:
        print("error :",sys.exc_info()[0])
    return render_template("index.html",data=json.dumps(data)) 

@app.route('/hit', methods = ['POST', 'GET'])
def result():
    playerTotal=0
    computerTotal=0
    if request.method == 'POST':
        player = request.form.getlist('player[]')
        computer= request.form.getlist('computer[]')
        player.append(rc(cards))
        computer.append(rc(cards))
        print("player",player)
        playerTotal=getTotalCardValue(player)
        computerTotal=getTotalCardValue(computer)
    data={"player":playerTotal,"computer":computerTotal}
    print("data",data)
    return render_template("second.html",data=json.dumps(data))

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
    acesCount=0
    total=0
    for i in cards:
        tmpCardValue=getCardValue(int(i))
        print(tmpCardValue)
        if (tmpCardValue==1):
            acesCount+=1
            total=total+11
        elif (tmpCardValue>10):
            total=total+10
        else:
            total=total+tmpCardValue
    for x in range(acesCount):  
        if total>21:
            total-=10
    print("total",total)    
    return total
            
if __name__ == "__main__":
    app.run(debug=True)
////////////////////
// Author: Jimmy
// Description: game object for handling events and startup
// Version: 1
////////////////////

window.addEventListener("load", function(){
    game.init();
});
var fieldLength = [10,10];
var boatTypes = [2, 3, 4, 5];
var numberOfBoates = 8;

var game = {
    destroyedBoats: 0,
    shots: 0,
    hits: 0,
    interval: 0,
    init(){
        //construct field
        this.field = new Field(fieldLength[0], fieldLength[1]);
        //generate a field
        this.field.generateField(boatTypes, numberOfBoates);
        //generate html field
        this.renderField();
        //render message
        this.interval = setInterval(function(){
            game.messageRenderer();
        }, 100);

    },
    messageRenderer(){
        //update message
        var messageEl = document.getElementById("message");
        messageEl.innerHTML =  "Vernietigde schepen: " + this.destroyedBoats + "/" + this.field.amountOfBoats() + ". Aantal schoten: " + this.shots + ". Aantal schoten raak: " + this.hits;
    },
    renderField(){
        //generate html
        var parent = document.getElementById("tableBody");
        for(var i = 0; i < fieldLength[1]; i++){//loop for rows
            //create element
            let row = document.createElement("tr");
            //set dimensions
            row.height = 800 / fieldLength[1];
            row.width = "100%";
            //add
            parent.appendChild(row);
            for(var n = 0; n < fieldLength[0]; n++){//loop for columns
                //create element
                let column = document.createElement("td");
                //set dimensions
                let x = n; let y = i;
                column.height = 800 / fieldLength[0] - 3;
                column.width = 800 / fieldLength[0];
                //atach event
                column.addEventListener("click", function(){
                    game.clickedOn(x, y, column);
                })
                //add
                row.appendChild(column);        
            }
        }
    },
    clearAll(){
        for(var i = 0; i < fieldLength[1]; i++){//loop for rows
            for(var n = 0; n < fieldLength[0]; n++){//loop for columns
                
            }
        }
    },
    clickedOn(x, y, el){
        this.shots++;
        //get boat if on location
        var boat = this.field.getBoatOnLocation(x, y);
        if(boat && !boat.isHitAt(x,y)){//if there is a boat and it is not yet hit
            boat.hitBoat(x, y);
            this.hits++;
            //check if boat is sunken
            if(boat && boat.isSunken()){
                this.destroyedBoats++;
                if(this.destroyedBoats < this.field.amountOfBoats()){
                    alert("You destroyed a boat!");
                }else{
                    alert("You destroyed all boats! Resetting in 2 seconds");
                    setTimeout(function(){
                        game.reset();
                    }, 2000);
                }
            }
            //show boatpart
            el.style.backgroundColor = "green";
        }else if(!boat){
            el.style.backgroundColor = "blue";
        }
    },
    reset(){
        //remove table inner
        var parent = document.getElementById("tableBody");
        while (parent.children.length > 0) {
            parent.removeChild(parent.lastChild);
        }
        //reset vars
        this.destroyedBoats = 0;
        this.hits = 0;
        this.shots = 0;
        //reset interval
        clearInterval(this.interval);
        //reinialize
        this.init();
    }
}
////////////////////
// Author: Jimmy
// Description: game object for handling events and startup with the renderer only
// Version: 1
////////////////////

window.addEventListener("load", function(){
    game.init();
});
var fieldLength = [10,10];
var boatTypes = [2, 3, 4, 5];
var numberOfBoates = 8;

var game = {
    init(){
        //construct field
        this.field = new Field(fieldLength[0], fieldLength[1]);
        //generate a field
        this.field.generateField(boatTypes, numberOfBoates);
        //generate html field
        this.renderField();

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
                //directlty show
                game.clickedOn(x, y, column)
                //add
                row.appendChild(column);        
            }
        }
    },
    clickedOn(x, y, el){
        this.shots++;
        //get boat if on location
        var boat = this.field.getBoatOnLocation(x, y);
        if(boat && !boat.isHitAt(x,y)){//if there is a boat and it is not yet hit
            boat.hitBoat(x, y);
            //show boatpart
            el.style.backgroundColor = "green";
        }else if(!boat){
            el.style.backgroundColor = "blue";
        }
    }
}
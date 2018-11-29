////////////////////
// Author: Jimmy
// Description: game prototype
// Version: 1
////////////////////


function Field(x, y){
    //generate field array
    this.dimensions = [x, y];
    this._f = [];
    this._boats  = [];
    for(var i = 0; i < this.dimensions[1]; i++){//generate grid of X x Y zeros of two dimension array
        let row = [];
        for(var n = 0; n < this.dimensions[0]; n++){
            row.push(0);
        }
        this._f.push(row);
    }
}

Field.prototype.generateField = function(boatTypes, amountOfBoats){//generate field with boats
    //randomly generate and place boats
    for(var i = 0; i < amountOfBoats; i++){
        //pick random boat length and try to find location
        let boatType = boatTypes[Math.floor(Math.random() * boatTypes.length)];
        let boat = this.findBoatPlace(boatType);
        if(boat !== false){
            this.placeBoat(boat);
        }
    }
}

Field.prototype.empty = function(x, y){//empty field basically the same as constructor
    this.dimensions = [x, y];
    this._boats = [];
    this._f = [];
    for(var i = 0; i < this.dimensions[1]; i++){
        let row = [];
        for(var n = 0; n < this.dimensions[0]; n++){
            row.push(0);
        }
        this._f.push(row);
    }
}

Field.prototype.findBoatPlace = function(length, level){//try to find place for boat in current grid if failes (recussion level exceeded) return false
    //recursion level
    if(level == null){
        level = 0;
    }
    //check recursion depth
    if(level === 1000){
        return false; //too deep so possible no place left
    }

    //generate random coordinates
    var f = this._f; //field
    var x = Math.floor(Math.random() * this.dimensions[0]);
    var y = Math.floor(Math.random() * this.dimensions[1]);
    //generate random orientation (yes this will exponentially slow down the algorithm if there is less space)
    var orientation = Math.round(Math.random()); //0 = horizontal and 1 = vertical
    
    //check horizontal
    //check sides for open space
    if(!orientation && x + length <= this.dimensions[0] && this.isLocationEmpty(x - 1, y) && this.isLocationEmpty(x - 1, y - 1) && this.isLocationEmpty(x - 1, y + 1) && this.isLocationEmpty(x + length, y) && this.isLocationEmpty(x + length, y - 1) && this.isLocationEmpty(x + length, y + 1)){
        //check horizontal for free space
        let okay = true;
        for(var i = x; i < x + length; i++){
            if(f[y][i] !== 0 || (y - 1 >= 0 && f[y - 1][i] !== 0) || (y + 1 < this.dimensions[1] && f[y + 1][i] !== 0)){
                okay = false;
                break;
            }
        }
        if(okay){
            //return the boat
            return new Boat(x, y, 0, length);
        }
    //check vertical
    //check sides for open space
    }else if(y + length <= this.dimensions[0] && this.isLocationEmpty(x, y - 1) &&  this.isLocationEmpty(x + 1, y - 1) && this.isLocationEmpty(x - 1, y - 1) && this.isLocationEmpty(x, y + length) && this.isLocationEmpty(x - 1, y + length) &&  this.isLocationEmpty(x + 1, y + length)){
        //check vertical for space
        let okay = true;
        for(var i = y; i < y + length; i++){
            if(f[i][x] !== 0 || (x - 1 >= 0 && f[i][x - 1] !== 0) || (x + 1 < this.dimensions[0] && f[i][x + 1] !== 0)){
                okay = false;
                break;
            }
        }
        if(okay){
            //return the boat
            return new Boat(x, y, 1, length);
        }
    }
    //deeper layer if coordinates are invalid
    console.log("Deeper");
    return this.findBoatPlace(length, level + 1);
}

Field.prototype.isLocationEmpty = function(x, y){//check if location is empty so this can be 0 or out of bound
    if((x < 0 || x >= this.dimensions[0] || y < 0 || y >= this.dimensions[1]) || this._f[y][x] === 0){
        return true;
    }
    return false;
}

Field.prototype.placeBoat = function(boat){//place a boat in grid and in boates array
    if(!boat.orientation){//horizontal
        for(var i = boat.x; i < boat.x + boat.length; i++){
            this._f[boat.y][i] = 1;
        }
    }else{
        for(var i = boat.y; i < boat.y + boat.length; i++){
            this._f[i][boat.x] = 1;
        }
    }
    //registerboat
    this._boats.push(boat);
}


Field.prototype.rawGet  = function(x, y){//just gets data from grid
    if(this.isLocationEmpty(x, y)){
        return false;
    }
    return this._f[x][y];
}

Field.prototype.isBoat = function(x, y){//alias
    return !this.isLocationEmpty(x, y);
}

Field.prototype.hit = function(x, y){//hits a certain spot on the grid and checks if there is a boat on that location return false or true
    //get boat
    var boat = this.getBoatOnLocation(x, y);
    if(boat){
        boat.hitBoat(x, y);
        return true;
    }
    return false;
}

Field.prototype.getBoatOnLocation = function(x, y){//tries to find boat on location in grid and returns boat otherwise false
    for(var i = 0; i < this._boats.length; i++){
        if(this._boats[i].isOnLocation(x,y)){
            return this._boats[i];
        }
    }
    return false;
}

Field.prototype.amountOfBoats = function(){//just returns the amoutn of boates
    return this._boats.length;
}
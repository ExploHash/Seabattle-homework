////////////////////
// Author: Jimmy
// Description: boat prototype
// Version: 1
////////////////////

function Boat(x, y, orientation, length){//constructor of boat object
    //take over properies
    this.x = x;
    this.y = y;
    this.orientation = orientation;
    this.length = length;
    //generate damage array
    this.damage = [];
    for(var i = 0; i < length; i++){
        this.damage.push(false);
    }
    //generate occupied coordinates
    this.coordinates = [];
    if(!orientation){//horizontal
        for(var i = x; i < x + length; i++){
            this.coordinates.push({x: i, y: y});
        }
    }else{
        for(var i = y; i < y + length; i++){
            this.coordinates.push({x: x, y: i});
        }
    }
}

Boat.prototype.hitBoat = function(x, y){//try to hit boat
    for(var i = 0; i < this.length; i++){
        if(this.coordinates[i].x === x && this.coordinates[i].y === y){
            //hit 
            this.damage[i] = true;
            return true;
        }
    }
    return false;
}

Boat.prototype.isSunken = function(){//check if boat is fully damaged
    for(var i = 0; i < this.length; i++){
        if(!this.damage[i]){
            return false;
        }
    }
    return true;
}

Boat.prototype.isHitAt = function(x, y){
    for(var i = 0; i < this.length; i++){
        if(this.coordinates[i].x === x && this.coordinates[i].y === y && this.damage[i]){
            return true;
        }
    }
    return false;
}

Boat.prototype.isOnLocation = function(x, y){//check if boat has a part on that location
    for(var i = 0; i < this.length; i++){
        if(this.coordinates[i].x === x && this.coordinates[i].y === y){
            return true;
        }
    }
    return false;
}
'use strict';
import { v4 as uuidv4 } from 'uuid';
const imported = require("./inventory.ES6.js");
export function makeOptions(invent, key){
    let names = Object.keys(invent);
    var result = names.map(e=> {
        var something = invent[e];
        if(something[key]){
                return e;
        } else {
                return '';
        }
    }).filter(s=>s).forEach(name => {
        var price = invent[name].price;
        console.log("<option value="+name+"> "+name+", "+ price + " kr </option>");
    });

    return;
}

//makeOptions(imported.inventory, 'foundation');
export class Salad {
    foundation;
    protein;
    extra;
    dressing;
    static instanceCounter = 0;
    constructor(){
        this.foundation =[];
        this.protein = [];
        this.extra = [];
        this.dressing = [];
        this.uuid = uuidv4();
    }
    add(ingredient, info){
        let copyOfInfo = {name : ingredient};
        copyOfInfo = {...copyOfInfo, ...info};
        if (copyOfInfo.hasOwnProperty('foundation')){
            this.foundation.push(copyOfInfo);
        } else if (copyOfInfo.hasOwnProperty('protein')){
            this.protein.push(copyOfInfo);
        } else if (copyOfInfo.hasOwnProperty('extra')){
            this.extra.push(copyOfInfo);
        } else if (copyOfInfo.hasOwnProperty('dressing')){
            this.dressing.push(copyOfInfo);
        }
        return this;
    }
    remove(ingredient){
    this.extra = this.extra.filter((value, index, array) => {
            if(value.name!=ingredient) return value;});

    this.foundation = this.foundation.filter((value, index, array) => {
            if(value.name!=ingredient) return value;});

    this.dressing = this.dressing.filter((value, index, array) => {
            if(value.name!=ingredient) return value;});

    this.protein = this.protein.filter((value, index, array) => {
            if(value.name!=ingredient) return value;});
    return this;
    }
}

Salad.prototype.getPrice = function (salad) {
    var sum = 0;
    const reducer = (previousValue,currentValue) => {
        if (currentValue.amount){
            return currentValue.amount*currentValue.price+previousValue
        }
        if (currentValue.price && !previousValue.price){
            return previousValue+currentValue.price;
        }
        else if (!currentValue.price && previousValue.price){
            return previousValue.price;
        } else {
            return 0;
        }
    }
    sum = sum + salad.foundation.reduce(reducer,0);
    sum = sum + salad.extra.reduce(reducer, 0);
    sum = sum + salad.protein.reduce(reducer,0);
    sum = sum + salad.dressing.reduce(reducer,0);
    return sum;        
}

Salad.prototype.json = function () {
    var sb = [];
    sb[sb.length] = this.foundation[0].name;
    sb[sb.length] = this.protein[0].name;
    for(var i = 0; i < this.extra.length; i++){
        sb[sb.length] = this.extra[i].name;
    }
    sb[sb.length] = this.dressing[0].name;
    return sb;
}

Salad.prototype.count = function (property){
    var amount = 0;
    switch(property){
        case 'foundation':
            amount = this.foundation.length;
            break;
        case 'extra':
            amount = this.extra.length;
            break;
        case 'protein':
            amount = this.protein.length;
            break;
        case 'dressing':
            amount = this.dressing.length;
            break;
    }
    return amount;
} 
Salad.prototype.makeUp = function (salad) {
    var sb = '';
    const reducer = (previousValue,currentValue) => {
        if (currentValue.name && !previousValue.name){
            return previousValue+ " "+currentValue.name;
        }
        else if (!currentValue.name && previousValue.name){
            return previousValue.name;
        } else {
            return "";
        }
    }
    sb = sb + salad.foundation.reduce(reducer, "");
    sb = sb + "," + salad.protein.reduce(reducer, "");
    sb = sb + "," + salad.extra.reduce(reducer, "");
    sb = sb + "," + salad.dressing.reduce(reducer, "");
    return sb;
}
class GourmetSalad extends Salad{
    constructor(){
        super();
    }
    
    add(ingredient, info, inputAmount = 1){
            let copyOfInfo = {amount : inputAmount};
            copyOfInfo = {...copyOfInfo, ...info};
            super.add(ingredient, copyOfInfo);
            return this;
    }

}



//let myCaesarSalad = new Salad().add('Sallad', imported.inventory['Sallad']).add('Kycklingfilé', imported.inventory['Kycklingfilé']).add('Bacon', imported.inventory['Bacon']).add('Krutonger', imported.inventory['Krutonger']).add('Parmesan', imported.inventory['Parmesan']).add('Ceasardressing', imported.inventory['Ceasardressing'])
//console.log(JSON.stringify(myCaesarSalad) + '\n');
//console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
//console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');


//let myGourmetSalad = new GourmetSalad().add('Sallad', imported.inventory['Sallad'], 0.5).add('Kycklingfilé', imported.inventory['Kycklingfilé'], 2).add('Bacon', imported.inventory['Bacon'], 0.5).add('Krutonger', imported.inventory['Krutonger']).add('Parmesan', imported.inventory['Parmesan'], 2).add('Ceasardressing', imported.inventory['Ceasardressing']);
//console.log('Min gourmetsallad med lite bacon kostar '+ myGourmetSalad.getPrice() + ' kr');
//myGourmetSalad.add('Bacon', imported.inventory['Bacon'], 1)
//console.log('Med extra bacon kostar den '+ myGourmetSalad.getPrice() + ' kr');
//console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

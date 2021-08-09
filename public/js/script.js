window.onload = function(){
  console.log(window.location.origin + '/clothes');
  loadClothes();
};

var filesNames = [];

const clothes = {
  items : "filesNames[0]",
  set setItems(setItems) {
    this.items = setItems;
  }
};



function loadClothes(){
  var xh = new XMLHttpRequest();
  xh.open("GET", window.location.origin + '/clothes', true);
  xh.send(null);
  
  //syncronous - waits for the response to come back to continue with other shit
  //asyncronous - doesn't wait for the response
  xh.onload = function(){
    var data = JSON.parse(xh.responseText);

    data.forEach( dataItems => {
        for (let i = 0; i < dataItems.length; ++i)
          filesNames[i] = dataItems[i];
    });

    //setting the filesNames to the items field I have so I can use it later
    clothes.setItems = filesNames;
  }
}





var warmShirts = [],warmPants = [], warmShoes = [],coldShirts = [],coldPants = [], coldShoes = [];
function itemsParse() {
  for(let i = 0;i < clothes.items.length; ++i){
    if(clothes.items[i].charAt(0)=='w' && clothes.items[i].charAt(1)=='i')
      warmShirts.push(clothes.items[i]); 
    else if(clothes.items[i].charAt(0)=='w' && clothes.items[i].charAt(1)=='n')
      warmPants.push(clothes.items[i]); 
    else if(clothes.items[i].charAt(0)=='w' && clothes.items[i].charAt(1)=='o')
      warmShoes.push(clothes.items[i]);
    else if(clothes.items[i].charAt(0)=='c' && clothes.items[i].charAt(1)=='i')
      coldShirts.push(clothes.items[i]);
    else if(clothes.items[i].charAt(0)=='c' && clothes.items[i].charAt(1)=='n')
      coldPants.push(clothes.items[i]);
    else if(clothes.items[i].charAt(0)=='c' && clothes.items[i].charAt(1)=='o')
      coldShoes.push(clothes.items[i]);
  }

}

//Function that changes the pics on the chose menu.
function changePic(chg){

  var num = Math.floor(Math.random() * clothes.items.length);

  if(chg == 'one'){
    if(warmShirts.length > 0){
      if(num % 2 == 0){
        var num2 = Math.floor(Math.random() * warmShirts.length);
        document.getElementById('myImage').src = 'uploads/' + warmShirts[num2];
      }
      else {
        var num2 = Math.floor(Math.random() * coldShirts.length);
        document.getElementById('myImage').src = 'uploads/' + coldShirts[num2];
      }
    }else 
        document.getElementById('myImage').src = 'images/shirtStart.png';
  }

  if (chg == 'two'){
    if(warmPants > 0 || coldPants > 0){
      if(num % 2 == 0){
        var num2 = Math.floor(Math.random() * warmPants.length);
        document.getElementById('myImage2').src = 'uploads/' + warmPants[num2];
      }
      else {
        var num2 = Math.floor(Math.random() * coldPants.length);
        document.getElementById('myImage2').src = 'uploads/' + coldPants[num2];
      }
    }else 
      document.getElementById('myImage2').src = 'images/pantsStart.png';
    
  }

  if (chg == 'three'){
    if(warmShoes > 0 || coldShoes > 0) {
      if(num % 2 == 0){
        var num2 = Math.floor(Math.random() * warmShoes.length);
        document.getElementById('myImage3').src = 'uploads/' + warmShoes[num2];
      }
      else{
        var num2 = Math.floor(Math.random() * coldShoes.length);
        document.getElementById('myImage3').src = 'uploads/' + coldShoes[num2];
      }
    }else
      document.getElementById('myImage3').src = 'images/shoesStart.png';

  }

}

  


var specs = {
  warm : false,
  cold : false,
  shirt : false,
  pants : false,
  shoes : false
}

// clicking on Warm button
function switchTemp(wc){
  specs.warm = wc == 'w';
  specs.cold = !specs.warm; 
  console.log(specs.warm + ' ' + specs.cold);
  $("#temperature").val(specs.warm ? 'warm' : 'cold');
}
function shirtPantsShoes(str){
  specs.shirt = str == 'st';
  specs.pants = str == 'p';
  specs.shoes = str == 'ss';
  $("#item").val(specs.shirt ? 'Shirt' : (specs.pants ? 'Pants' : 'Shoes'));
}





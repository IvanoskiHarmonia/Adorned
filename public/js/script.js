window.onload = async function(){
  // console.log(window.location.origin + '/clothes');
  setToken();

  await new Promise(r => setTimeout(r, 500));
  loadClothes();

  await new Promise(r => setTimeout(r, 500));
  clothesParsing();

  console.log(clothesParsed);
};

const clothesRecieved = [];

function setToken() {
  sessionStorage.setItem('token', document.getElementById('token').value);
}

function deleteToken() {
  sessionStorage.removeItem('token'); // even if the sessionStorage is deleted when browser is closed, this is just making sure that the token is deleted.
}

// when tab is closed delete token from local storage and server
window.onbeforeunload = function(){
  deleteToken();
};
// window.onbeforeunload = {
//   deleteToken();
// };


function loadClothes(){
  var xh = new XMLHttpRequest();
  const params = 'username=' + document.getElementById('username').value;
  const token = "&token=" + sessionStorage.getItem('token');
  xh.open("GET", window.location.origin + '/clothes?' + params + token, true);
  xh.send(null);
  
  // syncronous - only 1 request at a time
  // asyncronous - multiple requests at a time
  xh.onload = function(){
    var data = JSON.parse(xh.responseText);

    clothesRecieved.push(...data);

    console.log(clothesRecieved[0].picname);
  }
  
}


// ideas for objects
/* idea 1
  const clothes = {
    shirts: [],
    pants: [],
    shoes: [],
*/ 


// readablity is way more important than just it will work.
  const clothesParsed = { 
    warm: {
      shirts: [],
      pants: [],
      shoes: [],
    },
    cold: {
      shirts: [],
      pants: [],
      shoes: [],
    },
    amount: {
      shirts: 0,
      pants: 0,
      shoes: 0
    }
  };




function  clothesParsing() {

  for (var i = 0; i < clothesRecieved.length; i++) {
    if(clothesRecieved[i].picname.substring(0, 4) == "warm") {
      if(clothesRecieved[i].picname.substring(4, 9) == "Shirt") 
        clothesParsed.warm.shirts.push(clothesRecieved[i].picname);

      else if(clothesRecieved[i].picname.substring(4, 9) == "Pants") 
        clothesParsed.warm.pants.push(clothesRecieved[i].picname);
      
      else if(clothesRecieved[i].picname.substring(4, 9) == "Shoes") 
        clothesParsed.warm.shoes.push(clothesRecieved[i].picname);
    } // end of warm
    if(clothesRecieved[i].picname.substring(0, 4) == "cold") {
      if(clothesRecieved[i].picname.substring(4, 9) == "Shirt") 
        clothesParsed.cold.shirts.push(clothesRecieved[i].picname);
      
      else if(clothesRecieved[i].picname.substring(4, 9) == "Pants") 
        clothesParsed.cold.pants.push(clothesRecieved[i].picname);
      
      else if(clothesRecieved[i].picname.substring(4, 9) == "Shoes") 
        clothesParsed.cold.shoes.push(clothesRecieved[i].picname);
    } // end of cold
  } // end of for loop

  clothesParsed.amount.shirts = clothesParsed.warm.shirts.length + clothesParsed.cold.shirts.length;
  clothesParsed.amount.pants = clothesParsed.warm.pants.length + clothesParsed.cold.pants.length;
  clothesParsed.amount.shoes = clothesParsed.warm.shoes.length + clothesParsed.cold.shoes.length;

  // console.log(clothesParsed.warm.shirts[0].picname);
  console.log(clothesParsed);
}






//Function that changes the pics on the chose menu.

const Display = {
  shirt: document.getElementById('displayShirt'),
  pants: document.getElementById('displayPants'),
  shoes: document.getElementById('displayShoes'),
}



// What in this world am I doing here................... I think this should be put in the hall of fame for the worst code ever written.
function changeDisplay(chg){

  var randNum = Math.floor(Math.random() * 3);


  // if shirt display is clicked then change the shirt display
  if(chg == 'shirt'){
    if(clothesParsed.amount.shirts > 0){
      if(randNum % 2 == 0 && clothesParsed.warm.shirts.length > 0){
        var num2 = Math.floor(Math.random() * clothesParsed.warm.shirts.length);
        Display.shirt.src = 'uploads/' + clothesParsed.warm.shirts[num2];
      }
      else if (clothesParsed.cold.shirts.length > 0){
        var num2 = Math.floor(Math.random() * clothesParsed.cold.shirts.length);
        Display.shirt.src = 'uploads/' + clothesParsed.cold.shirts[num2];
      }
      else
        Display.shirt.src = 'images/shirtStart.png';

    }else 
        Display.shirt.src = 'images/shirtStart.png';
  }







  // if pants display is clicked then change the pants display
  if (chg == 'pants'){
    if(clothesParsed.amount.pants > 0){
      if(randNum % 2 == 0 && clothesParsed.warm.pants.length > 0){
        var num2 = Math.floor(Math.random() * clothesParsed.warm.pants.length);
        Display.pants.src = 'uploads/' + clothesParsed.warm.pants[num2];
      }
      else if (clothesParsed.cold.pants.length > 0){
        var num2 = Math.floor(Math.random() * clothesParsed.cold.pants.length);
        Display.pants.src = 'uploads/' + clothesParsed.cold.pants[num2];
      }
      else
        Display.pants.src = 'images/pantsStart.png';
    }else 
      Display.pants.src = 'images/pantsStart.png';
  }






  
  // if shoes display are clicked then change the shoes display
  if (chg == 'shoes'){
    if(clothesParsed.amount.shoes > 0) {
      if(randNum % 2 == 0 && clothesParsed.shoes.pants.length > 0){
        var num2 = Math.floor(Math.random() * clothesParsed.warm.shoes.length);
        Display.shoes.src = 'uploads/' + clothesParsed.warm.shoes[num2];
      }
      else if (clothesParsed.cold.pants.length > 0){
        var num2 = Math.floor(Math.random() * clothesParsed.cold.shoes.length);
        Display.shoes.src = 'uploads/' + clothesParsed.cold.shoes[num2];
      }
      else
        Display.shoes.src = 'images/shoesStart.png';
    }else
      Display.shoes.src = 'images/shoesStart.png';
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
function switchTemp(warmOrCold){
  // if warm is clicked then warm is true and cold is false
  specs.warm = warmOrCold == 'w'; 
  specs.cold = !specs.warm; 
  $("#temperature").val(specs.warm ? 'warm' : 'cold'); 
}
function shirtPantsShoes(str) {
  // if shirt is clicked then shirt is true and pants and shoes are false and so on.
  specs.shirt = str == 'st';
  specs.pants = str == 'p';
  specs.shoes = str == 'ss';
  $("#item").val(specs.shirt ? 'Shirt' : (specs.pants ? 'Pants' : 'Shoes'));
}
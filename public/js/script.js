window.onload = async function(){
  console.log(window.location.origin + '/clothes');
  // make them wait a bit
  await new Promise(r => setTimeout(r, 1000));
  setToken();

  await new Promise(r => setTimeout(r, 1000));
  loadClothes();
};

var filesNames = [];

// No reason at all to do this.
// const clothes = {
//   items : "filesNames[0]",
//   set setItems(setItems) {
//     this.items = setItems;
//   }
// };
const clothes = [];

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
  console.log(sessionStorage.getItem('token'));
  const token = "&token=" + sessionStorage.getItem('token');
  xh.open("GET", window.location.origin + '/clothes?' + params + token, true);
  // xh.setRequestHeader('Content-Type', 'application/json');
  xh.send(null);
  
  // syncronous - only 1 request at a time
  // asyncronous - multiple requests at a time
  xh.onload = function(){
    var data = JSON.parse(xh.responseText);

    clothes.push(...data);

    console.log(clothes);
  }
  
}





// Spaghetti are less confusing than this I am ashamed...
var warmShirts = [],warmPants = [], warmShoes = [],coldShirts = [],coldPants = [], coldShoes = [];
function itemsParse() {
  // for(let i = 0;i < clothes.items.length; ++i){
  //   if(clothes.items[i].charAt(0)=='w' && clothes.items[i].charAt(1)=='i')
  //     warmShirts.push(clothes.items[i]); 
  //   else if(clothes.items[i].charAt(0)=='w' && clothes.items[i].charAt(1)=='n')
  //     warmPants.push(clothes.items[i]); 
  //   else if(clothes.items[i].charAt(0)=='w' && clothes.items[i].charAt(1)=='o')
  //     warmShoes.push(clothes.items[i]);
  //   else if(clothes.items[i].charAt(0)=='c' && clothes.items[i].charAt(1)=='i')
  //     coldShirts.push(clothes.items[i]);
  //   else if(clothes.items[i].charAt(0)=='c' && clothes.items[i].charAt(1)=='n')
  //     coldPants.push(clothes.items[i]);
  //   else if(clothes.items[i].charAt(0)=='c' && clothes.items[i].charAt(1)=='o')
  //     coldShoes.push(clothes.items[i]);
  // }

}

//Function that changes the pics on the chose menu.

// What in this world am I doing here................... I think this should be put in the hall of fame of 
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

  

// why did I put clothes together with their seasons I HAVE NO IDEA.
var specs = {
  warm : false,
  cold : false,
  shirt : false,
  pants : false,
  shoes : false
}

// clicking on Warm button
function switchTemp(wc){
  specs.warm = wc == 'w'; // my brother helped me with this I have no idea how it works.
  specs.cold = !specs.warm;  // this one neither.
  console.log(specs.warm + ' ' + specs.cold); 
  $("#temperature").val(specs.warm ? 'warm' : 'cold'); 
}
function shirtPantsShoes(str){
  specs.shirt = str == 'st'; // 
  specs.pants = str == 'p';
  specs.shoes = str == 'ss';
  $("#item").val(specs.shirt ? 'Shirt' : (specs.pants ? 'Pants' : 'Shoes'));
}





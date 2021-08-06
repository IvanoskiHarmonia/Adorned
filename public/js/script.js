window.onload = function(){
  console.log(window.location.origin + '/clothes');
  loadClothes();
};
var filesNames = [];
function loadClothes(){
  var xh = new XMLHttpRequest();
  xh.open("GET", window.location.origin + '/clothes', true);
  xh.send(null);
  //syncronous - waits for the response to come back to continue with other shit
  //asyncronous - doesn't wait for the response
  xh.onload = function(){
    var data = JSON.parse(xh.responseText);
    console.log(data[0]);
    data.forEach( dataItems => {
        for (let i = 0; i < dataItems.length; ++i)
          filesNames[i] = dataItems[i];
    });
    console.log(filesNames[0]);

    // data.forEach( e => {
    //   $("#clothesExample").append(
    //     '<img class="rounded mx-auto d-block img-thumbnail" src = "'
    //     + window.location.origin + '/uploads/' + e 
    //     +'" width="33.3%" height="50%">'
    //   );
    //   console.log(e);
    // })
    //console.log(JSON.stringify(JSON.parse(xh.responseText)));
  }
  // xh.onload = function
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

//not used in the moment
function setFileName(){
  $("#upFileLabel")[0].innerHTML = $("#fileUp1")[0].files[0].name || "Choose File";
  //console.log("#fileUp1")[0];
}


    // var warmShirts = [],warmPants = [], warmShoes = [],coldShirts = [],coldPants = [], coldShoes = [];
    // for(let i = 0;i < filesNames.length; ++i){
    //   if(filesNames[i].charAt(0)=='w' && filesNames[i].charAt(1)=='i')
    //     {warmShirts.push(filesNames[i]); console.log('warmShirt : ' + warmShirts[warmShirts.length-1]);}
    //   else if(filesNames[i].charAt(0)=='w' && filesNames[i].charAt(1)=='n')
    //     {warmPants.push(filesNames[i]); console.log('warmPants : ' + warmPants[warmPants.length-1]);}
    //   else if(filesNames[i].charAt(0)=='w' && filesNames[i].charAt(1)=='o')
    //     {warmShoes.push(filesNames[i]); console.log('warmShoes : ' + warmShoes[warmShoes.length-1]);}
    //   else if(filesNames[i].charAt(0)=='c' && filesNames[i].charAt(1)=='i')
    //     {coldShirts.push(filesNames[i]); console.log('coldShirts : ' + coldShirts[coldShirts.length-1]);}
    //   else if(filesNames[i].charAt(0)=='c' && filesNames[i].charAt(1)=='n')
    //     {coldPants.push(filesNames[i]); console.log('coldPants : ' + coldPants[coldPants.length-1]);}
    //   else if(filesNames[i].charAt(0)=='c' && filesNames[i].charAt(1)=='o')
    //     {coldShoes.push(filesNames[i]); console.log('coldShoes : ' + coldShoes[coldShoes.length-1]);}
    //   }
    //   if($("#myImage").click() == true)
    //     $("#myImage").attr("src", "/uploads/" + warmShirts[0]);




// window.onload = function() {
//   var warmShirts = [],warmPants = [], warmShoes = [],coldShirts = [],coldPants = [], coldShoes = [];
//   for(let i = 0;i < filesNames.length; ++i){
//     if(filesNames[i].charAt(0)=='w' && filesNames[i].charAt(1)=='i')
//       {warmShirts.push(filesNames[i]); console.log('warmShirt : ' + warmShirts[warmShirts.length-1]);}
//     else if(filesNames[i].charAt(0)=='w' && filesNames[i].charAt(1)=='n')
//       {warmPants.push(filesNames[i]); console.log('warmPants : ' + warmPants[warmPants.length-1]);}
//     else if(filesNames[i].charAt(0)=='w' && filesNames[i].charAt(1)=='o')
//       {warmShoes.push(filesNames[i]); console.log('warmShoes : ' + warmShoes[warmShoes.length-1]);}
//     else if(filesNames[i].charAt(0)=='c' && filesNames[i].charAt(1)=='i')
//       {coldShirts.push(filesNames[i]); console.log('coldShirts : ' + coldShirts[coldShirts.length-1]);}
//     else if(filesNames[i].charAt(0)=='c' && filesNames[i].charAt(1)=='n')
//       {coldPants.push(filesNames[i]); console.log('coldPants : ' + coldPants[coldPants.length-1]);}
//     else if(filesNames[i].charAt(0)=='c' && filesNames[i].charAt(1)=='o')
//       {coldShoes.push(filesNames[i]); console.log('coldShoes : ' + coldShoes[coldShoes.length-1]);}
//     }
//     document.getElementById('myImage').src = 'uploads/' + warmShirts[0];
// }

// var warmShirts = [],warmPants = [], warmShoes = [],coldShirts = [],coldPants = [], coldShoes = [];
 
// for(let i = 0;i < data.length; ++i){
//   if(data[i].charAt(0)=='w' && data[i].charAt(1)=='i')
//     {warmShirts.push(data[i]); console.log('warmShirt : ' + warmShirts[warmShirts.length-1]);}
//   else if(data[i].charAt(0)=='w' && data[i].charAt(1)=='n')
//     {warmPants.push(data[i]); console.log('warmPants : ' + warmPants[warmPants.length-1]);}
//   else if(data[i].charAt(0)=='w' && data[i].charAt(1)=='o')
//     {warmShoes.push(data[i]); console.log('warmShoes : ' + warmShoes[warmShoes.length-1]);}
//   else if(data[i].charAt(0)=='c' && data[i].charAt(1)=='i')
//     {coldShirts.push(data[i]); console.log('coldShirts : ' + coldShirts[coldShirts.length-1]);}
//   else if(data[i].charAt(0)=='c' && data[i].charAt(1)=='n')
//     {coldPants.push(data[i]); console.log('coldPants : ' + coldPants[coldPants.length-1]);}
//   else if(data[i].charAt(0)=='c' && data[i].charAt(1)=='o')
//     {coldShoes.push(data[i]); console.log('coldShoes : ' + coldShoes[coldShoes.length-1]);}
//   }

// function changePic(chg)
//   {
//     var httpRequest = new XMLHttpRequest();
//     httpRequest.open("GET", window.location.origin + '/clothes', true)
//     httpRequest.send(null);
    

//     for(let i = 0;i < data.length; ++i){
//       if(data[i].charAt(0)=='w' && data[i].charAt(1)=='i')
//         {warmShirts.push(data[i]); console.log('warmShirt : ' + warmShirts[warmShirts.length-1]);}
//       else if(data[i].charAt(0)=='w' && data[i].charAt(1)=='n')
//         {warmPants.push(data[i]); console.log('warmPants : ' + warmPants[warmPants.length-1]);}
//       else if(data[i].charAt(0)=='w' && data[i].charAt(1)=='o')
//         {warmShoes.push(data[i]); console.log('warmShoes : ' + warmShoes[warmShoes.length-1]);}
//       else if(data[i].charAt(0)=='c' && data[i].charAt(1)=='i')
//         {coldShirts.push(data[i]); console.log('coldShirts : ' + coldShirts[coldShirts.length-1]);}
//       else if(data[i].charAt(0)=='c' && data[i].charAt(1)=='n')
//         {coldPants.push(data[i]); console.log('coldPants : ' + coldPants[coldPants.length-1]);}
//       else if(data[i].charAt(0)=='c' && data[i].charAt(1)=='o')
//         {coldShoes.push(data[i]); console.log('coldShoes : ' + coldShoes[coldShoes.length-1]);}
//       }  

//     var num = Math.floor(Math.random() * data.length);
//       if(chg == 'one'){
//           if(num % 2 == 0){
//             var num2 = Math.floor(Math.random() * warmShirts.length);
//             document.getElementById('myImage').src = 'uploads/' + warmShirts[num2];
//           }
//           else {
//             var num2 = Math.floor(Math.random() * coldShirts.length);
//             document.getElementById('myImage').src = 'uploads/' + coldShirts[num2];
//           }
//       }
//       if (chg == 'two'){
//         if(num % 2 == 0){
//           var num2 = Math.floor(Math.random() * warmPants.length);
//           document.getElementById('myImage2').src = 'uploads/' + warmPants[num2];
//         }
//         else {
//           var num2 = Math.floor(Math.random() * coldPants.length);
//           document.getElementById('myImage2').src = 'uploads/' + coldPants[num2];
//         }
//       }
//       if (chg == 'three'){
//         if(num % 2 == 0){
//           var num2 = Math.floor(Math.random() * warmShoes.length);
//           document.getElementById('myImage3').src = 'uploads/' + warmShoes[num2];
//         }
//         else{
//           var num2 = Math.floor(Math.random() * coldShoes.length);
//           document.getElementById('myImage3').src = 'uploads/' + coldShoes[num2];
//         }
//       }
// }


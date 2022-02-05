const wrapper = document.querySelector(".wrapper"),
 infoTxt =  wrapper.querySelector(".input-part .info-txt"),
 inputField = wrapper.querySelector(".input-part input"),
 locationBtn = wrapper.querySelector(".input-part button"),
 wIcon = document.querySelector(".weather-part img"),
 arrowBack = wrapper.querySelector("header i");
let api; //declaring api

 inputValue = inputField.addEventListener("keyup", e =>{
  // if user pressed enter btn and input value is not null
  if(e.key == "Enter" && inputField.value != ""){
    requestApi(inputField.value);
  }
});


// LocationButton
 locationBtn.addEventListener("click", function(){
  if(navigator.geolocation){
    // if browser supports geolocation api
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  else{
    alert("Your browser does not support geolocation api");
  }
});
// on valid input data
function onSuccess(position){
  const {latitude, longitude} =position.coords; //getting lat and lon of the user device from coords of the json data
 api = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&units=metric&appid=41b15de76bc0a4dba93fb630654cec30';
fetchData();
}
// display error msg
function onError(error){
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}


// requestApi from web
function requestApi(city){
 api = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=41b15de76bc0a4dba93fb630654cec30';
  fetchData();
}

function fetchData(){
  infoTxt.innerText = "Getting weather details...";
  infoTxt.classList.add("pending");
  // getting api response and returning it with parsing into js obj and in another
  // then function calling weatherDetails function with passing api result as an argument
  fetch(api).then(response => response.json()).then(result =>weatherDetails(result));
}


function weatherDetails(info){
  infoTxt.classList.replace("pending","error");
  if(info.cod =="404"){
    infoTxt.innerText = inputField.value+' isn\'t a valid city name';
  }else{
    // require properties value from the json fetchData
    const city = info.name;
    const country = info.sys.country;
    const {description, id}= info.weather[0];
    const {feels_like, humidity,temp}= info.main;

  // using custom icon according to the id which api  provides
  if(id == 800){
    wIcon.src = "images/clear.svg";
  }else if(id >= 200 && id <= 232){
    wIcon.src = "images/storm.svg";
  }else if(id >= 600 && id <= 622){
    wIcon.src = "images/snow.svg";
  }else if(id >= 701 && id <= 781){
    wIcon.src = "images/haze.svg";
  }else if(id >= 801 && id <= 804){
    wIcon.src = "images/cloud.svg";
  }else if((id >= 300 && id <= 321) || (id >= 500 && id <= 531)){
    wIcon.src = "images/rain.svg";
  }


    // passing these values to a particular html element
     wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
      wrapper.querySelector(".weather").innerText = description;
       wrapper.querySelector(".location span").innerText =`${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

// weather data page
      infoTxt.classList.remove("pending","error");
       wrapper.classList.add("active");
  }

}
// arrow back navigation
arrowBack.addEventListener("click",()=>{
  wrapper.classList.remove("active");

});

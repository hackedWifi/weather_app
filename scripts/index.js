const API = 'b9c2819962132437a4ae7b774e8f676e'
var city_id = document.getElementById("city");
var deg_id = document.getElementById("degrees");
var temp_id = document.getElementById("temp");
var img_id = document.getElementById("img");
var temp = 0;
var isCelsius = true;
deg_id.addEventListener('click', toggleTemp);
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    //k    output.innerHTML = "<p>Gelolocations is not supported by your browser</p>";
}
else {
    error();
}

function error(){

    city_id.innerHTML = "Unable to retrieve your location"
     deg_id.innerHTML = ' ';

}

function success(position) {
    getWeather(position);
}

function getWeather(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${API}&units=Imperial `;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url , true);

    xhr.onload = function()
        {
            if(this.status == 200)
            {
                var res = JSON.parse(this.response);
               temp = res.list[0].main.temp;
                console.log(res)
                updateTemp(res)
            }

        }
    xhr.send();
}

function updateTemp(data){
    var temp = Math.round(data.list[0].main.temp);
    var city = data.city.name;
    var icon = data.list[0].weather[0].icon;

    var img_url = 'https://openweathermap.org/img/w/' + icon +'.png';
    var elem = document.createElement("IMG");
    elem.setAttribute("src", img_url);
               img_id.appendChild(elem);

    city_id.innerHTML = city;
    temp_id.innerHTML = temp;
}

function toggleTemp()
{
    if(isCelsius)
    {
        temp = Math.round((temp - 32) / 1.8);
        isCelsius = false;
        deg_id.innerHTML = "°C";

}
else {
        temp = Math.round((temp *1.8) + 32);
        isCelsius = true;
        deg_id.innerHTML = "°F";

    }
        temp_id.innerHTML = temp;
}

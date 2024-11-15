const cname = document.querySelector(".city_nameandcountry");
const date_time = document.querySelector(".date_time");
const weather_data = document.querySelector(".data");
const icon = document.querySelector(".icon");
const temp = document.querySelector(".temp");
const min = document.querySelector(".min");
const max = document.querySelector(".max");


const flsl = document.querySelector(".feelslike");
const hmdt = document.querySelector(".humidity");
const wnd = document.querySelector(".wind");
const prsr = document.querySelector(".pressure");


let city = "pune";
const form = document.querySelector(".weather_search");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const value = document.querySelector(".input");
    city = value.value;
    getWeatherdata();
    value.value ="";
})


const getcountryname = (id) => {
    return new Intl.DisplayNames([id], { type: 'region' }).of(id);

}
const getdate_time = (dt) => {
    let date_time = dt;
    const date = new Date(date_time * 1000);
    return new Intl.DateTimeFormat('en-US', {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    }).format(date);

}

const getWeatherdata = async () => {
    const weatherData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=20160e67dc800aedec9dab097f4dab44`;
    try {
        const res = await fetch(weatherData);
        const data = await res.json();
        const { name, dt, main, sys, weather, wind } = data;
        console.log(data);
        cname.innerText = `${name} , ${getcountryname(sys.country)}`;
        date_time.innerText = getdate_time(dt);
        weather_data.innerHTML = weather[0].main;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="" />`;
        temp.innerHTML = `${main.temp}&#176`;
        min.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`;
        max.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`;
        flsl.innerHTML = `${main.feels_like}&#176`;
        hmdt.innerHTML = `${main.humidity}%`;
        wnd.innerHTML = `${wind.speed}m/s`;
        prsr.innerHTML = `${main.pressure}Pa`;
    } catch (error) {
        console.log(error);

    }

}

document.body.addEventListener("load", getWeatherdata());
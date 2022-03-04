
// let estado = document.querySelector(".estado").value;
// let pais = document.querySelector(".pais").value;



function mostraLocalizacao(resposta){
    console.log(resposta);
    // let objeto = resposta;
    let html = document.querySelector(".mostra-dados");
    html.innerHTML = "";
    html.innerHTML += `<div class="local-temperatura">
    <p>Informações sobre a localização:</p>
    <div class="localizacao">
    <p>Cidade:${resposta.data[0].name}</p>
    <p>Estado:${resposta.data[0].state}</p>
    <p>País:${resposta.data[0].country}</p>
    <p>Latitude:${resposta.data[0].lat}</p>
    <p>Longitude:${resposta.data[0].lon}</p>
    </div>
    </div>`
    const promiseTemp = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${resposta.data[0].lat}&lon=${resposta.data[0].lon}&appid=a0616958b92cd8c77659887092d855e4`);
    promiseTemp.then(mostraTemperatura);
}


function mostraTemperatura(resposta){
    console.log(resposta);
    let temp = (resposta.data.main.temp - 273.15).toFixed(2);
    let tempMax = (resposta.data.main.temp_max - 273.15).toFixed(2);
    let tempMin = (resposta.data.main.temp_min - 273.15).toFixed(2);
    let sensacao = (resposta.data.main.feels_like - 273.15).toFixed(2);
    let pressao = resposta.data.main.pressure;
    let umidade = resposta.data.main.humidity;
    let temperatura = document.querySelector(".local-temperatura");
    temperatura.innerHTML += `
    <p>Informações climáticas:</p>
    <div class="temperatura"><p>Temperatura:${temp}°C</p>
    <p>Temperatura Máxima:${tempMax}°C</p>
    <p>Temperatura Mínima:${tempMin}°C</p>
    <p>Sensação térmica:${sensacao}°C</p>
    <p>Sensação térmica:${pressao}mB</p>
    <p>Sensação térmica:${umidade}%</p>
    </div>`
}

function pesquisar(){
    let cidade = document.querySelector(".cidade").value;
    if(cidade !== ""){
        let promise = axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cidade},&limit=${1}&appid=a0616958b92cd8c77659887092d855e4`);
        let limpaInput = document.querySelector(".cidade");
        limpaInput.value = ""; 
        promise.then(mostraLocalizacao);
    }
}


// api.openweathermap.org/data/2.5/weather?lat=-15.8957166&lon=-52.2514538&appid=a0616958b92cd8c77659887092d855e4
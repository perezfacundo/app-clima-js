let urlBase = 'https://api.openweathermap.org/data/2.5/weather'
let api_key = '88b6858c36fe30c366f5689b95dfb668'
let difKelvin = 273.15

document.getElementById('botonBusqueda').addEventListener('click', () => {
    let ciudad = document.getElementById('ciudadEntrada').value
    if(ciudad){
        fetchDatosClima(ciudad)
    }    
})

function fetchDatosClima(ciudad){
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then(response => response.json())
    .then(response => mostrarDatosClima(response))
}

function mostrarDatosClima(response){
    console.log(response)
    const divDatosClima = document.getElementById('datosClima')
    divDatosClima.innerHTML = ''

    //nombre ciudad y pais
    const ciudad = response.name
    const abrPais = response.sys.country
    const eTitulo = document.createElement('h2')
    eTitulo.textContent = `${ciudad} - ${abrPais}`

    //temperatura
    const temperatura = Math.floor((response.main.temp) - difKelvin)
    const eTemperatura = document.createElement('p')
    eTemperatura.textContent = `La temperatura es de ${temperatura} grados`

    //icono
    const icono = response.weather[0].icon
    const eIcono = document.createElement('img')
    eIcono.src = `https://openweathermap.org/img/wn/${icono}@2x.png`

    //descripcion
    const descripcion = response.weather[0].description
    const eDescripcion = document.createElement('p')
    eDescripcion.textContent = descripcion

    divDatosClima.appendChild(eTitulo)
    divDatosClima.appendChild(eTemperatura)
    divDatosClima.appendChild(eIcono)
    divDatosClima.appendChild(eDescripcion)

    ciudadEntrada.focus()
    ciudadEntrada.value = ''
}
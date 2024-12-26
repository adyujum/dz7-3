//phone block

const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/;


phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'Invalid phone number'
        phoneResult.style.color = 'red'
    }
}
/// TAB SLIDER
const  tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')
let currentIndex = 0

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}
const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
    currentIndex = index
}
const auto = () => {
    setInterval(() => {
        currentIndex++
        if (currentIndex > tabContentBlocks.length - 1) {
            currentIndex = 0
        }
        hideTabContent()
        showTabContent(currentIndex)
    }, 3000)
}


hideTabContent()
showTabContent()
auto()


tabsParent.onclick = (event) => {
    if(event.target.classList.contains('tab_content_item')) {
        tabs.forEach((item,index) => {
            if(event.target === item) {
                hideTabContent()
                showTabContent(index)
            }
        })
    }
}

//CONVERTER

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const euroInput = document.querySelector('#eur')



const converter = (element, targetElement, targetElement2) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/converter.json');
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)
            if(targetElement.id === 'som'){
                targetElement.value = (element.value * data.usd).toFixed(2)
                targetElement2.value = (element.value * data.eur).toFixed(2)
            }
            if(targetElement.id === 'usd'){
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }
            if(targetElement.id === 'eur'){
                targetElement.value = (element.value / data.usd).toFixed(2)
                targetElement2.value = (element.value / data.eur).toFixed(2)
            }
            if(element.value === '') {
                targetElement.value = ''
                targetElement2.value = ''

            }


        }
    }

}
converter(somInput, usdInput, euroInput)
converter(usdInput, somInput, euroInput)
converter(euroInput,somInput,usdInput)


// CARD SWITCHER
const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')

let cardId = 1
let maxId = 200

const cardSwitcher = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`)
        .then(response => response.json())
        .then((data) => {
            const {title, completed, id} = data
            cardBlock.innerHTML = `
            <p>${title}</p>
            <p>${completed}</p>
            <span>${id}</span>
            `
        })
}
const cardSwitcherNext = () => {
    if(cardId >= maxId) {
        cardId = 1
    } else {
        cardId++
    }
    cardSwitcher()
}
const cardSwitcherPrev = () => {
    if(cardId <= 1) {
        cardId = maxId
    } else {
        cardId--
    }
    cardSwitcher()
}
cardSwitcher()
btnNext.onclick = () => cardSwitcherNext()
btnPrev.onclick = () => cardSwitcherPrev()


fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then((data) => console.log(data))

//WEATHER

const inputSearch =  document.querySelector('.cityName');
const searchBtn = document.querySelector('#search')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')
const weatherBlock = document.querySelector('#weather_block')

const API = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'appid=e417df62e04d3b1b111abeab19cea714'

searchBtn.onclick = () => {
    fetch(`${API}?${API_KEY}&q=${inputSearch.value}&units=metric`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            city.innerHTML = data.name || 'Город не найден...'
            temp.innerHTML = data.main?.temp?  Math.round(data.main?.temp) + '&deg;C' : '(●\'◡\'●)'
            weatherBlock.src = `http://api.openweathermap.org/img/wn/${data.weather[0].icon}.png`

        })
    inputSearch.value = ''
}





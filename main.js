// Объект состояния валют.
const exchangeRates = {};

const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

const input = document.querySelector('#input');
const select = document.querySelector('#select');
const result = document.querySelector('#result');

getCurrencies();

async function getCurrencies() {
    const responsePromise = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await responsePromise.json();
    const result = await data;


    // Сохраниение в состояние небходимых валют.
    exchangeRates.USD = result.Valute.USD;
    exchangeRates.EUR = result.Valute.EUR;
    exchangeRates.GBP = result.Valute.GBP;

    console.log(exchangeRates);



    // Рендер валют на страницу.
    elementUSD.textContent = exchangeRates.USD.Value.toFixed(2);
    elementEUR.textContent = exchangeRates.EUR.Value.toFixed(2);
    elementGBP.textContent = exchangeRates.GBP.Value.toFixed(2);



    // Цвет отображения роста/падения валюты.
    if (exchangeRates.USD.Value > exchangeRates.USD.Previous) {
        elementUSD.classList.add('top')
    } else {
        elementUSD.classList.add('bottom')
    }

    if (exchangeRates.EUR.Value > exchangeRates.EUR.Previous) {
        elementEUR.classList.add('top')
    } else {
        elementEUR.classList.add('bottom')
    }

    if (exchangeRates.GBP.Value > exchangeRates.GBP.Previous) {
        elementGBP.classList.add('top')
    } else {
        elementGBP.classList.add('bottom')
    }
}

// Функиия онвертации валют.
const convertValue = () => result.value = (parseFloat(input.value) / exchangeRates[select.value].Value).toFixed(2);
// Слушаем изменнения в input и select
input.oninput = () => convertValue();
select.oninput = () => convertValue();


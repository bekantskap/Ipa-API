'use strict';

let url = 'https://api.punkapi.com/v2/beers?page=1&per_page=10';
let baseUrl = 'https://api.punkapi.com/v2/';
let beerList = document.getElementById('found-beer-list');
let searchInputEl = document.getElementById('search-input');
const linkEl = document.getElementById('randomLink');

let selectedIndex, input, param;
let page = 1;
let nextPageEl = document.getElementById('next-page');
let previousPageEl = document.getElementById('previous-page');
// previousPageEl.classList.add('hidden');

nextPageEl.addEventListener('click', async function () {
  updateParams();
  page++;
  let beers = await getBeers(param, input);

  updateUI(beers);
});
previousPageEl.addEventListener('click', async function () {
  updateParams();
  page--;
  let beers = await getBeers(param, input);
  updateUI(beers);
});

searchInputEl.addEventListener('keyup', async e => {
  page = 1;
  if (e.key === 'Enter') {
    updateParams();
    let beers = await getBeers(param, input);

    updateUI(beers);
  }
});

linkEl.addEventListener('click', async function () {
  param = beer_name;

  beers.forEach(beer => {
    input = Math.floor(Math.random) * beers.length;
  });
  console.log(input);

  let beers = await getBeers(param, input);
});

async function updateParams() {
  param = document.getElementById('param-selector');
  selectedIndex = param.selectedIndex;
  param = param.options[selectedIndex].value;
  input = searchInputEl.value;
}

function updateUI(beers) {
  beerList.innerHTML = '';
  beers.forEach(beer => {
    let listItem = document.createElement('li');
    let link = document.createElement('a');
    let name = document.createElement('h1');
    let tag = document.createElement('p');
    let img = document.createElement('img');
    let percent = document.createElement('p');
    let desc = document.createElement('p');
    link.href = 'random.html';
    name.innerText = beer.name;
    tag.innerText = beer.tagline;
    desc.innerText = beer.description;
    img.src = beer.image_url;
    percent.innerText = `Percent: ${beer.abv}`;
    beerList.appendChild(listItem);
    listItem.appendChild(link);
    link.appendChild(name);
    link.appendChild(tag);
    link.appendChild(img);
    // listItem.appendChild(desc);
    link.appendChild(percent);
    // isLastorFirstPage();
  });
}

function isLastorFirstPage() {
  if (page > 1) {
    previousPageEl.classList.remove('hidden');
  } else {
    previousPageEl.classList.add('hidden');
  }
  if (page < 5) {
    nextPageEl.classList.add('hidden');
  } else {
    nextPageEl.classList.remove('hidden');
  }
}

async function getBeers(param, value) {
  try {
    let response = await fetch(
      `${baseUrl}beers?${param}=${value}&page=${page}&per_page=5`
    );
    let data = await response.json();
    return await data;
  } catch (err) {
    console.error(err);
  }
}

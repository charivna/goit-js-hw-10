import { fetchBreeds, fetchCatByBreed } from "./cat-api"

const refs = {
    selectEl: document.querySelector('select.breed-select'),
    infoCat: document.querySelector('.cat-info'),
    errorEl: document.querySelector('.error'),
    loaderEL: document.querySelector('.loader')
}

fetchBreeds().then(data => {
    getValueToSelect(data)
}).catch(err => console.log(err))
    

function getValueToSelect(data) {
   const catsInfo = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join(' ');  
    refs.selectEl.insertAdjacentHTML('beforeend', catsInfo);
    } 

refs.selectEl.addEventListener('change', onSelect)

function onSelect(event) {
    fetchCatByBreed(event.target.value)
        .then(data => {
            let catInfo = data[0];
            console.log(catInfo);
            const catCard = `<img src="${catInfo.url}" alt="Cat image" width = 500></img>
            <h2>${catInfo.breeds[0].name}</h2>
            <p>Description: ${catInfo.breeds[0].description}</p>
            <p>Temperament: ${catInfo.breeds[0].temperament}</p>`

            refs.infoCat.innerHTML = catCard
        }).catch( err => console.log( err ) )
}

function hideLoader() {
    refs.loaderEL.style.display = 'none'
}

function showLoader() {
    refs.loaderEL.style.display = 'block'
}

function hideSelect() {
    refs.selectEl.style.display = 'none'
}

function showSelect() {
    refs.selectEl.style.display = 'block'
}

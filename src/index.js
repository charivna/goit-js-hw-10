import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const refs = {
    selectEl: document.querySelector('select.breed-select'),
    infoCat: document.querySelector('.cat-info'),
    errorEl: document.querySelector('.error'),
    loaderEL: document.querySelector('.loader')
}



showEl(refs.loaderEL)
hideEl(refs.selectEl)  
    
fetchBreeds().then(data => {
    getValueToSelect(data)
}).catch(err => Notiflix.Notify.failure(`${refs.errorEl.textContent}`)).finally(() => { hideEl(refs.loaderEL); showEl(refs.selectEl)})

    

function getValueToSelect(data) {
   const catsInfo = data
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join(' ');  
    refs.selectEl.insertAdjacentHTML('beforeend', catsInfo);
    new SlimSelect({
    select: refs.selectEl
})
} 
    
   
refs.selectEl.addEventListener('change', onSelect)

function onSelect(event) {

    showEl(refs.loaderEL);
    hideEl(refs.infoCat)

    fetchCatByBreed(event.target.value)
        .then(data => {
               
            let catInfo = data[0];
            console.log(catInfo);
            const catCard = `<img src="${catInfo.url}" alt="Cat image" width = 500></img>
            <h2>${catInfo.breeds[0].name}</h2>
            <p>Description: ${catInfo.breeds[0].description}</p>
            <p>Temperament: ${catInfo.breeds[0].temperament}</p>`

            refs.infoCat.innerHTML = catCard
        }).catch(err => Notiflix.Notify.failure(`${refs.errorEl.textContent}`)).finally(() => { hideEl(refs.loaderEL); showEl(refs.infoCat); })
}

function hideEl(el) {
    el.classList.add('hidden')
}

function showEl(el) {
    el.classList.remove('hidden')
}


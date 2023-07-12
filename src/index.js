import { fetchBreeds, fetchCatByBreed } from "./cat-api"

refs = {
    selectEl: document.querySelector('select.breed-select'),
    infoCat: document.querySelector('.cat-info'),
    errorEl: document.querySelector('.error'),
    loaderEL: document.querySelector('.loader')
}


fetchBreeds()

refs.selectEl.addEventListener('change', (event) => {
    const selectedBreedId = event.target.value;

    fetchCatByBreed(selectedBreedId);
});
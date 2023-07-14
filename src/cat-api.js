// import axios from "axios";
// axios.defaults.headers.common["x-api-key"] = "live_hlBvwU7f4qPZLTDeNehIKrPTknEulvSeQPwDAYbbrTXj4DszHTLcadwiaj0rwN8g"; - НЕ ПРАЦЮЄ!




const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_hlBvwU7f4qPZLTDeNehIKrPTknEulvSeQPwDAYbbrTXj4DszHTLcadwiaj0rwN8g'


export function fetchBreeds() {

    return fetch(`${BASE_URL}/breeds`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        })
}

export function fetchCatByBreed(breedId)
{
    return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}&api_key=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
             throw new Error(response.statusText)
            }
            return response.json()
    })
}
         


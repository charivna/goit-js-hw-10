import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_hlBvwU7f4qPZLTDeNehIKrPTknEulvSeQPwDAYbbrTXj4DszHTLcadwiaj0rwN8g";

// колекція порід

export const BASE_URL = 'https://api.thecatapi.com/v1'

export function fetchBreeds() {
     fetch(`${BASE_URL}/breeds`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
        return response.json();
        })
        .then((data) => {
            const catInfo = data
                .map(({ id, name }) => `<option value="${id}">${name}</option>`)
                .join(' ');
            
            refs.selectEl.insertAdjacentHTML('beforeend', catInfo);
        
        }
        )
        .catch(err => {
        console.log(err);
    })
}

export function fetchCatByBreed(breedId) {
   fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        })
        .then((data) => {
            if (data.length > 0) {
                const catData = data[0];
                const catImage = `<img srs="${catData.url}" alt="Cat image"></img>`;
                const catInfo = `<h2>${catData.breeds[0].name}</h2>
          <p>Description: ${catData.breeds[0].description}</p>
          <p>Temperament: ${catData.breeds[0].temperament}</p>
        `;
                refs.infoCat.innerHTML = catImage + catInfo;
            }
            
        }
        )
}

fetch('https://striveschool-api.herokuapp.com/api/product/', {
        method: 'GET'
    })
    .then((response) => {
        console.log(response)

        if (response.ok) {
            
            return response.json()
        } else {
            
            if (response.status === 400) { throw new Error("Bad Request") }
            if (response.status === 401) { throw new Error("Unauthorized") }
            if (response.status === 403) { throw new Error("Forbidden") }
            if (response.status === 404) { throw new Error("Not Found") }
            if (response.status === 500) { throw new Error("Server Error") }

            throw new Error("Generic Fetch Error")

        }
    })
        .then(products => {
            const row = document.getElementById("products-container")
            libraryData.forEach(book => {

                const col = document.createElement("col")
                col.classList.add("col")
                const card = document.createElement("div")
                card.classList.add("card")

                card.innerHTML =  `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text">Prezzo: ${product.price}</p>
                            <img src="${product.imageUrl}" class="card-img-top">
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => {
            console.error('Errore durante la richiesta GET:', error);
        });
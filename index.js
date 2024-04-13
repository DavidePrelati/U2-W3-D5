const URL = "https://striveschool-api.herokuapp.com/api/product/";

window.addEventListener("DOMContentLoaded", () => {
    fetch(URL, {
        method: "GET",
        headers: {
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI4MTdmMzA0NjAwMWFlNTlmNmMiLCJpYXQiOjE3MTI5MjA5MDMsImV4cCI6MTcxNDEzMDUwM30.uu50kHV7QgEfBYDulsYPFV7jvPOjtAHV7RSqaNDtcmM",
        },
    })
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("Errore nella visualizzazione dello shop");
            }
        })
        .then((products) => {
            const row = document.getElementById("row");
            
            products.forEach((product) => {
                const col = document.createElement("div");
                col.classList.add("col");
                col.innerHTML = `<div class="card shadow-sm h-100"> 
                            <img src=${product.imageUrl} class="img-fluid card-img-top" style="height: 200px;">
                            <div class="card-body mt-auto border border-2"> 
                            <h3 class="card-text">${product.name}</h3> 
                            <p class="card-text small">By ${product.brand}</p>
                            <p class="card-text text-success">€${product.price}</p> 
                            <a href="details.html?appId=${product._id}" class="btn btn-success">Scopri di più</a>
                            <a href="backoffice.html?appId=${product._id}" class="btn btn-dark">Modifica</a>
                            </div>
                            </div>
                `;
                row.appendChild(col);
            });
        })
        .catch((err) => {
            console.log(err);
        });
});
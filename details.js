const p = new URLSearchParams(window.location.search);
const id = p.get("appId");
const URL = "https://striveschool-api.herokuapp.com/api/product/" + id;
console.log(id);

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
                throw new Error("Error getting the images");
            }
        })
        .then((product) => {
            const row = document.getElementById("row");
            console.log(row);
            console.log(product);
            const col = document.createElement("div");
            col.classList.add("col");
            col.innerHTML = `<div class="card  mb-3 pt-4" >
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${product.imageUrl} class="img-fluid rounded-start" style="height: 350px;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h3 class="card-title pt-4">${product.name}</h3>
                            <p class="card-text pt-4">${product.brand}</p>
                            <p class="card-text small">${product.description}</p>
                            <p class="card-text pt-4">€${product.price}</p>
                            <p class="card-text pt-4"><small class="text-body-secondary">${product._id}</small></p>
                        </div>
                    </div>
                </div>
            </div>`;

            row.appendChild(col);
        })
        .catch((err) => {
            console.log(err);
        });
});
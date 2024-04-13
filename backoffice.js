const params = new URLSearchParams(window.location.search)
const id = params.get("appId")
const URL = id ? "https://striveschool-api.herokuapp.com/api/product/" + id : "https://striveschool-api.herokuapp.com/api/product/"
const method = id ? "PUT" : "POST"

window.addEventListener("DOMContentLoaded", () => {

    console.log("RESOURCE ID: " + id) 

    const form = document.querySelector("form")
    form.addEventListener("submit", handleSubmit)

    const btnSubmit = document.querySelector("button[type='submit']")
    const delBtn = document.querySelector(".btn-danger")
    const subtitle = document.getElementById("subtitle")

    if (id) {
       
        subtitle.innerText = "— Modifica l'oggetto selezionato"
        btnSubmit.classList.remove("btn-primary")
        btnSubmit.classList.add("btn-success")
        btnSubmit.innerText = "Modifica"
        delBtn.addEventListener("click", handleDelete)
        delBtn.classList.remove("d-none")

        fetch(URL, {
            method,
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI4MTdmMzA0NjAwMWFlNTlmNmMiLCJpYXQiOjE3MTI5MjA5MDMsImV4cCI6MTcxNDEzMDUwM30.uu50kHV7QgEfBYDulsYPFV7jvPOjtAHV7RSqaNDtcmM",
            },
        }) 
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Errore nella fetch")
                }
            })
            .then(appToModify => {
                console.log("Dati ottenuti:", appToModify);
                const { name, description, price, brand, imageUrl } = appToModify
                console.log("Valori:", name, description, price, brand, imageUrl);

              
                document.getElementById("name").value = name
                document.getElementById("description").value = description
                document.getElementById("brand").value = brand
                document.getElementById("imageUrl").value = imageUrl
                document.getElementById("price").value = price

                document.querySelector('form').setAttribute('data-product-id', appToModify._id);
            })
            .catch(err => console.log(err))


    } else {
        subtitle.innerText = "— Crea oggetto"
    }
})

const handleSubmit = (event) => {
    console.log("EVENT", event)
    event.preventDefault() 
    const newProduct = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: document.getElementById("price").value,
    }
   
    fetch(URL, {
        method: method, 
        body: JSON.stringify(newProduct), 
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI4MTdmMzA0NjAwMWFlNTlmNmMiLCJpYXQiOjE3MTI5MjA5MDMsImV4cCI6MTcxNDEzMDUwM30.uu50kHV7QgEfBYDulsYPFV7jvPOjtAHV7RSqaNDtcmM" // metodo di autenticazione con API Key standard
        }
    })
        .then(resp => {
            if (resp.ok) {
                return resp.json()
            } else {
                throw new Error("Errore nella fetch")
            }
        })
        .then(createdObject => {
            

            if (id) {
                alert("Risorsa con id: " + createdObject._id + " MODIFICATA con successo!")

            } else {
                alert("Risorsa con id: " + createdObject._id + " CREATA con successo!")

                event.target.reset()
            }

        })
        .catch(err => console.log(err))
}

const handleDelete = () => {
    const hasConfirmed = confirm("vuoi eliminare l'oggetto?")

    if (hasConfirmed) {
        fetch(URL, {
            method: "DELETE",
            headers: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI4MTdmMzA0NjAwMWFlNTlmNmMiLCJpYXQiOjE3MTI5MjA5MDMsImV4cCI6MTcxNDEzMDUwM30.uu50kHV7QgEfBYDulsYPFV7jvPOjtAHV7RSqaNDtcmM",
            },
        })
            .then(resp => resp.json())
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    throw new Error("Errore nella fetch")
                }
            })
            .then(deletedObj => {
                alert("Risorsa: " + deletedObj.name + " Eliminata con successo!")
       
                window.location.assign("./index.html")
            })
            .catch(err => console.log(err))
    }
}

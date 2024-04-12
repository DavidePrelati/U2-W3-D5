
window.onload = () => {
    const form = document.querySelector("form")
    form.addEventListener("submit", handleSubmit)
}
const URL = "https://striveschool-api.herokuapp.com/api/product/"
const handleSubmit = (event) => {
    const newProduct = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        brand: document.getElementById("brand").value,
        imageUrl: document.getElementById("imageUrl").value,
        price: document.getElementById("price").value
       
    };
    console.log("EVENT", event)
    event.preventDefault()
    // Effettua la richiesta POST al server
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(newProduct),
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE4ZWI4MTdmMzA0NjAwMWFlNTlmNmMiLCJpYXQiOjE3MTI5MjA5MDMsImV4cCI6MTcxNDEzMDUwM30.uu50kHV7QgEfBYDulsYPFV7jvPOjtAHV7RSqaNDtcmM"
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore durante la creazione del nuovo prodotto');
            }
            return response.json(); // Estrai il corpo della risposta come JSON
        })

        .then(createdProduct => {
            alert("Risorsa creata con successo!" + createdProduct._id)

            event.target.reset()

        })
        .catch(err => console.log(err))
}
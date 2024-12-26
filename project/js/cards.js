const cardLIst = document.querySelector('.card_list')

let cardId = 0


const cards = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/');
        const data = await response.json()
        data.forEach(()=> {
            const {title, body} = data[cardId]
            cardLIst.innerHTML += `
        <div class="titan">
            <img src="../img/gogo.jpg" alt="gogo">
            <h3>${title}</h3>
            <p>${body}</p>
        
        </div>
        `

        })

    }catch (err) {
        console.log(err)
    }
}
cards()
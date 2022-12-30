document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
        let list = document.getElementById('list')
        let showpanel = document.getElementById('show-panel')
        let likePanel = document.getElementById('like-panel')
        data.forEach(element => {
            let bookTitle = document.createElement('li')
            bookTitle.textContent = element.title
            list.append(bookTitle)
            bookTitle.addEventListener('click', () => {
                showpanel.innerHTML = ""
                let bookThumbnail = document.createElement('img')
                bookThumbnail.src = element.img_url
                showpanel.append(bookThumbnail)
                let bookDescription = document.createElement('div')
                bookDescription.textContent = element.description
                showpanel.append(bookDescription)
                let likeUsers = document.createElement('ul')
                element.users.forEach(element => {
                    let user = document.createElement('li')
                    user.textContent = element.username
                    likeUsers.append(user)
                })
                showpanel.append(likeUsers)
                let likeButton = document.createElement('button')
                likeButton.innerText = "♡"
                likeButton.style.fontSize = "large"
                showpanel.append(likeButton)
                likeButton.addEventListener('click', () => {
                    element.users.push({
                        id: 17,
                        username: "turbochad"
                    })
                    
                    fetch(`http://localhost:3000/books/${element.id}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(
                            element
                        )
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.users)
                        console.log(element.users)
                    })
                })
                let testButton = document.createElement('button')
                testButton.innerText = "CONSOLE TEST"
                testButton.style.fontSize = "large"
                showpanel.append(testButton)
                testButton.addEventListener('click', () => {
                    console.log(element.users)
                })
            })
        });
    })
});



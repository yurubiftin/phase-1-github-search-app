document.addEventListener('DOMContentLoaded', (event)=> {
    event.preventDefault()
    const gitSearch= document.querySelector('#github-form')
    gitSearch.addEventListener('submit',function(e){
        e.preventDefault()
        const ul = document.querySelector('#user-list')
        let child = ul.lastElementChild;
        while(child){
                ul.removeChild(child);
                child = ul.lastElementChild;

       }
        findUser(e.target.search.value)
})
})

function findUser(name){
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(response => response.json())
    .then(users =>{
        users.items.forEach((user) =>{
            let li = document.createElement('li')
            li.style.display = 'flex'
            li.style.flexDirection = 'column'
            let h2 = document.createElement('h2')
            h2.textContent = user.login
            let img = document.createElement('img')
            img.setAttribute('src', user.avatar_url)
            let link = document.createElement('a')
            link.setAttribute('href', user.html_url)
            link.innerText = "Click to view Profile"
            let btn  = document.createElement('button')
            btn.style.marginTop = '20px'
            btn.innerText = `View ${user.login} Repositories`
            btn.addEventListener('click', (e)=>{
            
                renderRepoList(user)
            })
            li.append(h2,link,img,btn)

            document.querySelector('#user-list').appendChild(li)
        })
    })
}
function renderRepoList(person){
    fetch(`https://api.github.com/users/${person.login}/repos`)
    .then(response => response.json())
    .then(data =>{
        data.forEach(repo =>{
            let li = document.createElement('li')
            let a = document.createElement('a')
            a.textContent = repo.name;
            a.href = repo.html_url
            a.style.textDecoration = 'none'
            a.style.color = 'black'
            li.appendChild(a)
            document.getElementById('repos-list').appendChild(li)
        })
    })
}

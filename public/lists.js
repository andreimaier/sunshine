


const collapsible = document.querySelectorAll('.collapsible')




function fun(key) {
    const title = document.createElement('p')
    const span = document.createElement('span')
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    title.classList.add('lists__item')
    title.textContent = key.replace(/^#/g, '').replace(/^!/g, '')
    listsBox.append(title, span)
    title.append(span)
    span.append(input)
}


const deleteList = document.querySelectorAll('.deleteList')
const listsBox = document.getElementById('lists__box')
const addToRoster = document.querySelectorAll('.addToRoster')





document.addEventListener('click', e => {
    if(!e.target.matches('.collapsible')
    && !e.target.matches('.fa-circle-check')) {
        return
    } 
    if(e.target.matches('.collapsible')) collapsibleFun(e)
    if(e.target.matches('.fa-circle-check')) addToMamaMare(e)
})



function collapsibleFun(e) {
    e.target.classList.toggle('active')
    console.log(e.target.nextElementSibling)
    const content = e.target.nextElementSibling
    if(content.style.maxHeight) {
        content.style.maxHeight = null
    } else {
        content.style.maxHeight = content.scrollHeight + 'px'
    }
}



for (const[key, value] of Object.entries(localStorage)) {
    if(/^!\w+/g.test(key) || /^#\w+/g.test(key)) {
        fun(key)
    }
   if(addToRoster) {
    addToRoster.forEach(e => {
        console.log('i am')
    })
   }
}



function addToMamaMare(e){
   
   
    if(e.target.classList.contains('fa-circle-check', 'addToRoster')) {
        e.target.parentNode.classList.toggle('addToRosterAnimation')
        bagaLaLocalStorage(e)
    } 
}

function bagaLaLocalStorage(e) {
    const titlu = e.target.parentElement.parentElement.previousElementSibling.textContent
    if(!e.target.classList.contains('checked')) {
        e.target.classList.add('checked')
       
        let randomList = []
        e.target.parentElement.previousElementSibling.childNodes.forEach(a => {
            if(a.value == 0) {
                randomList.push(a.textContent) 
            }
        })
        localStorage.setItem(`#${titlu}`, randomList)

    } else {
        e.target.classList.remove('checked')
        /* removeFromRandomList(e) */
        localStorage.removeItem(`#${titlu}`)
    }
}
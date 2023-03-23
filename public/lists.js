






const collapsible = document.querySelectorAll('.collapsible')


const deleteList = document.querySelectorAll('.deleteList')
const listsBox = document.getElementById('lists__box')
const addToRoster = document.querySelectorAll('.addToRoster')

const weekX = document.querySelectorAll('.weekX')


for (const[key, value] of Object.entries(localStorage)) {
    if(/^!\w+/g.test(key) || /^#\w+/g.test(key)) {
        dinLocalStorage(key)
    }
}



function dinLocalStorage(key) {
    const title = document.createElement('p')
    const span = document.createElement('span')
    const input = document.createElement('input')

    input.setAttribute('type', 'button')
    input.setAttribute('value', 'delete')
    input.setAttribute('title', 'Delete')
    input.classList.add('deleteList')
    title.classList.add('lists__item')
    title.textContent = key.replace(/^#/g, '').replace(/^!/g, '')
    


    listsBox.append(title)
    title.append(span)
    span.append(input)
    
}










document.addEventListener('click', e => {
    if(!e.target.matches('.collapsible')
    && !e.target.matches('.deleteList')
    && !e.target.matches('.fa-circle-check')
    && !e.target.matches('li, ul')) {
        clickOut(e)
        return
    } 
    if(e.target.matches('.collapsible')) clickIn(e)
    if(e.target.matches('.fa-circle-check')) addToMamaMare(e)
    if(e.target.matches('.weekX')) console.log('doing nothing')
    if(e.target.matches('.deleteList')) deleteListFun(e)
    if(e.target.matches('.fa-circle-check', 'addToRoster')) bagaLaLocalStorage(e)
    
})






function deleteListFun(e) {
    const key = e.target.parentElement.parentElement
    console.log(key.textContent)
    localStorage.removeItem(`#${key.textContent}`) 
    key.remove() //removes element from DOM
}



function clickOut(e) {
    for(item of weekX) {
        if(item.style.maxHeight) {
            item.style.maxHeight = null
        } 
        item.previousElementSibling.classList.remove('active')
    }
}

function clickIn(e) {
    e.target.classList.toggle('active') 
    const content = e.target.nextElementSibling
    if(content.style.maxHeight) {
        content.style.maxHeight = null
    } else {
        content.style.maxHeight = content.scrollHeight + 'px'
    }
}







function addToMamaMare(e){
    const title = document.createElement('p')
    const span = document.createElement('span')
    const input = document.createElement('input')
    const key = e.target.parentElement.parentElement.previousElementSibling.textContent
    input.setAttribute('type', 'button')
    input.setAttribute('value', 'delete')
    input.setAttribute('title', 'Delete')
    input.classList.add('deleteList')
    title.classList.add('lists__item')
    title.textContent = key
    const div = listsBox.querySelectorAll('p')
    
    if(div.length == 0) {
        listsBox.append(title)
        title.append(span)
        span.append(input)  
        console.log('click')
        console.log(div.length)
    } else {
        const temp = [...div].filter(a => a.textContent == key)
        if(temp.length == 0){
            listsBox.append(title)
            title.append(span)
            span.append(input)  
        }
    }
}





function bagaLaLocalStorage(e) {
    e.target.parentNode.classList.toggle('addToRosterAnimation')
    const div = listsBox.querySelectorAll('p')
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
        for(item of div) {
            if(titlu == item.textContent)
            item.remove()
        } 
        console.log(titlu)
    }
}


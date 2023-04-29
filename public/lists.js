






const collapsible = document.querySelectorAll('.collapsible')
const weekX = document.querySelectorAll('.weekX')
const listsBox = document.getElementById('lists__box')
const addToRoster = document.querySelectorAll('.addToRoster')



const deleteList = document.querySelectorAll('.deleteList')

//on page load CHANGE to make div and not paragraphs
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
    title.setAttribute('title', 'Practice with these words')

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
    if(e.target.matches('.fa-circle-check')) addToPracticeList(e); 
    if(e.target.matches('.weekX')) console.log('doing nothing')
    /* if(e.target.matches('.deleteList')) deleteListFun(e) */
    if(e.target.matches('.fa-circle-check', 'addToRoster')) /* bagaLaLocalStorage(e), */ storageTwo(e)
    
})


/* function deleteListFun(e) {
    const key = e.target.parentElement.parentElement
    localStorage.removeItem(`#${key.textContent}`) 
    console.log(key)
    console.log(key.nextElementSibling)
} */





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


    //make 4 divs
let lista = []
let i = 0
while(i < collapsible.length) {
    const group = document.createElement('div')
    const title = document.createElement('p')
    listsBox.append(group)
    group.append(title)
    title.classList.add('lists__item')
    i++;
} 




function addToPracticeList(e){
    const erase = document.createElement('input');
    const div = listsBox.querySelectorAll('div');
    const key = e.target.parentElement.parentElement.previousElementSibling.textContent
    
    const id = e.target.parentElement.parentElement.previousElementSibling.id
    lista.indexOf(id) === -1 ?
    lista.push(id) :
    lista.splice(lista.indexOf(id), 1);
    lista.sort((a,b) => a-b);
    
    console.log(lista)
    
    
    
    
    let i = 0;
    while(i < collapsible.length) {
    
        [...listsBox.querySelectorAll('div')][i].firstElementChild.textContent = `Week ${lista[i]}` 
    
        erase.setAttribute('type', 'button')
        erase.setAttribute('value', 'delete')
        erase.setAttribute('title', 'Delete this list');
        erase.classList.add('deleteList');
    
        ([...listsBox.querySelectorAll('div')][i].firstElementChild.textContent.match(/Week\s\d/)) ?
        [...listsBox.querySelectorAll('div')][i].append(erase):
        [...listsBox.querySelectorAll('div')][i].firstElementChild.textContent = "";

        [...listsBox.querySelectorAll('div')][i].style.marginBlock = "0.1rem"
        i++
    }
     //TO ADD the lists into #lists__box
     if(div.length == 0) {
        listsBox.append(title)
        title.append(span)
        span.append(input)  
    } else {
        const temp = [...div].filter(a => a.textContent == key) //it's not a filter, is a check === to match for key
        if(temp.length == 0){ //does not match the key
            listsBox.append(title)
            title.append(span)
            span.append(input)  
        }
    }



}







/* function bagaLaLocalStorage(e) {
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
        localStorage.removeItem(`#${titlu}`)
        for(item of div) {
            if(titlu == item.textContent)
            item.remove()
        }          
    }
} */

function storageTwo(e) {
    e.target.parentNode.classList.toggle('addToRosterAnimation')
    localStorage.setItem('lista', lista)
    console.log(lista)
}


    



//CHANGE

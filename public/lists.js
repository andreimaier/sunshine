






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
    if(e.target.matches('.fa-circle-check')) addToPracticeList(e)
    if(e.target.matches('.weekX')) console.log('doing nothing')
    if(e.target.matches('.deleteList')) deleteListFun(e)
    if(e.target.matches('.fa-circle-check', 'addToRoster')) bagaLaLocalStorage(e)
    
})






function deleteListFun(e) {
    const key = e.target.parentElement.parentElement
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



const arrLen = document.getElementById('myLists').childElementCount
let lista = []
const test = document.getElementById('test')
const para = document.getElementById('para')
const erase = document.getElementById('erase');
let i = 0
while(i < collapsible.length) {
   
    const title = document.createElement('p')
    para.appendChild(title);
    i++;
} 


function addToPracticeList(e){
    

    const title = document.createElement('p')
    const span = document.createElement('span')
    const input = document.createElement('input')
    const key = e.target.parentElement.parentElement.previousElementSibling.textContent
    const id = e.target.parentElement.parentElement.previousElementSibling.id

    title.setAttribute('title', 'Practice with these words')
    input.setAttribute('type', 'button')
    input.setAttribute('value', 'delete')
    input.setAttribute('title', 'Delete list')
    input.classList.add('deleteList')
    title.classList.add('lists__item')
    title.textContent = key

    
    //WORKING...
    const div = listsBox.querySelectorAll('p')
    
    //Attempt to organize #lists__box using sparse array with predetermined length
    lista.indexOf(id) === -1 ?
    lista.push(id) :
    lista.splice(lista.indexOf(id), 1);
    lista.sort((a,b) => a-b);
    
    console.log(lista)
   /*  listsBox.append(title)
    title.append(span)
    span.append(input)  */
    

    //make a new div with specified slots with id's to match the items from lista array
  
    let i = 0;
    while(i < collapsible.length) {
       
        [...para.querySelectorAll('p')][i].textContent = lista[i];
        [...para.querySelectorAll('p')].forEach(e=> {
            erase.append(input)
        })
        i++
    }




















     /*    let i = 0
        while(i < lista.length) {  
            
            lista[i] ?           
            [...test.querySelectorAll('p')][i].innerHTML = `Week ${lista[i]} <span><input type="button" value="delete" title="Delete" class="deleteList"></span>` :
            [...test.querySelectorAll('p')][i].textContent = lista[i];

            //i stopped here...
            //why only make for last??
            lista[i] ? 
            [...test.querySelectorAll('p')][i].append(span) :
            0
          
            i++;  
        }
        
        if(test) */



        
      
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

        /* console.log(randomList) */



    } else {
        e.target.classList.remove('checked')
        /* removeFromRandomList(e) */
        localStorage.removeItem(`#${titlu}`)
        for(item of div) {
            if(titlu == item.textContent)
            item.remove()
        } 
        
        
    }
}


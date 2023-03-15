const instructions = document.getElementById('instructions')
const createNew = document.getElementById('createNew')
const words = document.querySelector('#word-list');
const animationDuration = 1000
const collection = document.getElementById('collection')





document.addEventListener('click', e => {
    if( e.target !== instructions
        && e.target !== createNew 
       
        && !e.target.matches('.fa-circle-check')
        && !e.target.matches('.fa-trash-can')) {
        return
    } 
    if(e.target === instructions) instructionsFun()
    if(e.target.matches('.fa-circle-check') || e.target.matches('.fa-trash-can')) collectionFun(e)
    if(e.target === createNew) listaNoua()
})

addEventListener('load', () => {
    
    for (const [key, value] of Object.entries(localStorage)) {
        if(/^!\w+/g.test(key)) {
            title = document.createElement('h5')
            title.textContent = key
            title.setAttribute('id', key)   
            createButtonsAndDiv()
            for (i = 0; i < value.split(',').length ; i++) {
                const item = document.createElement('li')
                item.textContent = value.split(',')[i]
                newList.appendChild(item)
            }  
        }
    } 
})



function instructionsFun() { //hides instructions
    document.querySelectorAll('.hidden').forEach( x => {
        if(x.hasAttribute('hidden')) {
            x.removeAttribute('hidden')  
        } else x.setAttribute('hidden', "")
    })
}



//Functionality for Remove BTN
function collectionFun(e){
    //remove ONLY if not added to list
    if(e.target.classList.contains('fa-trash-can') && !e.target.parentNode.parentElement.lastChild.classList.contains('addToRosterAnimation')){
        e.target.classList.add('removeIAnimation')
        e.target.parentNode.classList.add('removeAnimation') 
        
        //timeout for divvy to go away       
        setTimeout(() => {
            e.target.parentNode.parentNode.remove() 
            localStorage.removeItem(`#${e.target.parentNode.nextSibling.id}`)
            localStorage.removeItem(e.target.parentNode.nextSibling.id)
        }, animationDuration);
    } 
    //checks if list added to randomList > can't delete
    if(e.target.classList.contains('fa-trash-can') 
    && e.target.parentNode.nextSibling.nextSibling.classList.contains('addToRosterAnimation')) {
        alert('Can\'t delete an added list')
    }
    //adds animation to check button
    if(e.target.classList.contains('fa-circle-check', 'addToRoster')) {
        e.target.parentNode.classList.toggle('addToRosterAnimation')
        addToLocalStorage(e)
    } 
}


function listaNoua(titleName) {
    titleName = key.value
    title = document.createElement('h5')
    title.textContent = titleName
    title.setAttribute('id', titleName)

    if (titleName == '' || words.value == '') {
        window.alert('hei...forgot something?')
    } 
    if (titleName != '' && words.value != '') {
        if(document.getElementById(title.getAttribute(`id`))) {
            alert('don\'t do it, Mickey!!!!')
        } else {
            if (window.confirm(`Your List Title: ${titleName} \nYour Words: ${words.value}`)) {
                createButtonsAndDiv()
                sanitizeWords()
                localStorage.setItem(`!${titleName}`, words.value.split(/\n/))  
            }
        } 
    }  
}




//Main functions
function addToLocalStorage(e) {
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


function createButtonsAndDiv() {
    newList = document.createElement('ul') 

    div = document.createElement('div')   
    div.setAttribute('class', 'divvy')
    collection.appendChild(div)
 
    removeBtn = document.createElement('button')
    removeBtn.classList.add('remove')
    emoticon = document.createElement('i')
    emoticon.classList.add('fa-trash-can', 'fa-solid')
    removeBtn.appendChild(emoticon)

/*     addToRoster = document.createElement('button')
    addToRoster.classList.add('addToRoster')
    emoticon2 = document.createElement('i')
    addToRoster.appendChild(emoticon2)
    emoticon2.classList.add('fa-regular', 'fa-circle-check') */
    
    div.append(removeBtn, title, newList, /* addToRoster */) 
}


function sanitizeWords() {
    for (i = 0; i < words.value.split(/\n/g).length ; i++) {
        const item = document.createElement('li')
        item.textContent = words.value.split(/\n/)[i]
        newList.appendChild(item)
    }
}

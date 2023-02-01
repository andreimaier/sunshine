/* 
ctrl + alt + L 
alt + shift + C
alt + shift + U
alt + shift + D
*/






const output = document.querySelector('.output');
const words = document.querySelector('#word-list');
const instructions = document.getElementById('instructions')
const createNew = document.getElementById('createNew')
const key = document.getElementById('key')
const collection = document.querySelector('#collection')

let title = {}
let newList = {}
let div = {}
let removeBtn = {}
let emoticon = {}
let emoticon2 = {}
let addToRoster = {}

let randomList = []

let starsCount = 0;


const animationDuration = 1000
const lists = document.getElementById('existing-lists')

let valoare = words.value.trim().replace(/(\s|,)+/g, ' ').trim().split(' ');

//CHECK find the glitch that makes it jump a bit when you save in VSCode

const collapsible = document.querySelectorAll('.collapsible')
collapsible.forEach((e) => {
    e.addEventListener('click', function(){
        this.classList.toggle('active')
        const content = this.nextElementSibling
        if(content.style.maxHeight) {
            content.style.maxHeight = null
        } else {
            content.style.maxHeight = content.scrollHeight + 'px'
        }
    })
})



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

    addToRoster = document.createElement('button')
    addToRoster.classList.add('addToRoster')
    emoticon2 = document.createElement('i')
    addToRoster.appendChild(emoticon2)
    emoticon2.classList.add('fa-regular', 'fa-circle-check')
    
    div.appendChild(removeBtn)
    div.appendChild(title)
    div.appendChild(addToRoster)
    div.appendChild(newList) 
}

//EVENT listeners
//CHANGE see if you want to add another evet, like 'change' 
    //in that canse you can prompt that these words will be added...
/* words.addEventListener('keyup', () => {
    document.querySelector('.temporary').value = words.value
}) */
document.addEventListener('click', e => {
    if( e.target !== instructions 
        && e.target !== createNew 
        && !e.target.matches('.output')
        && !e.target.matches('.fa-circle-check')
        && !e.target.matches('.fa-trash-can')
        && !e.target.matches('.item')) {
        return
    } 
    if(e.target === instructions) instructionsFun()
    if(e.target === createNew) createNewFun(e)
    if(e.target.matches('.fa-circle-check') || e.target.matches('.fa-trash-can')) collectionFun(e)
    if(e.target.matches('.output')) randomFun(e)
    if(e.target.matches('.item')) counterFun(e) 
})

addEventListener('load', () => {
    retrieveScores()
    for (const [key, value] of Object.entries(localStorage)) {
        if(/^#\w+/g.test(key)) {
            title = document.createElement('h5')
            title.textContent = key
            title.setAttribute('id', key)   
            createButtonsAndDiv()
            for (i = 0; i < value.trim().replace(/(\s|,)+/g, ' '). trim().split(' ').length ; i++) {
                const item = document.createElement('li')
                item.textContent = value.trim().replace(/(\s|,)+/g, ' ').trim().split(' ')[i]
                newList.appendChild(item)
            }  
        }
    } 
})




//HELPER functions//

function retrieveScores() {
    for (const [key, valoare] of Object.entries(localStorage)) {
        if(/^@\w+/g.test(key)) {
        document.getElementById(key).value = valoare
        document.getElementById(key).firstElementChild.textContent = valoare 
        }
    }
}

const span = document.querySelectorAll('.count')
const buttons = document.querySelectorAll('.item')
let button = {}

buttons.forEach((button) => {
    button.addEventListener('click', ()=> {
        button.value ++
        button.firstElementChild.textContent = button.value
        localStorage.setItem(button.id, button.value) 
    })
    button.firstElementChild.textContent = button.value 
        
})






    
    
        
//URGENT CHANGE
//when you click cancel when making a new list it will still make a list...because it will save it in local storage












function instructionsFun() {
    document.querySelectorAll('.hidden').forEach( x => {
        if(x.hasAttribute('hidden')) {
            x.removeAttribute('hidden')  
        } else x.setAttribute('hidden', "")
    })
}
function createNewFun(e){
    if(e.target.classList.contains('createNew')) {
        listaNoua()
    }
}
//Functionality for Remove BTN
function collectionFun(e){
    /* console.log(e.target.parentNode.nextSibling.nextSibling) */
    //remove ONLY if not added to list
    if(e.target.classList.contains('fa-trash-can') && !e.target.parentNode.nextSibling.nextSibling.classList.contains('addToRosterAnimation')){
        e.target.classList.add('removeIAnimation')
        e.target.parentNode.classList.add('removeAnimation') 
        
        setTimeout(() => {
            //timeout for divvy to go away       
            e.target.parentNode.parentNode.remove() 
            localStorage.removeItem(e.target.parentNode.nextSibling.id)
        }, animationDuration);
    } 
    //checks if list added to randomList
    if(e.target.classList.contains('fa-trash-can') 
    && e.target.parentNode.nextSibling.nextSibling.classList.contains('addToRosterAnimation')) {
        alert('Can\'t delete an added list')
    }
    if(e.target.classList.contains('fa-circle-check', 'addToRoster')) {
        e.target.parentNode.classList.toggle('addToRosterAnimation')
        changeAddToRosterButton(e)
    } 
}
function randomFun(e) {
    console.log(e.target)
    setTimeout(() => {
      let index = Math.floor(Math.random() * randomList.length)
    output.textContent = randomList[index];
    output.classList.add('outputAnimation')
        output.classList.remove('outputAnimation'); // reset animation
        void output.offsetWidth; // trigger reflow
        output.classList.add('outputAnimation'); // start animation
    /* random.classList.add('spinAnimation')
    replace with other stuff for the click on output field */
    console.log(randomList)  
    }, 0);
}
//Main functions
function changeAddToRosterButton(e) {
    //click on ADD
    if(!e.target.classList.contains('checked')) {
        e.target.classList.add('checked')
        /*  e.target.parentNode.classList.add('checked') */
        addRandomList(e) 
    //click on REMOVE
    } else {
        e.target.classList.remove('checked')
        e.target.style.backgroundColor = 'transparent'  
        e.target.parentNode.style.backgroundColor = 'transparent'
        removeRandomList(e)
    }
}

function addRandomList(e) {
    let here = e.target.parentNode.nextSibling
    //check if //here// is UL or EMPTY node(between preset li elements)
    if(here.childNodes){
        here.childNodes.forEach(elem => {
            randomList.push(elem.textContent)
        })
    }
    if(here.nextSibling){
        here.nextSibling.childNodes.forEach(a => {
            if(a.value == 0) {
                randomList.push(a.textContent) 
        }
    })  
}
        console.log(randomList)        
} 
        
function removeRandomList(e) {
    let here = e.target.parentNode.nextSibling
    if(here.childNodes){
        here.childNodes.forEach(elem => {
            randomList.splice(randomList.indexOf(elem.textContent), 1)
        })
    }
    if(here.nextSibling){
        here.nextSibling.childNodes.forEach(elem => {
            randomList.splice(randomList.indexOf(elem.textContent), 1)
    })
}
    console.log(randomList)
}
//OK
function listaNoua(titleName) {
    titleName = key.value
    title = document.createElement('h5')
    title.textContent = titleName
    title.setAttribute('id', titleName)

    if (titleName == '' || words.value == '') {
        window.alert('hei...forgot something?')
    } 
    if (titleName != '' && words.value != '') {
    
        if(document.getElementById(title.getAttribute('id'))) {
            alert('don\'t do it, Mickey!!!!')
        } else {
    
        
        if (window.confirm(`Your List Title: ${titleName} \nYour Words: ${words.value}`)) {
            createButtonsAndDiv()
            sanitizeWords(titleName)
        }
        
        localStorage.setItem(`#${titleName}`, words.value.trim().replace(/(\s|,)+/g, ' ').trim().split(' '))  
        } 
    }  
}

//CHANGE to have each word on a new line so you can have words with spaces in them

function sanitizeWords(titleName) {
    for (i = 0; i < words.value.trim().replace(/(\s|,)+/g, ' ').trim().split(' ').length ; i++) {
        const item = document.createElement('li')
        item.textContent = words.value.trim().replace(/(\s|,)+/g, ' ').trim().split(' ')[i]
        newList.appendChild(item)
    }
    //for alert
    /* newList.childNodes.forEach(elem =>{
        alerta += elem.textContent
        alerta.toString().replace(',', ' ')
    }) */

    


    
}




//IDEAAAAA
//have a count on how many times a certain word came up as a random word. make that into local/session storage (and maybe save to account for stats later.)
//have a higher chance for something to come up if you answer wrongly...or you say you want that word more often




//change to a fun font
//ADD PHOTOS TO WORD






//**********to do**********//

//write a map of the functions in JS file

//find out how to make elements moving on viewport resize or when list deleted.// maybe on freont end mentor someone had something similar

//combine 4 event listeners into one
//--Decide on page layout: one page or scrollable?
    //move instructions and toggle button
    //new list button style
    //random button style
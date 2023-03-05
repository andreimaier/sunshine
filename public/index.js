//CHANGE get all text blurred or gray when is student is abset.
//CHANGE when student is abset, make it a thing in the local storage.
//CHANGE when absent, add a different value to the student's daily points
//CHANGE when absent, add a different value to the student's daily points AND DO NOT add to total....MAYBE
//CHANGE when absent,


/* 
ctrl + alt + L 
alt + shift + C
alt + shift + U
alt + shift + D
*/
//CONNECT TO BACK

let elev, name, score
let clasaMea = []
const buton = document.querySelector("#submitToMongodb");

//clears EMPTY nodes, changes IDs and empty string score values
function studentTrimFun() {
    document.querySelectorAll('.studentJS').forEach( (student) => {
        if(student.id) {
            student.value === '' 
            ? student.value = 0
            : student.value
            
            elev = { name: `${student.id.replace('@', '')}`, points: student.value }
        
            clasaMea.push(elev)
        }
})
    console.log(clasaMea)
}




buton.addEventListener("click", async (event) => {
    
    studentTrimFun()
    
    confirm("I updated the database")
   
    const options = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(clasaMea),
};

const response = await fetch("/api", options);
const json = await response.json();
console.log(json);

clasaMea = []
});

















const randomWord = document.getElementById('randomWord');
const randomStudent = document.getElementById('randomStudent');
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
let studentList = []


let starsCount = 0;


const animationDuration = 1000

const count = document.querySelectorAll('.count')
const reduce = document.querySelectorAll('.reduce')


const buttons = document.querySelectorAll('.studentJS')
const collapsible = document.querySelectorAll('.collapsible')

//CHECK find the glitch that makes it jump a bit when you save in VSCode









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
    
    div.append(removeBtn, title, newList, addToRoster) 
}

//EVENT listeners

document.addEventListener('click', e => {
    if( e.target !== instructions 
        && e.target !== createNew 
        && !e.target.matches('#randomWord')
        && !e.target.matches('#randomStudent')
        && !e.target.matches('.fa-circle-check')
        && !e.target.matches('.fa-trash-can')
        && !e.target.matches('.studentJS')
        && !e.target.matches('.collapsible')
        && !e.target.matches('#resetPoints')) {
        return
    } 
    if(e.target === instructions) instructionsFun()
    if(e.target === createNew) listaNoua()
    if(e.target.matches('.fa-circle-check') || e.target.matches('.fa-trash-can')) collectionFun(e)
    if(e.target.matches('#randomWord')) randomWordFun(e)
    if(e.target.matches('#randomStudent')) randomStudentFun(e)
    if(e.target.matches('.collapsible')) collapsibleFun(e)
    if(e.target.matches('#resetPoints')) resetPointsFun()
})




 
addEventListener('load', () => {
    retrieveScores()
    for (const [key, value] of Object.entries(localStorage)) {
        if(/^#\w+/g.test(key)) {
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


//HELPER functions//

function retrieveScores() {
    for (const [key, valoare] of Object.entries(localStorage)) {
        if(/^@\w+/g.test(key)) {
        document.getElementById(key).value = valoare
        document.getElementById(key).firstElementChild.textContent = valoare 
        }
    }
}

function sanitizeWords() {
    for (i = 0; i < words.value.split(/\n/g).length ; i++) {
        const item = document.createElement('li')
        item.textContent = words.value.split(/\n/)[i]
        newList.appendChild(item)
    }
}

count.forEach( (e) => {
    e.addEventListener('click', () => {
        console.log(e.parentElement.textContent)    
        
        e.parentElement.toggleAttribute("disabled") 
        
        e.classList.toggle('count-disabled');
        e.textContent === `is absent` ?
        e.textContent = '' :
        e.textContent = 'is absent';
        })
}) 
reduce.forEach( (e) => {
    e.addEventListener('click', () => {
        const buton = e.parentElement
        buton.value -= 2
        buton.firstElementChild.textContent = buton.value
        localStorage.setItem(buton.id, buton.value) 
    })
})

buttons.forEach((button) => {
    button.addEventListener('click', (e)=> {
        if(e.target.matches('.count')) return 
        else {
            button.value ++
            button.firstElementChild.textContent = button.value
            localStorage.setItem(button.id, button.value) 
        }
    })
    //set the value into the span element
    
    //me think no need this actually
    /* button.firstElementChild.textContent = button.value */

    //to sent to DB
    
    
})

function collapsibleFun(e) {
    e.target.classList.toggle('active')
    const content = e.target.nextElementSibling
    if(content.style.maxHeight) {
        content.style.maxHeight = null
    } else {
        content.style.maxHeight = content.scrollHeight + 'px'
    }
}

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
        
        setTimeout(() => {
            //timeout for divvy to go away       
            e.target.parentNode.parentNode.remove() 
            localStorage.removeItem(`#${e.target.parentNode.nextSibling.id}`)
            localStorage.removeItem(e.target.parentNode.nextSibling.id)
        }, animationDuration);
    } 
    //checks if list added to randomList
    if(e.target.classList.contains('fa-trash-can') 
    && e.target.parentNode.nextSibling.nextSibling.classList.contains('addToRosterAnimation')) {
        alert('Can\'t delete an added list')
    }
    //adds animation to check button
    if(e.target.classList.contains('fa-circle-check', 'addToRoster')) {
        e.target.parentNode.classList.toggle('addToRosterAnimation')
        changeAddToRosterButton(e)
    } 
}
function randomWordFun(e) {
    console.log(e.target)
    setTimeout(() => {
      let index = Math.floor(Math.random() * randomList.length)
    randomWord.textContent = randomList[index];
    randomWord.classList.add('outputAnimation')
        randomWord.classList.remove('outputAnimation'); // reset animation
        void randomWord.offsetWidth; // trigger reflow
        randomWord.classList.add('outputAnimation'); // start animation
  
    console.log(randomList)  
    }, 0);
}
document.querySelectorAll('.studentJS').forEach(item => {
    let nou = item.textContent.replace(/⭐/, "")
    studentList.push(nou)
    if(item.id == "") {
        studentList.splice(studentList.indexOf(item), 1)
    }
})
function randomStudentFun(e) {
    
    setTimeout(() => {
      let index = Math.floor(Math.random() * studentList.length)
    randomStudent.textContent = studentList[index];
    randomStudent.classList.add('outputAnimation')
        randomStudent.classList.remove('outputAnimation'); // reset animation
        void randomStudent.offsetWidth; // trigger reflow
        randomStudent.classList.add('outputAnimation'); // start animation
    }, 0);
    
}

function resetPointsFun() {
    for (const [key, valoare] of Object.entries(localStorage)) {
        if(/^@\w+/g.test(key)) {
          localStorage.removeItem(key);
        }
    }
    buttons.forEach((button)=> {
       
        button.firstElementChild.textContent = null 
    })
    alert("Erased all points!")
}

//CHANGE when random student name not to show the - from reduce span


//Main functions
function changeAddToRosterButton(e) {
    //click on ADD
    if(!e.target.classList.contains('checked')) {
        e.target.classList.add('checked')
       
        addRandomList(e) 
    //click on REMOVE
    } else {
        e.target.classList.remove('checked')
        removeFromRandomList(e)
    }
}

function addRandomList(e) {
    const here = e.target.parentElement
    //check if //here// is UL or EMPTY node(between preset li elements)
    if(here.previousElementSibling.childNodes){ //preset lists
        here.previousElementSibling.childNodes.forEach(a => {
            if(a.value == 0) {
                randomList.push(a.textContent) 
            }
        }) 
    } 
console.log(randomList)
}

function removeFromRandomList(e) {
    const here = e.target.parentElement
    here.previousElementSibling.childNodes.forEach(elem => {
        if(elem.value == 0) {
            randomList.splice(randomList.indexOf(elem.textContent), 1)
        }
    })
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
        if(document.getElementById(title.getAttribute(`id`))) {
            alert('don\'t do it, Mickey!!!!')
        } else {
            if (window.confirm(`Your List Title: ${titleName} \nYour Words: ${words.value}`)) {
                createButtonsAndDiv()
                sanitizeWords()
                localStorage.setItem(`#${titleName}`, words.value.split(/\n/))  
            }
        } 
    }  
}











//IDEAAAAA
//have a count on how many times a certain word came up as a random word. make that into local/session storage (and maybe save to account for stats later.)
//have a higher chance for something to come up if you answer wrongly...or you say you want that word more often

//also for kids to not be 100% random but based on how many time one was picked already




//**********to do**********//





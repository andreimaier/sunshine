//fully automated atlas db submission at time of day
//list of db entries with data displayed...for me to delete easier

//BIG ONE
//--password and account
//--specific pages



//FOR MARCH 13th
//for all devices



/* 
ctrl + alt + L 
alt + shift + C
alt + shift + U
alt + shift + D
*/


//CONNECT TO BACK

let elev, name, score
let clasaMea = []
const submitDB = document.querySelector("#submitToMongodb");

//clears EMPTY nodes, changes IDs and empty string score values
function studentTrimFun() {
    document.querySelectorAll('.studentJS').forEach( (student) => {
        if(student.id) {
            
            elev = { name: `${student.id.replace('@', '')}`, points: student.value }
        
            clasaMea.push(elev)
        }
})
    console.log(clasaMea)
}


submitDB.addEventListener("click", async (event) => {
    
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



const randomWordButton = document.getElementById('randomWordButton');
const randomStudentButton = document.getElementById('randomStudentButton');

const key = document.getElementById('key')
const collection = document.querySelector('#collection')

let title = {}
let newList = {}
let div = {}
let removeBtn = {}
let emoticon = {}
let emoticon2 = {}
let addToRoster = {}

let studentList = []

const animationDuration = 1000

const count = document.querySelectorAll('.count')
const reduce = document.querySelectorAll('.reduce')

const buttons = document.querySelectorAll('.studentJS')



//EVENT listeners

document.addEventListener('click', e => {
    if( !e.target.matches('#randomWordButton')
        && !e.target.matches('#randomStudentButton')
        && !e.target.matches('.studentJS')
        && !e.target.matches('#resetPoints')) {
        return
    } 
    if(e.target.matches('#randomWordButton')) randomWordFun(e)
    if(e.target.matches('#randomStudentButton')) randomStudentFun(e)
    if(e.target.matches('#resetPoints')) resetPointsFun()
})




 

addEventListener('load', () => {
    retrieveScores()
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



count.forEach( (e) => {
    e.addEventListener('click', () => {
        const text = e.parentElement
        console.log(e.nextElementSibling)    
        e.textContent = ''
        text.toggleAttribute("disabled") 
        
        text.hasAttribute('disabled') ?
        e.nextElementSibling.textContent = '' :
        e.nextElementSibling.textContent = '⭐' 

        text.classList.toggle('count-disabled');
   
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






const randomWordOutput = document.getElementById('randomWordOutput')

function randomWordFun(e) {
    let randomList = []
    for(const [key, v] of Object.entries(localStorage)) {
        if(/^#\w+/g.test(key)) {
    for(const item of localStorage.getItem(key).split(',')) {
        randomList.push(item)
        };
    }
    }
    console.log(e.target)
    setTimeout(() => {
      let index = Math.floor(Math.random() * randomList.length)
      randomWordOutput.textContent = randomList[index];
    randomWordButton.classList.add('outputAnimation')
        randomWordButton.classList.remove('outputAnimation'); // reset animation
        void randomWordButton.offsetWidth; // trigger reflow
        randomWordButton.classList.add('outputAnimation'); // start animation
  
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

const randomStudentOutput = document.getElementById("randomStudentOutput")
function randomStudentFun(e) {
    
    setTimeout(() => {
      let index = Math.floor(Math.random() * studentList.length)
      randomStudentOutput.textContent = studentList[index];
      randomStudentButton.classList.add('outputAnimation')
        randomStudentButton.classList.remove('outputAnimation'); // reset animation
        void randomStudentButton.offsetWidth; // trigger reflow
        randomStudentButton.classList.add('outputAnimation'); // start animation
    }, 0);
    
}

function resetPointsFun() {
    for (const [key, valoare] of Object.entries(localStorage)) {
        if(/^@\w+/g.test(key)) {
          localStorage.removeItem(key);
        }
    }
    buttons.forEach((button)=> {
       
        button.firstElementChild.textContent = '' 
        button.value = ''
    })
    alert("Erased all points!")
}







//IDEAAAAA
//have a count on how many times a certain word came up as a random word. make that into local/session storage (and maybe save to account for stats later.)
//have a higher chance for something to come up if you answer wrongly...or you say you want that word more often

//also for kids to not be 100% random but based on how many time one was picked already




//**********to do**********//





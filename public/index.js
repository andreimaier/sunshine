//fully automated atlas db submission at time of day
//list of db enties with data displayed...for me to delete easier


//ADD
//prompts can add Ss name ... after I make the sing in site
//make it come into view slower...like a transition on load
//SEND user made lists to database

//CHANGE
//the space between list items stays even after removing them on lists.js
    //maybe with class on items I add rather than on premade based on collapsible/length
//some nicer buttons for removing lists...like X or smth



//FOR MARCH 13th
//for all devices



/* 
ctrl + alt + L 
alt + shift + C
alt + shift + U
alt + shift + D
*/



const addTenP = document.getElementById('addTenP')

const randomStudentButton = document.getElementById('randomStudentButton');

const key = document.getElementById('key')
const collection = document.querySelector('#collection')
const submitDB = document.querySelector("#submitToMongodb");


let title = {}
let newList = {}
let div = {}
let removeBtn = {}
let emoticon = {}
let emoticon2 = {}
let addToRoster = {}



const animationDuration = 1000

const count = document.querySelectorAll('.count')
const reduce = document.querySelectorAll('.reduce')

const buttons = document.querySelectorAll('.studentJS')







//CONNECT TO BACK

let elev, name, score
let clasaMea = []

//clears EMPTY nodes, changes IDs and empty string score values
function studentTrimFun() {
    document.querySelectorAll('.studentJS').forEach( (student) => {
        if(student.id) {
            
            elev = { name: `${student.id.replace('@', '')}`, points: student.value }
        
            clasaMea.push(elev)
        }
})
    console.log(clasaMea)
    clasaMea = []
}



submitDB.addEventListener("click", async () => {
    studentTrimFun()
    console.log('sent')
   
    const options = {
    method: "POST",
    headers: { "Content-Type": "application/JSON" },
    body: JSON.stringify(clasaMea),
    };

    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);

   /*  location.href = "https://myscores.cyclic.app/table.html";  */
});


//EVENT listeners
addEventListener('load', () => {
    retrieveScores()
    LSGetAbsent()
})

document.addEventListener('click', e => {
    if( !e.target.matches('#randomWordButton')
        && !e.target.matches('#addTenP')
        && !e.target.matches('#randomStudentButton')
        && !e.target.matches('.studentJS')
        && !e.target.matches('#resetPoints')) {
        return
    } 
    if(e.target.matches('#addTenP')) addTenPFun()
    if(e.target.matches('#randomWordButton')) randomWordFun()
    if(e.target.matches('#randomStudentButton')) randomStudentFun(e)
    if(e.target.matches('#resetPoints')) resetPointsFun()
})





//increase by 5
function addTenPFun() {
    buttons.forEach(button => {
        const score = button.firstElementChild
        if(!button.classList.contains('count-disabled')) {
            switch(score.textContent) {
                case(''): score.textContent = 0;
                default: score.textContent = parseInt(score.textContent) + 5; break;
            }
        }
        arr[button.id] = score.textContent
        localStorage.arr = JSON.stringify(arr)
    })
}
count.forEach( (e) => {
    e.addEventListener('click', () => {
       absent(e) 
       LSSetAbsent(e)
    })
})  
reduce.forEach( (e) => {
    e.addEventListener('click', () => {
        const buton = e.parentElement
        buton.value -= 2
        buton.firstElementChild.textContent = buton.value
      
    })
})
function resetPointsFun() {
    if (window.confirm("ERASE points?")){
        buttons.forEach((button)=> {
            button.firstElementChild.textContent = '' 
            button.value = ''
            arr[button.id] = ''
        })
        localStorage.arr = JSON.stringify(arr)
    }
}




let arr = localStorage.arr ? JSON.parse(localStorage.arr) : {}
console.log(arr)
//HELPER functions//
function retrieveScores() {
    buttons.forEach((button) => button.value = arr[button.id] || '') 
    
        for (const [key, valoare] of Object.entries(JSON.parse(localStorage.arr))) {
            
            document.getElementById(key).value = valoare
            document.getElementById(key).firstElementChild.textContent = valoare  
        }
}

//increase by 1
buttons.forEach((button) => {
    button.addEventListener('click', (e)=> {
        if(!e.target.matches('.count')) {
            button.value ++
            arr[button.id] = button.value
            button.firstElementChild.textContent = button.value
            localStorage.arr = JSON.stringify(arr)
        }
    })
})

function absent(e) {
    const student = e.parentElement
    student.toggleAttribute("disabled") 
    student.classList.toggle('count-disabled');
    if(student.hasAttribute('disabled')){
       e.nextElementSibling.textContent = '' //no ⭐
       e.nextElementSibling.style.width = '0px' //can't click on it
       e.textContent = '' //no points displayed
       student.style.color = "transparent" //no name displayed
    } else {
       e.nextElementSibling.textContent = '⭐'
       e.nextElementSibling.style.width = '20px'
       e.textContent = student.value
       student.style.color = "#00A6ED"
    }
}
let disabledArr = []
function LSSetAbsent() {
    disabledArr = [...buttons].filter(a => a.classList.contains('count-disabled')).map(a => a.id)
    console.log(disabledArr)
    localStorage.setItem('absent', disabledArr)
}

localStorage.absent ? 0 : localStorage.absent = ''
function LSGetAbsent() {
    const temp = localStorage.getItem('absent').split(',')
    buttons.forEach(a => {
        for(let item of temp) {
            if(item === a.id) {
                a.classList.add('count-disabled')
                a.setAttribute('disabled', '')
                if(a.hasAttribute('disabled')) {
                    a.firstElementChild.textContent = '' ;
                    a.lastElementChild.textContent = '';
                    a.lastElementChild.style.width = '0px';
                    a.style.color = "transparent";
                }
            } 
        } 
    })
}




const randomStudentOutput = document.getElementById("randomStudentOutput")
const randomWordOutput = document.getElementById('1')
let indexWord, indexStudent, randomList = []

function randomWordFun() {
    indexWord = Math.floor(Math.random() * randomList.length)       
    
    document.getElementById('1').textContent = randomList[indexWord]

    randomWordOutput.textContent = randomList[indexWord];
    randomWordOutput.classList.add('outputAnimation')
    randomWordOutput.classList.remove('outputAnimation'); // reset animation
    void randomWordOutput.offsetWidth; // trigger reflow
    randomWordOutput.classList.add('outputAnimation'); // start animation 
}

let studentList = []
function randomStudentFun() {
    buttons.forEach(item => {
        //populates studentList for absents and other stuff
        let nou = item.textContent.replace(/⭐/, "")
        studentList.push(nou)
        studentList = studentList.map(e => e.replace(/\d*\s+/g, ''))
        //removes absentees from studentList
        let absent = localStorage.absent.split(',').map(e => e.replace(/@/, ''))
        studentList = studentList.filter(e => !absent.includes(e))
    })

    indexStudent = Math.floor(Math.random() * studentList.length )

    randomStudentOutput.textContent = studentList[indexStudent];
    randomStudentOutput.classList.add('outputAnimation')
    randomStudentOutput.classList.remove('outputAnimation'); // reset animation
    void randomStudentOutput.offsetWidth; // trigger reflow
    randomStudentOutput.classList.add('outputAnimation'); // start animation 
}

(function wordHelper() {
    const vocab = JSON.parse(localStorage.vocab)
        for(const [key, value] of Object.entries(vocab)) {
            randomList.push(value)
        } 
        randomList = randomList.flat()
})()









/*     randomStudentOutput.textContent = studentList[indexStudent];
    randomStudentButton.classList.add('outputAnimation')
    randomStudentButton.classList.remove('outputAnimation'); // reset animation
    void randomStudentButton.offsetWidth; // trigger reflow
    randomStudentButton.classList.add('outputAnimation'); // start animation 
 */


//IDEAAAAA
//have a count on how many times a certain word came up as a random word. make that into local/session storage (and maybe save to account for stats later.)
//have a higher chance for something to come up if you answer wrongly...or you say you want that word more often

//also for kids to not be 100% random but based on how many time one was picked already




//**********to do**********//





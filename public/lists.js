const collapsible = document.querySelectorAll('.collapsible')
const weekX = document.querySelectorAll('.weekX')
const checkBtns = document.querySelectorAll('.fa-circle-check')
const listBox = document.getElementById('lists__box')
const del = document.querySelectorAll('delete')


document.addEventListener('click', e => {
    if(!e.target.matches('.collapsible')
    && !e.target.matches('.fa-circle-check')
    && !e.target.matches('.delete')) {
        clickOut(e)
        return
    } 
    if(e.target.matches('.collapsible')) clickIn(e);
    if(e.target.matches('.fa-circle-check')) {addToReview(e); populateListBox(); console.log(`The list to review contains lists: ${reviewList}`);}
    if(e.target.matches('.delete')) deleteList(e);
})

// initialize LS item
localStorage.getItem('reviewList') ? 0 : localStorage.setItem('reviewList', '')

let reviewList = []; //initialize empty list
if((localStorage.getItem('reviewList').split(','))) {
    //start with a list from LS as array
    reviewList.push(localStorage.getItem('reviewList').split(','))
    //keep only unique values + filter out empty "" element
    reviewList = [... new Set(reviewList.flat())].filter(x => x !== '')
} else reviewList = [] 


for(let i = 0; i < collapsible.length; i++) {
    const div = document.createElement('div')
    const p = document.createElement('p')
    
    listBox.append(div)
    div.append(p)
}



function populateListBox() {
    for(let i = 0; i < collapsible.length; i++) {
        [...listBox.querySelectorAll('p')][i].textContent = `Week ${reviewList[i]}`;
        const del = document.createElement('input');
        const parent = [...listBox.querySelectorAll('div')][i]
//set del and only show item if in array
        parent.firstElementChild.textContent.match(/Week\s\d/) ?
        parent.append(del) :
        parent.firstElementChild.textContent = "";
//remove del if it exists
        parent.querySelector('[type="button"]') ? 
        parent.lastElementChild.remove() : 0

        del.setAttribute('type', 'button')
        del.setAttribute('value', 'Delete')
        del.setAttribute('title', 'Delete this list') 
        del.classList.add('delete')
    }
};
populateListBox()

function deleteList(e) {
    const item = e.target
    const id = e.target.previousElementSibling.textContent.replace('Week ', '')
    //remove list name and del
    item.previousElementSibling.textContent='' 
    item.remove()
    //adjust reviewlist
    reviewList.splice(reviewList.indexOf(id), 1)
    //adjust LS
    localStorage.setItem('reviewList', reviewList)

    collapsible.forEach(a => {
        //dig deep to select the button
        a.id.replace('Week', '') === id ? a.nextElementSibling.lastElementChild.firstElementChild.classList.toggle('checked') : 0
    })
    storeValues()
}




function addToReview(e) {
    e.target.classList.toggle('checked')
    //animation on EACH click
    e.target.classList.add('addToRosterAnimation')
    e.target.classList.remove('addToRosterAnimation')
    void e.target.offsetWidth
    e.target.classList.add('addToRosterAnimation')

    for(item of reviewList) {
        localStorage.removeItem(`Week ${item}`, '')
    }
    
    setStorage(e)
    storeValues() 
}
list = []


function setStorage(e) { //populate reviewList
    const id = e.target.parentElement.parentElement.previousElementSibling.id.replace('Week','')
    if(reviewList.indexOf(id) === -1){
        reviewList.push(id)
    } else {
        reviewList.splice(reviewList.indexOf(id), 1)
    }
    reviewList.sort((a,b) => a-b)
    localStorage.setItem('reviewList', reviewList) 
}

function storeValues() {
    let vocab = {}
    for(item of reviewList) {
        let list = []
        let arr = Array.from(document.querySelector(`#Week${item}`).nextElementSibling.firstElementChild.children) //get vocab based on review list
        arr.forEach(e => list.push(e.textContent)) //assign words to list
        vocab[`Week ${item}`] = list // assign to object
    }
    localStorage.vocab = JSON.stringify(vocab) //send it to LS
    let x = JSON.parse(localStorage.vocab) //take it out
    console.log(x)
}
storeValues()



//called on document event listener
function clickOut() {
    for(item of weekX) {
        if(item.style.maxHeight) {
            item.style.maxHeight = null
        } 
        item.previousElementSibling.classList.remove('active')
    }
}
//expands vocab list
function clickIn(e) {
    e.target.classList.toggle('active') 
    const content = e.target.nextElementSibling
    if(content.style.maxHeight) {
        content.style.maxHeight = null
    } else {
        content.style.maxHeight = content.scrollHeight + 'px'
    }
}

//colors button according to reviewList
(function colorCheckBtns() {
    checkBtns.forEach(btn => {
        const id = btn.parentElement.parentElement.previousElementSibling.id.replace('Week','')
        for(i of reviewList) {
            i === id ? btn.classList.add('checked') :0
        }
    })
})();




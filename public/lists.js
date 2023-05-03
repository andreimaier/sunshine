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
    if(e.target.matches('.fa-circle-check')) {addToReview(e); populateListBox(); console.log(reviewList);}
    if(e.target.matches('.delete')) deleteList(e)
})


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
        del.setAttribute('value', 'delete')
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
        a.id === id ? a.nextElementSibling.lastElementChild.firstElementChild.classList.toggle('checked') : 0
    })
}




function addToReview(e) {
    e.target.classList.toggle('checked')
    //animation on EACH click
    e.target.classList.add('addToRosterAnimation')
    e.target.classList.remove('addToRosterAnimation')
    void e.target.offsetWidth
    e.target.classList.add('addToRosterAnimation')
    setStorage(e)
}

function setStorage(e) { //populate reviewList
    const id = e.target.parentElement.parentElement.previousElementSibling.id
    if(reviewList.indexOf(id) === -1){
        reviewList.push(id)
    } else {
        reviewList.splice(reviewList.indexOf(id), 1)
    }
    reviewList.sort((a,b) => a-b)
    localStorage.setItem('reviewList', reviewList) 
}



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
        const id = btn.parentElement.parentElement.previousElementSibling.id
        for(i of reviewList) {
            i === id ? btn.classList.add('checked') :0
        }
    })
})();




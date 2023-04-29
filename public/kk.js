const collapsible = document.querySelectorAll('.collapsible')
const weekX = document.querySelectorAll('.weekX')

let reviewList = [];





document.addEventListener('click', e => {
    if(!e.target.matches('.collapsible')
    && !e.target.matches('.fa-circle-check')) {
        clickOut(e)
        return
    } 
    if(e.target.matches('.collapsible')) clickIn(e);
    if(e.target.matches('.fa-circle-check')) addToReview(e)
})

function addToReview(e) {
    e.target.classList.toggle('addToRosterAnimation')
    //add color later when another function will look at the lsit and color the appropriate buttons
    /* e.target.classList.toggle('checked') */

    setStorage(e)
}
function setStorage(e) {
    let id = e.target.parentElement.parentElement.previousElementSibling.id
    let temp = localStorage.getItem('reviewList')
    temp !== null ? reviewList.push(temp.split(',')) : 0

    localStorage.removeItem('reviewList')


    if(reviewList.indexOf(id) === -1){
        reviewList.push(id)
        console.log('add')
    } else {
        reviewList.splice(temp.indexOf(id, 1))
        console.log('delete')
    }

    localStorage.setItem('reviewList', reviewList)
    
    console.log(reviewList)
    console.log(temp)
    
}
/* console.log(localStorage.getItem('reviewList').split(',')) */





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
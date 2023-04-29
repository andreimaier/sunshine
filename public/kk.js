const collapsible = document.querySelectorAll('.collapsible')
const weekX = document.querySelectorAll('.weekX')


document.addEventListener('click', e => {
    if(!e.target.matches('.collapsible')
    && e.target.matches('.fa-circle-check')) {
        clickOut(e)
        return
    } 
    if(e.target.matches('.collapsible')) clickIn(e);
    if(e.target.matches('.fa-circle-check')) addToList()
})

function addToList() {
    console.log('works')
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
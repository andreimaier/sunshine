const target = document.querySelector("#target")
const hidden = document.querySelector(".hidden")


document.addEventListener('click', e => {
    if(!e.target.matches('#target')) return
    if(e.target.matches('#target')) fun(e)
})

function fun(e) {
    hidden.classList.toggle('visible')
}
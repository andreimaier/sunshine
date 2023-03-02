let newData = []
const appendDate = document.getElementById('appendDate')
const row = document.getElementsByTagName('tr')
let th, td
const students = document.querySelectorAll('.studentJS')
const total = document.querySelectorAll('.total')
const pointsTable = document.querySelector('#pointsTable')


 //add the points  and logs to total column
students.forEach(student => {
  let sum = 0
  const tableRow = student.parentElement;
  const config = { childList: true };
  // Callback function to execute when mutations are observed
  const callback = function(mutationsList, observer) {
      // Loop through each mutation
      for(let mutation of mutationsList) {
          // Check if nodes were added
          if (mutation.type === 'childList') {
              // Loop through each added node
              for(let node of mutation.addedNodes) {
                sum += parseInt(node.textContent)
            }
        }
    }
 /*  console.log(sum) */
  student.nextElementSibling.textContent = sum
  };
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe(tableRow, config);
})  

//get a crown on best kid
/* students.forEach(student => {

})  */  


let array = []
let max
async function getDataFun() {
  const response = await fetch("/api");
  const data = await response.json();
  
  for(let obj of data){
    obj.date = obj.date.replace('/2023', '')
    th = document.createElement('th') 
    th.textContent = obj.date
    appendDate.append(th)
array = []
    students.forEach(elev => {
      const { points } = obj.class.find(({ name }) => name === elev.textContent)
      const td = document.createElement('td')
      elev.parentNode.append(td)
      td.textContent = points
      
     
    


    });
    
  }
}

getDataFun()





//this is you ever need to FILTER text nodes

/* const filteredNodes = [];
for (let i = 0; i < nodes.length; i++) {
  const node = nodes[i];
  if (node.nodeType !== 3 && node.textContent.trim() !== '') {
    filteredNodes.push(node);
  }
}
console.log(filteredNodes)  */



  






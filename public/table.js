let newData = []
const appendDate = document.getElementById('appendDate')
const row = document.getElementsByTagName('tr')
let th, td
const students = document.querySelectorAll('.studentJS')
const total = document.querySelectorAll('.total')
const pointsTable = document.querySelector('#pointsTable')

/* 
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
 
  student.nextElementSibling.textContent = sum
  };
  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);
  // Start observing the target node for configured mutations
  observer.observe(tableRow, config);
})   */

//get a crown on best kid
/* students.forEach(student => {

})  */  

let maxArr = []
let sum






let studentPoints 
let totalArray = []



async function getDataFun() {
  const response = await fetch("/api");
  const data = await response.json();
  
 /*  console.log(data) */

    
   const studentPoints = data.reduce((acc, curr) => {
      curr.class.forEach(student => {
        const index = acc.findIndex(s => s.name === student.name);
        if (!isNaN(parseInt(student.points))) {
        if (index !== -1) {
          acc[index].points += parseInt(student.points, 10);
        } else {
            acc.push({
              name: student.name,
              points: parseInt(student.points, 10)
            });
          }
        }
      });
      return acc;
    }, []);
/* console.log(studentPoints) */
    


  //👑 TOTAL
  students.forEach(elev => {
      const { points } = studentPoints.find(({ name }) => name == elev.textContent)
      const td = document.createElement('td')
  
      elev.parentNode.append(td)
      td.textContent = points
      td.classList.add('stickyTotal')

      if (!isNaN(parseInt(points))) {
        totalArray.push(points)
      }
      

      totalArray.sort((a, b) => a - b).reverse(); 
    })  
 
    students.forEach(elev => {
      let obiect = elev.nextElementSibling
      
      obiect.textContent == totalArray[0] ? 
      obiect.textContent = `🥇${obiect.textContent}` :
      obiect.textContent == totalArray[1] ? 
      obiect.textContent = `🥈${obiect.textContent}` :
      obiect.textContent == totalArray[2] ? 
      obiect.textContent = `🥉${obiect.textContent}` :
      obiect.textContent = obiect.textContent 
    })


  for(let obj of data){
    obj.date = obj.date.replace('/2023', '')
    th = document.createElement('th') 
    th.textContent = obj.date
    appendDate.append(th)

      const lol = obj.class.map(lala => parseInt(lala.points)); 
      maxArr = lol.filter(e => !isNaN(e))
      maxArr.sort((a, b) => a - b).reverse() 
console.log(maxArr)
    

    //👑 DAY
    students.forEach(elev => {
      let { points } = obj.class.find(({ name }) => name === elev.textContent)
      const td = document.createElement('td')
      elev.parentNode.append(td)
      points === '' || points === '0' ?
      points = 'abs' :
      points
      td.textContent = points
      
 

      
      
    td.textContent == maxArr[0] ?
    td.textContent = `🥇${maxArr[0]}`:
    td.textContent == maxArr[1] ?
    td.textContent = `🥈${maxArr[1]}`:
    td.textContent == maxArr[2] ?
    td.textContent = `🥉${maxArr[2]}`: 
    td.textContent = td.textContent




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



  






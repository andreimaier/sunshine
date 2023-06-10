const appendDate = document.getElementById('appendDate')
const students = document.querySelectorAll('.studentJS')
const getData = document.querySelector('#getData')
const data = localStorage.data ? JSON.parse(localStorage.data) : [] 

let dayMax = []
let totalMax = []
let firstMax = []
let secondMax = []

function testScore(){
  //add a span with the points based on test score
  const target = document.querySelectorAll('td:nth-of-type(2)')
  target.forEach(e => {
    const span = document.createElement('span')
    if (parseInt(e.textContent) < 85) {
      span.textContent = '0';
    } else if (parseInt(e.textContent) < 90) {
      span.textContent = '50';
    } else if (parseInt(e.textContent) < 95) {
      span.textContent = '100';
    } else if (parseInt(e.textContent) < 100){
      span.textContent = '150';
    } else if (parseInt(e.textContent) = 100) {
      span.textContent = '200';
    }
    else {
      span.textContent = '0';
    }
    [span.textContent, e.textContent] = [e.textContent, span.textContent] 
    e.append(span)
  })
}

getData.addEventListener('click', getDataFun)

let kk = []
async function getDataFun() {
  const response = await fetch("/api");
  const data = await response.json();
  localStorage.data = JSON.stringify(data) 
}
fetch("/api").then((blob) => blob.json()).then((data) => kk.push(...data))



function atTimeOfDay(hour, minutes, func) {
  const twentyFourHours = 86400000;
  const now = new Date();
  let ETA = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minutes, 0, 0).getTime() - now
  if(ETA < 0) {
      ETA += twentyFourHours
  }
  setTimeout(() => { 
      func();
      setInterval(func, twentyFourHours)
  }, ETA)
}
atTimeOfDay(19, 5, getDataFun) 





 


if(!localStorage.data) {
  getDataFun()
} else {
  if(!localStorage.refresh) {
    localStorage.refresh = 'true'
    location.reload()    
  } 
} 



function renderPage(){
  testScore()
  firstFun()
  totalFun()
  secondFun()
  dailyFun()
}
renderPage()






//first half of second semester
function firstFun() {
  
  const firstHalf = data.filter(i => !i.index)
  const first = firstHalf.reduce((acc, curr) => {
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
  
  students.forEach(elev => {
    let { points } = first.find(({ name }) => name == elev.textContent) ?? {}
    const td = document.createElement('td')
    elev.parentNode.append(td)
    td.textContent = points ?? 'error'
    td.classList.add('1stHalf')
  
    if (!isNaN(parseInt(points))) {
      firstMax.push(points)
    }   
  firstMax.sort((a, b) => a - b).reverse();   
  }) 
}




function totalFun() {
  //for TOTAL
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


  students.forEach(elev => {
    let { points } = studentPoints.find(({ name }) => name == elev.textContent)
    points += parseInt(elev.nextElementSibling.textContent.replace(/[0-9]{2}%$/,''))   //remove test score, keep points
    const td = document.createElement('td')
    elev.parentNode.append(td)
    td.textContent = points
    td.classList.add('total')

    if (!isNaN(parseInt(points))) {
      totalMax.push(points)
    }
    totalMax.sort((a, b) => a - b).reverse(); 
  })  
}


function secondFun() {
  
  //second half of second semester
  
  const secondHalf = data.filter(i => i.index)
  
  const second = secondHalf.reduce((acc, curr) => {
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
  
  
  students.forEach(elev => {
  //total for SECOND half
  const { points } = second.find(({ name }) => name == elev.textContent) ?? {}
  const span = document.createElement('span')
  elev.append(span)
  span.textContent = points ?? '0'
  span.classList.add('s')
  if (!isNaN(parseInt(points))) {
    secondMax.push(points)
  }
  secondMax.sort((a, b) => a - b).reverse(); 
  }) 
}







function dailyFun() {
  for(let obj of data){
    obj.date = obj.date.replace('/2023', '')
    const th = document.createElement('th') 
    th.textContent = obj.date
    appendDate.append(th)
  
    const lol = obj.class.map(lala => parseInt(lala.points)); 
    dayMax = lol.filter(e => !isNaN(e))
    dayMax.sort((a, b) => a - b).reverse() 
  
    //👑 DAY
    students.forEach(elev => {
      if(!obj.class.find(({ name }) => name === elev.textContent.replace(/\d+.*/, ""))){
          const td = document.createElement('td')
          elev.parentNode.append(td)
          td.textContent = 'NiC'
      } else {
          let { points } = obj.class.find(({ name }) => name === elev.textContent.replace(/\d+.*/, ""))
          const td = document.createElement('td')
          elev.parentNode.append(td)
          points === '' || points === '0' ?
          points = 'abs' :
          points
          td.textContent = points
            
          td.textContent == dayMax[0] ?
          td.textContent = `🥇${dayMax[0]}`:
          td.textContent == dayMax[1] ?
          td.textContent = `🥈${dayMax[1]}`:
          td.textContent == dayMax[2] ?
          td.textContent = `🥉${dayMax[2]}`: 
          td.textContent = td.textContent
      }
    });
  }
}



students.forEach(elev => {
  
  //for first half
  let firstHalf = elev.nextElementSibling.nextElementSibling
  firstHalf.textContent == firstMax[0] ? 
  firstHalf.textContent = `🥇${firstHalf.textContent}` :
  firstHalf.textContent == firstMax[1] ? 
  firstHalf.textContent = `🥈${firstHalf.textContent}` :
  firstHalf.textContent == firstMax[2] ? 
  firstHalf.textContent = `🥉${firstHalf.textContent}` :
  firstHalf.textContent = firstHalf.textContent 
  
  //for second half
  let secondHalf = elev.firstElementChild
  secondHalf.textContent == secondMax[0] ? 
  secondHalf.textContent = `${secondHalf.textContent}🥇` :
  secondHalf.textContent == secondMax[1] ? 
  secondHalf.textContent = `${secondHalf.textContent}🥈` :
  secondHalf.textContent == secondMax[2] ? 
  secondHalf.textContent = `${secondHalf.textContent}🥉` :
  secondHalf.textContent = secondHalf.textContent 
  
  //for TOTAL
  let totalScor = elev.nextElementSibling.nextElementSibling.nextElementSibling
  totalScor.textContent == totalMax[0] ? 
  totalScor.textContent = `🥇${totalScor.textContent}` :
  totalScor.textContent == totalMax[1] ? 
  totalScor.textContent = `🥈${totalScor.textContent}` :
  totalScor.textContent == totalMax[2] ? 
  totalScor.textContent = `🥉${totalScor.textContent}` :
  totalScor.textContent = totalScor.textContent 
})
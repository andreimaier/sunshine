const appendDate = document.getElementById('appendDate')
const students = document.querySelectorAll('.studentJS')

let dayMax = []
let totalMax = []
let firstMax = []
let secondMax = []


//add a span with the points based on test score
const target = document.querySelectorAll('td:nth-of-type(2)')
target.forEach(e => {
  const span = document.createElement('span')
  e.append(span)
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
  /* [span.textContent, e.textContent] = [e.textContent, span.textContent] */
})


async function getDataFun() {
  const response = await fetch("/api");
  const data = await response.json();
  const firstHalf = data.filter(i => !i.index)
  const secondHalf = data.filter(i => i.index)
  console.log(secondHalf)

//first half of second semester
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

//for first half
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

  //for TOTAL
  students.forEach(elev => {
    let { points } = studentPoints.find(({ name }) => name == elev.textContent)
    points += parseInt(elev.nextElementSibling.textContent.replace(/\d+%/, ''))
    const td = document.createElement('td')
    elev.parentNode.append(td)
    td.textContent = points
    td.classList.add('total')

    if (!isNaN(parseInt(points))) {
      totalMax.push(points)
    }
    totalMax.sort((a, b) => a - b).reverse(); 
  })  


//first half of second semester
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
console.log(secondMax)


students.forEach(col => {
  //for TOTAL
  let totalScor = col.nextElementSibling.nextElementSibling.nextElementSibling
  totalScor.textContent == totalMax[0] ? 
  totalScor.textContent = `🥇${totalScor.textContent}` :
  totalScor.textContent == totalMax[1] ? 
  totalScor.textContent = `🥈${totalScor.textContent}` :
  totalScor.textContent == totalMax[2] ? 
  totalScor.textContent = `🥉${totalScor.textContent}` :
  totalScor.textContent = totalScor.textContent 

  //for first half
  let firstHalf = col.nextElementSibling.nextElementSibling
  firstHalf.textContent == firstMax[0] ? 
  firstHalf.textContent = `🥇${firstHalf.textContent}` :
  firstHalf.textContent == firstMax[1] ? 
  firstHalf.textContent = `🥈${firstHalf.textContent}` :
  firstHalf.textContent == firstMax[2] ? 
  firstHalf.textContent = `🥉${firstHalf.textContent}` :
  firstHalf.textContent = firstHalf.textContent 

  //for second half
  let secondHalf = col.firstElementChild
  secondHalf.textContent == secondMax[0] ? 
  secondHalf.textContent = `${secondHalf.textContent}🥇` :
  secondHalf.textContent == secondMax[1] ? 
  secondHalf.textContent = `${secondHalf.textContent}🥈` :
  secondHalf.textContent == secondMax[2] ? 
  secondHalf.textContent = `${secondHalf.textContent}🥉` :
  secondHalf.textContent = secondHalf.textContent 
})






  
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
      if(!obj.class.find(({ name }) => name === elev.textContent.replace(/\d+.+/, ""))){
          const td = document.createElement('td')
          elev.parentNode.append(td)
          td.textContent = 'NiC'
      } else {
          let { points } = obj.class.find(({ name }) => name === elev.textContent.replace(/\d+.+/, ""))
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
getDataFun()

//hide table etc...
/* totalTab.addEventListener('click', ()=> {
  pointsTable.classList.toggle('hidden')
  document.querySelector('#div__pointsTable').classList.toggle('small')
  document.querySelector('#div__pointsTable').classList.toggle('hidden')
}) */
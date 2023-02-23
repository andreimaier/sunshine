let newData = []
const appendDate = document.getElementById('appendDate')
const table = document.getElementById('table');
const row = document.getElementsByTagName('tr')
let lastDate, clasa, th, td
const elevii = document.querySelectorAll('.student')

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  
  for(let obj of data){
    obj.date = obj.date.replace('/2023', '')
    console.log(obj)
    console.log(obj.date)
    th = document.createElement('th') 
    th.textContent = obj.date
    appendDate.append(th)
    console.log(th.textContent)



    elevii.forEach(elev => {
      console.log(elev.textContent)
      const { points } = obj.class.find(({ name }) => name === elev.textContent)
    
    
      const td = document.createElement('td')
      elev.parentNode.append(td)
      td.textContent = points
      console.log(points)
    });

  }
  
  
  
  
  
  lastDate = data[0].date
  clasa = data[0].class
  
}







 async function makeTable() {
  await getData();
  
  const patruA = ["Carissa","Cathy", "Charlotte","Daniel", "Dora", "Eason","Eddie", "Emma", "Eva","Gina", "Grace", "Jenny","Jerry", "Joanna","Lucas", "Mia", "Pauline", "Selina", "Sharon", "Tanya", "Tony"]
  console.log(patruA)






}


  
 
 makeTable()
  
  /* newData.forEach((el) => {
    
  for (i = 0; i < row.length; i++) {

  let td = document.createElement('td');
  var input = document.createElement('INPUT');
  input.type = 'checkbox';
  td.appendChild(input);
  row[i].appendChild(td);
  }
  }) */







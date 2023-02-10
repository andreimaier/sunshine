/* const eddie = localStorage.getItem('@Eddie')
const tanya = localStorage.getItem('@Tanya')
const table = document.getElementById('table')
console.log(eddie)
table.innerHTML += `
<tr>
<td>1</td>
<td>${tanya}</td>
<td>${eddie}</td>
<td>1</td>
<td>1</td>
</tr>` */

const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
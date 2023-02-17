const express = require('express');
const Datastore = require('nedb')

const app = express();
app.listen(3000, () => console.log('listening at 3000 and I will serve your page, master'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if(err) {
            response.end();
            return
        }
        response.json(data);
    })
})

app.post('/api', (request, response) => {
    console.log('I got a request')
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data)
    response.json(data)
})



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
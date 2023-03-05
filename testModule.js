/* module.exports = {
    hello: () => {
        console.log('hellow wowow')
    }
}
 */



const data = [
    {
        date: "03/02/2023",
        class: [
            {
                name: "eddie",
                points: "10"
            },
            {
                name: "tony",
                points: "11"
            },
            {
                name: "mia",
                points: "100"
            },
            {
                name: "Carissa",
                points: "30"
            },
            {
                name: "Eason",
                points: "50"
            }
        ]
    },
    {
        date: "03/03/2023",
        class: [
            {
                name: "eddie",
                points: "100"
            },
            {
                name: "tony",
                points: "110"
            },
            {
                name: "mia",
                points: "1000"
            },
            {
                name: "Carissa",
                points: "300"
            },
            {
                name: "Eason",
                points: "500"
            }
        ]
    },
    {
        date: "03/04/2023",
        class: [
            {
                name: "eddie",
                points: "1000"
            },
            {
                name: "tony",
                points: "1100"
            },
            {
                name: "mia",
                points: "10000"
            },
            {
                name: "Carissa",
                points: "3000"
            },
            {
                name: "Eason",
                points: "5000"
            }
        ]
    },
]



//curr(ent) = data[0/1/2]
//start with an empty array and run reduce on the entire data collection
//loop through the items in <data>
const studentPoints = data.reduce((acc, curr) => {
    //look at each student in the curr(ent) class
    curr.class.forEach(student => {
        //let's see if the student is in our array already
        //...aka...let's see if acc has that particular student in it already...
      const index = acc.findIndex(s => s.name === student.name);
      //is the student present in our acc? give them more points
      if (index !== -1) {
        acc[index].points += parseInt(student.points, 10);
      //student is not present? create student object first and give them first points  
      } else {
        acc.push({
          name: student.name,
          points: parseInt(student.points, 10)
        });
      }
    });
    //the reduce method returns the acc array consisting of objects with name and points properties 
    return acc;
  }, []);
  
  console.log(studentPoints);
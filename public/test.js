
function foo() {
  const me = "Ioan"
  function bar() {
    const me = 'Andrei'
    console.log(me)
  }
  console.log(me)
  bar()
}
foo()










let obj = [
    {
        "name": 'Andrei',
        'age': 35
    },
    { 
        "name": "Jen",
        "age": 29
    }
]

function myFunction() {
    // Your code here
    localStorage.x = JSON.stringify(obj)
    
    let x = JSON.parse(localStorage.x)
    
    console.log(x)
    
    document.querySelector('p').textContent = x[0].name
  }
  
  // Set the time for 8pm
  const targetTime = new Date();
  targetTime.setHours(8);
  targetTime.setMinutes(52);
  targetTime.setSeconds(0);
  targetTime.setMilliseconds(0);
  
  // Get the current time
  const currentTime = new Date();
  console.log(targetTime-currentTime)
  
  // Calculate the time until the target time
  let timeUntilTarget = targetTime.getTime() - currentTime.getTime();
  
  // If the target time has already passed today, add 1 day to the time until target
  if (timeUntilTarget < 0) {
    timeUntilTarget += 86400000; // 1 day in milliseconds
  }
  
  // Set up an interval to run the function every 24 hours
  setInterval(function() {
    myFunction();
  }, 86400000); // 1 day in milliseconds
  
  // Wait until the target time and then run the function
  setTimeout(function() {
    myFunction();
  }, timeUntilTarget);
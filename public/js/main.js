// *************** Mark Items as complete or incomplete ************

const taskItems = document.querySelectorAll('div') // Select all div items

Array.from(taskItems).forEach((el)=>{
  el.addEventListener('click', ChangeDivStatus) // Add click event to all divs
  // let timer = 0
  // el.addEventListener('mousedown', function(event) { 
  //   timerInterval = setInterval(function(){
  //     if (timer >= 1) {
  //       console.log("Held for 1+ seconds") 
  //       modal.style.display = "block";
  //       clearInterval(timerInterval);
  //     }
  //     timer += 1;
  //     console.log(timer)
  //   }, 1000);
  // });
  // el.addEventListener("mouseup", function() {
  //   if (timer >= 1) {     
  //     // console.log("Held for 1+ seconds") 
  //   } else {
  //     console.log("Clicked") 
  //   }
  //   clearInterval(timerInterval);
  //   timer = 0;
  // });
})

async function ChangeDivStatus(){
  if (this.classList.contains('false')){ // If the div is not already highlighted, change its class to true
    this.setAttribute("class", "true")
    updateCompletedItems()
    const userId = document.querySelector('h3[data-user-id]').dataset.userId // grab logged in user ID from h3
    const divId = this.id // grab the div ID
    try {
      await fetch('tracker/addDivId', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          userId: userId,
          divId: divId
        }) // Send the div ID and User ID to the controller
      })
    } catch(err) {
      console.log(err)
    }
  } else if (this.classList.contains('true')) { // If the div is already highlighted, change its class to false
    this.setAttribute("class", "false")
    updateCompletedItems()
    const userId = document.querySelector('h3[data-user-id]').dataset.userId // grab logged in user ID from h3
    const divId = this.id // grab the div ID
    try {
      await fetch('tracker/removeDivId', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          userId: userId,
          divId: divId
        }) // Send the div ID and User ID to the controller
      })
    } catch(err) {
      console.log(err)
    }
    }
    hideCompleted()
}



// *************** Store Last Tab so preserve tab selection on fage reload ************

let radios = document.querySelectorAll('input')
Array.from(radios).forEach((element) => {
  element.addEventListener('click', storeTab)
}) // Add click event to radio buttons

function storeTab(){
  console.log(this.id)
  localStorage.setItem('lastTab', this.id);
} //Store selected radio button in localStorage

var val = localStorage.getItem('lastTab');
console.log(`Last Tab Selected = ${val}`) // local storage value

for(var i=0;i<radios.length;i++){
  if(radios[i].id === val){
    console.log(val)
    document.getElementById(`tasksTab`).removeAttribute('checked')
    document.getElementById(`${val}`).setAttribute('checked','checked'); // marking the required radio as checked
  }
}

// *************** Tracking bar ************
// Global variable for each tracking bar
// Add or subtract from global variable with each click

// Create array of all divs with the class of "true"
let completedItems = document.querySelectorAll('.true')
// Count number of completed items with id that contains 'true'
let taskTracker = countCompletedItems('tas')
// Count number of completed items with id that contains 'tas'
let gymTracker = countCompletedItems('gym')
// Count number of completed items with id that contains 'gym'
let titansTracker = countCompletedItems('tit')
// Count number of completed items with id that contains 'tit'
let teamStarTracker = countCompletedItems('tea')
// Count number of completed items with id that contains 'tea'
let dexTracker = countCompletedItems('dex')
// Count number of completed items with id that contains 'dex'

//function to count the completed items in each category
function countCompletedItems(category) {
  return [...completedItems].map(element => element.id.toString().substring(0, 3)).filter(element => element === category).length
}

// Function to add item count to progress bar
function updateProgressBars(progressid, numberid, counter) {
  document.querySelector(progressid).setAttribute('value', counter)
  document.querySelector(numberid).innerText = counter.toString()
}

// Function to update the counted items
function updateCompletedItems() {
  completedItems = document.querySelectorAll('.true')
  taskTracker = countCompletedItems('tas')
  dexTracker = countCompletedItems('dex')
  gymTracker = countCompletedItems('gym')
  teamStarTracker = countCompletedItems('tea')
  titansTracker = countCompletedItems('tit')
  updateProgressBars('#taskProgress', '#taskPercent', taskTracker)
  // console.log(`${taskTracker} Tasks Completed!`)
  updateProgressBars('#dexProgress', '#dexPercent', dexTracker)
  // console.log(`${musicTracker} Songs Collected!`)
  updateProgressBars('#gymProgress', '#gymPercent', gymTracker)
  // console.log(`${gyroidTracker} Gyroids Collected!`)
  updateProgressBars('#teamStarProgress', '#teamStarPercent', teamStarTracker)
  // console.log(`${fossilTracker} Fossils Collected!`)
  updateProgressBars('#titansProgress', '#titansPercent', titansTracker)
  // console.log(`${artTracker} Art Collected!`)
}
updateCompletedItems()

// If progress bar is full, change color to green
/* function completedProgress() {
  if (taskTracker === 12) {

  }
}
completedProgress() */


// *************** Clear Tasks Button ************
// All task divs classes are marked as false
// All task divs are removed from database
const clearButton = document.getElementById('clearTasks')

clearButton.addEventListener('click', clearTasks) // Add click event to clear button

async function clearTasks(){
    // change all taskDivs to class "false"
    document.getElementById('taskAuctions').setAttribute("class", "false")
    document.getElementById('taskCoins').setAttribute("class", "false")
    document.getElementById('taskOutbreaks').setAttribute("class", "false")
    document.getElementById('taskRaids').setAttribute("class", "false")
    document.getElementById('taskTeamStar').setAttribute("class", "false")
    document.getElementById('taskHaveFun').setAttribute("class", "false")
    //Clear Task Progress Bar
    updateCompletedItems()
    const userId = document.querySelector('h3[data-user-id]').dataset.userId // grab logged in user ID from h3
    try {
      await fetch('tracker/removeDivId', {
        method: 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          userId: userId,
          divId: ['taskAuctions', 'taskCoins', 'taskOutbreaks', 'taskRaids', 'taskTeamStar', 'taskHaveFun']
        }) // Send the div ID and User ID to the controller
      })
    } catch(err) {
        console.log(err)
    }
}

// *************** HIDE COMPLETED CHECKBOX ************
// grab checkbox
//when clicked, change display of class "true" to none
let hideCheckBox = document.querySelector('#hideCompleted')
hideCheckBox.addEventListener('change', hideCompleted)

function hideCompleted() {
  // if checked, show all true classes and uncheck the box
  // if unchecked, hide all true classes and check the box
  //let completed = [...completedItems].map(element => element.id.toString())
  //let completed = document.querySelectorAll('[id^="dex"]')
  let pokedexTab = document.querySelector('#pokedexMain1')
  let completedDivs = pokedexTab.querySelectorAll('.true')
  //return completedDivs
  
  if (hideCheckBox.checked) {
    completedDivs.forEach(a=>a.style.display = "none")
  } else {
    completedDivs.forEach(a=>a.style.display = "initial")
  }
}

hideCompleted()


// // *************** MODAL ************
// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
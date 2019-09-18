// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const heartButtons = document.querySelectorAll('.like-glyph')
const modal = document.getElementById("modal")
const modalMessage = document.getElementById("modal-message")

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("*The page has now loaded*")

  //add .hidden class to error modal in HTML so it does not appear when page first loads
  modal.hidden = true;

  //click event triggers mimicServerCall and empty/full heart change

  for(const heartButton of heartButtons) {
      //add event trigger for each button
      heartButton.addEventListener("click", (event) => {
        console.log(mimicServerCall())
        // when a click is received, generate a server call
        mimicServerCall()
        .then((event) => {
          //console.log("~! I just clicked a heart button ! ~")
          //console.log("heart button inner text= ", heartButton.innerText)
          if (heartButton.innerText === EMPTY_HEART) {
            heartButton.innerText = FULL_HEART;
            //change heart to red
            heartButton.classList.add('activated-heart')
          } else {
            heartButton.innerText = EMPTY_HEART;
             //change heart back to blank
            heartButton.classList.remove('activated-heart')
          }
          //console.log("heart button changed to= ", heartButton.innerText)
        })
        .catch((error) => {
          //Display the error modal by removing the .hidden class
          modal.hidden = false; 
          modalMessage.innerText = error;
          console.log(modal.hidden, error)
          //Use setTimeout to hide the modal after 5 seconds (add the .hidden class)
          setTimeout( (event) => { 
            modal.hidden = true;
          }, 5000);
        })  
    })
  }
})


//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

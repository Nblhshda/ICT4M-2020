var buss_card_wrp = document.getElementById('buss-card-slider');
var buss_prev = document.getElementById('b-prev');
var buss_next = document.getElementById('b-next');

buss_prev.addEventListener('click', function () {
    buss_card_wrp.style.transform = "translate(20%)";
    buss_card_wrp.style.marginLeft = "-20%";
    buss_card_wrp.prepend(buss_card_wrp.lastElementChild);
    // buss_card_wrp.style.transition = 'all 0.5s';
})
buss_next.addEventListener('click', function () {
    buss_card_wrp.style.transform = "translate(-20%)";
    buss_card_wrp.style.marginLeft = "20%";
    buss_card_wrp.appendChild(buss_card_wrp.firstElementChild);
    // buss_card_wrp.style.transition = 'all 0.5s';

})

var modal01 = document.getElementById("myModal01");

// Get the button that opens the modal
var submit = document.getElementById("submit");

// Get the <span> element that closes the modal
var span01 = document.getElementsByClassName("close01")[0];

// When the user clicks on the button, open the modal
btn01.onclick = function() {
  modal01.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span01.onclick = function() {
  modal01.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal01) {
    modal01.style.display = "none";
  }
}


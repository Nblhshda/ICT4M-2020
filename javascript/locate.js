function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

$(document).ready(function() {
  $('#myPopup1').hide();
  $('#myPopup2').hide();
  $('#myPopup3').hide();
    $('.message1').click(function() {
     $('#myPopup1').dialog();
     });
     $('.message2').click(function() {
      $('#myPopup2').dialog();
      });
      $('.message3').click(function() {
       $('#myPopup3').dialog();
       });
    });

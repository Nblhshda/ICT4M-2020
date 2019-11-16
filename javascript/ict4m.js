$(document).ready(function() {
    $(".testimonial-carousel").slick({
        infinite: !0,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: !1,
        arrows:true,
        prevArrow: $(".testimonial-carousel-controls .prev"),
        nextArrow: $(".testimonial-carousel-controls .next"),
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 7
            }
        }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1
            }
        }]
    });
});

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("control");

  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}

    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }

  x[slideIndex-1].style.display = "block";
}

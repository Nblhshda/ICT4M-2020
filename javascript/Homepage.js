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

// Slick slider init

$(".sliderConf").slick({

    autoplay: true,
    dots: true,
    customPaging : function(slider, i) {
        var thumb = $(slider.$slides[i]).data('thumb');
        return '<a><img src="'+thumb+'"></a>';
    },

    responsive: [{
        breakpoint: 500,
        settings: {
            dots: false,
            arrows: false,
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 2
        }

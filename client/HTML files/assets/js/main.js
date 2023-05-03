

$(document).ready(function(){
 $('.education-slider').slick({
    slidesToShow: 3,
   slidesToScroll: 1,
   autoplay: false,
   autoplaySpeed: 2000,
   arrows: false,
   responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1008,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },


    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        
      },
    },
    
  ],
  
   
 });

 $('.counter').counterUp();


$('.testi-slider').slick({
  slidesToShow: 1,
 slidesToScroll: 1,
 autoplaySpeed: 4000,
 autoplay: true,
  prevArrow: '<button class="slide-arrow prev-arrow slick-prev"><i class="fa-solid fa-chevron-left text-white"></i></button>',
 nextArrow: '<button class="slide-arrow next-arrow slick-next"><i class="fa-solid fa-chevron-right text-white"></i></button>',
 arrows: true,
 responsive: [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 1008,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
  
  {
    breakpoint: 700,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    },
  },

  {
    breakpoint: 900,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    },
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    },
  },
]



 
});

$('.blog-list').slick({
  slidesToShow: 3,
 slidesToScroll: 1,
 autoplaySpeed: 2000,
 arrows: false,
 responsive: [
  {
    breakpoint: 1200,
    settings: {
      slidesToShow: 2,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 1008,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  },
],


 
});



});



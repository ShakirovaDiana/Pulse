
$(document).ready(function(){
  $('.carousel__inner').slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow_left.svg" alt="arrow_left"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow_right.svg" alt="arrow_right"></button>',
      responsive: [
          {
              breakpoint: 992,
              settings: {
                  dots: true,
                  arrows: false
              }
          }
      ]
  });
  
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
      $(item).each(function(i) {
          $(this).on('click', function(e) {
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          });
      });
  }

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item_back');
  


  // Modal

  $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function() {
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
      $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
      });
  });

  function validateForms(form){
      $(form).validate({
          rules: {
              name: {
                  required: true,
                  minlength: 2
              },
              phone: "required",
              email: {
                  required: true,
                  email: true
              }
          },
          messages: {
              name: {
                  required: "Пожалуйста, введите свое имя",
                  minlength: jQuery.validator.format("Введите {0} символа!")
                },
              phone: "Пожалуйста, введите свой номер телефона",
              email: {
                email: "Пожалуйста, введите свою почту"
              }
          }
      });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
      e.preventDefault();

        if(!$(this).valid()){
            return;
        }


      $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
      }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');

          $('form').trigger('reset');
      });
      return false;
  });

  const dot = document.querySelector('.slick-dots');
  dot.style.display = 'none';


  //Modal
  
  // Smooth scroll and pageup
const pageup = document.querySelector('.page');



window.addEventListener('scroll', () =>{
if(window.pageYOffset  > 1600 ){
    pageup.style.display ="block";
}
});

});
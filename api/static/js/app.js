let loader = $('#loader');
let defaultNum = 2;
let pageNum = 1;
var minPriceRange = $('#minPriceRange');
var maxPriceRange = $('#maxPriceRange');
var minPriceInput = $('#minPriceInput');
var maxPriceInput = $('#maxPriceInput');


$(document).ready(function () {
  dataFunction(defaultNum, pageNum);
  $('select').niceSelect();
  var swiper = new Swiper(".mySwiper", {
    loop: true,
    autoplay: true,
    pagination: {
      el: ".swiper-pagination",
    },
    effect: "cards",
    grabCursor: true,
  });

  var swiper2 = new Swiper(".swiper2", {
    freeMode: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
    speed: 10000
  });
  var swiper3 = new Swiper(".swiper3", {
    freeMode: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
    speed: 10000
  });
  var swiper4 = new Swiper(".swiper4", {
    autoplay: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
  });

  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $("#toTop").click(function () {
    //1 second of animation time
    //html works for FFX but not Chrome
    //body works for Chrome but not FFX
    //This strange selector seems to work universally
    $("html, body").animate({ scrollTop: 0 }, 1000);
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 200) {
      $(".top-menu").css("background-color", "#3554d1");
    }

    else {
      $(".top-menu").css("background-color", "transparent");
    }
  })

  //select change function 
  $('#mySelect').on('change', function () {
    // Get the selected option's value
    var selectedOption = $(this).val();
    // Update the result paragraph with the selected option
    defaultNum = parseInt(selectedOption)
    dataFunction(defaultNum, pageNum);
  });
  // pagination click function
  $(document).on('click', '.page-link', function (event) {
    event.preventDefault();
    pageNum = parseInt($(this).text());
    dataFunction(defaultNum, pageNum);
  });

  $(".xzoom, .xzoom-gallery").xzoom({
    zoomWidth: 400,
    tint: "#333",
    Xoffset: 15,
  });
  minPriceRange.on('input', function () {
    const minValue = parseInt(minPriceRange.val());
    const maxValue = parseInt(maxPriceRange.val());

    if (minValue > maxValue) {
      minPriceRange.val(maxValue);

      return;
    }

    minPriceInput.val('Min $' + minValue);

  });

  maxPriceRange.on('input', function () {
    const maxValue = parseInt(maxPriceRange.val());
    const minValue = parseInt(minPriceRange.val());

    if (maxValue < minValue) {
      maxPriceRange.val(minValue);

      return;
    }

    maxPriceInput.val('Max $' + maxValue);

  });

});

function dataFunction(perpage, pagenumber) {
  $('#hotels').html('');
  loader.show();
  $.ajax
    ({
      type: "GET",
      url: "api/products.json",
      dataType: 'json',
      success: function (data) {
        // Handle the successful response here
        // console.log('Data:', data);
        const totalPages = Math.ceil(data.length / perpage);

        // Clear previous pagination buttons
        $('#pagination').empty();

        // Create and append new pagination buttons
        for (let i = 1; i <= totalPages; i++) {


          const btn = `
            <li class="page-item">
              <a class="page-link ${pagenumber === i ? 'page-active' : ''}" href="#">${i}</a>
            </li>
            `

          $('#pagination').append(btn);
        }
        // Add a new div to the target section
        $.each(data.slice(pageNum == 1 ? 0 : Math.floor((pageNum - 1)) * perpage, pageNum === 1 ? perpage : pageNum * perpage), function (index, item) {
          var newDiv = dynamicContent(item); // You can customize the content here

          $('#hotels').append(newDiv);
        });

      },
      error: function (error) {
        // Handle errors here
        console.error('Error:', error);
      },
      complete: function () {
        // Hide the loader after the AJAX call is complete (success or error)
        loader.hide();
      }

    });

  // updatePaginationButtons(pagenumber, perpage);
}


// content div
const dynamicContent = function (item) {

  return `
  <div class="row room-suits-card">
      <div class="col-md-4 px-0">
        <img src="${item.image}" alt="" class="hotel-img" />
      </div>
      <div class="col-md-8 px-2 content-top">
        <div class="reviews">
          <ul>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star-half"></i></li>
          </ul>
          <span>4.5 reviews</span>
        </div>
        <h5>
          <a href="hotel-details.html">${item.title}</a>
        </h5>
        <div class="content-location">
          <p>
            <i class="fa-solid fa-location-dot"></i> Tokyo 5.33 MILE from
            Destination
          </p>
        </div>

        <div class="room-details">
          <div>
            <div class="price-area">
            Price/night:<span> $${item.price}</span>
            </div>
            <button
              class="btn active"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
`
}
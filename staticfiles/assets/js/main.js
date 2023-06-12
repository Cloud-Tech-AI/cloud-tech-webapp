/**
* Template Name: MyResume - v4.1.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Home type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Blogs isotope and filter
   */
  window.addEventListener('load', () => {

    console.log("load blog");
    let blogsContainer = select('.blogs-container');
    if (blogsContainer) {
      let blogsIsotope = new Isotope(blogsContainer, {
        itemSelector: '.blogs-item'
      });

      let blogsFilters = select('#blogs-flters li', true);

      on('click', '#blogs-flters li', function (e) {
        e.preventDefault();
        blogsFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');


        blogsIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        blogsIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate blogs lightbox 
   */
  const blogsLightbox = GLightbox({
    selector: '.blogs-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  const toggleDropdown = () => {
    var dropdownContent = document.getElementById("dropdownContent");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  }

  const handleDropdownOption = (option) => {
    console.log("Selected option:", option);
  }

  document.addEventListener("click", function (event) {
    var dropdownContent = document.getElementById("dropdownContent");
    var dropdownBtn = document.querySelector(".dropdown-btn");

    if (!dropdownContent.contains(event.target) && !dropdownBtn.contains(event.target)) {
      dropdownContent.style.display = "none";
    }
  });

  var path = window.location.pathname;
  var links = document.getElementsByClassName("nav-link");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (link.getAttribute("href") === path) {
      link.classList.add("selected");
    }
  }

  var imagePaths = [
    "/static/assets/img/blogs/blog2.jpg",
    "/static/assets/img/blogs/blog1.jpg",
    "/static/assets/img/blogs/blog3.jpg"
  ];
  
  var images = imagePaths.map(function(imagePath) {
    var imgElement = document.createElement('img');
    imgElement.src = imagePath;
    return imgElement;
  });
  
  var currentIndex = 0;
  var galleryContainer = document.querySelector('.gallery');
  galleryContainer.appendChild(images[currentIndex]);
  
  function showNextImage() {
    var currentImage = images[currentIndex];
    var nextIndex = (currentIndex + 1) % images.length;
    var nextImage = images[nextIndex];
  
    currentImage.classList.remove('active');
    nextImage.classList.add('active');
  
    galleryContainer.innerHTML = '';
    galleryContainer.appendChild(nextImage);
  
    currentIndex = nextIndex;
  }
  
  setInterval(showNextImage, 3000);
  
})()
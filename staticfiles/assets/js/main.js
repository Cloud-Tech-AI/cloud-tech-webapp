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
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
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

  window.toggleDropdown = () => {
    console.log("toggleDropdown");
    var dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
  }

  window.handleDropdownOption = (option) => {
    console.log("Selected option:", option);
  }

  document.addEventListener("click", function (event) {
    var dropdownContent = document.getElementById("dropdown-content");
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
  
  var imagePaths = [];
  var numberOfImages = 5;
  var element = document.getElementById("storage");
  var staticURL = element.getAttribute("data-static-url");
  for (var i = 1; i <= numberOfImages; i++) {
    var imagePath = staticURL + "/img" + i + ".jpg";
    imagePaths.push(imagePath);
  }

  var images = imagePaths.map(function (imagePath) {
    var imgElement = document.createElement('img');
    imgElement.src = imagePath;
    return imgElement;
  });

  var currentIndex = 0;
  var galleryContainer = document.querySelector('.gallery');
  if (galleryContainer) {
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
  }

})()
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function checkSlide() {
  // console.count(e)
  // console.log(e)
  // scroll y gives us o much we have scrolled down from the top and innerhiehgt
  // gives us the total pixel height of the visible webpage adding both
  // gives us the total amount of pixels that have been scrolled towards the top
  // console.log(window.scrollY + window.innerHeight)
  //offset top gives us the pixels from the very top of the window to the top of the element
  //element.height gives us the total height of the element in px
  sliderImages.forEach(element=> {

    //calculates when image is half on page
    const slideInAt = (window.scrollY + window.innerHeight) - (element.height/2);
    // console.log(slideInAt)

    //calculates when image is off the page 
    const imageBottom = element.offsetTop + element.height;
    //to check consition of if the image is half visible
    const isHalfShown = slideInAt > element.offsetTop;
    //to check if the image has been scrolled past
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast){
        element.classList.add("active");
        // console.log("image visible")
        // console.log(element.classList)
    }
    else{
        element.classList.remove("active");
        // console.log("image not visible")
        // console.log(element.classList)
    }
  });
}

const sliderImages = document.querySelectorAll(".slide-in");
window.addEventListener("scroll", debounce(checkSlide));

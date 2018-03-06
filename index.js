const nav = document.querySelector("#main")
  let topOfNav = nav.offsetTop

  function fixNav() {
    if(window.scrollY >= topOfNav) {
      document.body.style.paddingTop = nav.offsetHeight + "px"
      document.body.classList.add("fixed-nav")
    } else {
      document.body.style.paddingTop = 0
      document.body.classList.remove("fixed-nav")
    }
  }

  window.addEventListener("scroll", fixNav)


  const everything = document.querySelector("body")
  const slider = document.querySelector('.items')
  const books = document.querySelectorAll(".item")
  let isDown = false
  let startX
  let scrollLeft

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active')
    startX = e.pageX - slider.offsetLeft
    scrollLeft = slider.scrollLeft
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active')
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active')
    if (document.selection) {
      document.selection.empty()
    } else {
      window.getSelection().removeAllRanges()
    }
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;  // stop the fn from running
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft
    const walk = (x - startX) * 3
    slider.scrollLeft = scrollLeft - walk
  });

  function smoothScroll(offsetY,time) {
      if( !offsetY) return;
      var to = offsetY;
      var from = window.scrollY;
      var start = new Date().getTime(),
          timer = setInterval(function() {
              var step = Math.min(1,(new Date().getTime()-start)/time);
              window.scrollTo(0,(from+step*(to-from))+1);
              if( step == 1){ clearInterval(timer);};
          },1);
          window.scrollTo(0,(from+1));
      }

  function handleBookHover() {
    if(!this.classList.contains("viewed")) this.classList.add("hovered")
  }

  function handleBookUnhover() {
    this.classList.remove("hovered")
  }

  function handleBookClick(e) {
    if(e.which !== 1) return
    let moving = false
    this.addEventListener("mousemove", () => {
      moving = true
    })
    let mouseUpEventRemove
    let scrollToBookRemove
    const mouseUpEvent = () => {
      if(!this.classList.contains("viewed")) {
        this.classList.add("viewed")
        this.addEventListener("transitionend", scrollToBook)
      } else if(!moving) {
        alert("link to book page")
      }
      mouseUpEventRemove()
    }
    const scrollToBook = () => {
      this.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
      scrollToBookRemove()
    }
    mouseUpEventRemove = () => this.removeEventListener("mouseup", mouseUpEvent)
    scrollToBookRemove = () => this.removeEventListener("transitionend", scrollToBook)
    this.addEventListener("mouseup", mouseUpEvent)
  }

  document.addEventListener("mousedown", function(e) {
    if(e.which !== 1) return
    let element = document.querySelector(".item.viewed")
    if(element !== null) {
      let isClickInside = element.contains(e.target)
      if(!isClickInside) {
        element.classList.remove("viewed")
      }
    }
  })
  books.forEach(book => book.addEventListener("mouseover", handleBookHover))
  books.forEach(book => book.addEventListener("mouseleave", handleBookUnhover))
  books.forEach(book => book.addEventListener("mousedown", handleBookClick))
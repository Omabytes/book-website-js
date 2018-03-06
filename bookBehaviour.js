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
  
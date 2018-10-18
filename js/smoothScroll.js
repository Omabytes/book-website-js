function smoothScroll(offsetY, time) {
    if (!offsetY) return
    let to = offsetY
    let from = window.scrollY
    let start = new Date().getTime(),
        timer = setInterval(function() {
            let step = Math.min(1, (new Date().getTime() - start) / time)
            window.scrollTo(0, (from + step * (to - from)) + 1)
            if (step === 1) {
                clearInterval(timer)
            }
        }, 1)
    window.scrollTo(0, (from + 1))
}

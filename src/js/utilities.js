function toggleActive(elems, elem) {
    if (elem.classList.contains('active')) {
        elem.classList.remove('active')
    } else {
        elems.forEach((item) => {
            item.classList.remove('active')
        })
        elem.classList.add('active')
    }
}

class Slider {
    constructor({ elements = {}, timeDuration }) {

        this.autoPlayInterval = null
        this.timeDuration = timeDuration
        this.statusAutoPlay = false
        this.whichItem = 0
        this.elements = elements
        this.wrapper = document.querySelector(this.elements.wrapper)
        this.slides = document.querySelectorAll(this.elements.slides)
        this.numberOfSlide = Number(this.slides.length)

        this.todoAfterChanges = [
            () => {
                this.wrapper.style.transform = `translateX(${this.whichItem * this.wrapper.offsetWidth}px)`
            },
            () => {
                toggleActive(this.slides, this.slides[this.whichItem])
            }
        ]

        this.nextSlide = this.nextSlide.bind(this)
        this.prevSlide = this.prevSlide.bind(this)
        this.plugins = this.plugins.bind(this)
        this.setSlide = this.setSlide.bind(this)
    }

    setSlide(whichItem) {

        this.whichItem = whichItem

        if (this.statusAutoPlay) {
            this.todoAfterChanges.forEach(item => {
                this.stopAutoPlay()
                item()
                this.startAutoPlay()
            });
        } else {
            this.todoAfterChanges.forEach(item => {
                item()
            });
        }
    }

    nextSlide() {
        if (this.whichItem > (this.numberOfSlide - 2)) {
            this.setSlide(0)
        } else {
            this.setSlide(this.whichItem + 1)
        }
    }

    prevSlide() {
        if (this.whichItem > 0) {
            this.setSlide(this.whichItem - 1)
        }
    }


    plugins(plugins = []) {
        const comeBacks = []
        plugins.forEach((plugin) => {
            const bindedPlugin = plugin.bind(this)
            const func = bindedPlugin()
            if (func) {
                comeBacks.push(func)
            }
        })
        this.todoAfterChanges = this.todoAfterChanges.concat(comeBacks)
    }
}

function calcDelay(time) {
    const spitedTime = time.toString().split('').reverse()
    let delay = []
    for (let i = 0; i < spitedTime.length; i++) {
        if (spitedTime[i] == 0) {
            delay.push(spitedTime[i])
        } else {
            delay.push('1')
            break
        }
    }
    delay = Number(delay.reverse().join(""))
    return delay
}

function runAutoPlay() {
    this.statusAutoPlay = true
    let timeDuration = this.timeDuration
    let statusPauseAutoPlay = false
    let delay = calcDelay(timeDuration)

    const autoPlay = () => {
        if (!statusPauseAutoPlay) {
            timeDuration = timeDuration - delay
            if (timeDuration == 0) {
                this.nextSlide()
                timeDuration = this.timeDuration
            }
        }
    }

    const interval = setInterval(autoPlay, delay)
    this.interval = interval

    function pauseAutoPlay() {
        statusPauseAutoPlay = true
    }
    this.pauseAutoPlay = pauseAutoPlay

    function continueAutoPlay() {
        statusPauseAutoPlay = false
    }
    this.continueAutoPlay = continueAutoPlay


    this.startAutoPlay = function () {
        const result = setInterval(autoPlay, delay)
        this.interval = result
    }

    this.stopAutoPlay = function () {
        clearInterval(this.interval)
        timeDuration = this.timeDuration
    }

    this.wrapper.addEventListener('mouseenter', () => {
        this.pauseAutoPlay()
    })

    this.wrapper.addEventListener('mouseleave', () => {
        this.continueAutoPlay()
    })
}

function bulletsNavigation() {
    const bulletsNavigation = document.querySelectorAll(this.elements.bulletsNavigation)
    bulletsNavigation.forEach((bullet, key) => {
        bullet.addEventListener('click', () => {
            this.setSlide(key)
        })
    })
    const f = () => {
        toggleActive(bulletsNavigation, bulletsNavigation[this.whichItem])
    }
    return f
}

function arrowNavigation() {
    const leftArrowNavigation = document.querySelector(this.elements.leftArrowNavigation)
    const rightArrowNavigation = document.querySelector(this.elements.rightArrowNavigation)

    leftArrowNavigation.addEventListener('click', () => {
        this.nextSlide()
    })
    rightArrowNavigation.addEventListener('click', () => {
        this.prevSlide()
    })
}

function leftOrRight(firstNumber, secondNumber) {
    if (firstNumber > secondNumber) {

        const x = firstNumber - secondNumber
        return {
            x: x,
            type: "left",
            autoNext: x > 15 ? true : false
        }

    } else {

        const x = secondNumber - firstNumber
        return {
            x: x,
            type: "right",
            autoNext: x > 15 ? true : false
        }

    }
}

function dragAndDrop() {

    const coordinate = {
        start: null,
        end: null
    }

    this.slides.forEach((slide) => {

        slide.addEventListener("touchstart", (e) => {

            coordinate.start = e.changedTouches[0].pageX

        })
        slide.addEventListener("touchmove", (e) => {
            coordinate.end = e.changedTouches[0].pageX

            const coordinateSlide = leftOrRight(coordinate.start, coordinate.end)

            const transformX = this.whichItem * this.wrapper.offsetWidth
            if (coordinateSlide.type == "right") {
                this.wrapper.style.transform = `translateX(${transformX + coordinateSlide.x}px)`
            } else if (coordinateSlide.type == "left") {
                if (this.whichItem) {
                    this.wrapper.style.transform = `translateX(${transformX - coordinateSlide.x}px)`
                }
            }

        })
        slide.addEventListener("touchend", () => {
            const coordinateSlide = leftOrRight(coordinate.start, coordinate.end)

            if (coordinateSlide.type == "right" && coordinateSlide.autoNext) {
                this.nextSlide()
            } else if (coordinateSlide.type == "left" && coordinateSlide.autoNext) {
                this.prevSlide()
            }

            coordinate.start = null
            coordinate.end = null
        })
    })

}




// get height img with width or width img with height
//    for set width and height parent element of img

function XtoY(img, XorY = []) {
    const image = document.querySelector(img)

    const naturalWidth = Number(image.naturalWidth)
    const naturalHeight = Number(image.naturalHeight)

    switch (XorY[0]) {
        case "width":
            const ratioWidth = naturalHeight / naturalWidth
            return XorY[1] * ratioWidth  //return height
        case "height":
            const ratioHeight = width / height
            return XorY[1] * ratioHeight  //return width    
    }
}



function changeHeightParent(elem, height = { typeOperation, height }, parentElem) {

    let parents = [elem.parentElement]

    for (let i = 0; i < 30; i++) {
        const parent = parents[i]
        if (parent == parentElem) {
            break;
        } else {
            parents.push(parent.parentElement)
        }
    }
    parents.forEach((parent) => {
        if (parent.classList.contains("submenu-type-a")) {
            const parentHeight = height.typeOperation ? parent.scrollHeight + height.height : parent.scrollHeight - height.height
            parent.style.height = `${parentHeight}px`
        }
    })
}


// open and close dropDown menu type static 
function dropDownMenu(queryElem, queryParentElem) {

    const dropdownMenus = document.querySelectorAll(queryElem)
    const parentElem = document.querySelector(queryParentElem)

    dropdownMenus.forEach((dropdownMenu) => {
        dropdownMenu.addEventListener("click", function () {
            const menu = this.querySelector(".submenu-type-a")
            if (menu.classList.contains("active")) {
                menu.classList.remove("active")
                menu.style.height = null
                changeHeightParent(this, { typeOperation: false, height: menu.scrollHeight }, parentElem)
            } else {
                menu.classList.add("active")
                const height = menu.scrollHeight
                changeHeightParent(this, { typeOperation: true, height: height }, parentElem)
                menu.style.height = `${height}px`
            }
        })
    })

}

export {
    Slider,
    runAutoPlay,
    bulletsNavigation,
    arrowNavigation,
    dragAndDrop,
    toggleActive,
    XtoY,
    dropDownMenu,
}
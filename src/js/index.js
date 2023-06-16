import { Slider, bulletsNavigation, arrowNavigation, dragAndDrop, runAutoPlay } from "./utilities"
import { toggleActive } from "./global"

const slider = new Slider({
    elements:{
        wrapper:'.main-slider .slides',
        slides:'.main-slider .slides .slide',
        rightArrowNavigation: '.main-slider .right-nav',
        leftArrowNavigation: '.main-slider .left-nav',
        bulletsNavigation: '.main-slider .navigation span'
    },
    timeDuration:4000
})

slider.plugins([bulletsNavigation, arrowNavigation, dragAndDrop, runAutoPlay])


function countDownTimer (parent,goalTime){

    function createFakeTime(nowTime,time){ // time=how much time need for nowTime
        const result = nowTime+(time*24*60*60*1000)
        return result
    }
    
    const nowTime = new Date()
    const fakeDateTime = new Date(createFakeTime(nowTime.getTime(),goalTime))


    const day = document.querySelector(`.${parent} .countDownTimer .day .main`)
    const hour = document.querySelector(`.${parent} .countDownTimer .hour .main`)
    const minute = document.querySelector(`.${parent} .countDownTimer .min .main`)
    const second = document.querySelector(`.${parent} .countDownTimer .sec .main`)

    setInterval(()=>{

        const total = Date.parse(fakeDateTime) - Date.parse(new Date());
        const seconds = Math.floor( (total/1000) % 60 );
        const minutes = Math.floor( (total/1000/60) % 60 );
        const hours = Math.floor( (total/(1000*60*60)) % 24 );
        const days = Math.floor( total/(1000*60*60*24) );

        day.innerHTML = days
        hour.innerHTML = hours
        minute.innerHTML = minutes
        second.innerHTML = seconds

    },1000)
}

countDownTimer('nowOffer', 2.5)
countDownTimer('nextOffer', 4.8)


const reviewsSlider = new Slider({
    elements:{
       wrapper:".reviews .reviews-wrapper",
       slides: '.reviews .slide',
       bulletsNavigation:'.reviews .bullets-navigation .bullet'
    },
    numberOfSlide: 3
})

reviewsSlider.plugins([bulletsNavigation])






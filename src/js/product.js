import { Slider, bulletsNavigation, dragAndDrop, dropDownMenu } from "./utilities"

function toggleActive (elems,elem){
    if(!elem.classList.contains('active')){
        elems.forEach((item)=>{
            item.classList.remove('active')
        })
        elem.classList.add('active')
    }
}

const productSlider = new Slider({
    elements:{
        wrapper:".product-image .slides",
        slides:".product-image .slide",
        bulletsNavigation:".product-image .navigation",
    }
})

productSlider.plugins([bulletsNavigation, dragAndDrop])


function createFakeTime(time){
    const result = time+(3*24*60*60*1000)
    return result
}

const nowTime = new Date()
const fakeDateTime = new Date(createFakeTime(nowTime.getTime()))


const day = document.querySelector('.countDownTimer .days')
const hour = document.querySelector('.countDownTimer .hours')
const minute = document.querySelector('.countDownTimer .minutes')
const second = document.querySelector('.countDownTimer .seconds')

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


const colors = document.querySelectorAll('.coloring .item')
const sizes = document.querySelectorAll('.sizing .size')

colors.forEach((color)=>{
    color.addEventListener('click',function(){
        toggleActive(colors,this)
    })
})
sizes.forEach((size)=>{
    size.addEventListener('click',function(){
        toggleActive(sizes,this)
    })
})







const increase = document.querySelector('.part-six .increase')
const decrease = document.querySelector('.part-six .decrease')
const mainNumber = document.querySelector('.part-six .main-number')

increase.addEventListener('click',function(){
    mainNumber.innerHTML =Number(mainNumber.innerHTML)+1
})
decrease.addEventListener('click', function(){
    const number = Number(mainNumber.innerHTML)
    if(number > 1){
        mainNumber.innerHTML = number-1
    }
})




const navProductDetails = document.querySelectorAll('.details-product .nav span')
const mainProductDetails = document.querySelectorAll('.details-product .item')

navProductDetails.forEach((item)=>{
    item.addEventListener('click',function(){
        toggleActive(navProductDetails,this)
        const navId = this.dataset.id
        mainProductDetails.forEach((item)=>{
            const id = item.dataset.id
            if(navId == id){
                toggleActive(mainProductDetails,item)
            }
        })
    })
})

function addBaseLayout (){
    const product = document.querySelector(".product-image")
    const shortSpecs = document.querySelectorAll(".short-specs [class^='part']")

    if(window.innerWidth <= 800){
        product.id = "baseLayout"
        shortSpecs.forEach((item)=>{
            item.id = "baseLayout"
        })
    }else{
        product.id =null
        shortSpecs.forEach((item)=>{
            item.id = null
        }) 
    }
}

addBaseLayout()
window.addEventListener("resize",addBaseLayout)




dropDownMenu("aside .dropdown-menu", "aside .category-nav")
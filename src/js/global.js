import { dropDownMenu } from "./utilities"

const body = document.querySelector("body")
const navItems = document.querySelectorAll('header .dropdown-menu.level-0')

const menu = document.querySelector(".header-top .nav-container")
const nav = document.querySelector("header nav")

function toggleActive (elems,elem){
    if(elem.classList.contains('active')){
        elem.classList.remove('active')
    }else{
        elems.forEach((item)=>{
            item.classList.remove('active')
        })
        elem.classList.add('active')
    }
}

navItems.forEach((item)=>{

    item.addEventListener('click',function(e){
        e.stopPropagation()
        toggleActive(navItems,this)
    })

    const submenus = item.querySelectorAll(".dropdown-menu")
    submenus.forEach((submenu)=>{
        submenu.addEventListener("click", (e)=>{
            e.stopPropagation()
            submenu.classList.toggle("active")
        })
    })

    body.addEventListener("click",function(e){
        item.classList.remove("active")
    })

})

const hamburgerMenu = document.querySelector(".icon-moon-hamburger-menu")
const closeMenu = document.querySelector("header .close")
hamburgerMenu.addEventListener("click",()=>{
    menu.style.right = "0"
})

closeMenu.addEventListener("click",()=>{
    menu.style.right = "-100%"
})


dropDownMenu("header .dropdown-menu.static", ".header-top nav")



export {toggleActive}

const wrapper = document.querySelector(".wrapper")
const log_link = document.querySelector(".login-link")
const reg_link = document.querySelector(".reg-btn")
const btl = document.querySelector(".login-purpure")
const ic_close =document.querySelector(".icon-close")
const register=document.querySelector('.Register')
const login=document.querySelector('.login')

console.log(reg_link)
console.log(wrapper)

const registerLink =document.querySelector(".register-link")

registerLink.addEventListener('click',(event)=>{
   event.preventDefault()
   
   login.classList.remove('translate-visible')
    register.classList.remove("translate-unvisible")
    login.classList.add('translate-unvisible')
    register.classList.add("translate-visible")
   

})

reg_link.addEventListener('click', (event)=>{
    event.preventDefault()
    
        login.classList.remove('translate-unvisible')
        register.classList.remove("translate-visible")

    login.classList.add('translate-visible')
    register.classList.add("translate-unvisible")

  
})

log_link.addEventListener('click', ()=> { 
    wrapper.classList.remove("active"); 
    console.log('не-active')
});


btl.addEventListener('click', ()=>{
    wrapper.classList.add("active-popur")
})
ic_close.addEventListener('click', ()=> { 
    wrapper.classList.remove("active-popur"); 
    console.log('не-active')
});
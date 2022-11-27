let inputfiled = document.getElementById('inputfiled')
let tryagain = document.getElementById('tryagain')
let textTyping = document.querySelector('.text-of-typing p')
let errorlog = document.querySelector('.error span')
let time = document.querySelector('.time span')
let wpmlog = document.querySelector('.wpm span')
let cpmlog = document.querySelector('.cpm span')

let charactersIndex= 0
let error= 0
let timer;
let maxtime=50
let timeleft = maxtime
let istype = false
let randomParagrphFun = ()=>{
    let randomIndex = Math.floor(Math.random() * paragraph.length)
    
   paragraph[randomIndex].split('').forEach((characterText)=>{
       textTyping.innerHTML += `<span>${characterText}</span>`
   })
   document.addEventListener('keydown',()=>inputfiled.focus())
   inputfiled.addEventListener('click',()=>inputfiled.focus())
    // textTyping.innerHTML += paragraph
}
randomParagrphFun()

inputfiled.addEventListener('input',()=>{
   let characters = textTyping.querySelectorAll('span')

    if(charactersIndex < characters.length -1 && timeleft> 0){
    if(!istype){
        timer = setInterval(initTimer, 1000);
        istype= true
    }

   if(inputfiled.value.split('')[charactersIndex] == null){
     charactersIndex--;
     if(characters[charactersIndex].classList.contains('incorrect')){

         errorlog.innerText = --error
     }
     characters[charactersIndex].classList.remove('correct','incorrect')
     characters.forEach((element)=>element.classList.remove('active'))
    characters[charactersIndex].classList.add('active')
}else {
    if(characters[charactersIndex].innerText == inputfiled.value.split('')[charactersIndex]){
        characters[charactersIndex].classList.add('correct')
        
       }else{
        characters[charactersIndex].classList.add('incorrect')
        errorlog.innerText = ++error
       }
        charactersIndex++;
        characters.forEach((element)=>element.classList.remove('active'))
        characters[charactersIndex].classList.add('active')
}
cpmlog.innerText = charactersIndex - error
let wpm = Math.round((((charactersIndex -error)/5)/(maxtime - timeleft))*60)
wpm = wpm <0 || !wpm || wpm == Infinity ?0:wpm
wpmlog.innerText = wpm
}
else{
    inputfiled.value = ''
    clearInterval(timer)
    tryagain.style.display = 'block'
}
})
let initTimer=()=>{
    if(timeleft >0){
        timeleft--;
        time.innerText = timeleft
    }else{
        clearInterval(timer)
    }
}
tryagain.addEventListener('click',()=>{
    randomParagrphFun()
    inputfiled.value = ''
    wpmlog.innerText = 0
    cpmlog.innerText = 0
    clearInterval(timer)
    error.innerText = 0
    timeleft =maxtime
    charactersIndex = 0
    istype = false

})
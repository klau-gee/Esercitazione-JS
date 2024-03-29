AOS.init();

let firstNav = document.querySelector(".first-nav");
let secondNav = document.querySelector(".second-nav");
let navTitle = document.querySelector("#navTitle");
let navBtn = document.querySelector(".btn")

window.addEventListener( "scroll", ()=>{
    let scrolled = window.scrollY;
    if(scrolled > 50){
        navTitle.style.color = "var(--dark-black)"
        secondNav.classList.add("animation-gradient")
        secondNav.style.transform = "translateY(0px)"
        firstNav.classList.remove("bg-darkblack-custom")
        firstNav.classList.add("bg-yellow-custom")
        navBtn.classList.remove("bg-yellow-custom");
        navBtn.classList.add("bg-darkblack-custom");
        navBtn.style.color = "var(--yellow)"
    }else{
        if(window.innerWidth < 600){
            secondNav.style.transform = "translateY(-135px)" 
            navTitle.style.color = "var(--darkblack)"
            firstNav.classList.remove("bg-yellow-custom")
            firstNav.classList.add("bg-darkblack-custom")
            navBtn.classList.add("bg-yellow-custom");
            navBtn.classList.remove("bg-darkblack-custom");
            navBtn.style.color = "var(--dark-black)"
        }else{
            secondNav.style.transform = "translateY(-70px)"
            secondNav.classList.remove("animation-gradient")
            navTitle.style.color = "var(--darkblack)"
            firstNav.classList.remove("bg-yellow-custom")
            firstNav.classList.add("bg-darkblack-custom")
            navBtn.classList.add("bg-yellow-custom");
            navBtn.classList.remove("bg-darkblack-custom");
            navBtn.style.color = "var(--dark-black)"
        }
    }
})

let firstNumber = document.querySelector("#firstNumber");
let secondNumber = document.querySelector("#secondNumber");
let thirdNumber = document.querySelector("#thirdNumber");

function createInterval(total, finalNumber, time){
    let counter = 0;
    let interval = setInterval(()=>{
        if(counter < total){
            counter++
            finalNumber.innerHTML = counter
        }else{
            clearInterval(interval)
        }
    }, time)
}

// createInterval(600, firstNumber, 50);
// createInterval(250, secondNumber, 60);
// createInterval(30, thirdNumber, 10);
let check = false;

let observer = new IntersectionObserver((entries)=>{
    entries.forEach((el)=>{
        if(el.isIntersecting && !check){
            createInterval(600, firstNumber, 50);
            createInterval(250, secondNumber, 60);
            createInterval(30, thirdNumber, 10);
            check = true;
            setTimeout(()=>{
                check = false;
            }, 9000)
        }
    })
})

observer.observe(thirdNumber);

let cardsWrapper = document.querySelector("#cardsWrapper")
// sezione prodotti
let games = [
    {name : 'Elden Ring', category : 'rpg', price : '70'},
    {name : 'Nioh', category : 'rpg', price : '0'},
    {name : 'Final Fantasy X', category : 'jrpg', price : '80'},
    {name : 'Read Ded Redemption', category : 'adventure', price : '60'},
    {name : 'Street Fitgher 6', category : 'picchiaduro', price : '70', url : 'media/streetfighter.jpeg'},
    {name : 'Apex Legends', category : 'fps battle royale', price : '0', url : 'media/conduit.avif'},
    {name : 'Titanfall 2', category : 'fps', price : '10', url : 'media/titanfall2.webp'},
]

games.forEach( (game, i)=>{
    if(i>= (games.length - 3)){
        let div = document.createElement("div");
        div.classList.add("col-12", "col-md-4", "col-lg-3", "my-3");
        div.setAttribute("data-aos", "fade-up");
        div.setAttribute("data-aos-duration", "1000");
        div.setAttribute("data-aos-delay", `${200 * i}`);
        div.innerHTML = `
        <div  class="cardContainer rounded" style="background-image: url(${game.url})">
        <div class="px-2 cardBody">
        <h5 class="font-title fs-sm-5 fs-3 fw-bold font-yellow-custom">${game.name}</h5>
        <p class="font-secondary font-white-custom mb-0 mt-3">${game.category}</p>
        <p class="font-secondary m-0 fs-3 fw-bold font-yellow-custom">€ ${game.price}</p>
        <div class="d-flex justify-content-end mar-small-screen">
        <a href="" class="btn btn-warning">Vai al dettaglio</a>
        </div>
        </div>
        </div>
        `
        cardsWrapper.appendChild(div);
    }
    
})

//! swiper
const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
});


let swiperWrapper = document.querySelector(".swiper-wrapper");

let reviews = [
    {name : "Carlo", description : "Sito che meglio non si poteva fare"},
    {name : "Alberto", description : " Era meglio prima"},
    {name : "Carmela", description : "Ci sono pochi prodotti, meglio amazon"},
    {name : "Claudio", description : "Troppo colorato, preferisco il bianco e nero come una volta"},
    {name : "Alfion", description : "Si stava meglio quando si stava peggio"},
]

reviews.forEach( (review)=>{
    let div = document.createElement("div");
    div.classList.add("swiper-slide", "font-white-custom", "d-flex", "justify-content-center", "align-items-center", "flex-column")
    div.innerHTML = `
    <h4 class="font-title mb-5 font-darkblack-custom">${review.name}</h4>
    <p class="font-secondary text-center px-4">${review.description}</p>
    `;
    
    swiperWrapper.appendChild(div)
})
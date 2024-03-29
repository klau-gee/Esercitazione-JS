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


// 26c5e45562dd46b8b54ecdee40789e4c

// fetch("https://api.rawg.io/api/platforms?key=26c5e45562dd46b8b54ecdee40789e4c").then((response)=>response.json() ).then(data => console.log(data));

fetch("./games.json").then((response) => response.json()).then(data => {
    let radioWrapper = document.querySelector("#radioWrapper");
    
    // funzione radio buttons
    function setRadios() {
        let radioCategories = data.map((game) => game.category);
        let uniqueCategories = [];
        radioCategories.forEach((category) => {
            if (!uniqueCategories.includes(category)) {
                uniqueCategories.push(category);
            }
        })
        uniqueCategories.forEach(category => {
            let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `
            <input class="form-check-input" type="radio" name="categories" id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>
            `
            radioWrapper.appendChild(div)
        })
    }
    setRadios()
    
    //sezioni card dinamiche
    let cardsWrapper = document.querySelector("#cardsWrapper");
    
    function showCards(array) {
        cardsWrapper.innerHTML = ``
        array.forEach((game, i) => {
            let div = document.createElement("div");
            div.classList.add("col-12", "col-md-6");
            div.innerHTML = `
            <div class="card mb-3">
            <div class="row g-0">
            <div class="col-md-4">
            <img src="${game.url}" class="rounded-start size-img" alt="...">
            </div>
            <div class="col-md-8 overflow-hidden">
            <div class="card-body">
            <h5 class="card-title font-title font-yellow-custom">${game.name}</h5>
            <p class="card-text font-secondary font-white-custom">${game.category}</p>
            <p class="card-text font-secondary font-white-custom"><small class="">${game.price} €</small></p>
            </div>
            </div>
            </div>
            </div>
            `
            cardsWrapper.appendChild(div);
        })
    }
    showCards(data);
    
    let radios = document.querySelectorAll(".form-check-input");
    
    function filterByCategory(array){
        cardsWrapper.innerHTML = "";
        let checked = Array.from(radios).find( (button)=> button.checked);
        let categoria = checked.id;
        if(categoria == 'All'){
            return filtered
        }else{
            let filtered = array.filter( game => game.category == categoria );
            return filtered
        }
    }
    
    radios.forEach(button =>{
        button.addEventListener("click", ()=>{
            globalFilter()
        })
    })
    
    // TODO filtro per prezzo
    let inputRange = document.querySelector("#inputRange");
    let numberPrice = document.querySelector("#numberPrice");
    function setInputPrice(){
        let prices = data.map(game => game.price);
        let maxPrice = Math.max(...prices);
        inputRange.max = maxPrice
        inputRange.value = maxPrice
        numberPrice.innerHTML = `${maxPrice} &euro;`

    }
    setInputPrice();

    function filterByPrice(array){
        let filtered = array.filter( game => game.price <= inputRange.value)
        return filtered
    }

    inputRange.addEventListener("input", ()=>{
        globalFilter()
        numberPrice.innerHTML = `${inputRange.value} &euro;`
    })

    let wordInput = document.querySelector("#wordInput");

    function filterByWord(array){
        wordInput.innerHTML = "";
        let filtered = array.filter( (game)=>game.name.toLowerCase().includes(wordInput.value.toLowerCase().replace(/[^a-zA-Z ]\s/g, '') ));
        return filtered

    }
    
    wordInput.addEventListener("input", ()=>{
        globalFilter(wordInput.value)
    })

    function globalFilter(){
        let filteredByCategory = filterByCategory(data);
        let filteredByPrice = filterByPrice(filteredByCategory);
        let filteredByWord = filterByWord(filteredByPrice);
        showCards(filteredByWord);
    }
    
})

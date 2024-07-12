const loadPhone = async (searchInputText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputText}`)
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)
    
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    const showAll = document.getElementById('show-all-container');

    if(phones.length > 15 && !isShowAll){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    // console.log('sjaa',isShowAll)
    if(!isShowAll){
        phones = phones.slice(0,15); 
    }
    phones.forEach(phone =>{
        console.log(phone);

        // 1. Creating a div

        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card bg-base-100 p-3 mt-5  shadow-xl'
        phoneCard.innerHTML = `
            <figure>
                      <img
                        src="${phone.image}"
                        alt="Shoes" />
            </figure>
            <div class="card-body  flex flex-col justify-center items-center gap-5 ">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p class="text-center">${phone.slug}</p>
                <div class="card-actions justify-end">
                <button onclick = "handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>

            
        
        `
        phoneContainer.appendChild(phoneCard)
    })
    loadSpinner(false)
}
const handleShowDetails = (id) =>{
    console.log('clicked show detials', id)
}


loadPhone();



// handle search

const handleSearch = (isShowAll) => {
    loadSpinner(true)
    const searchInput = document.getElementById('search-input');
    const searchInputText = searchInput.value;
    console.log(searchInputText)
    loadPhone(searchInputText, isShowAll)
}

// loadSpinner

const loadSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('spinner-div');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }

    else{
        loadingSpinner.classList.add('hidden')
    }
}

const handleShowAll = () =>{
    handleSearch(true)
}
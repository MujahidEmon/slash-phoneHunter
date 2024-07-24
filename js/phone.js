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
        // console.log(phone);

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
const handleShowDetails =async (id) =>{
    // console.log('clicked show details', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone)
}

// Showing Phone details

const showPhoneDetails = (phone) =>{
    console.log(phone)
    const detailsPhoneName = document.getElementById('details-phone-name');
    detailsPhoneName.innerText = phone.name;

    const showPhoneDetails = document.getElementById('phone-details-container')
    showPhoneDetails.innerHTML =`
    <img class = "flex flex-1 justify-items-center-center mt-4 mb-5" src="${phone.image}">
    <p class="mb-2"><span class="font-bold">Chipset: </span>${phone.mainFeatures.chipSet}</p>
    <p class="mb-2"><span class="font-bold">Memory: </span>${phone.mainFeatures.memory}</p>
    <p class="mb-2"><span class="font-bold">Display Size: </span>${phone.mainFeatures.displaySize}</p>
    <p class="mb-2"><span class="font-bold">Sensors: </span>${phone.mainFeatures.sensors}</p>
    
    `

    my_modal_7.showModal();

}

// loadPhone();



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
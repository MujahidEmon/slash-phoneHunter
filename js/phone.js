const loadPhone = async (searchInputText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchInputText}`)
    const data = await res.json();
    const phones = data.data;

    displayPhones(phones);
}

const displayPhones = phones => {
    // console.log(phones)
    
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = ''

    const showAll = document.getElementById('show-all-container');

    if(phones.length > 15){
        showAll.classList.remove('hidden');
    }
    else{
        showAll.classList.add('hidden');
    }
    phones = phones.slice(0,15);
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
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>

            
        
        `
        phoneContainer.appendChild(phoneCard)
    })
}

loadPhone();



// handle search

const handleSearch = () => {
    const searchInput = document.getElementById('search-input');
    const searchInputText = searchInput.value;
    console.log(searchInputText)
    loadPhone(searchInputText)
}
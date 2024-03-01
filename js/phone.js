const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(data);
    // console.log(phones);
    displayPhones(phones)
}
const displayPhones = phones => {
    const phoneContainer = document.getElementById("phone-container") 

    //show More button when there are more the 12 results
    const showMoreContainer = document.getElementById("show-more-container");

    if(phones.length > 12){
        showMoreContainer.classList.remove('hidden');
    }else{
        showMoreContainer.classList.add('hidden');
    }

    //clear previous search with the new search;
    phoneContainer.textContent = '';

    //Show upto 12 result maximum
    phones = phones.slice(0,12)

    // console.log(phones);
    phones.forEach(phone =>{
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <div class="mx-auto">
            <figure class="mt-4"><img src="${phone.image}" alt="Shoes" /></figure>
             <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                 <p>Model: ${phone.slug}</p>
                 <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
        `

        phoneContainer.appendChild(phoneCard)

        toggleLoadingInfinity(false);
    })
}

const handleSearch = () => {
    toggleLoadingInfinity(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

const toggleLoadingInfinity = (isLoading) => {
    const loadingInfinity = document.getElementById("loading");
    if(isLoading){
        loadingInfinity.classList.remove('hidden')
    }else{
        loadingInfinity.classList.add("hidden")
    }
}

// loadPhone();
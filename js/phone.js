const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(data);
    // console.log(phones);
    displayPhones(phones, isShowAll)
}
const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container") 

    
    //clear previous search with the new search;
    phoneContainer.textContent = ''; 

    //show More button when there are more the 12 results
    const showMoreContainer = document.getElementById("show-more-container");

    if(phones.length > 12 && !isShowAll){
        showMoreContainer.classList.remove('hidden');
    }else{
        showMoreContainer.classList.add('hidden');
    }
    
    console.log("Is show all", isShowAll)
    if(!isShowAll){
        //Show upto 12 result maximum
        phones = phones.slice(0,12);
    }


    // console.log(phones);
    phones.forEach(phone =>{
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
        phoneCard.classList.add("mx-auto")
        phoneCard.innerHTML = `
            <figure class="mt-4"><img src="${phone.image}" alt="Shoes" /></figure>
             <div class="card-body">
                <h2 class="card-title text-slate-950">${phone.phone_name}</h2>
                 <p class="text-slate-800" >Model: ${phone.slug}</p>
                 <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `

        phoneContainer.appendChild(phoneCard)

        toggleLoadingInfinity(false);
    })
}

const handleSearch = (isShowAll) => {
    toggleLoadingInfinity(true)
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingInfinity = (isLoading) => {
    const loadingInfinity = document.getElementById("loading");
    if(isLoading){
        loadingInfinity.classList.remove('hidden')
    }else{
        loadingInfinity.classList.add("hidden")
    }
}

//Handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

// loadPhone();
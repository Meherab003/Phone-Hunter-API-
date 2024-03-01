const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  // console.log(data);
  // console.log(phones);
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  //clear previous search with the new search;
  phoneContainer.textContent = "";

  //show More button when there are more the 12 results
  const showMoreContainer = document.getElementById("show-more-container");

  if (phones.length > 12 && !isShowAll) {
    showMoreContainer.classList.remove("hidden");
  } else {
    showMoreContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    //Show upto 12 result maximum
    phones = phones.slice(0, 12);
  }

  // console.log(phones);
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card w-96 bg-gray-100 shadow-xl`;
    phoneCard.classList.add("mx-auto");
    phoneCard.innerHTML = `
            <figure class="mt-4"><img src="${phone.image}" alt="Shoes" /></figure>
             <div class="card-body p-4">
                <h2 class="text-xl font-medium text-slate-950 text-center">${phone.phone_name}</h2>
                 <p class="text-slate-800 text-center" >Model: ${phone.slug}</p>
                 <div class="mt-4 card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Detail</button>
                </div>
            </div>
        `;

    phoneContainer.appendChild(phoneCard);

    toggleLoadingInfinity(false);
  });
};

const handleSearch = (isShowAll) => {
  toggleLoadingInfinity(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingInfinity = (isLoading) => {
  const loadingInfinity = document.getElementById("loading");
  if (isLoading) {
    loadingInfinity.classList.remove("hidden");
  } else {
    loadingInfinity.classList.add("hidden");
  }
};

//Handle show all
const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const showDetailsContainer = document.getElementById("show-detail-container");

  showDetailsContainer.innerHTML = `
        <h3 class="font-bold text-lg">${phone.name}</h3>
        <img class="mt-4" src="${phone.image}" alt="" />
        <p class="py-4">Model: ${phone.slug}</p>
        <p class="py-1">Brand: ${phone.brand}</p>
    `;

  show_details_modal.showModal();
};
// loadPhone();

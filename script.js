
const loadData = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayData(phones);
}

const displayData = phones => {
    const phoneContainer = document.getElementById('phone-container');

    //clear container every after search
    phoneContainer.innerText = '';

    //show all button show when search items will more than 10
    const showAllField = document.getElementById('show-all-field');
    if (phones.length > 10) {
        showAllField.classList.remove('hidden');
    }
    else {
        showAllField.classList.add('hidden');
    }

    //show only 10 phones
    phones = phones.slice(0, 10);
    //making serching content
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card card-compact p-6 bg-base-100 text-center shadow-lg`;
        phoneCard.innerHTML = `
        <figure><img src= ${phone.image} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="text-center text-2xl font-semibold">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    loadingSpinner(false);
}
//search section
const searchItem = () => {
    loadingSpinner(true);
    const searchBox = document.getElementById('search-box');
    const searchText = searchBox.value;
    loadData(searchText);
}

//show details handler
const showDetails = async(phoneId) => {
    const res =await fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`);
    const data =await res.json();
    const phone = data.data;
    show_modal_details.showModal();
    const phoneDetils = document.getElementById('phone-details-section');
    phoneDetils.innerHTML = `
    <div class="flex justify-center items-center">
    <img src="${phone.image}" alt="">
    </div>
    <h3 class="my-4 font-semibold text-center text-xl">${phone?.slug}</h3>
    <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage || 'No Storage'}</p>
    <p><span class="font-bold">Display Size:</span> ${phone?.mainFeatures?.displaySize || 'Display Unavailable'}</p>
    <p><span class="font-bold">Chipset:</span> ${phone?.mainFeatures?.chipSet || 'No Chipset'}</p>
    <p><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory || 'No Memory'}</p>
    <p><span class="font-bold">Slug:</span> ${phone?.slug}</p>
    <p><span class="font-bold">Release data:</span> ${phone?.releaseDate || 'Release Date Unavailable'}</p>
    <p><span class="font-bold">Brand:</span> ${phone?.brand}</p>
    <p><span class="font-bold">GPS:</span> ${phone?.others?.GPS || 'No GPS'}</p>
    `
}
//loading spinner 
const loadingSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if(isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}




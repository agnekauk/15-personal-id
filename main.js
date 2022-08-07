function createCard(pictureURL, name, email, age, location) {

    let newDiv = document.createElement("div");
    newDiv.className = "card";

    let imgSet = document.createElement("img");
    imgSet.setAttribute("src", "https://www.setaswall.com/wp-content/uploads/2017/11/Twitter-Cover-Photo-48-1500x500.jpg");
    imgSet.setAttribute("alt", "Picture");
    imgSet.className = "set-picture";

    let imgProfile = document.createElement("img");
    imgProfile.setAttribute("src", pictureURL);
    imgProfile.setAttribute("alt", "Profile-photo");
    imgProfile.className = "profile-photo";

    let person = document.createElement("p");
    person.className = "details";
    person.classList.add("name");
    person.innerHTML = name;

    let emailAd = document.createElement("p");
    emailAd.className = "details";
    emailAd.classList.add("email");
    emailAd.textContent = email;

    let ageInfo = document.createElement("p");
    ageInfo.className = "details";
    ageInfo.classList.add("age");
    ageInfo.textContent = "Age: ";

    let ageSpan = document.createElement("span");
    ageSpan.textContent = age;
    ageInfo.appendChild(ageSpan);

    let address = document.createElement("p");
    address.className = "details";
    address.classList.add("address");
    address.textContent = "Address: ";

    let addressSpan = document.createElement("span");
    addressSpan.textContent = location;
    address.appendChild(addressSpan);

    newDiv.append(imgSet, imgProfile, person, emailAd, ageInfo, address);

    return newDiv;
}

function appendCard(card) {

    let parent = document.querySelector(".row");
    parent.append(card);

}

async function getData() {
    const requestURL = 'https://randomuser.me/api/';
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    // Pasitikrinimui
    console.log(data);

    return data;
}

document.querySelector(".btn").addEventListener("click", function () {
    getData().then(data => {
        let { picture, name, email, location } = data.results[0];
        picture = picture.large;
        name = `${name.first} ${name.last}`;
        email = `${email}`;
        let { age } = data.results[0].dob;
        age = `${age}`;
        location = ` ${location.street.name} ${location.street.number}, ${location.city} ${location.postcode} ${location.country}`;
        appendCard(createCard(picture, name, email, age, location));
    }).catch(error => {
        console.log(error);
    })
})

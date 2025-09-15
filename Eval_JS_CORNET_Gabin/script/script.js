const usersHuman = [{
        type: "humain",
        name: "John Doe",
        email: "j.smith@gmail.com",
        age: 25,
        avatar : './img/john.png',
        icon : './img/john_icon.png',
        latitude : 43.604429,
        longitude : 1.443812
    },
    {
        type: "humain",
        name: "Jane Smith",
        email: "ja.doe@sfr.fr",
        age: 5,
        avatar : './img/jane.png',
        icon : './img/jane_icon.png',
        latitude : 43.60792, 
        longitude : 1.44133
    },
    {
        type: "humain",
        name: "Le Vénérable",
        email: "levy@gmail.com",
        age: 500,
        avatar : './img/venerable.png',
        icon : './img/venerable_icon.png',
        latitude : 43.60053,
        longitude : 1.44590
    }
];

const usersPet = [{
        type: "animal de compagnie",
        espece: "chien",
        name: "Rox",
        age: 7,
        propriétaire: "John Doe",
        avatar : './img/chien.png',
        icon : './img/chien_icon.png',
        latitude : 43.60377,
        longitude : 1.43583
    },
    {
        type: "animal de compagnie",
        espece: "renard",
        name: "Roukie",
        age: 300,
        propriétaire: "Le Vénérable",
        avatar : './img/renard.jpg',
        icon : './img/renard_icon.png',
        latitude : 43.59602,
        longitude : 1.43692
    }
];

const usersXeno = [{
        type: "Xeno",
        espece: "Krogan",
        name: "Wrex",
        menace: "Rouge",
        age: 45,
        avatar : './img/wrex.png',
        icon : './img/wrex_icon.png',
        latitude : 43.59555,
        longitude : 1.45257
    },
    {
        type: "Xeno",
        espece: "Turien",
        name: "Garrus",
        menace: "Vert",
        age: 35,
        avatar : './img/garrus.png',
        icon : './img/garrus_icon.png',
        latitude : 43.61108,
        longitude : 1.45539
    },
    {
        type: "Xeno",
        espece: "Asari",
        name: "Liara",
        menace: "ULTRA Rouge",
        age: 25,
        avatar : './img/liara.png',
        icon : './img/liara_icon.png',
        latitude : 43.61183,
        longitude :  1.43222
    }
];


// Stockage tableaux
const tabData = [];
tabData.push(usersHuman, usersPet, usersXeno); 


// Fonction carte Humain
function cardHuman(object) {

    let article = document.createElement("article");
    
    let titre = document.createElement("h2");
    titre.textContent = object.name;

    let img = document.createElement("img");
    img.src = object.avatar;
    img.alt = `Portrait de : ${object.name}`;

    let txt = document.createElement("p");
    txt.textContent = `${object.age} ans - ${object.email}`;

    article.appendChild(titre);
    article.appendChild(img);
    article.appendChild(txt);
    article.classList.add("card");

    return article;
}

// Fonction animal de compagnie
function cardPet(object) {

    let article = document.createElement("article");
    
    let titre = document.createElement("h2");
    titre.textContent = object.name;

    let img = document.createElement("img");
    img.src = object.avatar;
    img.alt = `Portrait de : ${object.name}`;

    let txt = document.createElement("p");
    txt.textContent = `${object.age} ans - ${object.email}`;

    article.appendChild(titre);
    article.appendChild(img);
    article.appendChild(txt);
    article.classList.add("card");

    return article;
}

// Fonction Xeno
function cardXeno(object) {

    let article = document.createElement("article");
    
    let titre = document.createElement("h2");
    titre.textContent = object.name;

    let img = document.createElement("img");
    img.src = object.avatar;
    img.alt = `Portrait de : ${object.name}`;

    let txt = document.createElement("p");
    txt.textContent = `${object.age} ans - ${object.email}`;

    article.appendChild(titre);
    article.appendChild(img);
    article.appendChild(txt);
    article.classList.add("card");

    return article;
}

// Fonction qui sélectio carte en fonction du type
function profil(tab) {

    let cardList = [];
    tab.forEach(object => {
        if (object.type === "humain") {
            cardList.push(cardHuman(object));
        } else if (object.type === "animal de compagnie") {
            cardList.push(cardPet(object));
        } else if (object.type === "Xeno") {
            cardList.push(cardXeno(object));
        } else {
            console.error("Type de Profil non existant :", object);
        }
    });

    return cardList;
}

// Fonction affiche tous les profil
function profilAll(grandTab) {
    const profils = document.querySelector(".profils");

    grandTab.forEach(petitTab => {
        const cardTab = profil(petitTab);
        cardTab.forEach(card => {
            profils.appendChild(card);
        });
    });
}
profilAll(tabData);


// MAP LEAFLET


const map = L.map('map').setView([43.60442, 1.443812], 14);

// tuile OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Fonction marker
function markerProfil(user) {

    const ICON = L.icon ({
        iconUrl: user.icon,
        iconSize: [50, 83],
        iconAnchor: [25, 83],
    });

    const marker = L.marker([user.latitude, user.longitude], { icon: ICON })
                    .addTo(map);

    return marker;
}

// Ajout marker
tabData.forEach(sousTableau => {
    sousTableau.forEach(user => {
        markerProfil(user);
    });
});

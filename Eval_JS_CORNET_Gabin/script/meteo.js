// Le fichier JS pour la partie Météo

// Création div infos
let info = document.createElement("div");
info.style.height = "300px";
info.style.width = "200px";
info.style.marginTop = "16px";
info.style.marginBottom = "16px";
info.style.border = "3px solid grey";
info.style.padding = "16px";

// Insertion div card météo
let cardMeteo = document.querySelector(".cardMeteo");
let button = cardMeteo.querySelector("button");
cardMeteo.insertBefore(info, button);

// Fonction qui remplace le contenu div info
function addInfo(content) {
    info.innerHTML = content;
}

// Fonction bouton
function bouton() {
    let btn = document.querySelector(".cardMeteo button");
    if (btn) {
        btn.classList.add("button__cardMeteo");
    }
}

// Chnagement couleur au maintient
button.addEventListener("mousedown", () => {
    button.style.backgroundColor = "orange";
});

button.addEventListener("mouseup", () => {
    button.style.backgroundColor = "";
});

// Appelle API et affiche infos au click
button.addEventListener("click", () => {

    fetch("https://prevision-meteo.ch/services/json/toulouse")
        .then(response => response.json())
        .then(data => {

            let condition = data.current_condition.condition;
            let temperature = data.current_condition.tmp;
            let tempMaxi = data.fcst_day_0.tmax;
            let tempMini = data.fcst_day_0.tmin;

            let contenu = `
                <p>Condition actuelle : ${condition}</p>
                <br>
                <p>Température : ${temperature} °C</p>
                <br>
                <p>Température Maximum : ${tempMaxi} °C</p>
                <br>
                <p>Température Minimum : ${tempMini} °C</p>
            `;

            addInfo(contenu);
            bouton();
        })
        
        .catch(error => {
            addInfo("<p>Erreur</p>");
        });
});

bouton();


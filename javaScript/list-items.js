new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status === 200) {
            var teddy = JSON.parse(this.responseText);
            resolve(teddy);
        } else if (this.readyState == 4 && this.status != 200) {
            reject("le site est actuellement indisponible");
        }
    }
    xhr.open("GET", "http://localhost:3000/api/teddies");
    xhr.send();

    /*pour chaque item présent dans la liste*/
}).then(function(teddy) {
    for (let count = teddy.length-1; count >= 0; count --) {

        /*crée une carte*/
        let cardItem = document.getElementById("cardItem");
        let newCard = document.createElement ("a");
        newCard.setAttribute ('href', "produit.html")
        newCard.classList.add("card");
        newCard.classList.add("m-4");
        newCard.classList.add("col-md-5");
        newCard.classList.add("col-10");
        newCard.classList.add("col-xl-3");
        newCard.classList.add("select");
        let teddyPrice = teddy[count]["price"]/100;

        /*envoie l'ID de l'item selectionné dans le session storage*/
        function select() {
            sessionStorage.setItem("pageSelection", teddy[count]["_id"]);
        }
        newCard.onclick = select;

        /*met toutes les infos en forme dans une carte*/
        newCard.innerHTML ='<img class="card-img-top" src="' + teddy[count]["imageUrl"] + '" alt="image de ' + teddy[count]["name"] + ' width="100" height="150" style="object-fit: contain;"><div class="card-body px-0"><div class="card-title"><h2 class="text-center">' + teddy[count]["name"] + '</h2></div><div class="card-text text-center">' + teddyPrice.toFixed(2) + '€</div></div>';
        cardItem.prepend(newCard);
    }
}).catch(function(error){
    let blocError = document.getElementById('errorMsg');
    blocError.innerText = error;
})
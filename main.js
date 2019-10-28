var tb = document.getElementById("tb");

tb.innerHTML = localStorage.getItem('podaci');


function loadFile(event) {
    var prikaz = document.getElementById('prikaz');
    prikaz.src = URL.createObjectURL(event.target.files[0]);
}


function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

document.getElementById("posalji").addEventListener("click", function() {
    var barkod = document.getElementById("barkod").value;
    var naziv = document.getElementById("naziv").value.trim();
    var opis = document.getElementById("opis").value.trim();
    var cena = document.getElementById("cena").value;
    var slika = document.getElementById("slika").value;

    var vrsta;
    var vrste = document.querySelectorAll("input[name='vrsta']");
    for (var i = 0; i < vrste.length; i++) {
        if (vrste[i].checked) {
            vrsta = vrste[i].value;
            break;
        }
    }
    var cenaPDV = cena * 1.2;
    var file = document.getElementById('slika').files[0];

    var barkodG = nazivG = opisG = vrstaG = cenaG = slikaG = true;

    if (barkod == "") {
        printError("barkodG", "Morate uneti barkod.");
        document.getElementById("barkod").classList.add("is-invalid");
    } else {
        printError("barkodG", "");
        document.getElementById("barkod").classList.remove("is-invalid");
        barkodG = false;
    }

    if (naziv == "") {
        printError("nazivG", "Morate uneti naziv artikla.");
        document.getElementById("naziv").classList.add("is-invalid");
    } else {
        printError("nazivG", "");
        document.getElementById("naziv").classList.remove("is-invalid");
        nazivG = false;
    }

    var maxDuzina = opis.maxLength > 0 ? opis.maxLength : 200;
    if (opis.length > maxDuzina) {
        printError("opisG", "Opis ne sme da bude duzi od 200 karaktera.");
        document.getElementById("opis").classList.add("is-invalid");
    } else {
        printError("opisG", "");
        document.getElementById("opis").classList.remove("is-invalid");
        opisG = false;
    }

    if (vrsta == null) {
        printError("vrstaG", "Izabrati vrstu artikla.");
    } else {
        printError("vrstaG", "");
        vrstaG = false;
    }

    if (cena < 0 || cena % 1 != 0) {
        printError("cenaG", "Cena mora da sadrzi ceo broj.");
        document.getElementById("cena").classList.add("is-invalid");
    } else {
        printError("cenaG", "");
        document.getElementById("cena").classList.remove("is-invalid");
        cenaG = false;
    }

    var ekstenzija = "";
    if (slika.lastIndexOf(".") > 0) {
        ekstenzija = slika.substring(slika.lastIndexOf(".") + 1, slika.length);
        if (ekstenzija.toLowerCase() != "png" || slika == "") {
            printError("slikaG", "Slika mora da bude u png formatu.");
        } else {
            printError("slikaG", "");
            slikaG = false;
        }

    }
    if ((barkodG || nazivG || opisG || vrstaG || cenaG || slikaG) == true) {
        return false;
    } else {
        addItem(barkod, naziv, opis, vrsta, cena, cenaPDV, file);
    }
});


function addItem(barkod, naziv, opis, vrsta, cena, cenaPDV, file) {

    var tr = tb.insertRow(0);

    var td1 = tr.insertCell(0);
    var td2 = tr.insertCell(1);
    var td3 = tr.insertCell(2);
    var td4 = tr.insertCell(3);
    var td5 = tr.insertCell(4);
    var td6 = tr.insertCell(5);
    var td7 = tr.insertCell(6);
    var td8 = tr.insertCell(7);

    td1.innerHTML = naziv;
    td2.innerHTML = barkod;
    td3.innerHTML = opis;
    td4.innerHTML = vrsta;
    td5.innerHTML = cena;
    td6.innerHTML = cenaPDV;

    if (file == undefined) {
        td7.innerHTML = "No image";
    } else {
        var reader = new FileReader();
        reader.onload = function(e) {
            var image = document.createElement("img");
            image.classList.add("img");
            image.src = e.target.result;
            td7.appendChild(image);
        }
        reader.readAsDataURL(file);
    }
    var d = new Date();

    var datum = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();

    td8.innerHTML = datum;

    localStorage.setItem("podaci", tb.innerHTML);

    return false;
}


function pretraga() {

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("unos");
    filter = input.value.toUpperCase();
    table = document.getElementById("tabela");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
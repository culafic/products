var tb = document.getElementById("tb");

tb.innerHTML = localStorage.getItem('podaci');


function loadFile(event) {
    var prikaz = document.getElementById('prikaz');
    prikaz.src = URL.createObjectURL(event.target.files[0]);
}

var greska1 = document.getElementById("greska1");
var greska2 = document.getElementById("greska2");
var greska3 = document.getElementById("greska3");
var greska4 = document.getElementById("greska4");
var greska5 = document.getElementById("greska5");

var greske = [greska1, greska2, greska3, greska4, greska5]

for (var i = 0; i < greske.length; i++) {
    greske[i].classList.add("hide");
}


document.getElementById("posalji").addEventListener("click", function() {


    var barkod = document.getElementById("barkod").value;

    var naziv = document.getElementById("naziv").value;

    var opis = document.getElementById("opis").value.trim();
    var maxDuzina = opis.maxLength > 0 ? opis.maxLength : 200;

    var cena = document.getElementById("cena").value;

    var cenaPDV = cena * 1.2;

    var vrsta;
    var vrste = document.querySelectorAll("input[name='vrsta']");
    for (var i = 0; i < vrste.length; i++) {
        if (vrste[i].checked) {
            vrsta = vrste[i].value;
            break;
        }
    }

    var file = document.getElementById('slika').files[0];
    var slika = document.getElementById("slika").value;
    var ekstenzija = "";


    if (barkod === "") {
        greska1.classList.add("show");
        document.getElementById("barkod").classList.add("is-invalid");
        return false;
    } else if (naziv === "") {
        greska2.classList.add("show");
        document.getElementById("naziv").classList.add("is-invalid");
        return false;
    } else if (opis.length > maxDuzina) {
        greska3.classList.add("show");
        document.getElementById("opis").classList.add("is-invalid");
        return false;
    } else if (cena < 0 || cena % 1 != 0) {
        greska4.classList.add("show");
        document.getElementById("cena").classList.add("is-invalid");
        return false;
    } else if (vrsta == null) {
        greska5.classList.add("show");
        return false;
    } else if (slika.lastIndexOf(".") > 0) {
        ekstenzija = slika.substring(slika.lastIndexOf(".") + 1, slika.length);
        if (ekstenzija.toLowerCase() != "png" || slika == "") {
            greska5.classList.add("show");
            return false;
        }
    }
    addItem(barkod, naziv, opis, vrsta, cena, cenaPDV, file);

    return false;
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

    var reader = new FileReader();
    reader.onload = function(e) {
        var image = document.createElement("img");
        image.classList.add("img");
        image.src = e.target.result;
        td7.appendChild(image);
    }
    reader.readAsDataURL(file);

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
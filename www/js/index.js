/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener('deviceready', onDeviceReady, false);
var check = {}; // On met toutes nos fonctions dans un objet littéral
var myForm = document.getElementById('myForm');
var storage = window.sessionStorage;

function onDeviceReady() {
    myForm.addEventListener('submit', onSubmit);
    document.getElementById("Connection").onclick = connection;
    document.getElementById("Inscription").onclick = inscription;
}

function connection() {
    document.getElementById('myForm').innerHTML =
        '<label class="form_col" for="numero">Numero :</label>'
        + '<input name="numero" id="numero" type="text" />'
        + '<span class="tooltip">Un numéro est composé de 10 chiffres</span>'
        + '<span class="form_col"></span> <input type="submit" value="Connection" />';
    var inputs = document.querySelectorAll('input[type=text], input[type=password]'),
        inputsLength = inputs.length;
    for (var i = 0; i < inputsLength; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            check[e.target.id](e.target.id); // "e.target" représente l'input actuellement modifié
        });
    }
    deactivateTooltips();
}

function inscription() {
    document.getElementById('myForm').innerHTML =
        '<label class="form_col" for="numero">Numero :</label>'
        + '<input name="numero" id="numero" type="text" />'
        + '<span class="tooltip">Un numéro est composé de 10 chiffres</span>'
        + '<label class="form_col" for="pseudo">Pseudo :</label>'
        + '<input name="pseudo" id="pseudo" type="text" />'
        + '<span class="tooltip">Le pseudo ne peut pas faire moins de 4 caractères</span>'
        + '<label class="form_col" for="nom">Nom :</label>'
        + '<input name="nom" id="nom" type="text" />'
        + '<span class="tooltip">Un nom ne peut pas faire moins de 2 caractères</span>'
        + '<label class="form_col" for="prenom">Prenom :</label>'
        + '<input name="prenom" id="prenom" type="text" />'
        + '<span class="tooltip">Un prénom ne peut pas faire moins de 4 caractères</span>'
        + '<span class="form_col"></span> <input type="submit" value="Inscription" />';
    var inputs = document.querySelectorAll('input[type=text], input[type=password]'),
        inputsLength = inputs.length;
    for (var i = 0; i < inputsLength; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            check[e.target.id](e.target.id); // "e.target" représente l'input actuellement modifié
        });
    }
    deactivateTooltips();
}

function onSubmit(e) {
    var result = true;
    for (var i in check) {
        result = check[i](i) && result;
    }
    if (result) {
        storage.setItem("numero", document.getElementById("numero").value);
        window.location="mainpage.html"
    }
    e.preventDefault();
}

// Fonction de désactivation de l'affichage des "tooltips"
function deactivateTooltips() {
    var tooltips = document.querySelectorAll('.tooltip'),
        tooltipsLength = tooltips.length;
    for (var i = 0; i < tooltipsLength; i++) {
        tooltips[i].style.display = 'none';
    }
}

// La fonction ci-dessous permet de récupérer la "tooltip" qui correspond à notre input
function getTooltip(elements) {
    while (elements = elements.nextSibling) {
        if (elements.className === 'tooltip') {
            return elements;
        }
    }
    return false;
}

check['numero'] = function(id) {
    var numero = document.getElementById(id),
        tooltipStyle = getTooltip(numero).style;
    if (numero.value.length === 10) {
        numero.className = 'correct';
        tooltipStyle.display = 'none';
        return true;
    } else {
        numero.className = 'incorrect';
        tooltipStyle.display = 'inline-block';
        return false;
    }
};

check['nom'] = function(id) {
    var name = document.getElementById(id),
        tooltipStyle = getTooltip(name).style;
    if (name.value.length >= 2) {
        name.className = 'correct';
        tooltipStyle.display = 'none';
        return true;
    } else {
        name.className = 'incorrect';
        tooltipStyle.display = 'inline-block';
        return false;
    }

};

check['prenom'] = check['nom'];

check['pseudo'] = function(id) {
    var pseudo = document.getElementById(id),
        tooltipStyle = getTooltip(pseudo).style;
    if (pseudo.value.length >= 4) {
        pseudo.className = 'correct';
        tooltipStyle.display = 'none';
        return true;
    } else {
        pseudo.className = 'incorrect';
        tooltipStyle.display = 'inline-block';
        return false;
    }

};
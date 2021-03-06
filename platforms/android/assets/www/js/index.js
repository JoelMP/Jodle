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

// Application Constructor
document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
var check={};
var socket;
var adr='http://129.88.57.104:8080';
var  storage = window.sessionStorage;

// deviceready Event Handler
//
// Bind any cordova events here. Common events are:
// 'pause', 'resume', etc.
function onDeviceReady() {
    $('#Connection').on("click", showConnection);
    $('#Inscription').on("click", showInscription);
}

function showConnection() {
    $('#myForm').html('<label class="form_col" for="numero">Numero :</label>'
        + '<input name="numero" id="numero" type="text" />'
        + '<span class="tooltip">Un numéro est composé de 10 chiffres</span>'
        + '<span class="form_col"></span> <input type="submit" id="userConnection" value="Connection" />');
    var inputs = document.querySelectorAll('input[type=text], input[type=password]'),
        inputsLength = inputs.length;
    for (var i = 0; i < inputsLength; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            check[e.target.id](e.target.id);
        });
    }
    $('#userConnection').on("click", function(event){
        event.preventDefault()
        var result = true;
        result = check['numero']('numero') && result;
        console.log("result : " + result);
        if (result) {
            isUser($('#numero').val());
        }
        
    });
    deactivateTooltips();
}

function successConnexion(tel) {
    console.log('Connection en cours');
    storage.setItem("tel", tel);
    document.location.href="mainpage.html";
    //socket.emit('nouvelle_connexion', tel);
}




function isUser(value) {
    console.log('isUser'+value);
    $.ajax({
        url : adr + '/api/utilisateur/' + value,
        type : 'GET',
        dataType : 'json',
        success : function(){
            successConnexion(value);
        },
        error : function() {
            alert('Numero inconnu');
            showConnection();
        } 
    });
}

function showInscription() {
    $('#myForm').html('<label class="form_col" for="numero">Numero :</label>'
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
        + '<span class="form_col"></span> <input type="submit" id="userInscription" value="Inscription" />');
    var inputs = document.querySelectorAll('input[type=text], input[type=password]'),
        inputsLength = inputs.length;
    for (var i = 0; i < inputsLength; i++) {
        inputs[i].addEventListener('keyup', function (e) {
            check[e.target.id](e.target.id); // "e.target" représente l'input actuellement modifié
        });
    }
    $('#userInscription').on("click", function(event){
        var result = true;
        for (var i in check) {
            result = check[i](i) && result;
        }
        if (result) {
            console.log('Inscription en cours');
            var tel = $('#numero').val();
            var dataa = "numero=" + tel;
            dataa += "&nom=" + $('#nom').val();
            dataa += "&prenom=" + $('#prenom').val();
            dataa += "&username=" + $('#pseudo').val();
            console.log(dataa);
            $.ajax({
                url : adr + '/api/utilisateur/',
                type : 'POST',
                data : dataa,
                contentType: 'application/x-www-form-urlencoded',
                success : function(){
                    successConnexion(tel);
                },
                error : function(xhr, status, erreur){
                    console.log(xhr.responseText);
                    console.log(xhr.status);
                    console.log(status);
                    console.log(erreur);
                    alert('Problèmes de connexions avec la base de données');
                    showInscription();
                }
            });
        }
        else {
            alert('Erreur dans le formulaire');
            showInscription();
        }
        event.preventDefault();
    });
    deactivateTooltips();
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

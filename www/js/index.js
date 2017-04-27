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

// deviceready Event Handler
//
// Bind any cordova events here. Common events are:
// 'pause', 'resume', etc.
function onDeviceReady() {
    document.getElementById("Connection").onclick = showConnection;
    document.getElementById("Inscription").onclick = showInscription;
}

function showConnection() {
    document.getElementById('myForm').innerHTML =
        '<label class="form_col" for="numero">Numero :</label>'
        + '<input name="numero" id="numero" type="text" />'
        + '<span class="tooltip">Un numéro est composé de 10 chiffres</span>'
        + '<span class="form_col"></span> <input type="submit" value="Connection" />';
}

function showInscription() {
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
}
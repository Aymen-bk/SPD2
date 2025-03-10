<template>
  <header>
        <img src="images/logo-les-bonnes-pieces.png" alt="LOGO" id="logo">
        <h1>Les Bonnes Pièces</h1>
      </header>
      <main>
        <!-- Menu de recherche -->
        <section class="filtres">
          <h3>Filtres</h3>
            <b>Par prix : </b>Croissant <input type="radio" v-model="prixFiltre" name="prixFiltre" value="croissant">
                      Décroissant <input type="radio" v-model="prixFiltre" name="prixFiltre" value="decroissant"> <br><br>
            <b>Par nom : </b> <input type="text" v-model="searchTitle" placeholder="Rechercher..."><br><br>
            <b>Disponibilité :</b> Disponilbes <input type="checkbox" v-model="dispoFiltre" name="dispoFiltre" value="dispo">
                      Indisponibles <input type="checkbox" v-model="dispoFiltre" name="dispoFiltre" value="indispo"> <br><br>
            <b>Par catégorie : </b><select v-model="categorie">
              <option value="">Filtrer par catégorie</option>
              <option value="Électricité">Électricité</option>
              <option value="Filtration">Filtration</option>
              <option value="Moteur">Moteur</option>
              <option value="Freinage">Freinage</option>
              <option value="Refroidissement">Refroidissement</option>
              <option value="Suspension">Suspension</option>
              <option value="Sécurité">Sécurité</option>
              <option value="Carburant">Carburant</option>
              <option value="Carrosserie">Carrosserie</option>
              <option value="Échappement">Échappement</option>
              <option value="Transmission">Transmission</option>
              <option value="Direction">Direction</option>
          </select>
         
        </section>
        <!-- Fiches produits -->
        <section class="fiches">
          <div class="pieces" v-for="p in filteredPieces" :key="p.id">
          <h3>{{ p.nom }}</h3>
          <img :src="p.Image">
          <p>Prix : {{ p.prix }}€</p>
          <p>Catégorie : {{ p.categorie }}</p>
          <p>Disponibilité : {{ p.Disponible ? 'Disponible' : 'Indisponible' }}</p>
          <button v-if="p.Disponible" @click="Ajouter(p)" class="btn-ajouter">Ajouter au panier</button>
        </div>
        </section>
        <!-- Panier -->
      <section class="panier">
        <h3>Panier</h3>
        <ul>
          <li v-for="item in panier" :key="item.id">{{ item.nom }} - {{ item.prix }}€</li> <!-- iteration sur les paniers-->
        </ul>
      </section>
      </main>
  </template>
  
  <script>
      export default {
          data () {
                  return {
                    dispoFiltre : ["dispo"],
                    panier : 

          [ {"id": 0,
          "nom": "Panier vide",
          "prix": 0,
          "categorie": "-",
          "Image": "-",
          "Disponible": true }],
                    
                    categorie : "",
                    searchTitle : "",
                    prixFiltre : "",
            pieces :[ //thanks to whoever made this
      {
          "id": 1,
          "nom": "Batterie 12V",
          "prix": 120,
          "categorie": "Électricité",
          "Image": "image_batterie_12v.jpg",
          "Disponible": true
      },
      {
          "id": 2,
          "nom": "Filtre à huile",
          "prix": 15,
          "categorie": "Filtration",
          "Image": "image_filtre_huile.jpg",
          "Disponible": true
      },
      {
          "id": 3,
          "nom": "Bougies d'allumage (x4)",
          "prix": 35,
          "categorie": "Moteur",
          "Image": "image_bougies_allumage.jpg",
          "Disponible": false
      },
      {
          "id": 4,
          "nom": "Disques de frein (x2)",
          "prix": 80,
          "categorie": "Freinage",
          "Image": "image_disques_frein.jpg",
          "Disponible": true
      },
      {
          "id": 5,
          "nom": "Courroie de distribution",
          "prix": 90,
          "categorie": "Moteur",
          "Image": "image_courroie_distribution.jpg",
          "Disponible": false
      },
      {
          "id": 6,
          "nom": "Pompe à eau",
          "prix": 70,
          "categorie": "Refroidissement",
          "Image": "image_pompe_eau.jpg",
          "Disponible": true
      },
      {
          "id": 7,
          "nom": "Amortisseurs arrière (x2)",
          "prix": 150,
          "categorie": "Suspension",
          "Image": "image_amortisseurs_arriere.jpg",
          "Disponible": true
      },
      {
          "id": 8,
          "nom": "Filtre à air",
          "prix": 20,
          "categorie": "Filtration",
          "Image": "image_filtre_air.jpg",
          "Disponible": true
      },
      {
          "id": 9,
          "nom": "Capteur ABS",
          "prix": 50,
          "categorie": "Sécurité",
          "Image": "image_capteur_abs.jpg",
          "Disponible": false
      },
      {
          "id": 10,
          "nom": "Radiateur de refroidissement",
          "prix": 130,
          "categorie": "Refroidissement",
          "Image": "image_radiateur_refroidissement.jpg",
          "Disponible": true
      },
      {
          "id": 11,
          "nom": "Alternateur",
          "prix": 200,
          "categorie": "Électricité",
          "Image": "image_alternateur.jpg",
          "Disponible": true
      },
      {
          "id": 12,
          "nom": "Démarreur",
          "prix": 180,
          "categorie": "Électricité",
          "Image": "image_demarreur.jpg",
          "Disponible": false
      },
      {
          "id": 13,
          "nom": "Kit d’embrayage",
          "prix": 220,
          "categorie": "Transmission",
          "Image": "image_kit_embrayage.jpg",
          "Disponible": true
      },
      {
          "id": 14,
          "nom": "Injecteur de carburant",
          "prix": 110,
          "categorie": "Moteur",
          "Image": "image_injecteur_carburant.jpg",
          "Disponible": true
      },
      {
          "id": 15,
          "nom": "Pompe à carburant",
          "prix": 90,
          "categorie": "Carburant",
          "Image": "image_pompe_carburant.jpg",
          "Disponible": true
      },
      {
          "id": 16,
          "nom": "Capteur de pression des pneus (TPMS)",
          "prix": 45,
          "categorie": "Sécurité",
          "Image": "image_capteur_tpms.jpg",
          "Disponible": true
      },
      {
          "id": 17,
          "nom": "Rétroviseur extérieur",
          "prix": 60,
          "categorie": "Carrosserie",
          "Image": "image_retroviseur_exterieur.jpg",
          "Disponible": false
      },
      {
          "id": 18,
          "nom": "Échappement complet",
          "prix": 250,
          "categorie": "Échappement",
          "Image": "image_echappement_complet.jpg",
          "Disponible": true
      },
      {
          "id": 19,
          "nom": "Vanne EGR",
          "prix": 140,
          "categorie": "Moteur",
          "Image": "image_vanne_egr.jpg",
          "Disponible": true
      },
      {
          "id": 20,
          "nom": "Turbo",
          "prix": 400,
          "categorie": "Moteur",
          "Image": "image_turbo.jpg",
          "Disponible": true
      },
      {
          "id": 21,
          "nom": "Joint de culasse",
          "prix": 75,
          "categorie": "Moteur",
          "Image": "image_joint_culasse.jpg",
          "Disponible": false
      },
      {
          "id": 22,
          "nom": "Boîtier de direction",
          "prix": 300,
          "categorie": "Direction",
          "Image": "image_boîtier_direction.jpg",
          "Disponible": true
      },
      {
          "id": 23,
          "nom": "Silent bloc de suspension",
          "prix": 35,
          "categorie": "Suspension",
          "Image": "image_silent_bloc_suspension.jpg",
          "Disponible": true
      },
      {
          "id": 24,
          "nom": "Cardan de transmission",
          "prix": 160,
          "categorie": "Transmission",
          "Image": "image_cardan_transmission.jpg",
          "Disponible": true
      },
      {
          "id": 25,
          "nom": "Capteur de position vilebrequin",
          "prix": 50,
          "categorie": "Moteur",
          "Image": "image_capteur_position_vilebrequin.jpg",
          "Disponible": false
      }
  ]
  
                  }
              },
              methods:{
                Ajouter(p)
                {
                if (this.panier == [{ //panier vide par defaut
          "id": 0,
          "nom": "Panier vide",
          "prix": 0,
          "categorie": "-",
          "Image": "-",
          "Disponible": true
      }])
                {
                  this.panier = [];
                }
                this.panier.push(p);
                }
              },
              computed: 
              {
              filteredPieces() {
        let filtered = this.pieces.filter(p => 
          (p.nom.toLowerCase().includes(this.searchTitle.toLowerCase()) || this.searchTitle === '') &&
          (p.categorie == this.categorie || this.categorie == "") &&
          (this.dispoFiltre.includes("dispo") && p.Disponible || this.dispoFiltre.includes("indispo") && !p.Disponible)
        );
  
        if (this.prixFiltre == "croissant") {
          filtered.sort((a, b) => a.prix - b.prix);
        } else if (this.prixFiltre == "decroissant") {
          filtered.sort((a, b) => b.prix - a.prix);
        }
        return filtered;
      }
    },
  };
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
  
  body {
    max-width: 1200px;
    margin: auto;
    padding: 16px;
    font-family: 'Montserrat', sans-serif;
  }
  
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
    padding: 8px;
    background-color: #7451eb;
    text-align: center;
    color: white;
  }
  header img {
    height: 60px;
    margin-left: 1rem;
  }
  header h1 {
    flex-grow: 1;
  }
  
  main {
    display: flex;
    flex-direction: row;
  }
  
  .filtres {
    border-radius: 4px;
    box-shadow: 0px 0px 4px gray;
    margin: 8px;
    padding: 8px;
    min-width: 300px;
    min-height: 400px;
  }
  .filtres h3 {
    text-align: center;
  }
  .filtres select, input[type="text"] {
    width: 60%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-top: 8px;
  }
  .fiches {
    flex: 1;
    margin: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .panier{
    border-radius: 4px;
    box-shadow: 0px 0px 4px gray;
    padding: 16px;
  }
  .pieces {
    flex: 1 1 calc(50% - 16px);
    box-shadow: 0px 0px 4px gray;
    padding: 16px;
    border-radius: 4px;
  }
  .fiches img {
    max-width: 100%;
  }
  .fiches p {
    margin-top: 4px;
    margin-bottom: 4px;
  }
  #logo {
    width: 100px;
    height: auto;
  }
  .btn-ajouter {
    background-color: #7451eb;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  .btn-ajouter:hover {
    background-color: #563bb8;
  }
  </style>
  
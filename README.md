# Projet_RPG_TypeScript

Mini RPG tour par tour en TypeScript (Deno). Le joueur compose une équipe de 3 aventuriers, explore un donjon de 5 salles, et affronte un boss final.

## Sommaire

- [Fonctionnalités](#fonctionnalités)
- [Déroulement d'une partie](#déroulement-dune-partie)
- [Classes jouables](#classes-jouables)
- [Objets](#objets)
- [Lancer le jeu](#lancer-le-jeu)
- [Contrôles](#contrôles)
- [Conseils d'utilisation](#conseils-dutilisation)
- [Dépannage](#dépannage)
- [Compatibilité](#compatibilité)
- [FAQ rapide](#faq-rapide)
- [Structure du projet](#structure-du-projet)
- [Astuces](#astuces)
- [Notes](#notes)
- [Exemple d'affichage](#exemple-daffichage)

## Fonctionnalités

- Choix de 3 aventuriers parmi 6 classes (Guerrier, Mage, Paladin, Barbare, Prêtre, Voleur)
- Combats tour par tour avec ordre basé sur la vitesse
- Actions spécifiques par classe (soin, magie, vol, attaque de zone, berserk)
- Monstres aléatoires parmi 5 types
- Boss avec attaque de zone
- Inventaire partagé (potions, éther, étoiles)
- Affichage ASCII plus lisible dans le terminal

## Déroulement d'une partie

1) Sélection de l'équipe (3 personnages)
2) 5 salles dans l'ordre :
   - Combat aléatoire (3 monstres)
   - Coffre (piège ou 2 objets)
   - Combat aléatoire (3 monstres)
   - Coffre (piège ou 2 objets)
   - Boss final
3) Fin de partie :
	- Victoire si le boss est K.O.
	- Game Over si tous les aventuriers sont K.O.

## Classes jouables

- Guerrier : attaque/defense elevees, pas d'action speciale.
- Mage : faible defense, attaque magique (consomme des PM, ignore la defense).
- Paladin : defense elevee, attaque sainte de zone (40% des degats physiques).
- Barbare : grosse attaque, action Berserk (130% des degats) avec auto-degat.
- Pretre : soin de 25% des PV sur un allie.
- Voleur : tres rapide, vole des objets selon probabilites.

## Objets

- Potion : soigne 50% des PV
- Morceau d'étoile : ressuscite à 20% des PV ou soigne 50%
- Demi-étoile : ressuscite à 100% des PV ou soigne 100%
- Éther : restaure 30% des PM

Inventaire de départ : 2 potions, 1 éther, 1 morceau d'étoile.

## Lancer le jeu

Prérequis : Deno installé (terminal interactif requis pour les menus).

```bash
cd Projet_RPG_TypeScript
deno run main.ts
```

## Contrôles

- Les menus affichent des options numerotees.
- Tape le numero puis appuie sur Entree.
- Un mauvais choix redemande automatiquement une saisie.

## Conseils d'utilisation

- Lance le jeu depuis un vrai terminal (pas dans un environnement non interactif).
- Si les menus ne répondent pas, vérifie que `prompt()` est bien supporté dans ton environnement Deno.

## Dépannage

- Si rien ne s'affiche : assure-toi d'être dans le dossier du projet avant de lancer `deno run main.ts`.
- Si les saisies semblent bloquées : lance la commande dans un terminal classique (pas via un script non interactif).

## Compatibilité

- OS : Linux, macOS, Windows (terminal classique recommandé).
- Runtime : Deno récent (version stable).

## FAQ rapide

- Q: Les options de menu ne répondent pas.
   R: Vérifie que le terminal est interactif et que `prompt()` est supporté.
- Q: L'affichage est bizarre ou coupe.
   R: Agrandis la fenêtre du terminal pour voir les boîtes ASCII complètement.

## Structure du projet

- main.ts : point d'entrée
- GameManager.ts : déroulement global de la partie
- fight.ts : boucle de combat
- Room.ts / CombatRoom.ts / ChestRoom.ts : salles
- Inventory.ts / Chest.ts : gestion des objets
- adventurers/* : classes d'aventuriers
- Monster/* : monstres standards
- ennemies/* : boss

## Astuces

- Le Mage est puissant contre les cibles très défensives.
- Le Pretre stabilise l'equipe sur les combats longs.
- Le Voleur permet d'augmenter l'inventaire pendant les combats.

## Notes

- Le jeu est conçu pour être joué dans un terminal.
- Les combats se jouent via des menus interactifs.

## Exemple d'affichage

```
+----------------------------------------------------------+
| Rencontre                                                |
+----------------------------------------------------------+
| Ennemis: Bandit 1, Loup 2, Gobelin 3                     |
+----------------------------------------------------------+
+----------------------------------------------------------+
| Joueurs                                                  |
+----------------------------------------------------------+
| Guerrier [##################] 90/90 PV                   |
| Mage [##################] 70/70 PV | [##################]|
| Paladin [##################] 110/110 PV                  |
+----------------------------------------------------------+
+----------------------------------------------------------+
| Ennemis                                                  |
+----------------------------------------------------------+
| Bandit 1 [##################] 60/60 PV                   |
| Loup 2 [##################] 55/55 PV                     |
| Gobelin 3 [##################] 45/45 PV                  |
+----------------------------------------------------------+
```


# Projet_RPG_TypeScript

Mini RPG tour par tour en TypeScript (Deno). Le joueur compose une equipe de 3 aventuriers, explore un donjon de 5 salles, et affronte un boss final.

## Sommaire

- [Fonctionnalites](#fonctionnalites)
- [Deroulement d'une partie](#deroulement-dune-partie)
- [Objets](#objets)
- [Lancer le jeu](#lancer-le-jeu)
- [Conseils d'utilisation](#conseils-dutilisation)
- [Depannage](#depannage)
- [Compatibilite](#compatibilite)
- [FAQ rapide](#faq-rapide)
- [Structure du projet](#structure-du-projet)
- [Notes](#notes)

## Fonctionnalites

- Choix de 3 aventuriers parmi 6 classes (Guerrier, Mage, Paladin, Barbare, Pretre, Voleur)
- Combats tour par tour avec ordre base sur la vitesse
- Actions specifiques par classe (soin, magie, vol, attaque de zone, berserk)
- Monstres aleatoires parmi 5 types
- Boss avec attaque de zone
- Inventaire partage (potions, ether, etoiles)
- Affichage ASCII plus lisible dans le terminal

## Deroulement d'une partie

1) Selection de l'equipe (3 personnages)
2) 5 salles dans l'ordre :
	- Combat aleatoire (3 monstres)
	- Coffre (piege ou 2 objets)
	- Combat aleatoire (3 monstres)
	- Coffre (piege ou 2 objets)
	- Boss final
3) Fin de partie :
	- Victoire si le boss est K.O.
	- Game Over si tous les aventuriers sont K.O.

## Objets

- Potion : soigne 50% des PV
- Morceau d'etoile : ressuscite a 20% des PV ou soigne 50%
- Demi-etoile : ressuscite a 100% des PV ou soigne 100%
- Ether : restaure 30% des PM

Inventaire de depart : 2 potions, 1 ether, 1 morceau d'etoile.

## Lancer le jeu

Prerequis : Deno installe (terminal interactif requis pour les menus).

```bash
cd Projet_RPG_TypeScript
deno run main.ts
```

## Conseils d'utilisation

- Lance le jeu depuis un vrai terminal (pas dans un environnement non interactif).
- Si les menus ne repondent pas, verifie que `prompt()` est bien supporte dans ton environnement Deno.

## Depannage

- Si rien ne s'affiche : assure-toi d'etre dans le dossier du projet avant de lancer `deno run main.ts`.
- Si les saisies semblent bloquees : lance la commande dans un terminal classique (pas via un script non interactif).

## Compatibilite

- OS : Linux, macOS, Windows (terminal classique recommande).
- Runtime : Deno recent (version stable).

## FAQ rapide

- Q: Les options de menu ne repondent pas.
	R: Verifie que le terminal est interactif et que `prompt()` est supporte.
- Q: L'affichage est bizarre ou coupe.
	R: Agrandis la fenetre du terminal pour voir les boites ASCII completement.

## Structure du projet

- main.ts : point d'entree
- GameManager.ts : deroulement global de la partie
- fight.ts : boucle de combat
- Room.ts / CombatRoom.ts / ChestRoom.ts : salles
- Inventory.ts / Chest.ts : gestion des objets
- adventurers/* : classes d'aventuriers
- Monster/* : monstres standards
- ennemies/* : boss

## Notes

- Le jeu est concu pour etre joue dans un terminal.
- Les combats se jouent via des menus interactifs.

## Exemple d'affichage

```
+----------------------------------------------------------+
| Combat                                                   |
+----------------------------------------------------------+
| Debut du combat                                          |
+----------------------------------------------------------+
| Ennemis: Gobelin 1, Loup 2, Bandit 3                      |
+----------------------------------------------------------+
+----------------------------------------------------------+
| Joueurs                                                  |
+----------------------------------------------------------+
| Guerrier [##########--------] 45/90 PV | 0/0 PM           |
| Mage     [########--------]  30/70 PV | [#####---------] 30/60 PM |
+----------------------------------------------------------+
+----------------------------------------------------------+
| Ennemis                                                  |
+----------------------------------------------------------+
| Gobelin 1 [######------------] 25/45 PV                   |
| Loup 2   [##########--------] 32/55 PV                    |
| Bandit 3 [#########---------] 28/60 PV                    |
+----------------------------------------------------------+
------------------------------------------------------------
Tour 3 : Mage (Joueur)
> Mage -> Gobelin 1 : 12 degats magique
	Gobelin 1 : 13 PV
```


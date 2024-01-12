Équipe composée de :
* Pierre CHEVILY
* Sofiane BOUGAMZA
* Said KACI
* Nassim MAATOUGUI

# Présentation du site
Ce site est une version anglaise du site velib. Nous l'avons conçu pour que les personnes étrangères puissent accéder à une version élégante du site.
# Fonctions du site
## La page d'accueil
* Les utilisateurs peuvent choisir parmi un éventail de choix pour leurs forfaits.
* Étant donné que notre site s'adresse à des voyageurs, nous n'avons affiché que les forfaits temporaires , pour que l'utilisateur ne soit pas perdu parmi le large choix proposé sur le site original de Velib.
* Si l'utilisateur a des remarques particulières, il peut nous les écrire dans un formulaire.
## La carte
* Le site vous permet de regarder quelles sont les stations Velib avec le plus de vélos
* Chaque marqueur indique le nombre de vélos disponibles, et leurs types : électrique ou mécanique.
* Afin de faciliter la compréhension de l'utilisateur, nous avons ajouté une légende en bas à gauche de la carte. Chaque marqueur aura une couleur, qui symbolise la capacité de la station. Plus la couleur est rouge foncé, plus la capacité est grande.
* L'utilisateur peut aussi se retrouver plus facilement à l'aide d'une minimap, qui indique la position de l'utilisateur sur la carte.
* Si l'utilisateur est dans Paris, sa position sera alors affichée, pour qu'il puisse mieux voir les stations autour de lui.
* L'utilisateur peut basculer entre différentes couches, s'il préfère avoir une map plus sombre.
* Une fonctionnalité intéressante est la topographie des lieux de Paris : en voyant l'altitude et les routes possibles, cela permet aux cyclistes de préparer en avance leur trajet.
* Comme il y a énormément de stations Velib, nous avons utilisé un Cluster pour regrouper toutes les stations.
* L'utilisateur ne peut pas sortir des limites que nous avons définies, car au-delà de ces limites, il n'y a plus de station Velib.
## Base de données
Nous avons 2 bases de données :
1) Utilisateur : cette base sert à stocker les données des utilisateurs, avec leur mail et leur mot de passe notamment.
2) Formulaire : cette base est utile pour récolter les commentaires des utilisateurs. Un seul utilisateur peut faire plusieurs commentaires. Un utilisateur doit être connecté pour envoyer le formulaire contenant son commentaire.
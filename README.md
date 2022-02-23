![alt text](https://i.imgur.com/2PaPDrs.png)

## Groupomania Reseau Social

Pour faire fonctionner le Projet, vous devez installer :

- [NodeJS](https://nodejs.org/en/download/) en version 14.0

## Installer le Back-End

Depuis un terminal de commande, rendez-vous dans le dossier BackEnd du projet et taper: "npm install".
Cela installera tout les packages necessaire pour que le projet fonctionne. 
Sur Windows, ces installations peuvent nécessiter d'utiliser PowerShell en tant qu'administrateur.

## Installer la base de donnée SQL

Ce projet utilise une base de données SQL pour stocker les informations des utilisateurs, il vous faudra donc installer et configurer [MySQL Server v8](https://dev.mysql.com/downloads/mysql/)
Retenez bien le nom d'utilisateur et mot de passe que vous allez utiliser lors de l'installation, car il faudra réutiliser ces informations par la suite.

Une fois MySql installé, rendez-vous dans le dossier d'installation de ce dernier, puis ouvrez le dossier "bin". A partir de la, ouvrir un terminal et taper "mysql -u root -p"
Connecter vous ensuite à votre serveur avec vos identifiants, cette étape permet de vérifier que tout est bien fonctionnel côter MySQL.

## Configurer la base de donnée SQL

Il vous faudra le fichier ".env" qui n'est pas fournit ici pour des raisons de sécurité.
Ce fichier contient les informations de la base de données afin que Sequelize puisse fonctionner correctement, il est donc indispensable.
Si vous possédez une copie de ce fichier, vous pouvez l'éditer avec un éditeur de texte et remplir les informations nécessaire avec votre propre configuration SQL:

- SQL_HOST devrait être "localhost".
- SQL_USER doit contenir le nom d'user que vous avez choisi. (Par default root).
- SQL_PASS doit contenir le mot de passe que vous avez défini.
- SQL_DB doit avoir le même nom que la base de donnée, par défaut "Groupomania".
- JWT_SECRET le secret que vous allez définir.

Une fois les informations remplies, placez le fichier ".env" dans le dossier BackEnd du projet.

## Démarrer le Back-End

Depuis le dossier Backend, taper: "nodemon server" dans le terminal pour démarrer le serveur. Si le fichier .env a bien été configuré correctement, vous devriez pouvoir lire
"Connection has been established successfully." En principe, si la base de donnée Groupomania n'existe pas, elle devrait être créé automatiquement, si ce n'est pas le cas
rendez-vous sur MySql dans la console et taper "CREATE DATABASE Groupomania;"

## Installer le Front-End

Depuis un terminal de commande, rendez-vous dans le dossier FrontEnd du projet et taper: "npm install".
Ce projet utilise Javascript et le framework "React", beaucoup de packages sont necessaire et par conséquent l'installation prendra un moment.

## Démarrer le Front-End

Depuis le dossier FrontEnd, taper: "npm start" pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:8000/. L'application va se recharger automatiquement si vous modifiez un fichier source.
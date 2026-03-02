# 🏢 Groupomania - Réseau Social d'Entreprise

> **Projet de fin de formation (Projet 7 - OpenClassrooms)**
> *Réalisation d'un MVP complet "from scratch" : Backend, Frontend et Base de données.*

## 🎯 Le Projet
Développement d'un outil de partage interne pour les employés du groupe Groupomania, visant à faciliter les interactions et le sentiment d'appartenance via un fil d'actualité interactif.

## 🚀 Fonctionnalités clés
- **Authentification sécurisée** : Inscription et connexion avec gestion de session via JWT.
- **Fil d'actualité** : Création, modification et suppression de posts multimédias (texte et images).
- **Interactions** : Système de "Likes" sur les publications.
- **Rôle Administrateur** : Un compte modérateur dédié pour la gestion du contenu.
- **Design Responsif** : Interface fluide s'adaptant aux mobiles, tablettes et desktops.

## 🛠️ Stack Technique
- **Frontend** : Vue.js 3, Vue Router.
- **Backend** : Node.js, Express.
- **Base de données** : MariaDB / MySQL avec l'ORM Sequelize.
- **Sécurité** : Hachage des mots de passe avec BCrypt et sécurisation des headers avec Helmet.

---

## ⚙️ Installation et Configuration

### 🟢 Back-end
1. **Dépendances** : Depuis le dossier `back-end`, lancez `npm install`.
2. **Base de données** : Assurez-vous d'avoir une instance MariaDB/MySQL active.
3. **Configuration** : Renommez le fichier `.env.example` en `.env` et complétez les variables :
   - `SERVER_PORT`: 8000
   - `BCRYPT_SALT_ROUND`: (ex: 10)
   - `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - `JWT_SECRET`, `JWT_DURATION` (ex: 1h)
   - `ADMIN_USER` : ID du user souhaité comme admin.
4. **Stockage** : Créez un dossier `/images` à la racine du dossier `back-end`.
5. **Démarrage** : `npm run dev`.

### 🔵 Front-end
1. **Dépendances** : Depuis le dossier `front-end/groupomania`, lancez `npm install`.
2. **Démarrage** : `npm run serve`.
3. **Accès** : L'application est disponible par défaut sur `http://localhost:8080`.

---

## 🛡️ Engagement Qualité & Sécurité
- Respect des standards **WCAG** pour l'accessibilité.
- Protection contre les failles courantes (Injection SQL via Sequelize, XSS).
- Stockage sécurisé des fichiers via Multer.

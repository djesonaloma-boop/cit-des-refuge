// api/server.js
// MI.C.L.A — CITÉ DE REFUGE
// Serveur API pour l'espace public et l'administration

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// ======================================================
// MIDDLEWARES
// ======================================================

app.use(cors());

app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));

// ======================================================
// DOSSIERS
// ======================================================

const DATA_DIR = path.join(
    __dirname,
    "..",
    "data"
);

const UPLOADS_DIR = path.join(
    __dirname,
    "..",
    "uploads"
);

const PUBLIC_DIR = path.join(
    __dirname,
    "..",
    "public"
);

const DATABASE_FILE = path.join(
    DATA_DIR,
    "database.json"
);

const IMAGE_DIR = path.join(
    UPLOADS_DIR,
    "images"
);

const AUDIO_DIR = path.join(
    UPLOADS_DIR,
    "audio"
);

const VIDEO_DIR = path.join(
    UPLOADS_DIR,
    "videos"
);

// ======================================================
// CRÉATION DES DOSSIERS
// ======================================================

function createDirectories() {

    const directories = [
        DATA_DIR,
        UPLOADS_DIR,
        IMAGE_DIR,
        AUDIO_DIR,
        VIDEO_DIR
    ];

    directories.forEach((directory) => {

        if (!fs.existsSync(directory)) {

            fs.mkdirSync(
                directory,
                {
                    recursive: true
                }
            );

        }

    });

}

createDirectories();

// ======================================================
// BASE DE DONNÉES PAR DÉFAUT
// ======================================================

const defaultDatabase = {

    site: {

        name: "MI.C.L.A — CITÉ DE REFUGE",

        meaning:
            "Ministère des Chrétiens pour Libérer les Âmes — Cité de Refuge",

        presentation: "",

        verse: "Jérémie 33:3",

        pastor: "Jérémie Bakadisanga",

        berger: "Chardin Vuanda",

        mainPhoto: ""

    },

    programme: [

        {
            id: 1,
            jour: "Lundi",
            activite:
                "Une heure avec Jésus — Intercession",
            heure: "17h00–18h00",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 2,
            jour: "Mardi",
            activite: "Partage biblique",
            heure: "17h00–18h00",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 3,
            jour: "Mercredi",
            activite: "Culte d’enseignement",
            heure: "17h30–19h30",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 4,
            jour: "Jeudi",
            activite:
                "Intercession des serviteurs de Dieu",
            heure: "17h00–18h00",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 5,
            jour: "Vendredi",
            activite: "Combat spirituel",
            heure: "17h30–19h30",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 6,
            jour: "Samedi",
            activite:
                "Réunion du département des Mamans",
            heure: "08h30–12h00",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 7,
            jour: "Samedi",
            activite:
                "Suivi et évangélisation",
            heure: "14h30",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 8,
            jour: "Samedi",
            activite:
                "Département de jeunesse",
            heure: "16h30–17h30",
            predicateur: "À définir",
            moderateur: "À définir"
        },

        {
            id: 9,
            jour: "Dimanche",
            activite:
                "Culte d’adoration et d’action de grâce",
            heure: "07h30–10h30",
            predicateur: "À définir",
            moderateur: "À définir"
        }

    ],

    activites: [],

    chantres: [],

    chansons: [],

    affiches: [],

    galerie: [],

    messages: [],

    actualites: [],

    jeunesse: {

        photo: "",

        message: "",

        prayer: "",

        note: "",

        preacher: "",

        moderator: "",

        verse: "",

        verseReference: "",

        announcements: [],

        audios: [],

        videos: [],

        gallery: [],

        activities: []

    },

    protocole: {

        annonce: "",

        photo: "",

        programme: [

            {
                id: 1,
                jour: "Lundi",
                activite:
                    "Une heure avec Jésus",
                heure: "17h00–18h00",
                responsable: "À définir",
                observation:
                    "Présence avant le début"
            },

            {
                id: 2,
                jour: "Mardi",
                activite:
                    "Partage biblique",
                heure: "17h00–18h00",
                responsable: "À définir",
                observation:
                    "Accueil et organisation"
            },

            {
                id: 3,
                jour: "Mercredi",
                activite:
                    "Culte d’enseignement",
                heure: "17h30–19h30",
                responsable: "À définir",
                observation:
                    "Arriver avant le culte"
            },

            {
                id: 4,
                jour: "Jeudi",
                activite:
                    "Intercession des serviteurs de Dieu",
                heure: "17h00–18h00",
                responsable: "À définir",
                observation:
                    "Préparation avant l’arrivée des fidèles"
            },

            {
                id: 5,
                jour: "Vendredi",
                activite:
                    "Combat spirituel",
                heure: "17h30–19h30",
                responsable: "À définir",
                observation:
                    "Service jusqu’à la fin"
            },

            {
                id: 6,
                jour: "Samedi",
                activite:
                    "Réunion du département des Mamans",
                heure: "08h30–12h00",
                responsable: "À définir",
                observation:
                    "Organisation et accueil"
            },

            {
                id: 7,
                jour: "Samedi",
                activite:
                    "Suivi et évangélisation",
                heure: "14h30",
                responsable: "À définir",
                observation:
                    "Présence avant le départ"
            },

            {
                id: 8,
                jour: "Samedi",
                activite:
                    "Programme de la Jeunesse",
                heure: "16h30–17h30",
                responsable: "À définir",
                observation:
                    "Présence avant 16h30"
            },

            {
                id: 9,
                jour: "Dimanche",
                activite:
                    "Adoration & Action de Grâce",
                heure: "07h30–10h30",
                responsable: "À définir",
                observation:
                    "Présence avant le début"
            }

        ]

    },

    pasteur: {

        messages: [],

        audios: [],

        prayers: [],

        announcements: []

    },

    berger: {

        messages: [],

        audios: [],

        prayers: [],

        announcements: []

    },

    contacts: {

        pastor: {

            name: "Jérémie Bakadisanga",

            phone: "+243 904 490 937"

        },

        berger: {

            name: "Chardin Vuanda",

            phone: "+243 896 039 439"

        },

        whatsappGroup:
            "https://chat.whatsapp.com/DkNLg4tKx3t7NM8N1wVZxI"

    },

    localisation: {

        address: "",

        description: "",

        latitude: "",

        longitude: ""

    },

    support: []

};

// ======================================================
// CHARGEMENT DE LA BASE
// ======================================================

function loadDatabase() {

    try {

        if (!fs.existsSync(DATABASE_FILE)) {

            saveDatabase(
                defaultDatabase
            );

            return defaultDatabase;

        }

        const content =
            fs.readFileSync(
                DATABASE_FILE,
                "utf8"
            );

        if (!content.trim()) {

            saveDatabase(
                defaultDatabase
            );

            return defaultDatabase;

        }

        return JSON.parse(content);

    } catch (error) {

        console.error(
            "Erreur lecture database :",
            error
        );

        return defaultDatabase;

    }

}

// ======================================================
// SAUVEGARDE DE LA BASE
// ======================================================

function saveDatabase(database) {

    try {

        fs.writeFileSync(

            DATABASE_FILE,

            JSON.stringify(
                database,
                null,
                2
            ),

            "utf8"

        );

        return true;

    } catch (error) {

        console.error(
            "Erreur sauvegarde database :",
            error
        );

        return false;

    }

}

// ======================================================
// RÉPONSES API
// ======================================================

function success(
    res,
    data,
    message = "Opération réussie"
) {

    return res.json({

        success: true,

        message,

        data

    });

}

function errorResponse(
    res,
    message,
    status = 400
) {

    return res.status(status).json({

        success: false,

        message

    });

}

// ======================================================
// TEST API
// ======================================================

app.get(
    "/api",
    (req, res) => {

        return res.json({

            success: true,

            name:
                "MI.C.L.A — CITÉ DE REFUGE",

            api:
                "MI.C.L.A API",

            status:
                "online",

            version:
                "1.0.0",

            date:
                new Date().toISOString()

        });

    }
);

// ======================================================
// RÉCUPÉRER TOUT LE SITE
// ======================================================

app.get(
    "/api/site",
    (req, res) => {

        const database =
            loadDatabase();

        return success(
            res,
            database
        );

    }
);

// ======================================================
// PARAMÈTRES DU SITE
// ======================================================

app.get(
    "/api/site-settings",
    (req, res) => {

        const database =
            loadDatabase();

        return success(
            res,
            database.site
        );

    }
);

app.post(
    "/api/site-settings",
    (req, res) => {

        const database =
            loadDatabase();

        database.site = {

            ...database.site,

            ...req.body

        };

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de sauvegarder les paramètres.",

                500

            );

        }

        return success(

            res,

            database.site,

            "Paramètres du site enregistrés."

        );

    }
);

// ======================================================
// PROGRAMME
// ======================================================

app.get(
    "/api/programme",
    (req, res) => {

        const database =
            loadDatabase();

        return success(

            res,

            database.programme

        );

    }
);

app.post(
    "/api/programme",
    (req, res) => {

        const database =
            loadDatabase();

        if (
            !Array.isArray(req.body)
        ) {

            return errorResponse(

                res,

                "Le programme doit être un tableau."

            );

        }

        database.programme =
            req.body;

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de sauvegarder le programme.",

                500

            );

        }

        return success(

            res,

            database.programme,

            "Programme enregistré."

        );

    }
);

// ======================================================
// COLLECTIONS
// ======================================================

function collectionRoutes(
    route,
    property
) {

    app.get(
        `/api/${route}`,
        (req, res) => {

            const database =
                loadDatabase();

            return success(

                res,

                database[property] || []

            );

        }
    );

    app.post(
        `/api/${route}`,
        (req, res) => {

            const database =
                loadDatabase();

            database[property] =
                req.body;

            if (
                !saveDatabase(database)
            ) {

                return errorResponse(

                    res,

                    `Impossible de sauvegarder ${route}.`,

                    500

                );

            }

            return success(

                res,

                database[property],

                `${route} enregistré.`

            );

        }
    );

}

collectionRoutes(
    "activites",
    "activites"
);

collectionRoutes(
    "chantres",
    "chantres"
);

collectionRoutes(
    "chansons",
    "chansons"
);

collectionRoutes(
    "affiches",
    "affiches"
);

collectionRoutes(
    "galerie",
    "galerie"
);

collectionRoutes(
    "messages",
    "messages"
);

collectionRoutes(
    "actualites",
    "actualites"
);

// ======================================================
// JEUNESSE
// ======================================================

app.get(
    "/api/jeunesse",
    (req, res) => {

        const database =
            loadDatabase();

        return success(

            res,

            database.jeunesse

        );

    }
);

app.post(
    "/api/jeunesse",
    (req, res) => {

        const database =
            loadDatabase();

        database.jeunesse = {

            ...database.jeunesse,

            ...req.body

        };

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de sauvegarder la jeunesse.",

                500

            );

        }

        return success(

            res,

            database.jeunesse,

            "Informations jeunesse enregistrées."

        );

    }
);

// ======================================================
// PROTOCOLE & SÉCURITÉ
// ======================================================

app.get(
    "/api/protocole",
    (req, res) => {

        const database =
            loadDatabase();

        return success(

            res,

            database.protocole

        );

    }
);

app.post(
    "/api/protocole",
    (req, res) => {

        const database =
            loadDatabase();

        database.protocole = {

            ...database.protocole,

            ...req.body

        };

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de sauvegarder le protocole.",

                500

            );

        }

        return success(

            res,

            database.protocole,

            "Protocole enregistré."

        );

    }
);

// ======================================================
// PASTEUR / BERGER
// ======================================================

function responsableRoutes(
    responsable
) {

    app.get(
        `/api/${responsable}`,
        (req, res) => {

            const database =
                loadDatabase();

            return success(

                res,

                database[responsable]

            );

        }
    );

    app.post(
        `/api/${responsable}`,
        (req, res) => {

            const database =
                loadDatabase();

            database[responsable] = {

                ...database[responsable],

                ...req.body

            };

            if (
                !saveDatabase(database)
            ) {

                return errorResponse(

                    res,

                    `Impossible de sauvegarder ${responsable}.`,

                    500

                );

            }

            return success(

                res,

                database[responsable],

                `Informations ${responsable} enregistrées.`

            );

        }
    );

}

responsableRoutes(
    "pasteur"
);

responsableRoutes(
    "berger"
);

// ======================================================
// CONTACTS
// ======================================================

app.get(
    "/api/contacts",
    (req, res) => {

        const database =
            loadDatabase();

        return success(

            res,

            database.contacts

        );

    }
);

app.post(
    "/api/contacts",
    (req, res) => {

        const database =
            loadDatabase();

        database.contacts = {

            ...database.contacts,

            ...req.body

        };

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de sauvegarder les contacts.",

                500

            );

        }

        return success(

            res,

            database.contacts,

            "Contacts enregistrés."

        );

    }
);

// ======================================================
// LOCALISATION
// ======================================================

app.get(
    "/api/localisation",
    (req, res) => {

        const database =
            loadDatabase();

        return success(

            res,

            database.localisation

        );

    }
);

app.post(
    "/api/localisation",
    (req, res) => {

        const database =
            loadDatabase();

        database.localisation = {

            ...database.localisation,

            ...req.body

        };

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de sauvegarder la localisation.",

                500

            );

        }

        return success(

            res,

            database.localisation,

            "Localisation enregistrée."

        );

    }
);

// ======================================================
// SUPPORT
// ======================================================

app.get(
    "/api/support",
    (req, res) => {

        const database =
            loadDatabase();

        return success(

            res,

            database.support

        );

    }
);

app.post(
    "/api/support",
    (req, res) => {

        const database =
            loadDatabase();

        const request = {

            id:
                Date.now(),

            name:
                req.body.name || "",

            phone:
                req.body.phone || "",

            type:
                req.body.type || "",

            message:
                req.body.message || "",

            status:
                "nouvelle",

            date:
                new Date().toISOString()

        };

        database.support.push(
            request
        );

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible d'enregistrer la demande.",

                500

            );

        }

        return success(

            res,

            request,

            "Demande envoyée."

        );

    }
);

// ======================================================
// MODIFIER UNE DEMANDE SUPPORT
// ======================================================

app.patch(
    "/api/support/:id",
    (req, res) => {

        const database =
            loadDatabase();

        const id =
            Number(req.params.id);

        const request =
            database.support.find(
                item =>
                    Number(item.id) === id
            );

        if (!request) {

            return errorResponse(

                res,

                "Demande introuvable.",

                404

            );

        }

        request.status =
            req.body.status ||
            request.status;

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de modifier la demande.",

                500

            );

        }

        return success(

            res,

            request,

            "Demande modifiée."

        );

    }
);

// ======================================================
// SUPPRIMER UNE DEMANDE SUPPORT
// ======================================================

app.delete(
    "/api/support/:id",
    (req, res) => {

        const database =
            loadDatabase();

        const id =
            Number(req.params.id);

        const oldLength =
            database.support.length;

        database.support =
            database.support.filter(
                item =>
                    Number(item.id) !== id
            );

        if (
            database.support.length ===
            oldLength
        ) {

            return errorResponse(

                res,

                "Demande introuvable.",

                404

            );

        }

        if (
            !saveDatabase(database)
        ) {

            return errorResponse(

                res,

                "Impossible de supprimer la demande.",

                500

            );

        }

        return success(

            res,

            database.support,

            "Demande supprimée."

        );

    }
);

// ======================================================
// UPLOAD — OUTILS
// ======================================================

function sanitizeFilename(
    filename
) {

    return String(
        filename || "fichier"
    )
        .replace(
            /[^a-zA-Z0-9._-]/g,
            "_"
        );

}

function getUploadDirectory(
    type
) {

    if (type === "image") {

        return IMAGE_DIR;

    }

    if (type === "audio") {

        return AUDIO_DIR;

    }

    if (type === "video") {

        return VIDEO_DIR;

    }

    return null;

}

// ======================================================
// IMPORTER UN FICHIER
// ======================================================

app.post(
    "/api/upload",
    (req, res) => {

        try {

            const {
                filename,
                type,
                data
            } = req.body;

            if (
                !filename ||
                !type ||
                !data
            ) {

                return errorResponse(

                    res,

                    "Fichier incomplet."

                );

            }

            const directory =
                getUploadDirectory(
                    type
                );

            if (!directory) {

                return errorResponse(

                    res,

                    "Type de fichier non autorisé."

                );

            }

            if (
                typeof data !==
                "string"
            ) {

                return errorResponse(

                    res,

                    "Données du fichier invalides."

                );

            }

            if (
                !data.includes(
                    "base64,"
                )
            ) {

                return errorResponse(

                    res,

                    "Format du fichier invalide."

                );

            }

            const base64Data =
                data.split(
                    "base64,"
                )[1];

            const safeFilename =
                `${Date.now()}-${sanitizeFilename(filename)}`;

            const finalPath =
                path.join(
                    directory,
                    safeFilename
                );

            fs.writeFileSync(

                finalPath,

                Buffer.from(
                    base64Data,
                    "base64"
                )

            );

            let publicFolder =
                "images";

            if (
                type === "audio"
            ) {

                publicFolder =
                    "audio";

            }

            if (
                type === "video"
            ) {

                publicFolder =
                    "videos";

            }

            const fileUrl =
                `/uploads/${publicFolder}/${safeFilename}`;

            return success(

                res,

                {

                    filename:
                        safeFilename,

                    type,

                    url:
                        fileUrl

                },

                "Fichier importé avec succès."

            );

        } catch (error) {

            console.error(
                "Erreur upload :",
                error
            );

            return errorResponse(

                res,

                "Erreur pendant l'importation.",

                500

            );

        }

    }
);

// ======================================================
// SUPPRIMER UN FICHIER
// ======================================================

app.delete(
    "/api/upload",
    (req, res) => {

        try {

            const {
                fileUrl
            } = req.body;

            if (!fileUrl) {

                return errorResponse(

                    res,

                    "Fichier manquant."

                );

            }

            const cleanPath =
                fileUrl
                    .replace(
                        /^\/+/,
                        ""
                    )
                    .replace(
                        /^uploads\//,
                        ""
                    );

            const filePath =
                path.join(
                    UPLOADS_DIR,
                    cleanPath
                );

            const uploadsRoot =
                path.resolve(
                    UPLOADS_DIR
                );

            const requestedPath =
                path.resolve(
                    filePath
                );

            if (
                !requestedPath.startsWith(
                    uploadsRoot +
                    path.sep
                )
            ) {

                return errorResponse(

                    res,

                    "Chemin interdit."

                );

            }

            if (
                !fs.existsSync(
                    requestedPath
                )
            ) {

                return errorResponse(

                    res,

                    "Fichier introuvable.",

                    404

                );

            }

            fs.unlinkSync(
                requestedPath
            );

            return success(

                res,

                null,

                "Fichier supprimé."

            );

        } catch (error) {

            console.error(
                "Erreur suppression fichier :",
                error
            );

            return errorResponse(

                res,

                "Impossible de supprimer le fichier.",

                500

            );

        }

    }
);

// ======================================================
// FICHIERS UPLOADÉS
// ======================================================

app.use(

    "/uploads",

    express.static(
        UPLOADS_DIR
    )

);

// ======================================================
// FICHIERS PUBLICS
// ======================================================

if (
    fs.existsSync(
        PUBLIC_DIR
    )
) {

    app.use(

        express.static(
            PUBLIC_DIR
        )

    );

}

// ======================================================
// ACCUEIL
// ======================================================

app.get(
    "/",
    (req, res) => {

        const indexFile =
            path.join(
                PUBLIC_DIR,
                "index.html"
            );

        if (
            fs.existsSync(
                indexFile
            )
        ) {

            return res.sendFile(
                indexFile
            );

        }

        return res.send(
            "MI.C.L.A — CITÉ DE REFUGE API"
        );

    }
);

// ======================================================
// ROUTE 404 API
// ======================================================

app.use(
    "/api",
    (req, res) => {

        return res.status(
            404
        ).json({

            success: false,

            message:
                "Route API introuvable."

        });

    }
);

// ======================================================
// ERREUR GÉNÉRALE
// ======================================================

app.use(
    (error, req, res, next) => {

        console.error(
            "Erreur serveur :",
            error
        );

        return res.status(
            500
        ).json({

            success: false,

            message:
                "Erreur interne du serveur."

        });

    }
);

// ======================================================
// DÉMARRAGE LOCAL
// ======================================================

if (
    require.main === module
) {

    app.listen(

        PORT,

        () => {

            console.log(
                `MI.C.L.A API démarrée sur le port ${PORT}`
            );

            console.log(
                `http://localhost:${PORT}/api`
            );

        }

    );

}

// ======================================================
// EXPORT VERCEL
// ======================================================

module.exports = app;

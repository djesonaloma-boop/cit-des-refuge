/* =========================================
   MI.C.L.A — CITÉ DE REFUGE
   APP.JS — PAGE D'ACCUEIL
========================================= */

"use strict";


/* =========================================
   ANNÉE DU FOOTER
========================================= */

function updateYear() {

    const yearElement =
        document.getElementById("year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/* =========================================
   MENU 3 POINTS
========================================= */

function setupSettingsMenu() {

    const threeDots =
        document.getElementById("threeDots");

    const settingsMenu =
        document.getElementById("settingsMenu");


    if (!threeDots || !settingsMenu) {
        return;
    }


    threeDots.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const isOpen =
                settingsMenu.classList.toggle("show");

            threeDots.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !settingsMenu.contains(event.target) &&
                !threeDots.contains(event.target)
            ) {

                settingsMenu.classList.remove("show");

                threeDots.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                settingsMenu.classList.remove("show");

                threeDots.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================
   FERMER LE MENU APRÈS NAVIGATION
========================================= */

function setupMenuLinks() {

    const settingsMenu =
        document.getElementById("settingsMenu");

    if (!settingsMenu) {
        return;
    }


    const links =
        settingsMenu.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                settingsMenu.classList.remove("show");

            }
        );

    });

}


/* =========================================
   ANIMATION LÉGÈRE DES CARTES
========================================= */

function setupCards() {

    const cards =
        document.querySelectorAll(".menu-card");

    cards.forEach(function (card) {

        card.addEventListener(
            "touchstart",
            function () {

                card.classList.add("active");

            },
            { passive: true }
        );

        card.addEventListener(
            "touchend",
            function () {

                card.classList.remove("active");

            },
            { passive: true }
        );

    });

}


/* =========================================
   VÉRIFICATION DES IMAGES
========================================= */

function setupImageFallback() {

    const images =
        document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                image.classList.add("image-error");

                /*
                 * On ne remplace pas automatiquement
                 * les images afin de conserver
                 * exactement le design demandé.
                 */

            }
        );

    });

}


/* =========================================
   INITIALISATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateYear();

        setupSettingsMenu();

        setupMenuLinks();

        setupCards();

        setupImageFallback();

    }
);

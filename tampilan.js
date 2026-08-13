document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    const choiceCards =
        document.querySelectorAll(".choice-card");

    const whatsappButton =
        document.getElementById("whatsappButton");


    /* =========================
       NAVBAR
    ========================== */

    function updateNavbar() {

        if (window.scrollY > 18) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =========================
       MENU PONSEL
    ========================== */

    function closeMenu() {

        navLinks.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    menuButton.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });


    /* =========================
       ANIMASI
    ========================== */

    const revealItems =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("is-visible");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12
                }

            );


        revealItems.forEach(item => {

            observer.observe(item);

        });

    } else {

        revealItems.forEach(item => {

            item.classList.add(
                "is-visible"
            );

        });

    }


    /* =========================
       WHATSAPP KONTEKS
    ========================== */

    choiceCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const choice =
                    card.dataset.choice;

                if (
                    !choice ||
                    !whatsappButton
                ) {
                    return;
                }


                const currentURL =
                    whatsappButton
                        .getAttribute("href");


                try {

                    const url =
                        new URL(currentURL);


                    const message =
                        `Halo Xyny Studio, saya ingin berkonsultasi mengenai kebutuhan ${choice}.`;


                    url.searchParams.set(
                        "text",
                        message
                    );


                    whatsappButton.setAttribute(
                        "href",
                        url.toString()
                    );

                } catch (error) {

                    console.log(
                        "Nomor WhatsApp belum diganti."
                    );

                }

            }
        );

    });

});

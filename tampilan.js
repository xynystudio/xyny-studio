/* =====================================================
   XYNY STUDIO
   JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       PEMUATAN
    ================================================= */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

            document.body.classList.add("ready");

        }, 700);

    });



    /* =================================================
       NAVBAR
    ================================================= */

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (window.scrollY > 40) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );

    updateNavbar();



    /* =================================================
       MENU MOBILE
    ================================================= */

    const menuButton =
        document.getElementById("menuButton");

    const navigation =
        document.getElementById("navigation");

    const navigationLinks =
        document.querySelectorAll(
            ".navigation a"
        );


    function closeMenu() {

        menuButton.classList.remove("open");

        navigation.classList.remove("open");

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
                menuButton.classList.toggle("open");

            navigation.classList.toggle(
                "open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        }
    );


    navigationLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });



    /* =================================================
       SCROLL REVEAL
    ================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =================================================
       NAVIGASI AKTIF
    ================================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;

                        navigationLinks.forEach(
                            link => {

                                link.classList.remove(
                                    "active"
                                );

                                if (
                                    link.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });



    /* =================================================
       EFEK KURSOR PADA DESKTOP
    ================================================= */

    const visual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        visual &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        visual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    visual.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateY =
                    (x - centerX) /
                    centerX *
                    4;

                const rotateX =
                    (centerY - y) /
                    centerY *
                    4;


                const card =
                    visual.querySelector(
                        ".hero-logo-card"
                    );


                if (card) {

                    card.style.transform =
                        `perspective(1000px)
                         rotateY(${rotateY}deg)
                         rotateX(${rotateX}deg)`;

                }

            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                const card =
                    visual.querySelector(
                        ".hero-logo-card"
                    );

                if (card) {

                    card.style.transform =
                        `perspective(1000px)
                         rotateY(-7deg)
                         rotateX(4deg)`;

                }

            }
        );

    }



    /* =================================================
       EFEK PARALLAX HALUS
    ================================================= */

    const glows =
        document.querySelectorAll(
            ".glow"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            glows.forEach(
                (glow, index) => {

                    const speed =
                        0.03 +
                        index * 0.012;

                    glow.style.transform =
                        `translateY(${scroll * speed}px)`;

                }
            );

        },
        { passive: true }
    );



    /* =================================================
       SMOOTH ANCHOR
    ================================================= */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(anchor => {

            anchor.addEventListener(
                "click",
                event => {

                    const targetId =
                        anchor.getAttribute(
                            "href"
                        );

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const navbarHeight =
                        navbar.offsetHeight;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight -
                        20;

                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });



    /* =================================================
       TOMBOL ESC UNTUK MENU
    ================================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


});

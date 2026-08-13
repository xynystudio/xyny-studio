(() => {

    /* =========================
       ELEMENT
    ========================= */

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    const progress =
        document.getElementById("progress");

    const glow =
        document.querySelector(".cursor-glow");



    /* =========================
       MENU PONSEL
    ========================= */

    if (menuToggle) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    }



    /*
       Tutup menu setelah
       pengguna memilih halaman
    */

    if (navLinks) {

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "open"
                        );

                        menuToggle?.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }



    /* =========================
       PROGRESS BAR
    ========================= */

    function updateScroll() {

        const max =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            max > 0
                ? (window.scrollY / max) * 100
                : 0;

        if (progress) {

            progress.style.width =
                `${percentage}%`;

        }


        if (navbar) {

            if (window.scrollY > 30) {

                navbar.style.boxShadow =
                    "0 20px 70px rgba(0,0,0,.38)";

            } else {

                navbar.style.boxShadow =
                    "0 20px 60px rgba(0,0,0,.25)";

            }

        }

    }


    window.addEventListener(
        "scroll",
        updateScroll,
        {
            passive: true
        }
    );


    updateScroll();



    /* =========================
       ANIMASI SAAT SCROLL
    ========================= */

    const revealItems =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: .12
            }

        );


    revealItems.forEach(
        (item, index) => {

            item.style.transitionDelay =
                `${Math.min(index * 35, 220)}ms`;

            revealObserver.observe(item);

        }
    );



    /* =========================
       NAVIGASI AKTIF
    ========================= */

    const sections =
        [
            ...document.querySelectorAll(
                "main section[id]"
            )
        ];


    const links =
        [
            ...document.querySelectorAll(
                ".nav-links a"
            )
        ];


    const sectionObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    links.forEach(
                        link =>
                            link.classList.remove(
                                "active"
                            )
                    );


                    const active =
                        links.find(
                            link =>
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${entry.target.id}`
                        );


                    active?.classList.add(
                        "active"
                    );

                });

            },

            {
                rootMargin:
                    "-40% 0px -50% 0px"
            }

        );


    sections.forEach(
        section =>
            sectionObserver.observe(section)
    );



    /* =========================
       EFEK CAHAYA MOUSE
    ========================= */

    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches &&
        glow
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                glow.style.opacity = "1";

                glow.style.left =
                    `${event.clientX}px`;

                glow.style.top =
                    `${event.clientY}px`;

            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                glow.style.opacity = "0";

            }
        );

    }



    /* =========================
       GERAKAN HERO
    ========================= */

    const visual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        visual &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        visual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    .5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    .5;


                const card =
                    visual.querySelector(
                        ".showcase-card"
                    );


                if (card) {

                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateY(${x * 4}deg)
                        rotateX(${y * -4}deg)
                        rotateZ(1deg)
                        `;

                }

            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                const card =
                    visual.querySelector(
                        ".showcase-card"
                    );


                if (card) {

                    card.style.transform =
                        "rotate(1deg)";

                }

            }
        );

    }

})();

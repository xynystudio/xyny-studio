document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       PEMUAT
    ================================================== */

    const loader =
        document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("done");

        }, 900);

    });


    /* ==================================================
       NAVIGASI
    ================================================== */

    const navbar =
        document.getElementById("navbar");

    const menuButton =
        document.getElementById("menuButton");

    const navLinks =
        document.getElementById("navLinks");


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


    /* ==================================================
       MENU PONSEL
    ================================================== */

    menuButton.addEventListener(
        "click",
        () => {

            const terbuka =
                navLinks.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                terbuka
            );

            document.body.classList.toggle(
                "menu-open",
                terbuka
            );

        }
    );


    navLinks.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "open"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });


    /* ==================================================
       PROGRES HALAMAN
    ================================================== */

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    function updateProgress() {

        const tinggi =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const posisi =
            window.scrollY;

        const persen =
            tinggi > 0
                ? (posisi / tinggi) * 100
                : 0;

        progress.style.width =
            `${persen}%`;

    }

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();


    /* ==================================================
       REVEAL SAAT MUNCUL
    ================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: .12
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }


    /* ==================================================
       KURSOR
    ================================================== */

    const dot =
        document.querySelector(
            ".cursor-dot"
        );

    const ring =
        document.querySelector(
            ".cursor-ring"
        );

    const light =
        document.querySelector(
            ".cursor-light"
        );


    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener(
        "pointermove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

            light.style.left =
                `${mouseX}px`;

            light.style.top =
                `${mouseY}px`;

        },
        { passive: true }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * .15;

        ringY +=
            (mouseY - ringY) * .15;

        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    /* ==================================================
       KURSOR INTERAKTIF
    ================================================== */

    const interactive =
        document.querySelectorAll(
            "a, button, summary, .tilt-card"
        );


    interactive.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-active"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-active"
                );

            }
        );

    });


    /* ==================================================
       TOMBOL MAGNETIK
    ================================================== */

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticElements.forEach(element => {

        element.addEventListener(
            "pointermove",
            event => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * .15}px, ${y * .15}px)`;

            }
        );


        element.addEventListener(
            "pointerleave",
            () => {

                element.style.transform =
                    "translate(0,0)";

            }
        );

    });


    /* ==================================================
       KARTU 3D
    ================================================== */

    const cards =
        document.querySelectorAll(
            ".tilt-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "pointermove",
            event => {

                if (
                    window.innerWidth < 800
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

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

                const rotateX =
                    ((y - centerY) /
                    centerY) * -3;

                const rotateY =
                    ((x - centerX) /
                    centerX) * 3;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "pointerleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* ==================================================
       PARTIKEL
    ================================================== */

    const canvas =
        document.getElementById(
            "particleCanvas"
        );

    const ctx =
        canvas.getContext("2d");


    let particles = [];

    let particleMouse = {
        x: null,
        y: null
    };


    function resizeCanvas() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    window.addEventListener(
        "pointermove",
        event => {

            particleMouse.x =
                event.clientX;

            particleMouse.y =
                event.clientY;

        },
        { passive: true }
    );


    const jumlah =
        window.innerWidth < 700
            ? 35
            : 70;


    for (
        let i = 0;
        i < jumlah;
        i++
    ) {

        particles.push({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            size:
                Math.random() * 1.5 + .4,

            speedX:
                (Math.random() - .5) *
                .25,

            speedY:
                (Math.random() - .5) *
                .25,

            opacity:
                Math.random() * .5 + .1

        });

    }


    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        particles.forEach(p => {

            p.x += p.speedX;
            p.y += p.speedY;


            if (p.x < 0)
                p.x = canvas.width;

            if (p.x > canvas.width)
                p.x = 0;

            if (p.y < 0)
                p.y = canvas.height;

            if (p.y > canvas.height)
                p.y = 0;


            if (
                particleMouse.x !== null
            ) {

                const dx =
                    particleMouse.x - p.x;

                const dy =
                    particleMouse.y - p.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < 120
                ) {

                    p.x -=
                        dx * .0008;

                    p.y -=
                        dy * .0008;

                }

            }


            ctx.beginPath();

            ctx.arc(
                p.x,
                p.y,
                p.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(255,255,255,${p.opacity})`;

            ctx.fill();

        });


        requestAnimationFrame(
            drawParticles
        );

    }

    drawParticles();


    /* ==================================================
       GARIS PROSES
    ================================================== */

    const processTimeline =
        document.querySelector(
            ".process-timeline"
        );


    if (
        processTimeline &&
        "IntersectionObserver" in window
    ) {

        const processObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            processTimeline.classList.add(
                                "active"
                            );

                        }

                    });

                },
                {
                    threshold: .2
                }
            );


        processObserver.observe(
            processTimeline
        );

    }


    /* ==================================================
       FAQ
    ================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open)
                    return;


                faqItems.forEach(other => {

                    if (
                        other !== item
                    ) {

                        other.removeAttribute(
                            "open"
                        );

                    }

                });

            }
        );

    });


    /* ==================================================
       PARALLAX HERO
    ================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (heroVisual) {

        window.addEventListener(
            "scroll",
            () => {

                if (
                    window.innerWidth < 800
                ) {
                    return;
                }

                const scroll =
                    window.scrollY;

                heroVisual.style.transform =
                    `translateY(${scroll * .08}px)`;

            },
            { passive: true }
        );

    }


    /* ==================================================
       ESC
    ================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                navLinks.classList.remove(
                    "open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );

});

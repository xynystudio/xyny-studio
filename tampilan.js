/* =====================================================
   XYNY STUDIO
   INTERACTION SYSTEM — FINAL V2
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hidden");

    }, 850);

});


/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.getElementById("navbar");


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


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mobileMenu =
    document.getElementById("mobileMenu");


function closeMenu() {

    mobileMenu.classList.remove("open");

    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


menuToggle.addEventListener("click", () => {

    const isOpen =
        mobileMenu.classList.contains("open");


    if (isOpen) {

        closeMenu();

    } else {

        mobileMenu.classList.add("open");

        document.body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );


const sectionObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                const id =
                    entry.target.getAttribute("id");


                navLinks.forEach(link => {

                    link.classList.remove(
                        "active"
                    );


                    if (
                        link.getAttribute("href")
                        === `#${id}`
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                });

            });

        },

        {
            rootMargin:
                "-35% 0px -55% 0px"
        }

    );


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =====================================================
   MAGNETIC BUTTON
===================================================== */

const magneticElements =
    document.querySelectorAll(
        ".magnetic"
    );


magneticElements.forEach(element => {

    element.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 900
            ) {
                return;
            }


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
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform =
                "";

        }
    );

});


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursorDot =
    document.getElementById("cursorDot");

const cursorRing =
    document.getElementById("cursorRing");


const desktopDevice =
    window.matchMedia(
        "(pointer: fine)"
    ).matches;


if (desktopDevice) {

    document.body.classList.add(
        "has-cursor"
    );


    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            cursorDot.style.transform =
                `translate(${mouseX}px, ${mouseY}px)`;

        }
    );


    function animateCursor() {

        ringX +=
            (mouseX - ringX) * .14;

        ringY +=
            (mouseY - ringY) * .14;


        cursorRing.style.transform =
            `translate(${ringX}px, ${ringY}px)`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const cursorTargets =
        document.querySelectorAll(
            "a, button, .service-card"
        );


    cursorTargets.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body.classList.add(
                    "cursor-hover"
                );

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                document.body.classList.remove(
                    "cursor-hover"
                );

            }
        );

    });

}


/* =====================================================
   HERO PARALLAX
===================================================== */

const heroVisual =
    document.querySelector(
        ".hero-visual"
    );


if (
    heroVisual &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();


            const x =
                (
                    event.clientX -
                    rect.left
                ) / rect.width -
                .5;


            const y =
                (
                    event.clientY -
                    rect.top
                ) / rect.height -
                .5;


            const card =
                heroVisual.querySelector(
                    ".hero-card"
                );


            card.style.transform =
                `
                perspective(1000px)
                rotateY(${x * 8}deg)
                rotateX(${y * -5}deg)
                translateY(-4px)
                `;

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const card =
                heroVisual.querySelector(
                    ".hero-card"
                );


            card.style.transform =
                "";

        }
    );

}


/* =====================================================
   SMOOTH ANCHOR
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    targetId === "#" ||
                    !targetId
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


                const offset =
                    window.innerWidth <= 760
                        ? 75
                        : 90;


                const position =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    offset;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }
        );

    });


/* =====================================================
   MOUSE TILT — SERVICE CARD
===================================================== */

if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    document
        .querySelectorAll(
            ".service-card"
        )
        .forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width -
                        .5;


                    const y =
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height -
                        .5;


                    card.style.transform =
                        `
                        perspective(900px)
                        rotateX(${y * -2}deg)
                        rotateY(${x * 2}deg)
                        translateY(-8px)
                        `;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        });

}


/* =====================================================
   ESCAPE UNTUK MENU
===================================================== */

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


/* =====================================================
   LOGO ERROR FALLBACK
===================================================== */

document
    .querySelectorAll(
        "img[src='logo.png']"
    )
    .forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.style.display =
                    "none";

                const parent =
                    image.parentElement;


                if (
                    parent &&
                    !parent.querySelector(
                        ".logo-fallback"
                    )
                ) {

                    const fallback =
                        document.createElement(
                            "span"
                        );


                    fallback.className =
                        "logo-fallback";


                    fallback.textContent =
                        "XYNY";


                    parent.appendChild(
                        fallback
                    );

                }

            }
        );

    });


/* =====================================================
   CONSOLE BRANDING
===================================================== */

console.log(
    "%cXYNY STUDIO",
    "font-size:24px;font-weight:bold;"
);

console.log(
    "Ide yang baik pantas terlihat luar biasa."
);

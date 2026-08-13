document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");
    const whatsappButton = document.getElementById("whatsappButton");

    /* ==============================
       NAVIGASI SAAT DIGULIR
    ============================== */

    function perbaruiNavbar() {

        if (window.scrollY > 30) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener(
        "scroll",
        perbaruiNavbar,
        { passive: true }
    );

    perbaruiNavbar();


    /* ==============================
       MENU PONSEL
    ============================== */

    menuButton.addEventListener("click", function () {

        const terbuka =
            navLinks.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            terbuka ? "true" : "false"
        );

        document.body.classList.toggle(
            "menu-open",
            terbuka
        );

    });


    navLinks.querySelectorAll("a")
        .forEach(function (tautan) {

            tautan.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove("open");

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


    /* ==============================
       ANIMASI SAAT MUNCUL
    ============================== */

    const elemen =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const pengamat =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

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
                    threshold: 0.12
                }
            );

        elemen.forEach(function (item) {
            pengamat.observe(item);
        });

    } else {

        elemen.forEach(function (item) {
            item.classList.add("is-visible");
        });

    }


    /* ==============================
       CAHAYA MENGIKUTI KURSOR
    ============================== */

    const cahaya =
        document.querySelector(".cursor-glow");

    if (cahaya) {

        window.addEventListener(
            "pointermove",
            function (event) {

                cahaya.style.left =
                    event.clientX + "px";

                cahaya.style.top =
                    event.clientY + "px";

            },
            { passive: true }
        );

    }


    /* ==============================
       PILIHAN KEBUTUHAN
    ============================== */

    const kartuKebutuhan =
        document.querySelectorAll(".need-card");

    kartuKebutuhan.forEach(function (kartu) {

        kartu.addEventListener(
            "click",
            function () {

                const kebutuhan =
                    kartu.dataset.need;

                if (!whatsappButton || !kebutuhan) {
                    return;
                }

                const nomor =
                    "6280000000000";

                const pesan =
                    "Halo Xyny Studio, saya ingin berkonsultasi mengenai kebutuhan " +
                    kebutuhan +
                    ". Saya ingin mengetahui solusi yang paling sesuai.";

                whatsappButton.href =
                    "https://wa.me/" +
                    nomor +
                    "?text=" +
                    encodeURIComponent(pesan);

            }
        );

    });


    /* ==============================
       TUTUP FAQ LAIN
    ============================== */

    const faq =
        document.querySelectorAll(".faq-item");

    faq.forEach(function (item) {

        item.addEventListener(
            "toggle",
            function () {

                if (!item.open) {
                    return;
                }

                faq.forEach(function (lain) {

                    if (lain !== item) {
                        lain.removeAttribute("open");
                    }

                });

            }
        );

    });


    /* ==============================
       KLIK ESC UNTUK MENU
    ============================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                navLinks.classList.remove("open");

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

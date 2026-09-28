const CONFIG = {
    girlfriendName: "Ganis Bunga Oktafiani",
    senderName: "Fajar Permadi",
    anniversaryDate: "2026-01-22",
    birthdayDate: "2026-10-14",

    mainPhoto: "images/foto-utama.jpeg",
    finalPhoto: "images/foto-terakhir.jpeg",
    
    music: {
    opening: "audio/Stephen Sanchez - Until I Found You (Lyrics).mp3",
    story: "audio/NIKI - Every Summertime (Lyrics) Every year we get older.mp3",
    letter: "audio/H.E.R. - Best Part (Lyrics) Ft. Daniel Caesar.mp3",
    final: "audio/Ed Sheeran - Perfect.mp3"
},

    heroMessage:
        "Semoga hari ini menjadi salah satu halaman paling indah dalam hidupmu.",

    letter:
        "Tak terasa, waktu kembali membawamu pada satu usia yang baru. Bukan sekedar angka yang bertambah untukmu, melainkan jejak dari segala sesuatu yang telah kaulewati sejauh itu, tentang dirimu yang tumbuh perlahan menjadi dirimu yang baru.",

    stories: [
    [
        "images/momen-01.jpeg",
        "Awal",
        "Dari sebuah pertemuan kecil, tumbuh rasa yang perlahan menjadi rumah di dalam hati."
    ],
    [
        "images/momen-02.jpeg",
        "Senyummu",
        "Ada sesuatu yang selalu ingin kuulang: melihat senyummu, lalu jatuh cinta kepadamu sekali lagi."
    ],
    [
        "images/momen-03.jpeg",
        "Sederhana",
        "Bersamamu, tak perlu banyak hal untuk bahagia. Cukup duduk berdua, lalu membiarkan waktu berjalan."
    ],
    [
        "images/momen-04.jpeg",
        "Rumah",
        "Di antara banyak tempat yang pernah kutuju, entah mengapa hatiku selalu menemukan tenang ketika bersamamu."
    ],
    [
        "images/momen-05.jpeg",
        "Nanti",
        "Aku tidak tahu seperti apa hari esok, tetapi jika boleh memilih, aku ingin namamu tetap ada di setiap ceritanya."
    ]
],

heartMessages: [
    "Andai bisa, ingin kusimpan senyummu di setiap halaman hari-hariku.",
    "Aku tidak mencintaimu karena sempurna, aku mencintaimu karena kamu adalah kamu.",
    "Terima kasih telah hadir, lalu perlahan menjadi bagian yang tak ingin kehilangan.",
    "Semoga dalam setiap langkahmu, selalu ada doa kecil dariku yang menemani.",
    "Jika suatu hari kamu lupa betapa berharganya dirimu, izinkan aku mengingatkanmu sekali lagi."
],

wishes: [
    "Semoga langkahmu selalu ditemani cahaya, bahkan ketika jalan di depanmu belum terlihat.",
    "Semoga semua yang kamu impikan menemukan jalan untuk pulang menjadi kenyataan.",
    "Semoga hidup memelukmu dengan lembut, dan hatimu selalu menemukan tempat untuk merasa tenang."
],
};

const $ = (selector) => document.querySelector(selector);

let currentMusic = "";

function fallback(img) {
    if (!img) return;

    img.onerror = () => {
        img.style.display = "none";
    };
}

function playMusic(file) {
    const music = $("#music");

    if (!music || !file) return;

    if (currentMusic !== file) {
        music.src = file;
        currentMusic = file;
        music.load();
    }

    music.play().catch(() => {});

    if ($("#musicBtn")) {
        $("#musicBtn").textContent = "🔊";
    }
}

function setupMusicSections() {
    const sections = [
        {
            selector: "#story",
            music: CONFIG.music.story
        },
        {
            selector: ".letter-section",
            music: CONFIG.music.letter
        },
        {
            selector: ".final",
            music: CONFIG.music.final
        }
    ];

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                if (entry.intersectionRatio >= 0.35) {
                    const section = sections.find(
                        (item) =>
                            document.querySelector(item.selector) ===
                            entry.target
                    );

                    if (section) {
                        playMusic(section.music);
                    }
                }
            });
        },
        {
            threshold: [0.35, 0.6]
        }
    );

    sections.forEach((section) => {
        const element = document.querySelector(section.selector);

        if (element) {
            observer.observe(element);
        }
    });
}

function init() {
    document.querySelectorAll("[data-name]").forEach((element) => {
        element.textContent = CONFIG.girlfriendName;
    });

    if ($("#introName")) {
        $("#introName").textContent = CONFIG.girlfriendName;
    }

    if ($("#senderName")) {
        $("#senderName").textContent = CONFIG.senderName;
    }

    if ($("#heroMessage")) {
        $("#heroMessage").textContent = CONFIG.heroMessage;
    }

    if ($("#letterContent")) {
        $("#letterContent").textContent = CONFIG.letter;
    }

    if ($("#music")) {
        $("#music").src = CONFIG.music.opening;
    }

    if ($("#mainPhoto")) {
        $("#mainPhoto").src = CONFIG.mainPhoto;
        fallback($("#mainPhoto"));
    }

    if ($("#finalPhoto")) {
        $("#finalPhoto").src = CONFIG.finalPhoto;
        fallback($("#finalPhoto"));
    }

    renderStories();
    renderScrapbook();
    renderGarden();
    renderHeartMessages();
    renderSecret();
    renderWishes();
    updateCounters();
    setupMusicSections();

    setInterval(updateCounters, 1000);
}

function renderStories() {
    const container = $("#storyFeed");

    if (!container) return;

    container.innerHTML = "";

    CONFIG.stories.forEach((story) => {
        const [image, title, description] = story;

        const article = document.createElement("article");

        article.className = "story-card";

        article.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="story-overlay">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;

        const imageElement = article.querySelector("img");

        fallback(imageElement);

        container.appendChild(article);
    });
}

function renderScrapbook() {
    const container = $("#scrapbook");

    if (!container) return;

    const photos = [
        "images/foto-01.jpeg",
        "images/foto-02.jpeg",
        "images/foto-03.jpeg",
        "images/foto-04.jpeg",
        "images/foto-05.jpeg",
        "images/foto-06.jpeg"
    ];

    container.innerHTML = "";

    photos.forEach((photo, index) => {
        const item = document.createElement("button");

        item.className = "scrap-photo";
        item.type = "button";

        item.innerHTML = `
            <img src="${photo}" alt="Momen ${index + 1}">
        `;

        const image = item.querySelector("img");

        fallback(image);

        item.addEventListener("click", () => {
            if ($("#lightbox") && $("#lightboxImage")) {
                $("#lightboxImage").src = photo;

                $("#lightbox").classList.remove("hidden");
                $("#lightbox").classList.add("show");
            }
        });

        container.appendChild(item);
    });
}

function renderGarden() {
    const container = $("#garden");
    const note = $("#gardenNote");

    if (!container) return;

    const messages = [
        "Terima kasih sudah hadir di hidupku.",
        "Semoga senyummu selalu menemukan alasannya.",
        "Aku ingin terus melihatmu bahagia.",
        "Kamu adalah bagian indah dari hidupku.",
        "Semoga semua hal baik datang kepadamu."
    ];

    container.innerHTML = "";

    messages.forEach((message, index) => {
        const flower = document.createElement("button");

        flower.className = "flower";
        flower.type = "button";
        flower.textContent = "🌸";

        flower.style.left = `${10 + index * 18}%`;
        flower.style.animationDelay = `${index * 0.3}s`;

        flower.addEventListener("click", () => {
            if (note) {
                note.textContent = message;
                note.classList.add("show");
            }
        });

        container.appendChild(flower);
    });
}

function renderHeartMessages() {
    const container = $("#heartMessages");

    if (!container) return;

    container.innerHTML = "";

    CONFIG.heartMessages.forEach((message) => {
        const heart = document.createElement("button");

        heart.className = "message-heart";
        heart.type = "button";
        heart.textContent = "♡";

        heart.addEventListener("click", () => {
            if ($("#revealedMessage")) {
                $("#revealedMessage").textContent = message;
                $("#revealedMessage").classList.add("show");
            }
        });

        container.appendChild(heart);
    });
}

function renderSecret() {
    const container = $("#secretBoard");

    if (!container) return;

    const total = 12;
    const hiddenHeart = Math.floor(Math.random() * total);

    container.innerHTML = "";

    for (let i = 0; i < total; i++) {
        const item = document.createElement("button");

        item.type = "button";
        item.className = "secret-item";
        item.textContent = "?";

        item.addEventListener("click", () => {
            if (i === hiddenHeart) {
                item.textContent = "💗";

                if ($("#secretResult")) {
                    $("#secretResult").textContent =
                        "Kamu menemukannya ♡ Sama seperti aku menemukan kamu.";
                }
            } else {
                item.textContent = "♡";
            }
        });

        container.appendChild(item);
    }
}

function renderWishes() {
    const container = $("#wishes");

    if (!container) return;

    container.innerHTML = "";

    CONFIG.wishes.forEach((wish) => {
        const card = document.createElement("div");

        card.className = "wish-card";
        card.textContent = wish;

        container.appendChild(card);
    });
}

function updateCounters() {
    const relationshipStart = new Date(CONFIG.anniversaryDate);
    const now = new Date();

    const difference = now - relationshipStart;

    const days = Math.max(
        0,
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        )
    );

    if ($("#relationshipCounter")) {
        $("#relationshipCounter").textContent = `${days} hari`;
    }

    const birthday = new Date(CONFIG.birthdayDate);
    const birthdayDifference = birthday - now;

    if ($("#birthdayCounter")) {
        if (birthdayDifference > 0) {
            const daysLeft = Math.floor(
                birthdayDifference / (1000 * 60 * 60 * 24)
            );

            const hoursLeft = Math.floor(
                (birthdayDifference / (1000 * 60 * 60)) % 24
            );

            const minutesLeft = Math.floor(
                (birthdayDifference / (1000 * 60)) % 60
            );

            const secondsLeft = Math.floor(
                (birthdayDifference / 1000) % 60
            );

            $("#birthdayCounter").textContent =
                `${daysLeft} hari ${hoursLeft} jam ${minutesLeft} menit ${secondsLeft} detik`;
        } else {
            $("#birthdayCounter").textContent = "Hari ini ♡";
        }
    }

    if ($("#birthdayLabel")) {
        $("#birthdayLabel").textContent =
            `Selamat ulang tahun, ${CONFIG.girlfriendName} ♡`;
    }
}

if ($("#enterBtn")) {
    $("#enterBtn").addEventListener("click", () => {
        if ($("#intro")) {
            $("#intro").classList.add("hidden");
        }

        if ($("#app")) {
            $("#app").classList.remove("hidden");
            $("#app").classList.add("show");
        }

        playMusic(CONFIG.music.opening);
    });
}

if ($("#envelope")) {
    $("#envelope").addEventListener("click", () => {
        $("#envelope").classList.toggle("open");

        if ($("#letter")) {
            const isOpen =
                $("#envelope").classList.contains("open");

            if (isOpen) {
                $("#letter").classList.remove("hidden");
                $("#letter").classList.add("show");
            } else {
                $("#letter").classList.add("hidden");
                $("#letter").classList.remove("show");
            }
        }
    });
}

if ($("#closeLightbox")) {
    $("#closeLightbox").addEventListener("click", () => {
        $("#lightbox").classList.add("hidden");
        $("#lightbox").classList.remove("show");
    });
}

if ($("#lightbox")) {
    $("#lightbox").addEventListener("click", (event) => {
        if (event.target === $("#lightbox")) {
            $("#lightbox").classList.add("hidden");
            $("#lightbox").classList.remove("show");
        }
    });
}

if ($("#musicBtn")) {
    $("#musicBtn").addEventListener("click", () => {
        const music = $("#music");

        if (!music) return;

        if (music.paused) {
            music.play().catch(() => {});
            $("#musicBtn").textContent = "🔊";
        } else {
            music.pause();
            $("#musicBtn").textContent = "🎵";
        }
    });
}

if ($("#replayBtn")) {
    $("#replayBtn").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        if ($("#intro")) {
            $("#intro").classList.remove("hidden");
        }

        if ($("#app")) {
            $("#app").classList.add("hidden");
            $("#app").classList.remove("show");
        }

        const music = $("#music");

        if (music) {
            music.pause();
            music.currentTime = 0;
        }

        currentMusic = "";
    });
}

function showToast(message) {
    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

init();
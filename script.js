/* ==========================================
   BIRTHDAY WEBSITE
   FINAL NAVIGATION
========================================== */


/* ---------- INTRO ---------- */

const title = document.getElementById("title");
const message = document.getElementById("message");
const beginButton = document.getElementById("beginButton");

const sleep = ms =>
    new Promise(resolve => setTimeout(resolve, ms));


async function typeWriter(element, text, speed = 70) {

    if (!element) return;

    element.style.opacity = "1";
    element.innerHTML = "";

    const characters = text.replace(/<br>/g, "\n");

    let output = "";

    for (let i = 0; i < characters.length; i++) {

        if (characters[i] === "\n") {
            output += "<br>";
        } else {
            output += characters[i];
        }

        element.innerHTML =
            output +
            '<span class="cursor">|</span>';

        await sleep(speed);
    }

    element.innerHTML = output;
}


async function intro() {

    if (!title || !message || !beginButton) return;

    title.style.opacity = "0";
    message.style.opacity = "0";
    beginButton.style.opacity = "0";

    await sleep(700);

    await typeWriter(
        title,
        "Hi,<br>Joshua.",
        100
    );

    await sleep(900);

    await typeWriter(
        message,
        "Don't rush this.<br><br>I'd like to borrow your attention for a minute.",
        55
    );

    await sleep(800);

    beginButton.style.transition =
        "opacity .8s ease, transform .8s ease";

    beginButton.style.opacity = "1";
    beginButton.style.transform = "translateY(0)";
}


/* ==========================================
   COMPLETE CHAPTER ORDER
========================================== */

const chapterOrder = [

    "chapter1",
    "chapter2",
    "chapter3",
    "chapter4",
    "chapter5",
    "pokemonChapter",
    "animeChapter",
    "quietChapter",
    "chapter6"

];

let currentChapter = 0;


/* ==========================================
   BACKGROUND THEMES
========================================== */

const themes = {

    chapter1: {
        background: "#FCFAF8",
        blob1: "#D9CFF7",
        blob2: "#EDD6EA"
    },

    chapter2: {
        background: "#FFFBF4",
        blob1: "#F5E3C8",
        blob2: "#F7E9D6"
    },

    chapter3: {
        background: "#EEF4FA",
        blob1: "#C8D9F1",
        blob2: "#D8E5F7"
    },

    chapter4: {
        background: "#F7F2EA",
        blob1: "#E8DCCB",
        blob2: "#F3E8DA"
    },

    chapter5: {
        background: "#F3F0F7",
        blob1: "#D9D0EA",
        blob2: "#E7DCEB"
    },

    pokemonChapter: {
        background: "#F8F1E8",
        blob1: "#E8B7B4",
        blob2: "#C9C6E8"
    },

    animeChapter: {
        background: "#EAF0F8",
        blob1: "#C4D4ED",
        blob2: "#D8CBE8"
    },

    quietChapter: {
        background: "#F8F3ED",
        blob1: "#E8DCD1",
        blob2: "#E6D9E9"
    },

    chapter6: {
        background: "#FFF7F3",
        blob1: "#F3D5D7",
        blob2: "#E5D8F5"
    }

};


/* ==========================================
   CHANGE BACKGROUND
========================================== */

function changeTheme(chapterID) {

    const theme = themes[chapterID];

    if (!theme) return;

    const background =
        document.getElementById("background");

    const blob1 =
        document.querySelector(".blob1");

    const blob2 =
        document.querySelector(".blob2");


    if (background) {

        background.style.transition =
            "background 1.4s ease";

        background.style.background =
            theme.background;
    }


    if (blob1) {

        blob1.style.transition =
            "background 1.4s ease";

        blob1.style.background =
            `radial-gradient(
                circle,
                ${theme.blob1},
                transparent
            )`;
    }


    if (blob2) {

        blob2.style.transition =
            "background 1.4s ease";

        blob2.style.background =
            `radial-gradient(
                circle,
                ${theme.blob2},
                transparent
            )`;
    }

}


/* ==========================================
   SHOW CHAPTER
========================================== */

function showChapter(index) {

    if (
        index < 0 ||
        index >= chapterOrder.length
    ) {
        return;
    }


    const targetID =
        chapterOrder[index];

    const target =
        document.getElementById(targetID);


    if (!target) {

        console.warn(
            "Missing chapter:",
            targetID
        );

        return;
    }


    const chapters =
        document.querySelectorAll(".chapter");


    chapters.forEach(chapter => {

        chapter.classList.remove("active");

    });


    target.classList.add("active");

    currentChapter = index;

    changeTheme(targetID);


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================
   BEGIN
========================================== */

if (beginButton) {

    beginButton.addEventListener("click", () => {

        showChapter(1);

    });

}


/* ==========================================
   CONTINUE BUTTONS
========================================== */

document.addEventListener("click", event => {

    const button =
        event.target.closest(".nextButton");


    if (!button) return;


    showChapter(currentChapter + 1);

});


/* ==========================================
   BACK BUTTONS
========================================== */

document.addEventListener("click", event => {

    const button =
        event.target.closest(".backButton");


    if (!button) return;


    showChapter(currentChapter - 1);

});


/* ==========================================
   START AGAIN
========================================== */

document.addEventListener("click", event => {

    const button =
        event.target.closest(".restartButton");


    if (!button) return;


    /*
       Stop the music when restarting.
    */

    if (birthdayMusic) {

        birthdayMusic.pause();

        birthdayMusic.currentTime = 0;

    }


    /*
       Put the music button back
       to its original text.
    */

    if (musicButton) {

        musicButton.textContent =
            "♪ Play while you stay";

    }


    /*
       Go back to the opening screen.
    */

    showChapter(0);

});


/* ==========================================
   SHANGRI-LA QUEST
========================================== */

const unlockQuest =
    document.getElementById("unlockQuest");

const questLocked =
    document.getElementById("questLocked");

const questRevealed =
    document.getElementById("questRevealed");

const questLock =
    document.getElementById("questLock");


if (
    unlockQuest &&
    questLocked &&
    questRevealed
) {

    unlockQuest.addEventListener("click", () => {

        unlockQuest.style.opacity = "0";

        unlockQuest.style.transform =
            "translateY(-5px)";


        setTimeout(() => {

            questLocked.style.display =
                "none";

            questRevealed.classList.add("show");


            if (questLock) {

                questLock.textContent =
                    "UNLOCKED";

            }

        }, 500);

    });

}


/* ==========================================
   MUSIC
========================================== */

const musicButton = document.getElementById("musicButton");

let birthdayMusic = null;

if (musicButton) {

    musicButton.addEventListener("click", function () {

        if (!birthdayMusic) {

            birthdayMusic = new Audio(
                "https://cdn.jsdelivr.net/gh/prakritisoodan1808-wq/birthday-website@main/nostalgia.mp3"
            );

            birthdayMusic.loop = true;

        }

        if (birthdayMusic.paused) {

            birthdayMusic.play()
                .then(() => {

                    musicButton.textContent =
                        "Ⅱ  Pause the music";

                })
                .catch(error => {

                    console.log("Music error:", error);

                });

        } else {

            birthdayMusic.pause();

            musicButton.textContent =
                "♪ Play while you stay";

        }

    });

}


/* ==========================================
   START
========================================== */

changeTheme("chapter1");

window.addEventListener("load", () => {

    intro();

});

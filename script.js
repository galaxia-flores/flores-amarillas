/* =====================================
   NOMBRE DESDE EL ENLACE
===================================== */

const params = new URLSearchParams(
    window.location.search
);

const receivedName =
    params.get("nombre")?.trim();

const personName =
    receivedName && receivedName.length <= 30
        ? receivedName
        : null;


/* =====================================
   PERSONALIZACIÓN
===================================== */

const dedicatoria =
    document.getElementById("dedicatoria");

const messageName =
    document.getElementById("messageName");

const finalText =
    document.getElementById("finalText");


if (personName) {

    dedicatoria.textContent =
        `Para ${personName} 🌻`;

    messageName.textContent =
        `${personName}, eres pura alegría.`;

    finalText.textContent =
        `${personName}, que nunca te falten motivos para sonreír.`;

}
else {

    dedicatoria.textContent =
        "Un pequeño detalle para ti 🌻";

    messageName.textContent =
        "Eres pura alegría.";

    finalText.textContent =
        "Que nunca te falten motivos para sonreír.";

}


/* =====================================
   FRASES
===================================== */

const phrases = personName
    ? [
        `Que estas flores amarillas te recuerden lo maravillosa que eres, ${personName}.`,
        `${personName}, tu sonrisa tiene la magia de alegrar hasta los días más grises.`,
        `Eres de esas personas que llegan y hacen que todo se sienta más bonito.`,
        `Gracias por existir y por iluminar con tu esencia a quienes te rodean.`,
        `${personName}, ojalá la vida te devuelva toda la alegría que tú transmites.`,
        `Tu presencia tiene algo especial: da calma, alegría y mucha luz.`,
        `Que nunca te falten razones para sonreír ni personas que te quieran bonito.`,
        `${personName}, eres un detalle hermoso en la vida de quienes te conocen.`,
        `A veces una sola persona puede alegrar un día entero, y tú eres así.`,
        `Que cada flor amarilla te recuerde lo valiosa, fuerte y especial que eres.`,
        `Tu manera de ser deja huellas bonitas en el corazón de las personas.`,
        `${personName}, gracias por hacer más lindos los momentos con tu compañía.`,
        `Ojalá siempre te rodeen cosas tan bonitas como la alegría que llevas dentro.`,
        `Tienes esa luz que no necesita esforzarse para brillar.`,
        `${personName}, mereces días bonitos, paz en el alma y muchas sonrisas sinceras.`,
        `Nunca olvides lo especial que eres, incluso en los días en que no lo notes.`,
        `Hay personas que se vuelven inolvidables por su forma de hacer sentir bien, y tú eres una de ellas.`,
        `Hoy estas flores son solo una pequeña forma de recordarte lo mucho que vales.`
      ]
    : [
        `Que estas flores amarillas te recuerden lo maravillosa que eres.`,
        `Tu sonrisa tiene la magia de alegrar hasta los días más grises.`,
        `Eres de esas personas que llegan y hacen que todo se sienta más bonito.`,
        `Gracias por existir y por iluminar con tu esencia a quienes te rodean.`,
        `Ojalá la vida te devuelva toda la alegría que tú transmites.`,
        `Tu presencia tiene algo especial: da calma, alegría y mucha luz.`,
        `Que nunca te falten razones para sonreír ni personas que te quieran bonito.`,
        `Eres un detalle hermoso en la vida de quienes te conocen.`,
        `A veces una sola persona puede alegrar un día entero, y tú eres así.`,
        `Que cada flor amarilla te recuerde lo valiosa, fuerte y especial que eres.`,
        `Tu manera de ser deja huellas bonitas en el corazón de las personas.`,
        `Gracias por hacer más lindos los momentos con tu compañía.`,
        `Ojalá siempre te rodeen cosas tan bonitas como la alegría que llevas dentro.`,
        `Tienes esa luz que no necesita esforzarse para brillar.`,
        `Mereces días bonitos, paz en el alma y muchas sonrisas sinceras.`,
        `Nunca olvides lo especial que eres, incluso en los días en que no lo notes.`,
        `Hay personas que se vuelven inolvidables por su forma de hacer sentir bien.`,
        `Hoy estas flores son solo una pequeña forma de recordarte lo mucho que vales.`
      ];


/* =====================================
   CANVAS
===================================== */

const canvas =
    document.getElementById("stars");

const ctx =
    canvas.getContext("2d");

let stars = [];

let fallingStars = [];


/* =====================================
   AJUSTAR CANVAS
===================================== */

function resizeCanvas() {

    const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width =
        window.innerWidth * dpr;

    canvas.height =
        window.innerHeight * dpr;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    createStars();
}


/* =====================================
   CREAR ESTRELLAS
===================================== */

function createStars() {

    stars = [];

    const amount =
        window.innerWidth < 600
            ? 600
            : 1000;

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        stars.push({

            x:
                Math.random()
                * window.innerWidth,

            y:
                Math.random()
                * window.innerHeight,

            radius:
                Math.random() * 1.6
                + 0.2,

            opacity:
                Math.random(),

            change:
                Math.random()
                * 0.02
                + 0.003

        });

    }

}


/* =====================================
   ESTRELLA FUGAZ
===================================== */

function createFallingStar() {

    fallingStars.push({

        x:
            Math.random()
            * window.innerWidth,

        y:
            -30,

        length:
            Math.random() * 90 + 80,

        speed:
            Math.random() * 4 + 4,

        opacity: 1

    });

}


/* =====================================
   DIBUJAR ESTRELLAS
===================================== */

function drawStars() {

    stars.forEach(star => {

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(
                255,
                255,
                255,
                ${star.opacity}
            )`;

        ctx.fill();


        star.opacity +=
            star.change;


        if (
            star.opacity >= 1
            ||
            star.opacity <= 0.1
        ) {

            star.change *= -1;

        }

    });

}


/* =====================================
   DIBUJAR ESTRELLAS FUGACES
===================================== */

function drawFallingStars() {

    fallingStars.forEach(
        (star, index) => {

            const gradient =
                ctx.createLinearGradient(

                    star.x,
                    star.y,

                    star.x - star.length,
                    star.y - star.length

                );


            gradient.addColorStop(
                0,
                `rgba(
                    255,
                    240,
                    150,
                    ${star.opacity}
                )`
            );


            gradient.addColorStop(
                1,
                "rgba(255,255,255,0)"
            );


            ctx.beginPath();

            ctx.moveTo(
                star.x,
                star.y
            );

            ctx.lineTo(
                star.x - star.length,
                star.y - star.length
            );

            ctx.strokeStyle =
                gradient;

            ctx.lineWidth = 2;

            ctx.stroke();


            star.x += star.speed;

            star.y += star.speed;

            star.opacity -= 0.015;


            if (
                star.opacity <= 0
            ) {

                fallingStars.splice(
                    index,
                    1
                );

            }

        }
    );

}


/* =====================================
   ANIMACIÓN DEL FONDO
===================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    drawStars();

    drawFallingStars();

    requestAnimationFrame(
        animate
    );

}


/* =====================================
   CREAR ELEMENTOS FLOTANTES
===================================== */

const floatingZone =
    document.getElementById(
        "floatingZone"
    );


function createFloatingElements() {

    floatingZone.innerHTML = "";

    const mobile =
        window.innerWidth <= 600;


    /* =========================
       CELULAR
    ========================= */

    if (mobile) {

        createMobileOrbit();

        return;
    }


    /* =========================
       PC
       Conservamos tu diseño actual
    ========================= */

    const positions = [

        [5, 31], [23, 29],
        [63, 29], [81, 31],

        [5, 47], [81, 47],

        [5, 63], [81, 63],

        [6, 78], [80, 78],

        [19, 43], [66, 43],

        [18, 58], [68, 58],

        [18, 72], [67, 72],

        [32, 50], [54, 50]

    ];


    phrases.forEach(
        (phrase, index) => {

            const text =
                document.createElement(
                    "div"
                );

            text.className =
                "float-text";


            if (
                index % 3 === 0
                ||
                index % 5 === 0
            ) {

                text.classList.add(
                    "yellow"
                );

            }


            const pos =
                positions[
                    index
                    %
                    positions.length
                ];


            text.textContent =
                phrase;


            text.style.left =
                `${pos[0]}%`;


            text.style.top =
                `${pos[1]}%`;


            text.style.animationDelay =
                `${index * 0.22}s`;


            floatingZone.appendChild(
                text
            );

        }
    );


    createSunflowers(false);

    createBouquets(false);

}

function createMobileOrbit() {

    /*
       Dividimos las frases
       en grupos de 4.
    */

    const phrasesPerPage = 4;


    for (
        let i = 0;
        i < phrases.length;
        i += phrasesPerPage
    ) {

        const page =
            document.createElement(
                "section"
            );


        page.className =
            "orbit-page";


        const group =
            phrases.slice(
                i,
                i + phrasesPerPage
            );


        const positions = [

            "left-top",
            "right-top",
            "left-bottom",
            "right-bottom"

        ];


        group.forEach(
            (phrase, index) => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    `orbit-card ${positions[index]}`;


                if (
                    (
                        i + index
                    ) % 3 === 0
                ) {

                    card.classList.add(
                        "yellow"
                    );

                }


                card.textContent =
                    phrase;


                page.appendChild(
                    card
                );

            }
        );


        /* Girasol izquierdo */

        const flowerLeft =
            document.createElement(
                "div"
            );

        flowerLeft.className =
            "orbit-flower flower-a";

        flowerLeft.textContent =
            "🌻";

        page.appendChild(
            flowerLeft
        );


        /* Girasol derecho */

        const flowerRight =
            document.createElement(
                "div"
            );

        flowerRight.className =
            "orbit-flower flower-b";

        flowerRight.textContent =
            "🌻";

        page.appendChild(
            flowerRight
        );


        floatingZone.appendChild(
            page
        );

    }


    /* =========================
       ÚLTIMA PANTALLA
    ========================= */

    const finalPage =
        document.createElement(
            "section"
        );


    finalPage.className =
        "orbit-page";


    const finalContent =
        document.createElement(
            "div"
        );


    finalContent.className =
        "orbit-final";


    const finalName =
        personName
            ? `${personName}, eres pura alegría.`
            : "Eres pura alegría.";


    finalContent.innerHTML = `

        <div style="
            font-size:3rem;
            margin-bottom:10px;
        ">
            🌻
        </div>

        <h2>
            ${finalName}
        </h2>

        <p>
            Que estas flores amarillas
            te recuerden lo especial
            que eres.
        </p>

        <div style="
            font-size:2rem;
            margin-top:15px;
        ">
            ✨
        </div>

    `;


    finalPage.appendChild(
        finalContent
    );


    floatingZone.appendChild(
        finalPage
    );

}

function activateOrbitEffect() {

    if (
        window.innerWidth > 600
    ) {
        return;
    }


    floatingZone.addEventListener(
        "scroll",
        () => {

            const scroll =
                floatingZone.scrollLeft;


            const portal =
                document.querySelector(
                    ".portal"
                );


            if (!portal) {
                return;
            }


            const rotation =
                scroll * 0.08;


            const movement =
                Math.sin(
                    scroll * 0.004
                ) * 8;


            portal.style.transform = `
                translateY(${movement}px)
                rotate(${rotation}deg)
            `;

        }
    );

}

/* =====================================
   GIRASOLES
===================================== */

function createSunflowers(mobile) {

    const positions = mobile
    ? [
        [80, 25],
        [19, 46],
        [80, 57],
        [21, 78],
        [80, 80]
      ]
    : [
        [16, 31],
        [86, 33],
        [23, 53],
        [85, 57],
        [31, 72],
        [83, 76]
      ];

    positions.forEach((position, index) => {
        const flower = document.createElement("div");

        flower.className = "sunflower";
        flower.textContent = "🌻";
        flower.style.left = `${position[0]}%`;
        flower.style.top = `${position[1]}%`;
        flower.style.animationDelay = `${index * 0.4}s`;

        floatingZone.appendChild(flower);
    });
}

/* =====================================
   RAMOS
===================================== */

function createBouquets(mobile) {

    const positions = mobile
        ? [
            [13, 88]
          ]
        : [
            [18, 87],
            [89, 53]
          ];

    positions.forEach((position, index) => {
        const bouquet = document.createElement("div");

        bouquet.className = "bouquet";
        bouquet.textContent = "💐";
        bouquet.style.left = `${position[0]}%`;
        bouquet.style.top = `${position[1]}%`;
        bouquet.style.animationDelay = `${index}s`;

        floatingZone.appendChild(bouquet);
    });
}


/* =====================================
   MÚSICA AUTOMÁTICA
===================================== */

const music = document.getElementById("music");

music.volume = 0.7;

async function startMusic() {
    try {
        await music.play();
    } catch (error) {
        console.log("El navegador bloqueó el autoplay con sonido.");
    }
}

/* Intentar reproducir apenas carga la página */
window.addEventListener("load", () => {
    startMusic();
});


/* Si el navegador bloqueó el autoplay,
   comenzar con el primer toque o clic en cualquier parte */
function startOnFirstInteraction() {

    if (music.paused) {
        music.play().catch(() => {});
    }

    document.removeEventListener(
        "click",
        startOnFirstInteraction
    );

    document.removeEventListener(
        "touchstart",
        startOnFirstInteraction
    );
}


document.addEventListener(
    "click",
    startOnFirstInteraction
);

document.addEventListener(
    "touchstart",
    startOnFirstInteraction,
    { passive: true }
);


/* =====================================
   MENSAJE FINAL
===================================== */

const finalMessage =
    document.getElementById(
        "finalMessage"
    );


setTimeout(
    () => {

        finalMessage.classList.add(
            "visible"
        );

    },
    22000
);


setTimeout(
    () => {

        finalMessage.classList.remove(
            "visible"
        );

    },
    30000
);


/* =====================================
   CREAR ESTRELLAS FUGACES
===================================== */

setInterval(
    () => {

        if (
            Math.random() > 0.25
        ) {

            createFallingStar();

        }

    },
    1800
);


/* =====================================
   INICIO
===================================== */

let mobileMode =
    window.innerWidth <= 600;


/* Ajustar solamente el canvas */
function handleResize() {

    resizeCanvas();

    const newMobileMode =
        window.innerWidth <= 600;


    /*
       Solo reconstruir el diseño
       si realmente cambiamos
       entre PC y celular.
    */
    if (
        newMobileMode !== mobileMode
    ) {

        mobileMode =
            newMobileMode;

        createFloatingElements();

    }

}


window.addEventListener(
    "resize",
    handleResize
);


/* Preparar canvas */
resizeCanvas();


/* Crear las frases UNA sola vez */
createFloatingElements();


/* Activar movimiento horizontal */
activateOrbitEffect();


/* Iniciar estrellas */
animate();
let adventure = "";
let food = "";

let noCount = 0;

let shots = 0;
let cupsMade = 0;

const phoneNumber = "YOUR_NUMBER_HERE";

/* -------------------- */
/* PAGE CHANGER */
/* -------------------- */

function showPage(page){

    document
        .querySelectorAll(".page")
        .forEach(p =>
            p.classList.remove("active")
        );

    document
        .getElementById("page" + page)
        .classList.add("active");
}

/* -------------------- */
/* SPONGEBOB WAITING */
/* -------------------- */

setTimeout(() => {

    const waiting =
        document.getElementById(
            "waitingImg"
        );

    if(waiting){

        waiting.classList.add(
            "waiting-visible"
        );
    }

},30000);

/* -------------------- */
/* NO BUTTON */
/* -------------------- */

function moveButton(){

    const btn =
        document.getElementById(
            "noBtn"
        );

    const x =
        Math.random() *
        (window.innerWidth - 200);

    const y =
        Math.random() *
        (window.innerHeight - 150);

    btn.style.position =
        "absolute";

    btn.style.left =
        x + "px";

    btn.style.top =
        y + "px";

    noCount++;

    if(noCount >= 7){

        document
            .getElementById(
                "waitingImg"
            )
            .classList.add(
                "waiting-visible"
            );
    }
}

/* -------------------- */
/* CUP PONG */
/* -------------------- */

function startCupPong(){

    shots = 0;
    cupsMade = 0;

    showPage(2);

    setTimeout(() => {

        initializeCupPong();

    },200);
}

function initializeCupPong(){

    const ball =
        document.getElementById(
            "ball"
        );

    if(!ball) return;

    let startX = 0;
    let startY = 0;

    function startDrag(x,y){

        startX = x;
        startY = y;
    }

    function release(x,y){

        const dy =
            startY - y;

        if(dy < 40){

            document
            .getElementById(
                "pongStatus"
            ).innerHTML =
            "Swipe upward 😎";

            return;
        }

        shootBall();
    }

    ball.onmousedown = e => {

        startDrag(
            e.clientX,
            e.clientY
        );

        document.onmouseup =
        e2 => {

            release(
                e2.clientX,
                e2.clientY
            );

            document.onmouseup =
                null;
        };
    };

    ball.ontouchstart = e => {

        startDrag(
            e.touches[0].clientX,
            e.touches[0].clientY
        );
    };

    ball.ontouchend = e => {

        const t =
            e.changedTouches[0];

        release(
            t.clientX,
            t.clientY
        );
    };
}

function shootBall(){

    const ball =
        document.getElementById(
            "ball"
        );

    shots++;

    ball.style.transition =
        "all .5s ease";

    ball.style.bottom =
        "260px";

    setTimeout(() => {

        ball.style.bottom =
            "30px";

    },600);

    let successChance = 0.70;

    if(shots === 1)
        successChance = 0.85;

    if(shots === 3)
        successChance = 0.85;

    const made =
        Math.random() <
        successChance;

    if(made){

        cupsMade++;

        const cup =
            document.getElementById(
                "cup" + cupsMade
            );

        if(cup){

            cup.classList.add(
                "hit"
            );
        }

        document
            .getElementById(
                "pongStatus"
            )
            .innerHTML =

            `Nice shot 😎 (${cupsMade}/3)`;

    }else{

        document
            .getElementById(
                "pongStatus"
            )
            .innerHTML =

            `Rimmed out 😂 (${cupsMade}/3)`;
    }

    if(shots >= 3){

        setTimeout(() => {

            if(cupsMade === 3){

                document
                    .getElementById(
                        "pongStatus"
                    )
                    .innerHTML =

                    "Okay Vanessa, you're actually cracked at cup pong 😎";

            }else{

                document
                    .getElementById(
                        "pongStatus"
                    )
                    .innerHTML =

                    "It's okay, I really wanted to go on this date with you anyway <3";
            }

            setTimeout(() => {

                showPage(3);

            },2500);

        },500);
    }
}

/* -------------------- */
/* ADVENTURE */
/* -------------------- */

function pickAdventure(choice){

    adventure = choice;

    showPage(4);
}

/* -------------------- */
/* FOOD */
/* -------------------- */

function pickFood(choice){

    food = choice;

    createSummary();

    showPage(5);

    initializeScratchCard();
}

/* -------------------- */
/* SUMMARY */
/* -------------------- */

function createSummary(){

    document
        .getElementById(
            "finalSummary"
        )
        .innerHTML =

        `
        <h3>Your Date Choice</h3>

        Adventure:

        <br>

        <b>${adventure}</b>

        <br><br>

        Food:

        <br>

        <b>${food}</b>
        `;
}

/* -------------------- */
/* SCRATCH CARD */
/* -------------------- */

function initializeScratchCard(){

    const canvas =
        document.getElementById(
            "scratchCanvas"
        );

    if(!canvas) return;

    canvas.style.display =
        "block";

    const ctx =
        canvas.getContext("2d");

    ctx.globalCompositeOperation =
        "source-over";

    ctx.fillStyle =
        "#b8b8b8";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
        "white";

    ctx.font =
        "30px Arial";

    ctx.fillText(
        "Scratch Me 😎",
        170,
        350
    );

    let scratching =
        false;

    let scratchCount =
        0;

    function scratch(x,y){

        ctx.globalCompositeOperation =
            "destination-out";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            35,
            0,
            Math.PI * 2
        );

        ctx.fill();

        scratchCount++;

        if(scratchCount > 120){

            canvas.style.opacity =
                "0";

            setTimeout(() => {

                canvas.style.display =
                    "none";

            },500);
        }
    }

    canvas.onmousedown =
    () => scratching = true;

    canvas.onmouseup =
    () => scratching = false;

    canvas.onmousemove =
    e => {

        if(!scratching)
            return;

        const rect =
            canvas.getBoundingClientRect();

        scratch(
            e.clientX -
            rect.left,

            e.clientY -
            rect.top
        );
    };

    canvas.ontouchmove =
    e => {

        const rect =
            canvas.getBoundingClientRect();

        scratch(
            e.touches[0].clientX -
            rect.left,

            e.touches[0].clientY -
            rect.top
        );
    };
}

/* -------------------- */
/* SMS */
/* -------------------- */

function sendChoice(){

    const text =

`Adventure: ${adventure}

Food: ${food}

I would like to go 😎`;

    window.location.href =

    "sms:" +
    phoneNumber +
    "?body=" +
    encodeURIComponent(text);
}
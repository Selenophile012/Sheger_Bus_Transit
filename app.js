const ROUTES_URL = "data/routes.json";
const STORAGE_KEY = "shegerTransitFavourites";
const PHONE_REGEX = /^(?:\+251|0)9\d{8}$/;


const state = {
    routes: [],
    favourites: [],
    search: ""
};


const routeListEl =
    document.querySelector("#route-list");

const favouriteListEl =
    document.querySelector("#favourite-list");

const searchEl =
    document.querySelector("#search");

const statusEl =
    document.querySelector("#status");

const bookingForm =
    document.querySelector("#booking-form");

const nameEl =
    document.querySelector("#name");

const phoneEl =
    document.querySelector("#phone");

const routeSelectEl =
    document.querySelector("#route-select");

const formErrorEl =
    document.querySelector("#form-error");

const confirmationEl =
    document.querySelector("#confirmation");


async function loadRoutes() {

    statusEl.textContent =
        "Loading routes...";

    routeListEl.innerHTML = `
        <div class="loading">
            Loading Addis bus routes...
        </div>
    `;


    try {

        const response =
            await fetch(ROUTES_URL);


        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {
            throw new Error(
                "Route data must be an array."
            );
        }


        state.routes = data;

        statusEl.textContent =
            `${data.length} routes available.`;


        render();

    } catch (error) {

        console.error(
            "Route loading error:",
            error
        );


        statusEl.textContent =
            "Could not load routes.";


        routeListEl.innerHTML = `
            <div class="error-state">

                <strong>
                    Could not load the routes.
                </strong>

                <p>
                    Please check the data file
                    and try again.
                </p>

            </div>
        `;
    }
}


function render() {

    renderRoutes();

    renderFavourites();

    renderRouteOptions();
}


function renderRoutes() {

    const term =
        state.search
            .trim()
            .toLowerCase();


    const filteredRoutes =
        state.routes.filter(route => {

            const routeNumber =
                route?.number ?? "";

            const name =
                route?.name ?? "";

            const from =
                route?.from ?? "";

            const to =
                route?.to ?? "";

            const areas =
                Array.isArray(route?.areas)
                    ? route.areas.join(" ")
                    : "";


            const searchableText =
                `
                ${routeNumber}
                ${name}
                ${from}
                ${to}
                ${areas}
                `.toLowerCase();


            return searchableText.includes(term);
        });


    if (filteredRoutes.length === 0) {

        routeListEl.innerHTML = `
            <div class="empty">

                <h3>
                    No routes found
                </h3>

                <p>
                    Try another route,
                    destination or area.
                </p>

            </div>
        `;

        return;
    }


    routeListEl.innerHTML =
        filteredRoutes
            .map(renderRoute)
            .join("");
}


function renderRoute(route) {

    const id =
        route?.id;

    const number =
        route?.number ?? "N/A";

    const name =
        route?.name ?? "Unknown route";

    const from =
        route?.from ?? "Unknown";

    const to =
        route?.to ?? "Unknown";

    const areas =
        Array.isArray(route?.areas)
            ? route.areas.join(", ")
            : "No area information";


    const isFavourite =
        state.favourites.includes(id);


    return `
        <article
            class="route-card"
            data-id="${id}"
        >

            <span class="route-number">
                Route ${number}
            </span>


            <h3>
                ${name}
            </h3>


            <p class="route-destination">
                ${from} → ${to}
            </p>


            <p class="route-info">
                Areas:
                ${areas}
            </p>


            <div class="route-actions">

                <button
                    class="
                        favourite-button
                        ${isFavourite ? "saved" : ""}
                    "
                    type="button"
                >
                    ${
                        isFavourite
                            ? "★ Saved"
                            : "☆ Save Favourite"
                    }
                </button>

            </div>

        </article>
    `;
}


function renderFavourites() {

    if (
        !Array.isArray(state.favourites) ||
        state.favourites.length === 0
    ) {

        favouriteListEl.innerHTML = `
            <p>
                No favourite routes yet.
            </p>
        `;

        return;
    }


    const favouriteRoutes =
        state.favourites
            .map(id =>
                state.routes.find(
                    route => route?.id === id
                )
            )
            .filter(Boolean);


    if (favouriteRoutes.length === 0) {

        favouriteListEl.innerHTML = `
            <p>
                No favourite routes yet.
            </p>
        `;

        return;
    }


    favouriteListEl.innerHTML =
        favouriteRoutes
            .map(renderFavourite)
            .join("");
}


function renderFavourite(route) {

    const id =
        route?.id;

    const number =
        route?.number ?? "N/A";

    const from =
        route?.from ?? "Unknown";

    const to =
        route?.to ?? "Unknown";


    return `
        <div
            class="favourite-item"
            data-id="${id}"
        >

            <strong>
                Route ${number}
            </strong>

            <span>
                ${from} → ${to}
            </span>

            <button
                class="remove-button"
                type="button"
            >
                Remove
            </button>

        </div>
    `;
}


function renderRouteOptions() {

    const currentValue =
        routeSelectEl.value;


    const options =
        state.routes
            .map(route => {

                const id =
                    route?.id;

                const number =
                    route?.number ?? "N/A";

                const from =
                    route?.from ?? "Unknown";

                const to =
                    route?.to ?? "Unknown";


                return `
                    <option value="${id}">
                        Route ${number}:
                        ${from} → ${to}
                    </option>
                `;
            })
            .join("");


    routeSelectEl.innerHTML = `
        <option value="">
            Select a route
        </option>

        ${options}
    `;


    if (
        currentValue &&
        state.routes.some(
            route =>
                String(route?.id) ===
                currentValue
        )
    ) {
        routeSelectEl.value =
            currentValue;
    }
}


function toggleFavourite(id) {

    if (id === undefined || id === null) {
        return;
    }


    const routeExists =
        state.routes.some(
            route => route?.id === id
        );


    if (!routeExists) {
        return;
    }


    const index =
        state.favourites.indexOf(id);


    if (index === -1) {

        state.favourites.push(id);

    } else {

        state.favourites.splice(index, 1);
    }


    saveFavourites();

    render();
}


function removeFavourite(id) {

    if (id === undefined || id === null) {
        return;
    }


    state.favourites =
        state.favourites.filter(
            favouriteId =>
                favouriteId !== id
        );


    saveFavourites();

    render();
}


function saveFavourites() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(state.favourites)
        );

    } catch (error) {

        console.error(
            "Could not save favourites:",
            error
        );
    }
}


function loadFavourites() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);


        if (!saved) {
            return;
        }


        const parsed =
            JSON.parse(saved);


        if (!Array.isArray(parsed)) {
            return;
        }


        state.favourites =
            parsed.filter(id =>
                id !== null &&
                id !== undefined
            );

    } catch (error) {

        console.error(
            "Could not restore favourites:",
            error
        );

        state.favourites = [];
    }
}


function validateBooking({
    name,
    phone,
    routeId
}) {

    if (!name?.trim()) {
        return "Please enter your name.";
    }


    const cleanPhone =
        phone?.trim() ?? "";


    if (!PHONE_REGEX.test(cleanPhone)) {

        return (
            "Enter a valid Ethiopian phone."
        );
    }


    if (
        routeId === undefined ||
        routeId === null ||
        routeId === ""
    ) {

        return "Please select a route.";
    }


    const routeExists =
        state.routes.some(
            route =>
                String(route?.id) ===
                String(routeId)
        );


    if (!routeExists) {

        return "The selected route is not available.";
    }


    return "";
}


function showError(message) {

    formErrorEl.textContent =
        message ?? "";
}


function clearError() {

    formErrorEl.textContent = "";
}


function showConfirmation(booking) {

    const route =
        booking?.route;


    if (!route) {
        return;
    }


    const name =
        booking?.name ?? "Passenger";


    const number =
        route?.number ?? "N/A";

    const from =
        route?.from ?? "Unknown";

    const to =
        route?.to ?? "Unknown";


    confirmationEl.hidden = false;


    confirmationEl.textContent =
        `
        Booking confirmed for ${name}.
        Route ${number}: ${from} → ${to}.
        Your transit booking has been recorded.
        `;
}


function createBooking(data) {

    if (!data) {
        return;
    }


    const route =
        state.routes.find(
            item =>
                String(item?.id) ===
                String(data.routeId)
        );


    if (!route) {
        return;
    }


    const booking = {

        name: data.name,

        phone: data.phone,

        routeId: route.id,

        route: {
            number: route.number,
            name: route.name,
            from: route.from,
            to: route.to
        },

        bookedAt:
            new Date().toISOString()
    };


    console.log(
        "Transit booking:",
        booking
    );


    showConfirmation(booking);

    bookingForm.reset();
}


searchEl.addEventListener(
    "input",
    event => {

        state.search =
            event.target.value;

        renderRoutes();
    }
);


routeListEl.addEventListener(
    "click",
    event => {

        if (
            !event.target.matches(
                ".favourite-button"
            )
        ) {
            return;
        }


        const card =
            event.target.closest(
                ".route-card"
            );


        if (!card) {
            return;
        }


        const id =
            Number(card.dataset.id);


        toggleFavourite(id);
    }
);


favouriteListEl.addEventListener(
    "click",
    event => {

        if (
            !event.target.matches(
                ".remove-button"
            )
        ) {
            return;
        }


        const item =
            event.target.closest(
                ".favourite-item"
            );


        if (!item) {
            return;
        }


        const id =
            Number(item.dataset.id);


        removeFavourite(id);
    }
);


bookingForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        clearError();


        const data = {

            name:
                nameEl.value.trim(),

            phone:
                phoneEl.value.trim(),

            routeId:
                routeSelectEl.value
        };


        const error =
            validateBooking(data);


        if (error) {

            showError(error);

            return;
        }


        createBooking(data);
    }
);


function init() {

    loadFavourites();

    render();

    loadRoutes();
}


init();
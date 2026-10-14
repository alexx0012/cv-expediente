class ExpedienteColofon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._temporizador = null;
    }

    static get observedAttributes() {
        return ['autor', 'lugar', 'fecha-actualizacion'];
    }

    connectedCallback() {
        if (!this.shadowRoot.getElementById('cintillo')) {
            this.render();
        }

        this.actualizar();

        // Actualizar la hora cada minuto.
        this._temporizador = setInterval(() => {
            this.actualizar();
        }, 60000);
    }

    disconnectedCallback() {
        if (this._temporizador !== null) {
            clearInterval(this._temporizador);
            this._temporizador = null;
        }
    }

    attributeChangedCallback() {
        this.actualizar();
    }

    render() {
        this.shadowRoot.innerHTML = `
<style>
    :host {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 1%;
        z-index: 90;
        display: block;
        padding: 18px clamp(14px, 3vw, 28px) 16px;

        background: linear-gradient(
            to top,
            rgba(14, 14, 14, 0.98) 80%,
            rgba(14, 14, 14, 0)
        );

        font-size: clamp(0.58rem, 1.4vw, 0.72rem);
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #c9c2b2;
        box-sizing: border-box;
    }

    .cintillo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.6em 1.4em;
        flex-wrap: wrap;
        width: min(1400px, 100%);
        padding: 8px;
    }

    .autor-grupo {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 0.5em 1em;
    }

    .cintillo b {
        font-weight: 400;
        color: #b5ac9c;
    }


    #anio{
    margin-left: 20px;
    }


    .hora {
        color: #d2b48c;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.08em;
        white-space: nowrap;
    }

    .fecha-grupo {
        display: flex;
        align-items: baseline;
        gap: 0.5em;
    }

    .etiqueta {
        color: #8f887c;
    }

    .cintillo time {
        color: #b5ac9c;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        margin-right: 15px;
    }

    @media (max-width: 700px) {
        .cintillo {
            justify-content: center;
            text-align: center;
            gap: 8px 16px;
        }

        .autor-grupo,
        .fecha-grupo {
            justify-content: center;
        }
    }
</style>

<div class="cintillo" id="cintillo">
    <div class="autor-grupo">
        <span>
            <span id="anio"></span>
            <b id="autor"></b>
        </span>

        <time id="hora" class="hora" aria-label="Hora actual"></time>
    </div>

    <div class="fecha-grupo">
        <span class="etiqueta">✓⃝ Zona libre de cookies.</span>
        <time id="fecha"></time>
    </div>
</div>
        `;
    }

    actualizar() {
        const anio = this.shadowRoot.getElementById('anio');
        if (!anio) return;

        const ahora = new Date();

        // Año actual.
        anio.textContent = ahora.getFullYear();

        // Nombre del autor.
        this.shadowRoot.getElementById('autor').textContent =
            this.getAttribute('autor') || 'Autor';

        // Hora local actual en formato de 24 horas.
        const horaEl = this.shadowRoot.getElementById('hora');

        horaEl.textContent = ahora.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        // Fecha actual: día, mes y año.
        const fechaEl = this.shadowRoot.getElementById('fecha');

        fechaEl.textContent = ahora.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        fechaEl.setAttribute(
            'datetime',
            `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`
        );
    }
}

customElements.define('expediente-colofon', ExpedienteColofon);
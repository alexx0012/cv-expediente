class ExpedientePagina extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['activa', 'total'];
    }

    attributeChangedCallback() {
        this.actualizarVisibilidad();
    }

    connectedCallback() {
       if (!this._inicializado) {
    this._inicializado = true;
    this.render();
  }
        this.actualizarVisibilidad();
    }

    render() {
        this.shadowRoot.innerHTML = `
<style>
    :host {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transform: translateY(10px);
        pointer-events: none;
        transition: opacity 0.3s ease, transform 0.4s ease;
        z-index: 1;
        box-sizing: border-box;
    }

    :host([activa]) {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        z-index: 2;
    }

    .papel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    container-type: inline-size;
    box-sizing: border-box;
    overflow: hidden;

    /* Color base: papel envejecido */
    background-color: #e6dcc3;

    background-image:
        /* Variaciones generales del tono */
        linear-gradient(
            112deg,
            rgba(255, 250, 231, 0.42) 0%,
            transparent 35%,
            rgba(128, 91, 52, 0.10) 100%
        ),

        /* Bordes envejecidos */
        radial-gradient(
            ellipse at 0% 0%,
            rgba(126, 83, 43, 0.22),
            transparent 35%
        ),
        radial-gradient(
            ellipse at 100% 0%,
            rgba(133, 91, 49, 0.17),
            transparent 32%
        ),
        radial-gradient(
            ellipse at 0% 100%,
            rgba(120, 79, 40, 0.19),
            transparent 35%
        ),
        radial-gradient(
            ellipse at 100% 100%,
            rgba(110, 72, 38, 0.22),
            transparent 38%
        ),

        /* Manchas suaves de antigüedad */
        radial-gradient(
            ellipse at 22% 28%,
            rgba(156, 116, 65, 0.12),
            transparent 24%
        ),
        radial-gradient(
            ellipse at 78% 62%,
            rgba(255, 247, 220, 0.35),
            transparent 30%
        ),
        radial-gradient(
            ellipse at 55% 92%,
            rgba(145, 103, 57, 0.10),
            transparent 28%
        ),

        /* Grano irregular del papel */
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E");

    background-blend-mode:
        normal,
        normal,
        normal,
        normal,
        normal,
        normal,
        normal,
        normal,
        multiply;

    /* Profundidad y separación del soporte */
    padding: clamp(14px, 3.5vw, 30px);

    box-shadow:
        0 10px 25px rgba(0, 0, 0, 0.30),
        inset 0 0 25px rgba(110, 76, 42, 0.09),
        inset 0 0 3px rgba(89, 58, 31, 0.22);

    border: 1px solid rgba(105, 75, 43, 0.20);
    border-radius: 2px;

    display: flex;
    flex-direction: column;
}
    .contenido {
        font-family: 'Special Elite', monospace;
        color: #222;
        line-height: 1.6;
        width: 100%;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        padding-right: 5px;
        box-sizing: border-box;
        font-size: clamp(0.6rem, 1vw, 0.9rem);
        scrollbar-width: thin;
        scrollbar-color: #b9ac97 transparent;
    }

    .contenido::-webkit-scrollbar {
        width: 8px;
    }

    .contenido::-webkit-scrollbar-thumb {
        background: #b9ac97;
        border-radius: 4px;
    }

    .contenido::-webkit-scrollbar-track {
        background: transparent;
    }

    .navegacion-pie {
        flex: 0 0 auto;
        min-height: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: clamp(4px, 1.2vw, 12px);
        border-top: 2px dashed #ccc;
        font-size: clamp(0.55rem, 2.5vw, 0.9rem);
        color: #555;
        box-sizing: border-box;
        background-color: #f4f0e6;
        padding-top: 5px;
        margin-top: clamp(6px, 1.5vw, 12px);
    }

    #info-pag {
        flex: 1 1 auto;
        text-align: center;
        white-space: nowrap;
    }

    .boton-pag {
        background: transparent;
        border: 1px solid #444;
        color: #222;
        font-family: 'Special Elite', monospace;
        padding: 4px clamp(6px, 2.5vw, 14px);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: clamp(0.55rem, 2.5vw, 0.9rem);
        flex: 0 0 auto;
        white-space: nowrap;
    }

    .boton-pag:hover {
        background: #222;
        color: #f4f0e6;
    }

    .boton-pag:focus-visible {
        outline-offset: 2px;
    }

    @container (max-width: 380px) {
        .navegacion-pie {
            justify-content: center;
            row-gap: 6px;
        }

        #info-pag {
            order: -1;
            flex-basis: 100%;
        }

        .boton-pag {
            padding: 4px 8px;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        :host {
            transition-duration: 0.01ms;
        }
    }

    .oculto {
        visibility: hidden;
        pointer-events: none;
    }
</style>

            <div class="papel">
                <div class="contenido">
                    <slot></slot>
                </div>

                <div class="navegacion-pie">
                    <button class="boton-pag" id="btn-ant" aria-label="Ir a la página anterior">« ANTERIOR</button>
                    <span id="info-pag" tabindex="-1" aria-live="polite">DOC. --</span>
                    <button class="boton-pag" id="btn-sig" aria-label="Ir a la página siguiente">SIGUIENTE »</button>
                </div>
            </div>
        `;

        this.setupNavegacion();
    }

    actualizarVisibilidad() {
        const infoPag = this.shadowRoot.getElementById('info-pag');
        const numPagina = String(this.getAttribute('data-pagina') || '0').padStart(2, '0');
        const total = this.getAttribute('total');

        if (infoPag) {
            infoPag.textContent = total
                ? `DOC. Nº ${numPagina} / ${String(total).padStart(2, '0')}`
                : `DOC. Nº ${numPagina}`;
        }

        // Una hoja inactiva no debe ser tabulable ni leerse con el lector de pantalla
        const estaActiva = this.hasAttribute('activa');
        this.inert = !estaActiva;
        this.setAttribute('aria-hidden', String(!estaActiva));
    }

    setupNavegacion() {
        const btnAnt = this.shadowRoot.getElementById('btn-ant');
        const btnSig = this.shadowRoot.getElementById('btn-sig');

        btnSig.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('cambiar-pagina', {
                detail: { direccion: 'siguiente' },
                bubbles: true,
                composed: true
            }));
        });

        btnAnt.addEventListener('click', (e) => {
            e.stopPropagation();
            this.dispatchEvent(new CustomEvent('cambiar-pagina', {
                detail: { direccion: 'anterior' },
                bubbles: true,
                composed: true
            }));
        });
    }

    configurarBotones(esPrimera, esUltima) {
        const btnAnt = this.shadowRoot.getElementById('btn-ant');
        const btnSig = this.shadowRoot.getElementById('btn-sig');
        
        if (esPrimera) btnAnt.classList.add('oculto');
        else btnAnt.classList.remove('oculto');

        if (esUltima) btnSig.classList.add('oculto');
        else btnSig.classList.remove('oculto');
    }
}
customElements.define('expediente-pagina', ExpedientePagina);

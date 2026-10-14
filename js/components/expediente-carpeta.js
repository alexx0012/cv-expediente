class ExpedienteCarpeta extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.abierto = false;
    }

    static get observedAttributes() {
        return ['nombre', 'referencia'];
    }

    connectedCallback() {
         if (this._inicializado) return;

    this._inicializado = true;

    this.render();
    this.setupEvents();
}

    attributeChangedCallback() {
        this.actualizarEtiqueta();
    }

    actualizarEtiqueta() {
        const titulo = this.shadowRoot && this.shadowRoot.getElementById('etiqueta-titulo');
        const ref = this.shadowRoot && this.shadowRoot.getElementById('etiqueta-ref');
        if (titulo) titulo.textContent = this.getAttribute('nombre') || 'DOSSIER POLICIAL: CLASIFICADO';
        if (ref) ref.textContent = this.getAttribute('referencia') || 'ID: CORE-DEV-V2026';
    }

    render() {
        this.shadowRoot.innerHTML = `
<style>
    :host {
        display: block;
        width: 90vw; 
        max-width: 1150px;
        aspect-ratio: 16 / 11; 
        max-height: 85vh;
        position: relative;
        cursor: default;
        contain: layout;
    }

    .carpeta-contenedor {
        width: 100%;
        height: 100%;
        position: relative;
        transform-style: preserve-3d;
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .textura-manila {
    position: relative;
    isolation: isolate;
    overflow: hidden;

    /* Cartón manila envejecido */
    background-color: #bda078;

    background-image:
        /* Luz y sombra general */
        linear-gradient(
            125deg,
            rgba(255, 248, 220, 0.18) 0%,
            transparent 25%,
            rgba(76, 45, 20, 0.12) 100%
        ),

        /* Desgaste de las esquinas */
        radial-gradient(
            ellipse at 0% 0%,
            rgba(65, 39, 20, 0.30),
            transparent 35%
        ),
        radial-gradient(
            ellipse at 100% 0%,
            rgba(75, 43, 20, 0.22),
            transparent 30%
        ),
        radial-gradient(
            ellipse at 100% 100%,
            rgba(58, 34, 18, 0.28),
            transparent 35%
        ),
        radial-gradient(
            ellipse at 0% 100%,
            rgba(80, 48, 24, 0.22),
            transparent 32%
        ),

        /* Manchas irregulares del papel */
        radial-gradient(
            ellipse at 28% 35%,
            rgba(119, 76, 37, 0.14),
            transparent 32%
        ),
        radial-gradient(
            ellipse at 72% 68%,
            rgba(238, 213, 167, 0.20),
            transparent 38%
        ),
        radial-gradient(
            ellipse at 50% 10%,
            rgba(91, 57, 30, 0.10),
            transparent 45%
        ),

        /* Variación tonal del cartón */
        linear-gradient(
            90deg,
            rgba(68, 43, 22, 0.14),
            transparent 8%,
            transparent 92%,
            rgba(68, 43, 22, 0.18)
        ),

        /* Fibras y grano del material */
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.20'/%3E%3C/svg%3E");

    background-blend-mode:
        normal,
        normal,
        normal,
        normal,
        normal,
        normal,
        normal,
        normal,
        normal,
        multiply;

    /* Profundidad física */
    border: 1px solid rgba(77, 51, 29, 0.38);
    border-radius: 3px 12px 10px 3px;

    box-shadow:
        0 18px 35px rgba(24, 16, 9, 0.38),
        0 4px 10px rgba(24, 16, 9, 0.22),
        inset 0 2px 3px rgba(255, 239, 202, 0.22),
        inset 0 -5px 12px rgba(65, 39, 18, 0.18),
        inset 5px 0 10px rgba(66, 41, 21, 0.13),
        inset -4px 0 8px rgba(66, 41, 21, 0.12);
}
        .textura-manila::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;

    background:
        repeating-linear-gradient(
            3deg,
            transparent 0px,
            rgba(70, 45, 24, 0.025) 1px,
            transparent 2px,
            transparent 6px
        ),
        radial-gradient(
            ellipse at 15% 85%,
            rgba(69, 43, 23, 0.16),
            transparent 24%
        ),
        radial-gradient(
            ellipse at 90% 45%,
            rgba(245, 222, 179, 0.13),
            transparent 22%
        );

    opacity: 0.85;
    mix-blend-mode: multiply;
}

    .contraportada {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        filter: brightness(0.85);
    }

    .portada {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: left center;
        transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
        z-index: 10;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 12px solid #a3855c;
        cursor: pointer;
    }

    .etiqueta {
        background: #fcfbf7;
        padding: 4% 8%;
        width: 75%;
        max-width: 400px;
        border: 3px dashed #444;
        font-family: 'Special Elite', monospace;
        font-size: clamp(0.9rem, 2vw, 1.3rem);
        color: #111;
        text-align: center;
        transform: rotate(-1.5deg);
        box-shadow: 3px 5px 15px rgba(0,0,0,0.15);
    }

    .etiqueta-ref {
        font-size: 0.8em;
        color: #555;
    }

    .portada:focus-visible {
        outline-offset: -8px;
    }

    .sello-confidencial {
        margin-top: 5%;
        border: 6px double #1e8000;
        color: #1e8000;
        font-size: clamp(1.4rem, 4vw, 2.5rem);
        font-weight: bold;
        padding: 6px 20px;
        transform: rotate(-20deg);
        opacity: 0.8;
        letter-spacing: 4px;
    }

    .contenido-paginas {
        position: absolute;
        width: 94%; 
        height: 90%;
        top: 5%;
        left: 3%;
        z-index: 5;
        pointer-events: none;
        box-sizing: border-box;
    }

    :host([abierto]) .portada {
        transform: rotateY(-125deg);
        pointer-events: none;
    }

    :host([abierto]) .carpeta-contenedor {
        transform: translateX(6%) rotateX(0.5deg); 
    }

    :host([abierto]) .contenido-paginas {
        pointer-events: auto;
    }
        .btn-cerrar {
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 10px;
  border: 2px solid rgba(77, 51, 29, 0.6);
  border-radius: 3px;
  background: #bda078;
  color: #ccc;
  font: inherit;
  font-size: 0.6rem;
  font-weight:bold;
  letter-spacing: 0.06em;
  cursor: pointer;
}

.btn-cerrar[hidden] {
  display: none;
}

.btn-cerrar:focus-visible {
  outline: 3px solid #fff;
  outline-offset: 3px;
}

/* Solo mostrar el botón en dispositivos táctiles */
@media (hover: none) and (pointer: coarse) {
  .btn-cerrar:not([hidden]) {
    display: block;
  }
}

/* Ocultarlo en escritorio */
@media (hover: hover) and (pointer: fine) {
  .btn-cerrar {
    display: none;
  }
}

    /* --- COMPORTAMIENTO MÓVIL OPTIMIZADO --- */
    @media (max-width: 770px) {
        :host {
            width: 95vw;
            /* En móviles cancelamos el aspect-ratio horizontal y le damos altura vertical */
            aspect-ratio: auto;
            height: 85vh; 
        }
        .carpeta-contenedor {
            transform: none !important;
        }
        :host([abierto]) .portada {
            transform: translateY(110%) scale(0.8);
            opacity: 0;
            pointer-events: none;
        }
        /* En pantallas verticales aprovechamos mejor el espacio */
        .contenido-paginas {
            width: 96%;
            height: 94%;
            top: 3%;
            left: 2%;
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .carpeta-contenedor,
        .portada {
            transition-duration: 0.01ms;
        }
    }
</style>


            <div class="carpeta-contenedor">
                <div class="contraportada textura-manila"></div>
                <div class="contenido-paginas">
                    <slot name="paginas"></slot>
                </div>
                <div class="portada textura-manila"
                     role="button"
                     tabindex="0"
                     aria-expanded="false"
                     aria-label="Abrir el expediente. Pulsa Intro para desplegar las hojas.">
                    <div class="etiqueta">
                        <strong id="etiqueta-titulo">DOSSIER POLICIAL: CLASIFICADO</strong><br>
                        <span class="etiqueta-ref" id="etiqueta-ref">ID: CORE-DEV-V2026</span>
                    </div>
                    <div class="sello-confidencial">DISPONIBLE</div>
                </div>
                <button class="btn-cerrar" type="button" hidden>
  ← INICIAR
</button>
            </div>
        `;

        this.actualizarEtiqueta();
    }

    setupEvents() {
        // Evita que el click atraviese a elementos no interactivos del light DOM
        this.addEventListener('click', (e) => {
            const path = e.composedPath();
            const target = path[0];
            if (target && (target.tagName === 'A' || target.closest('a, button, [role="button"]'))) return;
            if (this.abierto && path.some(el => el && el.tagName === 'EXPEDIENTE-PAGINA')) return;
            this.alternar();
        });

        const portada = this.shadowRoot.querySelector('.portada');

        const btnCerrar = this.shadowRoot.querySelector('.btn-cerrar');

btnCerrar.addEventListener('click', () => {
  if (this.abierto) {
    this.alternar();
  }
});

        portada.addEventListener('click', (e) => {
            e.stopPropagation();
            this.alternar();
        });

        portada.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.alternar();
            }
        });

        this.setupGestoDeslizar();
    }

    /* Deslizar horizontalmente cambia de hoja en táctil (evento 'deslizar') */
    setupGestoDeslizar() {
        let x0 = null;
        let y0 = null;

        this.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1) {
                x0 = null;
                return;
            }
            x0 = e.touches[0].clientX;
            y0 = e.touches[0].clientY;
        }, { passive: true });

        this.addEventListener('touchend', (e) => {
            if (x0 === null) return;

            const toque = e.changedTouches[0];
            const dx = toque.clientX - x0;
            const dy = toque.clientY - y0;
            x0 = null;

            // Solo si el gesto es claramente horizontal (no compite con el scroll)
            if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

            this.dispatchEvent(new CustomEvent('deslizar', {
                detail: { direccion: dx < 0 ? 'siguiente' : 'anterior' },
                bubbles: true,
                composed: true
            }));
        }, { passive: true });

        this.addEventListener('touchcancel', () => {
            x0 = null;
        }, { passive: true });
    }

    alternar() {
        this.abierto = !this.abierto;
        this.toggleAttribute('abierto', this.abierto);

        const portada = this.shadowRoot.querySelector('.portada');
        const btnCerrar = this.shadowRoot.querySelector('.btn-cerrar');
btnCerrar.hidden = !this.abierto;
        portada.setAttribute('aria-expanded', String(this.abierto));
        portada.setAttribute('aria-label', this.abierto ? 'Cerrar el expediente' : 'Abrir el expediente');
        // La portada queda fuera de pantalla: que no siga en el orden de tabulación
        portada.inert = this.abierto;

        this.moverFoco();

        this.dispatchEvent(new CustomEvent('cambio-estado', {
            detail: { abierto: this.abierto },
            bubbles: true,
            composed: true
        }));
    }

    /* El foco no debe perderse en <body> al cambiar el estado del dossier */
    moverFoco() {
        if (!this.abierto) {
            this.shadowRoot.querySelector('.portada').focus();
            return;
        }

        const pagina = this.querySelector('expediente-pagina[activa]');
        const sombra = pagina && pagina.shadowRoot;
        if (!sombra) return;

        const candidato = ['btn-ant', 'btn-sig', 'info-pag']
            .map(id => sombra.getElementById(id))
            .find(el => el && !el.classList.contains('oculto'));

        if (candidato) candidato.focus();
    }

}
customElements.define('expediente-carpeta', ExpedienteCarpeta);

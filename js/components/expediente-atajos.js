class ExpedienteAtajos extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._alPulsarTecla = () => this.mostrar();
    }

    static get observedAttributes() {
        return ['estado'];
    }

   connectedCallback() {
    if (!this._inicializado) {
        this._inicializado = true;
        this.render();
    }

    this.pintar();
    this.mostrar();

    document.removeEventListener('keydown', this._alPulsarTecla);
    document.addEventListener('keydown', this._alPulsarTecla);
}

    disconnectedCallback() {
        document.removeEventListener('keydown', this._alPulsarTecla);
    }

    attributeChangedCallback() {
        this.pintar();
        this.mostrar();
    }

    render() {
        this.shadowRoot.innerHTML = `
<style>
    :host {
        position: fixed;
        top: 8px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 60;
        display: block;
        pointer-events: none;
        max-width: 94vw;

    }

    .pista {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4em 1.3em;
        padding: 8px 14px;
        border: 1px dashed rgba(255, 255, 255, 0.14);
        background: rgba(12, 12, 12, 0.55);
        backdrop-filter: blur(3px);
        font-size: clamp(0.56rem, 1.4vw, 0.7rem);
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: #a49b8c;
        opacity: 0;
        transition: opacity 0.9s ease;
    }

    .pista.visible {
        opacity: 0.75;
    }

    kbd {
        font-family: inherit;
        font-size: 0.95em;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-bottom-width: 2px;
        border-radius: 3px;
        padding: 2px 6px;
        background: rgba(255, 255, 255, 0.07);
        color: #ddd5c6;
        letter-spacing: 0.06em;
    }

    .separador {
        color: rgba(164, 155, 140, 0.4);
    }

@media (hover: none) and (pointer: coarse) {
  :host {
    display: none;
  }
}
</style>

        <div class="pista" id="pista" aria-hidden="true"></div>
        `;

        this.pista = this.shadowRoot.getElementById('pista');
    }

    pintar() {
        const pista = this.shadowRoot && this.shadowRoot.getElementById('pista');
        if (!pista) return;

        const cerrado = (this.getAttribute('estado') || 'cerrado') === 'cerrado';

        pista.innerHTML = cerrado
            ? `<span><kbd>Intro</kbd> abrir el expediente</span>`
            : `<span><kbd>←</kbd><kbd>→</kbd> navegar</span>
               <span class="separador">·</span>
               <span><kbd>Esc</kbd> cerrar</span>`;
    }

    /* La información permanece visible permanentemente */
    mostrar() {
        const pista = this.shadowRoot && this.shadowRoot.getElementById('pista');
        if (!pista) return;

        pista.classList.add('visible');
    }
}

customElements.define('expediente-atajos', ExpedienteAtajos);
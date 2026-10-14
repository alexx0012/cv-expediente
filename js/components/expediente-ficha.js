class ExpedienteFicha extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
         if (this._inicializado) return;

  this._inicializado = true;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
<style>
    :host {
        display: block;
        container-type: inline-size;
    }

    .ficha {
        display: grid;
        grid-template-columns: clamp(110px, 28%, 180px) minmax(0, 1fr);
        gap: clamp(12px, 3vw, 26px);
        align-items: start;
    }

    .ficha.sin-foto {
        grid-template-columns: minmax(0, 1fr);
    }

    .zona-foto {
        display: flex;
        flex-direction: column;
    }

    .ficha.sin-foto .zona-foto {
        display: none;
    }

    ::slotted(img) {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 957 / 1120;
        object-fit: cover;
        padding: 6px;
        background: #fff;
        border: 1px solid #2b2b2b;
        box-shadow: 3px 4px 12px rgba(0,0,0,0.35);
        filter: grayscale(0.15) contrast(1.05);
    }

    .leyenda-foto {
        margin-top: 8px;
        text-align: center;
        font-size: clamp(0.5rem, 1.6cqw, 0.62rem);
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #6b6257;
        border-top: 1px dashed #b9ac97;
        padding-top: 5px;
    }

    .zona-datos {
        min-width: 0;
    }

    @container (max-width: 430px) {
        .ficha {
            grid-template-columns: minmax(0, 1fr);
        }

        .zona-foto {
            max-width: 190px;
            margin: 0 auto;
        }
    }
</style>

        <div class="ficha">
            <div class="zona-foto">
                <slot name="foto" id="slot-foto"></slot>
                <span class="leyenda-foto" aria-hidden="true">Registro fotográfico</span>
            </div>
            <div class="zona-datos">
                <slot></slot>
            </div>
        </div>
        `;

        const slotFoto = this.shadowRoot.getElementById('slot-foto');
        slotFoto.addEventListener('slotchange', () => this.actualizarDisposicion());
        this.actualizarDisposicion();
    }

    actualizarDisposicion() {
        const slotFoto = this.shadowRoot.getElementById('slot-foto');
        const sinFoto = slotFoto.assignedNodes({ flatten: true }).length === 0;
        this.shadowRoot.querySelector('.ficha').classList.toggle('sin-foto', sinFoto);
    }
}

customElements.define('expediente-ficha', ExpedienteFicha);

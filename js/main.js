// 1. Importamos los Web Components (módulos ES, sin dependencias externas)
import './components/expediente-carpeta.js';
import './components/expediente-pagina.js';
import './components/expediente-ficha.js';
import './components/expediente-colofon.js';
import './components/expediente-atajos.js';


    const carpeta = document.getElementById('mi-expediente');
    const atajos = document.getElementById('atajos');

   if (!carpeta) {
    throw new Error('No se encontró el elemento #mi-expediente');
}
const paginas = Array.from(
    carpeta.querySelectorAll('expediente-pagina')
);
if (paginas.length === 0) {
    throw new Error('El expediente no contiene ninguna página.');
}

    // Cada hoja sabe cuántas hay en total para informar «DOC. Nº 01 / 04»
    paginas.forEach((pagina) => pagina.setAttribute('total', paginas.length));

    let indiceActual = 0;

    // 2. Función clave para actualizar qué página se ve en pantalla
    function actualizarPaginas() {
        paginas.forEach((pagina, indice) => {
            pagina.toggleAttribute('activa', indice === indiceActual);

            // Configuramos los botones de esa página específica
            pagina.configurarBotones(indiceActual === 0, indiceActual === paginas.length - 1);
        });
    }

    // Devuelve el id del botón del pie que tenía el foco ('btn-ant' | 'btn-sig')
    function idFocoInterno() {
        const host = document.activeElement;
        const interno = host && host.shadowRoot ? host.shadowRoot.activeElement : null;
        return interno ? interno.id : null;
    }

    // El foco viaja con el usuario entre hojas: si estaba en un botón, vuelve a ese
    // mismo botón en la hoja recién activada (si no existe, en su simétrico).
    function restaurarFoco(idFoco) {
        if (idFoco !== 'btn-ant' && idFoco !== 'btn-sig') return;

        const sombra = paginas[indiceActual].shadowRoot;

if (!sombra) return;

const preferido = sombra.getElementById(idFoco);
const alterno = sombra.getElementById(
    idFoco === 'btn-sig' ? 'btn-ant' : 'btn-sig'
);

        const destino = [preferido, alterno].find(el => el && !el.classList.contains('oculto'))
            || sombra.getElementById('info-pag');

        if (destino) destino.focus();
    }

    // 3. Movimiento de hojas: punto único de entrada para teclado, botones y gestos
    function irA(nuevoIndice) {
       if (
    nuevoIndice < 0 ||
    nuevoIndice >= paginas.length ||
    nuevoIndice === indiceActual
) {
    return;
}
        const idFoco = idFocoInterno();
        indiceActual = nuevoIndice;
        actualizarPaginas();
        restaurarFoco(idFoco);
    }

    function navegar(direccion) {
        irA(direccion === 'siguiente' ? indiceActual + 1 : indiceActual - 1);
    }

    // Inicializamos el estado al cargar la web (Activa la página 1)
        actualizarPaginas();
    

    // 4. El aviso superior refleja el estado del expediente
    carpeta.addEventListener('cambio-estado', (evento) => {
        if (atajos) atajos.setAttribute('estado', evento.detail.abierto ? 'abierto' : 'cerrado');
    });

    // Deslizar en táctil
    carpeta.addEventListener('deslizar', (evento) => {
        if (carpeta.abierto) navegar(evento.detail.direccion);
    });

    // Botones del pie: anterior/siguiente
    carpeta.addEventListener('cambiar-pagina', (evento) => {
        if (carpeta.abierto) {
            navegar(evento.detail.direccion);
        }
    });

    // 5. Navegación con teclado
    document.addEventListener('keydown', (evento) => {
        if (evento.altKey || evento.ctrlKey || evento.metaKey) return;

        switch (evento.key) {
            case 'ArrowRight':
                if (carpeta.abierto) navegar('siguiente');
                break;

            case 'ArrowLeft':
                if (carpeta.abierto) navegar('anterior');
                break;

            // Escape cierra el expediente y regresa a la portada
            case 'Escape':
                if (carpeta.abierto) carpeta.alternar();
                break;

            // Intro/Espacio abren el expediente aunque el foco no esté en la portada
            case 'Enter':
            case ' ':
                if (!carpeta.abierto && (evento.target === document.body || evento.target === document.documentElement)) {
                    evento.preventDefault();
                    carpeta.alternar();
                }
                break;
        }
    });

    // 6. Huevo de Pascua en la consola para los reclutadores técnicos
        console.log(
    "%c [SISTEMA DE EVIDENCIAS POLICIALES] %c\n\n" +
    " ACCESO NO AUTORIZADO... Es broma, puedes pasar.\n\n" +
    " Has encontrado el expediente secreto de Alejandro Mato Gómez.\n" +
    " Nivel de peligrosidad: junior con muchas ganas de aprender.\n" +
    " Advertencia: puede hacer preguntas, cometer errores y aprender de ellos.\n\n" +
    " ¿Procedemos a su contratación?\n\n" +
    " alexx0012003@gmail.com",
    "color: #900; font-weight: bold; font-size: 1.2rem;",
    "color: #aaa; font-size: 1rem;"
);
    

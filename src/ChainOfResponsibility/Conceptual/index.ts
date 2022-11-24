/**
 * EN: Chain of Responsibility Design Pattern
 *
 * Intent: Lets you pass requests along a chain of Manejadors. Upon receiving a
 * request, each Manejador decides either to process the request or to pass it to
 * the next Manejador in the chain.
 */

/**
 * EN: The Manejador interface declares a method for building the chain of
 * Manejadors. It also declares a method for executing a request.
 */
interface Manejador {
    setSiguiente(Manejador: Manejador): Manejador;

    manejar(request: string): string;
}

/**
 * EN: The default chaining behavior can be implemented inside a base Manejador
 * class.
 */
abstract class ManejadorAbstracto implements Manejador
{
    private siguienteManejador: Manejador;

    public setSiguiente(Manejador: Manejador): Manejador {
        this.siguienteManejador = Manejador;
        // EN: Returning a Manejador from here will let us link Manejadors in a
        // convenient way like this:
        // Mono.setSiguiente(Ardilla).setSiguiente(Perro);
        return Manejador;
    }

    public manejar(request: string): string {
        if (this.siguienteManejador) {
            return this.siguienteManejador.manejar(request);
        }
        return null;
    }
}

/**
 * EN: All Concrete Manejadors either manejar a request or pass it to the next
 * Manejador in the chain.
 */
class MonoManejador extends ManejadorAbstracto {
    public manejar(request: string): string {
        if (request === 'Platano') {
            return `Mono: Comeré el ${request}.`;
        }
        return super.manejar(request);
    }
}

class ArdillaManejador extends ManejadorAbstracto {
    public manejar(request: string): string {
        if (request === 'Nuez') {
            return `Ardilla: Comeré la ${request}.`;
        }
        return super.manejar(request);
    }
}

class PerroManejador extends ManejadorAbstracto {
    public manejar(request: string): string {
        if (request === 'Albondiga') {
            return `Perro: Comeré la ${request}.`;
        }
        return super.manejar(request);
    }
}

/**
 * EN: The client code is usually suited to work with a single Manejador. In most
 * cases, it is not even aware that the Manejador is part of a chain.
 */
function codigoCliente(Manejador: Manejador) {
    const comidas = ['Nuez', 'Platano', 'Taza de café'];

    for (const comida of comidas) {
        console.log(`Cliente: ¿Quién quiere ${comida}?`);

        const resultado = Manejador.manejar(comida);
        if (resultado) {
            console.log(`  ${resultado}`);
        } else {
            console.log(`  ${comida} no fue ingerido.`);
        }
    }
}

/**
 * EN: The other part of the client code constructs the actual chain.
 *
 * RU: Другая часть клиентского кода создает саму цепочку.
 */
const Mono = new MonoManejador();
const Ardilla = new ArdillaManejador();
const Perro = new PerroManejador();

Mono.setSiguiente(Ardilla).setSiguiente(Perro);

/**
 * EN: The client should be able to send a request to any Manejador, not just the
 * first one in the chain.
 */
console.log('Chain: Mono > Ardilla > Perro\n');
codigoCliente(Mono);
console.log('');

console.log('Subchain: Ardilla > Perro\n');
codigoCliente(Ardilla);

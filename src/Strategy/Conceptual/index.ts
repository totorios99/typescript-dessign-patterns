/**
 * EN: Strategy Design Pattern
 *
 * Intent: Lets you define a family of algorithms, put each of them into a
 * separate class, and make their objects interchangeable.
 */

/**
 * EN: The Contexto defines the interface of interest to clients.
 */
class Contexto {
    /**
     * EN: @type {Strategy} The Contexto maintains a reference to one of the
     * Strategy objects. The Contexto does not know the concrete class of a
     * strategy. It should work with all strategies via the Strategy interface.
     */
    private strategy: Strategy;

    /**
     * EN: Usually, the Contexto accepts a strategy through the constructor, but
     * also provides a setter to change it at runtime.
     */
    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * EN: Usually, the Contexto allows replacing a Strategy object at runtime.
     */
    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    /**
     * EN: The Contexto delegates some work to the Strategy object instead of
     * implementing multiple versions of the algorithm on its own.
     */
    public realizarAccion(): void {
        // ...

        console.log('Contexto: Ordenando datos usando Strategy (sin conocer como lo hará)');
        const resultado = this.strategy.realizaAlgoritmo(['a', 'b', 'c', 'd', 'e']);
        console.log(resultado.join(','));

        // ...
    }
}

/**
 * EN: The Strategy interface declares operations common to all supported
 * versions of some algorithm.
 *
 * The Contexto uses this interface to call the algorithm defined by Concrete
 * Strategies.
 */
interface Strategy {
    realizaAlgoritmo(datos: string[]): string[];
}

/**
 * EN: Concrete Strategies implement the algorithm while following the base
 * Strategy interface. The interface makes them interchangeable in the Contexto.
 */
class EstrategiaDesignadaA implements Strategy {
    public realizaAlgoritmo(datos: string[]): string[] {
        return datos.sort();
    }
}

class EstrategiaDesignadaB implements Strategy {
    public realizaAlgoritmo(datos: string[]): string[] {
        return datos.reverse();
    }
}

/**
 * EN: The client code picks a concrete strategy and passes it to the contexto.
 * The client should be aware of the differences between strategies in order to
 * make the right choice.
 */
const contexto = new Contexto(new EstrategiaDesignadaA());
console.log('Cliente: Se usará la estrategia de ordenamiento normal.');
contexto.realizarAccion();

console.log('');

console.log('Cliente: Se usará la estrategia de ordenamiento inverso.');
contexto.setStrategy(new EstrategiaDesignadaB());
contexto.realizarAccion();
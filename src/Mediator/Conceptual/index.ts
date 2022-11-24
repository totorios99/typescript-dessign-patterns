/**
 * EN: Mediador Design Pattern
 *
 * Intent: Lets you reduce chaotic dependencies between objects. The pattern
 * restricts direct communications between the objects and forces them to
 * collaborate only via a Mediador object.
 */

/**
 * EN: The Mediador interface declares a method used by components to notificar the
 * Mediador about various eventos. The Mediador may react to these eventos and
 * pass the execution to other components.
 */
interface Mediador {
    notificar(remitente: object, evento: string): void;
}

/**
 * EN: Concrete Mediadors implement cooperative behavior by coordinating several
 * components.
 */
class MediadorDesignado implements Mediador {
    private componente1: componente1;

    private componente2: componente2;

    constructor(c1: componente1, c2: componente2) {
        this.componente1 = c1;
        this.componente1.setMediador(this);
        this.componente2 = c2;
        this.componente2.setMediador(this);
    }

    public notificar(remitente: object, evento: string): void {
        if (evento === 'A') {
            console.log('Mediador toma acción en A y genera las siguientes operaciones:');
            this.componente2.realizaC();
        }

        if (evento === 'D') {
            console.log('Mediador toma acción en D y genera las siguientes operaciones:');
            this.componente1.realizaB();
            this.componente2.realizaC();
        }
    }
}

/**
 * EN: The Base Component provides the basic functionality of storing a
 * Mediador's instance inside component objects.
 */
class ComponenteBase {
    protected Mediador: Mediador;

    constructor(Mediador?: Mediador) {
        this.Mediador = Mediador!;
    }

    public setMediador(Mediador: Mediador): void {
        this.Mediador = Mediador;
    }
}

/**
 * EN: Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete Mediador classes.
 */
class componente1 extends ComponenteBase {
    public realizaA(): void {
        console.log('Componente 1 realiza A.');
        this.Mediador.notificar(this, 'A');
    }

    public realizaB(): void {
        console.log('Componente 1 realiza B.');
        this.Mediador.notificar(this, 'B');
    }
}

class componente2 extends ComponenteBase {
    public realizaC(): void {
        console.log('Componente 2 realiza C.');
        this.Mediador.notificar(this, 'C');
    }

    public realizaD(): void {
        console.log('Componente 2 realiza D.');
        this.Mediador.notificar(this, 'D');
    }
}

/**
 * EN: The client code.
 */
const c1 = new componente1();
const c2 = new componente2();
const Mediador = new MediadorDesignado(c1, c2);

console.log('El cliente realiza la operación A.');
c1.realizaA();

console.log('');
console.log('El cliente realiza la operación D.');
c2.realizaD();
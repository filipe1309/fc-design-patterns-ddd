import Command from "../../application/command/Command";
import Observer from "./Observer";

export default class Publisher {
    observers: Observer[];

    constructor () {
        this.observers = []; // subscribers
    }

    register(observer: Observer) {
        this.observers.push(observer);
    }

    publish(command: Command) {
        // TODO: Use a queue to send commands to the subscribers
        this.observers.forEach(observer => observer.operation === command.operation && observer.notify(command));
    }
}

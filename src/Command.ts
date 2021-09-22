export default interface Command {
    operation: string | undefined;
    execute(): void;
}

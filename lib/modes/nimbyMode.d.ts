export default abstract class NimbyMode {
    name: string;
    init(): Promise<void>;
    close(): Promise<void>;
}

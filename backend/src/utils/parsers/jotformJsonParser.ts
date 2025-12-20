export class JotformJsonParser {
    static async parse(rawPayload: string): Promise<any> {
        return JSON.parse(rawPayload);
    }
}
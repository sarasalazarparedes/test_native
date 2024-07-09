declare module 'finnhub' {
    export namespace finnHub {
      export class DefaultApi {
        apiKey: string;
        stockCandles(
          symbol: string,
          resolution: string,
          from: number,
          to: number,
          limit?: number
        ): Promise<{
          c: number[];
          h: number[];
          l: number[];
          o: number[];
          s: string;
          t: number[];
          v: number[];
        }>;
      }
    }
    const DefaultApi: typeof finnHub.DefaultApi;
    export default DefaultApi;
  }
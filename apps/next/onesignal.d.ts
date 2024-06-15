// onesignal.d.ts
interface Window {
    OneSignal?: IOneSignal;
}

interface IOneSignal {
    push: (callback: () => void) => void;
    // Define other methods you use here
}

declare var OneSignal: IOneSignal | undefined;

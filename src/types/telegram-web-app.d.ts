interface TelegramWebAppUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
  }
  
  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user?: TelegramWebAppUser;
    };
    MainButton: {
      setText(text: string): void;
      show(): void;
      hide(): void;
    };
    on(event: 'scanQrCode' | 'popupClosed', listener: (result: string) => void): this;
    on(event: 'scanQrCodeError', listener: (error: Error) => void): this;
    showScanQrPopup(): Promise<void>;
    ready(): void;
  }
  
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
  
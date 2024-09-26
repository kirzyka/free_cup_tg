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
    onEvent(event: 'scanQrCode' | 'popupClosed' | 'scanQrCodeError', listener: (result: string) => void): this;
    showScanQrPopup(): Promise<void>;
    ready(): void;
  }
  
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
  
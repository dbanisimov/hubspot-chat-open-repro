import React, { useCallback, useEffect, useMemo, useState } from "react";

type HubspotContextType = {
  onPathChanged: (path: string) => void;
  openChat: () => void;
  chatReady: boolean;
};

const HubspotContext = React.createContext<HubspotContextType>({
  onPathChanged: () => {},
  openChat: () => {},
  chatReady: false,
});

type Hsq = Array<["trackPageView"] | ["setPath", string]>;

declare global {
  interface Window {
    _hsq?: Hsq;
    hsConversationsOnReady?: (() => void)[];
    HubSpotConversations?: {
      widget: {
        open: () => void;
        load: () => void;
        refresh: () => void;
        status: () => {
          loaded: boolean;
        };
      };
    };
  }
}

const HubspotProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatReady, setChatReady] = useState(false);

  useEffect(() => {
    const hubId = process.env.REACT_APP_HUBSPOT_HUB_ID;
    window._hsq = window._hsq || [];
    window.hsConversationsOnReady = [
      () => {
        setChatReady(true);
      },
    ];
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "hs-script-loader";
    script.src = `https://js.hs-scripts.com/${hubId}.js`;
    document.body.appendChild(script);
  }, []);

  const appendHsqPath = useCallback((path: string) => {
    window._hsq?.push(["setPath", path]);
    window._hsq?.push(["trackPageView"]);
  }, []);

  const value = useMemo(
    () => ({
      onPathChanged: (path: string) => {
        appendHsqPath(path);

        const chatWidget = window.HubSpotConversations?.widget;
        if (chatWidget) {
          if (chatWidget.status().loaded) {
            // Refresh forces chat widget to reread the path and reinitialize
            // with the right chatflow, or unload if no chatflows exist for that path
            console.log('chatWidget.refresh')
            chatWidget.refresh();
          } else {
            // Once unloaded, chat widgets needs to be reloaded on path change
            // It's safe to call load multiple times
            console.log('chatWidget.load')
            chatWidget.load();
          }
        }
      },
      openChat: () => {
        const chatWidget = window.HubSpotConversations?.widget;

        if (chatWidget?.status().loaded) {
          console.log('chatWidget.open')
          chatWidget.open();
        } else {
          console.error(
            `Failed to open Hubspot Chat: widget is not initialized on this page`
          );
        }
      },
      chatReady,
    }),
    [chatReady, appendHsqPath]
  );

  return (
    <HubspotContext.Provider value={value}>{children}</HubspotContext.Provider>
  );
};

export { HubspotProvider };
export default HubspotContext;

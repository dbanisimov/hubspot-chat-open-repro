import React, { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import HubspotContext from "./HubspotContext";

const PageTracker = () => {
  const hubspot = useContext(HubspotContext);
  const { pathname } = useLocation();
  const prevPathname = useRef<typeof pathname | null>(null);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      try {
        hubspot?.onPathChanged(pathname);
      } catch (err) {
        console.error(`Failed to track path change: ${err}`);
      }
      prevPathname.current = pathname;
    }
  }, [pathname, hubspot]);

  return <></>;
};

export default PageTracker;

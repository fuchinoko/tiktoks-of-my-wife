import React, { useEffect, useRef, useState } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

interface TikTokEmbedProps {
  url: string;
  currentPage: number;
  totalPages: number;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
}

interface EmbeddedPlayerMessage<T> {
  "x-tiktok-player": boolean;
  value?: T;
  type: string;
}

const sendMessageToIframe = <T,>(
  iframe: HTMLIFrameElement,
  message: EmbeddedPlayerMessage<T>
) => {
  if (iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, "*");
  } else {
    console.warn("iframe contentWindow not available");
  }
};

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({
  url,
  currentPage,
  handlePreviousClick,
  handleNextClick,
  totalPages,
}) => {
  const isMobile = useIsMobile();
  const videoId = extractVideoId(url);
  const embedUrl = `https://www.tiktok.com/player/v1/${videoId}?autoplay=1&loop=1&rel=0&music_info=1`;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.addEventListener("load", () => {
        setTimeout(() => {
          sendMessageToIframe(iframeRef.current!, {
            "x-tiktok-player": true,
            type: "unMute",
          });
        }, 500);
      });
    }
  }, []);
  const link = (
    <a className="link" href={url}>
      link
    </a>
  );
  return (
    <div className="container">
      <button
        className="big_button"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        prev
      </button>
      <div className="tiktok-embed">
        <iframe
          allow="autoplay"
          ref={iframeRef}
          style={{
            height: "calc(100vh - 160px)",
            width: "calc((100vh - 160px)/16*9)",
          }}
          src={embedUrl}
          allowFullScreen
          title="TikTok Video"
        />
        {!isMobile && link}
      </div>
      {isMobile && link}

      <button
        className="big_button"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        next
      </button>
    </div>
  );
};

const extractVideoId = (url: string): string => {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : "";
};

export default TikTokEmbed;

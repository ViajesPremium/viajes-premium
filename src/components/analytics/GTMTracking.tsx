import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function GTMTracking() {
  if (!gtmId) return null;

  return (
    <>
      <Script id="gtm-datalayer-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
        `}
      </Script>
      <Script
        id="gtm-loader"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        strategy="afterInteractive"
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}


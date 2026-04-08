import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="YesYouPro - AI product analyzer for Indian ecommerce sellers. Get viral hooks, keywords, competitor analysis and 13 premium tools. Free to try!" />
        <meta name="keywords" content="product analyzer, ecommerce india, meesho seller, amazon seller, dropshipping india, AI tool" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta property="og:title" content="YesYouPro - AI Product Analyzer" />
        <meta property="og:description" content="Analyze any product in 30 seconds. Used by Indian ecommerce sellers." />
        <meta property="og:url" content="https://yesyoupro.com" />
        <meta name="robots" content="index, follow" />

        {/* Google Analytics G-KHCWZ13QJE */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KHCWZ13QJE"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KHCWZ13QJE', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

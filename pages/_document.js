import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="XPRZFwqVWZmTYy5vV69P2EsL_1KeNBkWYk_KoEKR9O4" />
        <meta name="description" content="YesYouPro - India ka #1 AI Product Analyzer. 30 second mein winning product dhundo. 1 Lac+ Indian sellers use karte hain. Amazon, Meesho, Flipkart ke liye free tool." />
        <meta name="keywords" content="yesyoupro, ai product analyzer india, meesho product analyzer, amazon seller tool, ecommerce tool india, product research india, winning product finder, flipkart seller tool" />
        <meta property="og:title" content="YesYouPro - AI Product Analyzer for Indian Sellers" />
        <meta property="og:description" content="30 second mein winning product dhundo. Free tool for Amazon, Meesho, Flipkart sellers." />
        <meta property="og:url" content="https://yesyoupro.com" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KHCWZ13QJE"/>
        <script dangerouslySetInnerHTML={{__html:`
          window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());
          gtag('config','G-KHCWZ13QJE');
        `}}/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import Head from "next/head";
import { memo } from "react";
import { dappHostname, defaultMetaTags } from "../../../config/constants";

export interface MetaHeadProps {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
  metaUrl?: string;
}

export const MetaHead = memo(
  ({ metaTitle, metaDescription, metaImage, metaUrl }: MetaHeadProps) => {
    return (
      <Head>
        <title key="titleTag">
          {"Nexus dApp | " + metaTitle || defaultMetaTags.title}
        </title>
        <link rel="shortcut icon" type="image/x-icon" href="/logoNexus.png" />
        <meta
          key="description"
          name="description"
          content={metaDescription || defaultMetaTags.description}
        />
        <meta key="og:type" property="og:type" content="website" />
        <meta
          key="og:title"
          property="og:title"
          content={metaTitle || defaultMetaTags.title}
        />
        <meta
          key="og:description"
          property="og:description"
          content={metaDescription || defaultMetaTags.description}
        />
        <meta
          key="og:image"
          property="og:image"
          content={metaImage || defaultMetaTags.image}
        />
        <meta
          key="og:url"
          property="og:url"
          content={metaUrl || dappHostname}
        />
        <meta
          key="twitter:card"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          key="twitter:title"
          name="twitter:title"
          content={metaTitle || defaultMetaTags.title}
        />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={metaDescription || defaultMetaTags.description}
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content={metaImage || defaultMetaTags.image}
        />
        <meta
          key="twitter:url"
          name="twitter:url"
          content={metaUrl || dappHostname}
        />
      </Head>
    );
  }
);

MetaHead.displayName = "MetaHead";

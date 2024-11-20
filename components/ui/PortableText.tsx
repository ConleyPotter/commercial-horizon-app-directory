import { Button } from "@/components/ui/Button";
import { PortableText, PortableTextComponents, PortableTextProps } from "@portabletext/react";
import Link from "next/link";
// import { IdealImage } from "./ImageWrapper";
// import { SanityAssetSourceData } from "@/sanity.types";
import { TypedObject } from "sanity";

interface CallToActionProps {
  value: {
    ctaCopy: string;
    link: string;
  };
  isInline: boolean;
}

// interface ImageProps {
//   value: {
//     url: string;
//     source: SanityAssetSourceData;
//     altText: string;
//   };
// }

const customPortableTextComponents = {
  types: {
        // image: ({ value }: ImageProps) => (
    //   <IdealImage src={value.url} alt={value.altText} image={{
    //     url: value.url,
    //     source: value.source,
    //     altText: value.altText,
    //   }} />
    // ),
    callToAction: ({ value, isInline }: CallToActionProps) => 
      isInline ? (
        <a href={value.link} className="text-primary underline-offset-4 hover:underline">{value.ctaCopy}</a>
      ) : (
        <Button asChild variant="default">
          <Link href={value.link}>{value.ctaCopy}</Link>
        </Button>
      ),
  },
  marks: {
    link: ({ value, children }: { value: { href: string }, children: React.ReactNode }) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined;
      return (
        <a href={value.href} target="_blank" rel={rel} className="text-primary underline-offset-4 hover:underline">
          {children}
        </a>
      )
    },
  },
}

interface CustomPortableTextProps {
  value: TypedObject | TypedObject[];
}

export const CustomPortableText = (props: CustomPortableTextProps) => {
  return <PortableText value={props.value} components={customPortableTextComponents as PortableTextComponents} />
}
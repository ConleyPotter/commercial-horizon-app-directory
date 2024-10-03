import { Button } from "@/components/ui/Button";
import { PortableText, PortableTextComponents, PortableTextProps } from "@portabletext/react";
import Link from "next/link";
import { IdealImage } from "./ImageWrapper";
import { SanityAssetSourceData } from "@/sanity.types";
import { TypedObject } from "sanity";

interface CallToActionProps {
  value: {
    ctaCopy: string;
    link: string;
  };
}

interface ImageProps {
  value: {
    url: string;
    source: SanityAssetSourceData;
    altText: string;
  };
}

const customPortableTextComponents = {
  types: {
    callToAction: ({ value }: CallToActionProps) => (
      <Button asChild variant="default">
        <Link href={value.link}>{value.ctaCopy}</Link>
      </Button>
    ),
    // image: ({ value }: ImageProps) => (
    //   <IdealImage src={value.url} alt={value.altText} image={{
    //     url: value.url,
    //     source: value.source,
    //     altText: value.altText,
    //   }} />
    // ),
  },
}

interface CustomPortableTextProps {
  value: TypedObject | TypedObject[];
}

export const CustomPortableText = (props: CustomPortableTextProps) => {
  return <PortableText value={props.value} components={customPortableTextComponents as PortableTextComponents} />
}
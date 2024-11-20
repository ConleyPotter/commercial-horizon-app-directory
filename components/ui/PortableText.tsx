import { Button } from "@/components/ui/Button";
import { PortableText, PortableTextComponents, PortableTextProps } from "@portabletext/react";
import Link from "next/link";
import { TypedObject } from "sanity";

/**
 * Props for the CallToAction component.
 * 
 * @property {Object} value - The value object containing the call to action details.
 * @property {string} value.ctaCopy - The copy text for the call to action.
 * @property {string} value.link - The URL link for the call to action.
 * @property {boolean} isInline - Determines if the call to action should be displayed inline.
 */
interface CallToActionProps {
  value: {
    ctaCopy: string;
    link: string;
  };
  isInline: boolean;
}

/**
 * Custom components for rendering Portable Text content.
 * 
 * @constant
 * @type {Object}
 * @property {Object} types - Custom components for specific block types.
 * @property {Function} types.cta - Renders a call-to-action (CTA) component.
 * @property {Object} marks - Custom components for inline marks.
 * @property {Function} marks.link - Renders a link component.
 * 
 * @example
 * // Example usage of the customPortableTextComponents
 * <PortableText
 *   value={content}
 *   components={customPortableTextComponents}
 * />
 * 
 * @typedef {Object} CallToActionProps
 * @property {Object} value - The value object containing CTA details.
 * @property {string} value.link - The URL for the CTA link.
 * @property {string} value.ctaCopy - The text to display for the CTA.
 * @property {boolean} isInline - Indicates if the CTA should be rendered inline.
 * 
 * @typedef {Object} LinkProps
 * @property {Object} value - The value object containing link details.
 * @property {string} value.href - The URL for the link.
 * @property {React.ReactNode} children - The content to be wrapped by the link.
 */
const customPortableTextComponents = {
  types: {
    cta: ({ value, isInline }: CallToActionProps) => 
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

/**
 * Props for the CustomPortableText component.
 *
 * @interface CustomPortableTextProps
 * @property {TypedObject | TypedObject[]} value - The value to be rendered by the PortableText component. 
 * This can be a single TypedObject or an array of TypedObjects.
 */
interface CustomPortableTextProps {
  value: TypedObject | TypedObject[];
}

/**
 * CustomPortableText component renders a PortableText component with custom components.
 *
 * @param {CustomPortableTextProps} props - The properties for the CustomPortableText component.
 * @param {any} props.value - The value to be rendered by the PortableText component.
 * @returns {JSX.Element} The rendered PortableText component with custom components.
 */
export const CustomPortableText = (props: CustomPortableTextProps) => {
  return <PortableText value={props.value} components={customPortableTextComponents as PortableTextComponents} />
}
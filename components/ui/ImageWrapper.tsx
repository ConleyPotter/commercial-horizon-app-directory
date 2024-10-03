import Image from "next/image";
import { getImageDimensions } from "@sanity/asset-utils";
import urlFor from "@/sanity/lib/urlFor";
import { ImageQueryResult } from "@/lib/types";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const fitVariants = cva(
	'image',
	{
		variants: {
			fit: {
				default: 'w-min',
				fill: 'w-full'
			},
		},
		defaultVariants: {
			fit: 'default',
		},
	}
)

interface IdealImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, 
	VariantProps<typeof fitVariants> {
	image: ImageQueryResult;
	className?: string;
	width?: number;
	height?: number;
	fit?: 'default' | 'fill';
}

export const IdealImage: React.FC<IdealImageProps> = ({ className, width, height, fit, image: { url, altText } }) => {
	return (
		<Image
			src={url!}
			width={width || getImageDimensions(url!).width}
			height={height || getImageDimensions(url!).height}
			className={cn(fitVariants({ fit, className }))}
			sizes="(max-width: 800px) 100vw, 800px"
			placeholder="blur"
			blurDataURL={urlFor(url!).width(24).height(24).blur(10).url()}
			alt={altText || ""}
		/>
	)
}

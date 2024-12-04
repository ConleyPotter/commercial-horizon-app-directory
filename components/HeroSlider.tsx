'use client';
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/Card"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/Carousel"

import { v4 as uuid } from 'uuid';
import { CtaGroup } from "./CtaGroup";
import { SanityAssetSourceData } from "@/sanity.types";
import urlFor from "@/sanity/lib/urlFor";

interface HeroSliderProps {
	cards: {
		image: {
			url: string | null;
			source: SanityAssetSourceData | null;
		};
		heading: string | null;
		subheading: string | null;
		ctaGroup: {
			ctaCopy: string | null;
			link: string | null;
			icon: string | null;
		}[] | null
	}[]
}

/**
 * HeroSlider component renders a carousel slider with autoplay functionality.
 * Each slide contains an image, heading, subheading, and optional call-to-action buttons.
 *
 * @component
 * @param {HeroSliderProps} props - The properties for the HeroSlider component.
 * @param {Array} props.cards - An array of card objects to be displayed in the slider.
 * @param {Object} props.cards[].image - The image object for the card.
 * @param {string} props.cards[].image.url - The URL of the image.
 * @param {string} props.cards[].heading - The heading text for the card.
 * @param {string} props.cards[].subheading - The subheading text for the card.
 * @param {Array} [props.cards[].ctaGroup] - An optional array of call-to-action buttons for the card.
 *
 * @returns {JSX.Element} The rendered HeroSlider component.
 */
export const HeroSlider: React.FC<HeroSliderProps> = ({ cards }) => {
	const plugin = React.useRef(
		Autoplay({ delay: 4000, stopOnInteraction: true, })
	);

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full relative"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
			opts={{
				loop: true,
			}}
		>
			<CarouselContent>
				{cards.map(({ image, heading, subheading, ctaGroup }) => (
					<CarouselItem 
						key={uuid()}
						className="w-full bg-cover bg-center flex items-center justify-center"
						style={{
							backgroundImage: `url(${urlFor(image.url)})`,
							width: 'auto',
							height: 720,
						}}
					>
						<div className="p-1 gap-8 flex flex-col">
							<Card className="max-w-fit min-h-16 bg-white bg-opacity-75 rounded-none">
								<CardContent className="flex items-center justify-center py-6 px-6">
								<div className="p-4 flex-col justify-center items-center gap-2.5 inline-flex">
									<h1 className="text-center text-black text-4xl">
										{heading}
									</h1>
									<h2 className="text-center text-black text-2xl font-normal font-['Roboto'] leading-loose">{subheading}</h2>
								</div>
								</CardContent>
							</Card>
							<div className="flex gap-4 justify-center items-center">
								{ctaGroup && ctaGroup?.length > 0 && (
									<CtaGroup ctaGroup={ctaGroup} />
								)}
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="absolute left-4" />
			<CarouselNext className="absolute right-4" />
		</Carousel>
	)
}

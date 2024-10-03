import React from 'react';
import { Button } from './ui/Button';
import UtilityIcon from './ui/UtilityIcon';
import { IdealImage } from './ui/ImageWrapper';
import { MenuItemQueryResult } from '@/sanity.types';
import { ImageQueryResult } from '@/lib/types';

interface UtilityCtaBarProps {
	gsa: {
		image: ImageQueryResult | null;
		name: string | null;
		slug: string | null;
	};
	utilityIcons?: MenuItemQueryResult[];
}

const UtilityCTABar: React.FC<UtilityCtaBarProps> = ({ gsa, utilityIcons }) => {
	return (
		<section className="flex flex-wrap gap-10 justify-between items-center px-40 bg-neutral-200 max-md:px-5">
			<div className="flex gap-4 items-center self-stretch my-auto text-lg font-semibold uppercase min-w-[240px]">
				<Button variant="default">Contact us</Button>
				<Button variant="secondary">Get a Quote</Button>
			</div>
			{gsa?.image && (<IdealImage 
				image={gsa.image} 
				alt={gsa.image.altText ? gsa.image.altText : 
					gsa.name ? gsa.name :
					""
				} 
				className={"object-contain self-stretch my-auto aspect-[4] min-w-[240px] w-[280px]"} 
			/>)}
			<div className="flex gap-4 items-start self-stretch my-auto">
				{/* {utilityIcons.map((icon, index) => (
					<UtilityIcon key={index} src={icon.image!.asset.url} alt={icon.name} />
				))} */}
			</div>
		</section>
	);
};

export default UtilityCTABar;

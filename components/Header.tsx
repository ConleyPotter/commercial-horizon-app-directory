import { navBarQuery, utilityCtaMenuQuery } from '@/sanity/lib/queries';

import Navigation from './Navbar';
import Logo from './Logo';
import UtilityCTABar from './UtilityCTABar';
import { sanityFetch } from '@/sanity/lib/fetch';
import { NavBarQueryResult, UtilityCtaMenuQueryResult } from '@/sanity.types';


export const Header: React.FC = async () => {
	const [navItems, utilityCTAitems]: [
		NavBarQueryResult,
		Exclude<UtilityCtaMenuQueryResult, null>,
	] = await Promise.all([
		sanityFetch({
			query: navBarQuery,
		}),
		sanityFetch({
			query: utilityCtaMenuQuery,
		}),
	]);

	const gsa = utilityCTAitems[0].items ? 
		utilityCTAitems[0].items.filter((item) => item.name === "GSA Contract")[0] : 
		null;

	// const utilityIcons = utilityCTAItems.filter((item: NavItem) => item.type === "image" && item.name != "GSA Contract");

	return (
		<header>
			<div className="flex flex-wrap gap-10 justify-between items-center px-20 py-2.5 text-lg font-semibold text-white uppercase bg-sky-800 max-md:px-5">
				<Logo />
				<Navigation navItems={navItems} />
			</div>
			<UtilityCTABar gsa={gsa!} utilityIcons={undefined}/>
		</header>
	);
}

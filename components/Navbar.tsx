import { NavBarQueryResult } from '@/sanity.types';
import React from 'react';
import { v4 as uuid } from 'uuid';

interface NavigationProps {
	navItems: Exclude<NavBarQueryResult, null>,
}

const Navigation: React.FC<NavigationProps> = ({ navItems }) => {
    const listOfNavItems = navItems[0].items;

	return (
		<nav className="flex overflow-hidden flex-wrap gap-4 items-start self-stretch my-auto min-w-[240px] max-md:max-w-full">
			{listOfNavItems && (listOfNavItems.map((item) => (
				<a
					key={uuid()}
					href={`${item.slug}`}
					className="focus:outline-none focus:ring-2 focus:ring-white"
				>
					{item.name}
				</a>
			)))}
		</nav>
	);
};

export default Navigation;

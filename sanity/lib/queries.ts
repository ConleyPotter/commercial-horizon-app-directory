import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
	_id,
	"status": select(_originalId in path("drafts.**") => "draft", "published"),
	"title": coalesce(title, "Untitled"),
	"slug": slug.current,
	excerpt,
	coverImage,
	"date": coalesce(date, _updatedAt),
	"author": author->{"name": coalesce(name, "Anonymous"), picture},
`;

export const heroQuery = defineQuery(`
	*[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) [0] {
		content,
		${postFields}
	}
`);

export const moreStoriesQuery = defineQuery(`
	*[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
		${postFields}
	}
`);

export const postQuery = defineQuery(`
	*[_type == "post" && slug.current == $slug] [0] {
		content,
		${postFields}
	}
`);

const ctaFields = /* groq */ `
	ctaCopy,
	link,
	icon,
`

const imageFields = /* groq */ `
	url, 
	source,
	altText
`

// const portableTextFields = /* groq */ `
// 	richTextBlock[]{
// 		_type == 'block' => {...},
// 		_type == "cta" => { 
// 			"ctaCopy": @->.ctaCopy,
// 			"link": @->.link,
// 			"icon": @->.icon,
// 		},
// 	}
// `

const columnAndContentBlockFields = /* groq */ `
	title,
	variant,
	heading,
	subheadline,
	"responsiveImage": responsiveImage.asset->{${imageFields}},
	"gallery": gallery[].asset->{${imageFields}},
	richTextBlock,
	"ctaGroup": ctaGroup[]->{
		${ctaFields}
	},
`

const contentBlockFields = /* groq */ `
	${columnAndContentBlockFields}
	twoColumns {
		"columnOne": columnOne[]->{
			${columnAndContentBlockFields}
		},
		"columnTwo": columnTwo[]->{
			${columnAndContentBlockFields}
		},
	},
	"ctaGroup": ctaGroup[]->{
		${ctaFields}
	}
`


export const pageQuery = defineQuery(`
	*[_type=='page' && slug.current == $slug] [0] {
		"blocks": blocks[]->{
			${contentBlockFields}
		}
	}
`);

export const navBarQuery = defineQuery(`
	*[_type=='menu' && name=='Navbar']{
		'items': items[]->{ 
			name, 
			"slug": slug.current, 
			children[]->{
				name, 
				"slug": slug.current 
			}
		}
	}
`);

export const utilityCtaMenuQuery = defineQuery(`
	*[_type=='menu' && name=='Utility CTA Bar']{
		'items': items[]->{ 
			name, 
			"slug": slug.current,
			"image": image.asset->{${imageFields}},
		}
	}
`);

export const ctaQuery = defineQuery(`
	*[_type=='cta' && slug.current == $slug] [0] {
		${ctaFields}
	}
`)

export const contentBlockQuery = defineQuery(`
	*[_type=='contentBlock' && defined(variant)] [0] {
		${contentBlockFields}
	}
`)

export const menuItemQuery = defineQuery(`
	*[_type=='menuItem'] [0] {
		${ctaFields}	
	}
`)

export const ctaGroupQuery = defineQuery(`
	*[_type=='contentBlock' && defined(ctaGroup)] [0] {
		"ctaGroup": ctaGroup[]->{
			${ctaFields}
		}
	}
`)
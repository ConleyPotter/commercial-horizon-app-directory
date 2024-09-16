import { defineField, defineType } from 'sanity';

export const contentBlockType = defineType({
	name: 'contentBlock',
	title: 'Content Block',
	type: 'document',
	fields: [
		defineField({ name: 'title', type: 'string' }),
		defineField({ 
			name: 'variant', 
			type: 'string', 
			options: { 
				list: [
					'rich text block', 
					'gallery', 
					'columns', 
					'responsive image',
					// 'form',
					'CTA group',
				], 
			},
			validation: (Rule) => Rule.required(),
		}),

		defineField({ 
			title: 'CTA Group',
			name: 'ctaGroup', 
			type: 'array',
			of: [{ 
				type: 'reference',
				to: [{ type: 'cta' }], preview: { select: { title: 'ctaCopy' } },
			}],
			hidden: ({ document }) => document?.variant == 'CTA group',
			validation: (Rule) => Rule.max(3),
		}),
		defineField({ 
			name: 'responsiveImage', 
			type: 'image',
			hidden: ({ document }) => document?.variant !== 'full width image',
		}),
		defineField({
			name: 'gallery', 
			type: 'array', 
			of: [{ type: 'image' }],
			hidden: ({ document }) => document?.variant !== 'gallery',
		}),
		defineField({
			name: 'richTextBlock',
			type: 'array',
			of: [
				{ type: 'block'},
				{ type: 'cta' },
				{ type: 'image' },
			],
			hidden: ({ document }) => document?.variant !== 'rich text block'
		}),
		defineField({
			name: 'twoColumns',
            title: '2 Columns',
			type: 'object',
			fields: [
				defineField({
					name: 'columnOne',
					type: 'array', 
                    of: [{
                        type: "reference",
                        to: [{
                            type: 'contentBlock',
                            preview: {
                                select: {
                                    title: 'title',
                                    variant: 'variant',
                                }
                            }
                        }]
                    }]
				}),
                defineField({
                    name: 'columnTwo',
					type: 'array', 
                    of: [{
                        type: "reference",
                        to: [{
                            type: 'contentBlock',
                            preview: {
                                select: {
                                    title: 'title',
                                    variant: 'variant',
                                }
                            }
                        }]
                    }],
                }),
			],
			hidden: ({ document }) => document?.variant !== 'columns',
		}),
	],
});

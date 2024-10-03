import { HeroSlider } from "./HeroSlider";
import { Columns } from "./Columns";
import { IdealImage } from "./ui/ImageWrapper";
import { CtaGroup } from "./CtaGroup";
import { ContentBlockQueryResult, SanityAssetSourceData } from "@/sanity.types";
import type { ColumnsType } from "@/lib/types";
import { CustomPortableText } from "./ui/PortableText";

interface ContentBlockHandlerProps {
    contentBlock: Exclude<ContentBlockQueryResult, null>
}

export const ContentBlockHandler: React.FC<ContentBlockHandlerProps> = ({ contentBlock }) => {
    type CtaGroup = typeof contentBlock.ctaGroup;
    type ResponsiveImage = typeof contentBlock.responsiveImage;

    let { heading, subheadline, ctaGroup, variant }: {
        heading: string | null,
        subheadline: string | null,
        ctaGroup: CtaGroup;
        variant: string | null;
    } = contentBlock!
    switch (variant) {
        case 'gallery':
            if (contentBlock.gallery) {
                let { gallery }: { 
                    gallery: Array<{
                        url: string | null;
                        source: SanityAssetSourceData | null;
                    } | null> | null;
                } = contentBlock;
                
                return (<HeroSlider cards={gallery.map((image) => ({
                    image: image!,
                    heading: heading,
                    subheading: subheadline,
                    ctaGroup: ctaGroup,
                }))} />)
            }
            break
        case 'columns':
            let { twoColumns }: { twoColumns: ColumnsType | null } = contentBlock!;
            if (twoColumns) {
              return <Columns twoColumns={twoColumns} />  
            } 
            break
        case 'responsive image':
            let { responsiveImage }: { responsiveImage: ResponsiveImage } = contentBlock;
            if (responsiveImage && responsiveImage.url) {
                return <div className="p-0 m-0 w-full"><IdealImage className="w-full" image={responsiveImage} /></div>
            } 
            break
        case 'rich text block':
            const { richTextBlock }: { richTextBlock: Exclude<typeof contentBlock.richTextBlock, undefined>} = contentBlock;
            if(richTextBlock) {
                return <div><CustomPortableText value={richTextBlock!}/></div>
            }
        case 'CTA group':
            return ctaGroup ? <CtaGroup ctaGroup={ctaGroup} /> : null;

    }
}
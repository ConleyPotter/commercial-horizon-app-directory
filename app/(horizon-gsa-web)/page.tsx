import { ContentBlockHandler } from "@/components/ContentBlockHandler";
import { ContentBlockQueryResult, PageQueryResult } from "@/sanity.types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { pageQuery } from "@/sanity/lib/queries";
import { v4 as uuid } from 'uuid';

export default async function HomePage() {
  const cmsData: PageQueryResult = await sanityFetch({
    query: pageQuery,
    params: {
      slug: '/',
    },
  });

  if (cmsData && cmsData.blocks && cmsData.blocks.length > 0) {
    const blocks = cmsData?.blocks?.map((contentBlock: ContentBlockQueryResult) => (
      <ContentBlockHandler contentBlock={contentBlock!} key={uuid()}/>
    ));

    return (
      <>
        {...blocks || null}
      </>
    )
  } else {
    return null;
  }
}
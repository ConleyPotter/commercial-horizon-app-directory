import { ContentBlockQueryResult, SanityAssetSourceData } from "@/sanity.types";

type ColumnType = Array<Omit<ContentBlockQueryResult, 'twoColumns'> | null>;

export type ColumnsType = {
    columnOne: ColumnType | null;
    columnTwo: ColumnType | null;
};

export type ImageQueryResult = {
    url: string | null;
    source: SanityAssetSourceData | null;
    altText: string | null;
};
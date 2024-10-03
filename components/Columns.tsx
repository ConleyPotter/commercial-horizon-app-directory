import { ContentBlockHandler } from "./ContentBlockHandler";
import { v4 as uuid } from 'uuid';
import { ColumnsType } from "@/lib/types";
import { IdealImage } from "./ui/ImageWrapper";

interface ColumnsProps {
    twoColumns: ColumnsType
}

export const Columns: React.FC<ColumnsProps> = ({ twoColumns: { columnOne, columnTwo }}) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex-1 p-4 flex flex-col items-center">
                {columnOne && columnOne.map((block: any) => {
                    if (block.variant == 'responsive image') {
                        return <IdealImage image={block.responsiveImage} fit={'default'} key={uuid()} />
                    } else {
                        <ContentBlockHandler contentBlock={block} key={uuid()} />
                    }
                })}
            </div>
            <div className="flex-1 p-4 flex flex-col items-center">
                {columnTwo && columnTwo.map((block: any) => (
                    <ContentBlockHandler contentBlock={block} key={uuid()} />
                ))}
            </div>
        </div>
    )
}
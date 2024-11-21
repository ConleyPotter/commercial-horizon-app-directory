import { ContentBlockHandler } from "./ContentBlockHandler";
import { v4 as uuid } from 'uuid';
import { ColumnsType } from "@/lib/types";
import { IdealImage } from "./ui/ImageWrapper";

/**
 * Props for the Columns component.
 * 
 * @interface ColumnsProps
 * @property {ColumnsType} twoColumns - Defines the structure and content of the two columns.
 */
interface ColumnsProps {
    twoColumns: ColumnsType
}

/**
 * A React functional component that renders two columns of content blocks.
 *
 * @component
 * @param {ColumnsProps} props - The properties object.
 * @param {Object} props.twoColumns - An object containing two arrays of content blocks.
 * @param {Array<any>} props.twoColumns.columnOne - The first column of content blocks.
 * @param {Array<any>} props.twoColumns.columnTwo - The second column of content blocks.
 *
 * @returns {JSX.Element} A JSX element containing two columns of content blocks.
 */
export const Columns: React.FC<ColumnsProps> = ({ twoColumns: { columnOne, columnTwo }}) => {
    return (
        <div className="flex justify-center items-center">
            <div className="flex-1 p-4 flex flex-col items-center">
                {columnOne && columnOne.map((block: any) => (
                    <ContentBlockHandler contentBlock={block} key={uuid()} />
                ))}
            </div>
            <div className="flex-1 p-4 flex flex-col items-center">
                {columnTwo && columnTwo.map((block: any) => (
                    <ContentBlockHandler contentBlock={block} key={uuid()} />
                ))}
            </div>
        </div>
    )
}
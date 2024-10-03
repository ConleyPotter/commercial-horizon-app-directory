import { Button } from "@/components/ui/Button";
import { CtaQueryResult } from "@/sanity.types";
import { v4 as uuid } from 'uuid';

interface CtaGroupProps {
    ctaGroup: CtaQueryResult[];
}

export const CtaGroup: React.FC<CtaGroupProps> = ({ ctaGroup }) => {
    return (
        <div className="flex justify-center items-center">
            {ctaGroup.map((cta: CtaQueryResult, index: number) => {
                let variant: ('default' | 'secondary' | 'outline') = 
                    index == 0 ? 'default' : 
                    index == 1 ? 'secondary' : 
                    'outline';

                return (
                    <a href={cta!.link || '#'} className="flex-1 p-4" key={uuid()}>
                        <Button variant={variant}>
                            {cta!.ctaCopy}
                        </Button>
                    </a>

                )
            })}
            
        </div>
    )
}
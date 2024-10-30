import { cn } from '@/lib/utils'

interface DottedSepatatorprops {
    className?: string;
    color?: string;
    height?: string;
    dotSize?: string;
    gapSize?: string;
    direction?: "horizontal" | "vertical";
}

export const DottedSepatator = ({
    className,
    color = `#8d8d91`,
    height="2px",
    dotSize="5px",
    gapSize="6px",
    direction="horizontal"
}: DottedSepatatorprops) => {
        const isHorizontal = direction ==="horizontal";

        return(
            <div className={cn(
                isHorizontal ? "w-full flex items-center": "h-full flex flex-col items-center",
                className
            )}>
               <div 
               className={isHorizontal ?"flex-grow" : "flex-grow-0"}
               style={{
                width:isHorizontal? "100%" : height,
                height:isHorizontal ? height : "100%",
                backgroundImage:`radial-gradient(circle, ${color} 25%, tansparent 25%)`,
                backgroundSize: isHorizontal ?
                `${parseInt(dotSize) + parseInt(gapSize)}px ${height}` 
                :
                `${height} ${parseInt(dotSize) + parseInt(gapSize)}px`,
                backgroundRepeat: isHorizontal ? 
                `repeat-x`
                : `repeat-y`,
                backgroundPosition:"center"
               }}
               />
            </div>
        )
}
import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";
import { ScrollArea,ScrollBar } from "./ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";
import { DottedSepatator } from "./dotted-separator";

export const Analytics = ({data}:ProjectAnalyticsResponseType) =>{
    
    if(!data) return null;


    return(
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row ">
                <div className="flex items-center flex-1 ">
                    <AnalyticsCard 
                        title="Total Tasks"
                        value={data?.taskCount}
                        variant={data?.taskDiffrence > 0 ?"up" :"down"}
                        increaseValue={data?.taskDiffrence}
                    />
                <DottedSepatator direction="vertical" />
                </div>
                <div className="flex items-center flex-1 ">
                    <AnalyticsCard 
                        title="Assigned Tasks"
                        value={data?.assignTaskCount}
                        variant={data?.assignTaskDiffrence > 0 ?"up" :"down"}
                        increaseValue={data?.assignTaskDiffrence}
                    />
                <DottedSepatator direction="vertical" />
                </div>
                <div className="flex items-center flex-1 ">
                    <AnalyticsCard 
                        title="Completed Tasks"
                        value={data?.completeTaskCount}
                        variant={data?.completeTaskDiffrence > 0 ?"up" :"down"}
                        increaseValue={data?.completeTaskDiffrence}
                    />
                <DottedSepatator direction="vertical" />
                </div>
                <div className="flex items-center flex-1 ">
                    <AnalyticsCard 
                        title="Overdue Tasks"
                        value={data?.overdueTaskCount}
                        variant={data?.overdueTaskDiffrence > 0 ?"up" :"down"}
                        increaseValue={data?.overdueTaskDiffrence}
                    />
                <DottedSepatator direction="vertical" />
                </div>
                <div className="flex items-center flex-1 ">
                    <AnalyticsCard 
                        title="In-Complete Tasks"
                        value={data?.incompleteTaskCount}
                        variant={data?.incompleteTaskDiffrence > 0 ?"up" :"down"}
                        increaseValue={data?.incompleteTaskDiffrence}
                    />
                </div>
            </div>  
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    )
}
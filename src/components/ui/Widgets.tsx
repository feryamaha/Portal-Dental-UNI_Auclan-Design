import { Icon } from "@/script/Icon";
import type { WidgetsProps } from "@/types/ui/widgets.types";

export function Widgets({ title, date, dayOfWeek, day, month, className }: WidgetsProps) {
    return (
        <div className={`w-full ${className || ''}`}>
            <div className="w-full flex items-center p-[4px_8px] gap-[16px]">
                <div className="w-[40px] h-[40px] flex flex-col items-center justify-center bg-neutral-50 border border-neutral-100 rounded-[10px] shadow-[0_1px_4px_0_rgba(0,0,0,0.08),0_1px_2px_0_rgba(25,25,25,0.08)]">
                    <div className="w-full h-[15px] items-center justify-center flex bg-accent-default rounded-tl-[10px] rounded-tr-[10px] py-[2px]">
                        <span className="text-[8px] text-accent-light font-semibold" >
                            {month}
                        </span>
                    </div>
                    <div className="w-full h-full flex items-center justify-center bg-neutral-50 rounded-bl-[10px] rounded-br-[10px]">
                        <span className="text-sm" >{String(day).padStart(2, '0')}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-[2px]">
                    <p className="text-sm text-neutral-900 font-medium">
                        {title}
                    </p>
                    <div className="flex gap-2 items-center">
                        <p className="text-xs text-neutral-600 font-normal">{date}</p>
                        <Icon name="iconPointText" className="text-neutral-600" />
                        <p className="text-xs text-neutral-600 font-normal">{dayOfWeek}</p>
                    </div>
                </div>
            </div >
        </div >
    );
}
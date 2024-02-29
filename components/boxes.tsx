import { twMerge } from "tailwind-merge"

interface IBoxProps {
    children: React.ReactNode;
    className?: string;
}


export default function Box({ children, className }: IBoxProps) {
    return (
        <div className={twMerge("bg-neutral-900 rounded-lg h-fit w-full", className)}>
            {children}
        </div>
    )
} 
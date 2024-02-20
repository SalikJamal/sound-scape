interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

export default function Box({ children, className }: BoxProps) {
    return (
        <div>
            {children}
        </div>
    )
} 
type Props = {
    children: React.ReactNode;
}

export const GradientText = ({ children }: Props) => {
    return (
        <span style={{
            letterSpacing: '0.5px',
            opacity: 0.5,
            background: "linear-gradient(to right, #0086FA 0%, #00EDFE 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
        }}>
            {children}
        </span>
    );
}
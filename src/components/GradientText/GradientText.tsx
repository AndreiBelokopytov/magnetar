type Props = {
    text: string;
    colors: [number, number, number, number][];
}

const r = 0;
const g = 1;
const b = 2;
const a = 3;

export const GradientText = ({ text, colors }: Props) => {
    const length = text.length;
    const letterPerColor = Math.floor(length / (colors.length - 1));
    const letters = [];

    for(let colorIndex = 0; colorIndex < colors.length - 1; colorIndex++) {
        const color = colors[colorIndex];
        const nextColor = colors[colorIndex + 1];

        for(let letterIndex = 0; letterIndex < letterPerColor; letterIndex++) {
            const rc = color[r] + (nextColor[r] - color[r]) / letterPerColor * letterIndex;
            const gc = color[g] + (nextColor[g] - color[g]) / letterPerColor * letterIndex;
            const bc = color[b] + (nextColor[b] - color[b]) / letterPerColor * letterIndex;
            const ac = color[a] + (nextColor[a] - color[a]) / letterPerColor * letterIndex;

            letters.push((
                <span style={{ color: `rgba(${rc}, ${gc}, ${bc}, ${ac})` }}>
                    {text[colorIndex * letterPerColor + letterIndex]}
                </span>
            ));
        }
    }

    return <>{letters}</>;
}
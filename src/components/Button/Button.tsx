import { Button as GrommetButton, ButtonType } from "grommet";

export const Button = (props: ButtonType) => {
    const style = props.style ? {...props.style} : {};

    if(props.primary) {
        style.boxShadow = "0px 2px 12px rgba(101, 224, 166, 0.3)";
    }

    return (
        <GrommetButton {...props} style={style} />
    );
}
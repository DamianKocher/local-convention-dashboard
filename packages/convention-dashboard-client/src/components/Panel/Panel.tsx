import classes from "./Panel.module.css";
import type {ReactNode} from "react";

type Props = {
    children: ReactNode
}

export const Panel = ({children}: Props) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}
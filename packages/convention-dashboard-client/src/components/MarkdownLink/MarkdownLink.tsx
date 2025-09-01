import type {ReactNode} from "react";
import {Link} from "../Link/Link.tsx";
import classes from "./MarkdownLink.module.css";

type Props = {
    href?: string;
    children: ReactNode
}

export const MarkdownLink = ({href, children}: Props) => {
    if (href === "/amendment/addition") {
        return <span className={classes.addition}>{children}</span>
    }

    if (href === '/amendment/strike') {
        return <span className={classes.strike}>{children}</span>
    }


    return <Link url={href}>{children}</Link>;
}
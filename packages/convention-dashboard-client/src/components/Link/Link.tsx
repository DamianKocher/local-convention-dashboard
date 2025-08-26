import type {ReactNode} from "react";

type Props = {
    url: string | undefined;
    children: ReactNode
}

export const Link = ({url, children}: Props) => {
    return (
        <a href={url} target="_blank">{children}</a>
    )
}
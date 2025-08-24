type Props = {
    url: string
    children: React.ReactNode
}

export const Link = ({url, children}: Props) => {
    return (
        <a href={url} target="_blank">{children}</a>
    )
}
import type {Document} from "convention-dashboard-shared/src";
import {DocumentCard} from "../DocumentCard/DocumentCard.tsx";
import classes from "./DocumentList.module.css";

type Props = {
    documents: Document[];
}

export const DocumentList = ({documents}: Props) => {
    return (
        <div className={classes.container}>
            {documents.map((document) => <DocumentCard key={document.id} document={document}/>)}
        </div>
    )
}
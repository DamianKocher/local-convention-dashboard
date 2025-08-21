import type {Document} from "convention-dashboard-shared/src";
import classes from "./DocumentCard.module.css";
import {useDispatch} from "react-redux";
import {goToDocumentView, preloadDocument} from "../../document/documentSaga.ts";
import {useRef} from "react";

type Props = {
    document: Document
}

export const DocumentCard = ({document}: Props) => {
    const dispatch = useDispatch();
    const preloaded = useRef(false);

    function onClick() {
        dispatch(goToDocumentView(document.id))
    }

    function preload() {
        if (preloaded.current) {
            return;
        }

        preloaded.current = true;
        dispatch(preloadDocument(document.id));
    }

    return (
        <div className={classes.card} onClick={onClick} onPointerEnter={preload}>
            <div className={classes.primarySection}>
                <p className={classes.label}>{document.name}</p>
                <p className={classes.description}>{document.description}</p>
            </div>

            <div className={classes.secondarySection}>
                <p className={classes.secondaryLabel}>Authors</p>
                <p>{document.coauthors.join(', ')}</p>
            </div>

            <div className={classes.secondarySection}>
                <p className={classes.secondaryLabel}>Co-Signers</p>
                <p>{String(document.signatures.count.current)} / {String(document.signatures.count.required)}</p>
            </div>
        </div>
    )
}
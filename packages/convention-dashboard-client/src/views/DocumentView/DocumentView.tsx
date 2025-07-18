import classes from "./DocumentView.module.css";
import {useSelector} from "react-redux";
import {getSelectedDocument} from "../../document/documentSlice.ts";
import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {useMemo} from "react";
import {Button} from "../../components/Button/Button.tsx";
import {signSelectedDocument, unsignSelectedDocument} from "../../document/documentSaga.ts";
import {getShortName} from "../../membership/membershipSlice.ts";
import Markdown from "react-markdown";
import {Footer} from "../../components/Footer/Footer.tsx";
import {DocumentList} from "../../components/DocumentList/DocumentList.tsx";

export const DocumentView = () => {
    const {document, markdown, related} = useSelector(getSelectedDocument);
    const memberShortName = useSelector(getShortName);

    const signaturesIncludingUser = useMemo(() => {
        if (!document) {
            return [];
        }

        const signatures = Array.from(document.signatures.signedBy).map((sig) => ({sig, isUser: false}));

        const signedByUser = document.signatures.signed;
        if (signedByUser && memberShortName) {
            signatures.push({sig: memberShortName, isUser: true});
        }
        signatures.sort((a, b) => a.sig.localeCompare(b.sig))

        return signatures;
    }, [document]);

    if (!document) {
        return;
    }

    return (
        <>
            <AppBar homeButton={true}/>

            <div className={classes.container}>
                <div>
                    <h1>{document.name}</h1>
                    <p>{document.description}</p>
                </div>

                <div>
                    <h2>Authors</h2>
                    <p>{document.coauthors.join(', ')}</p>
                </div>

                <div>
                    <h2>Signatures</h2>

                    <p>{document.signatures.count.current} / {document.signatures.count.required}</p>

                    <ul>
                        {signaturesIncludingUser.map((signature) => <li key={signature.sig}>{signature.sig}</li>)}
                    </ul>

                    {document.signatures.signed ?
                        <Button label="Remove My Signature" disabled={false} onClick={unsignSelectedDocument}/> :
                        <Button label="Add My Signature" disabled={false} onClick={signSelectedDocument}/>}

                </div>

                {related.length > 0 && <div className={classes.section}>
                    <h2>Related</h2>
                    <DocumentList documents={related}/>
                </div>}


                {markdown && <div className={classes.section}>
                    <h2>Document</h2>
                    <div className={classes.content}>
                        <Markdown>{markdown}</Markdown>
                    </div>
                </div>}

            </div>

            <Footer/>
        </>

    )
};
import classes from "./DocumentView.module.css";
import {useSelector} from "react-redux";
import {getSelectedDocument} from "../../document/documentSlice.ts";
import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {useMemo} from "react";
import {Button} from "../../components/Button/Button.tsx";
import {goToDocumentsView, signSelectedDocument, unsignSelectedDocument} from "../../document/documentSaga.ts";
import {getShortName} from "../../membership/membershipSlice.ts";
import Markdown from "react-markdown";
import {Footer} from "../../components/Footer/Footer.tsx";
import {DocumentList} from "../../components/DocumentList/DocumentList.tsx";
import {Link} from "../../components/Link/Link.tsx";

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
    }, [document, memberShortName]);

    if (!document) {
        return;
    }

    return (
        <>
            <AppBar backAction={goToDocumentsView}/>

            <div className={classes.container}>
                <div>
                    <h1>{document.name}</h1>
                    <p>{document.description}</p>
                </div>

                <div className={classes.table}>
                    <div>
                        <h2>Authors</h2>
                        <p>{document.coauthors.join(', ')}</p>
                    </div>

                    <div>
                        <h2>Signatures</h2>

                        <p>{document.signatures.count.current} / {document.signatures.count.required}</p>

                        {!document.frozen && <div>
                            {document.signatures.signed ?
                                <Button label="Remove My Signature" disabled={false}
                                        onClick={unsignSelectedDocument}/> :
                                <Button label="Add My Signature" disabled={false}
                                        onClick={signSelectedDocument}/>
                            }
                        </div>}
                    </div>

                </div>

                {related.length > 0 && <div className={classes.section}>
                    <h2>Related</h2>
                    <DocumentList documents={related}/>
                </div>}

                {markdown && <div className={classes.section}>
                    <div className={classes.content}>
                        <h1 className={classes.contentTitle}>{document.name}</h1>

                        <div>
                            <h2>Authors</h2>
                            <p>{document.coauthors.join(', ')}</p>
                        </div>

                        <div>
                            <h2>Co-Signers</h2>
                            <p>{signaturesIncludingUser.map((signature) => signature.sig).join(', ') || 'None.'}</p>
                        </div>

                        <Markdown components={{
                            a: ({children, href}) => <Link url={href}>{children}</Link>
                        }}>{markdown}</Markdown>
                    </div>
                </div>}

            </div>

            <Footer/>
        </>

    )
};
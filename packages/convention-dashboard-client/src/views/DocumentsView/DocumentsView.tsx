import {DocumentList} from "../../components/DocumentList/DocumentList.tsx";
import {useSelector} from "react-redux";
import {getDocumentsByType} from "../../document/documentSlice.ts";
import classes from "./DocumentsView.module.css";
import {AppBar} from "../../components/AppBar/AppBar.tsx";
import {Footer} from "../../components/Footer/Footer.tsx";

export const DocumentsView = () => {
    const {resolutions, amendments} = useSelector(getDocumentsByType);

    return (
        <>
            <AppBar homeButton={true}/>

            <div className={classes.container}>
                <div>
                    <h1>Resolutions</h1>
                    <DocumentList documents={resolutions}/>
                </div>


                <div>
                    <h1>Amendments</h1>
                    <DocumentList documents={amendments}/>
                </div>
            </div>

            <Footer/>
        </>
    );
}
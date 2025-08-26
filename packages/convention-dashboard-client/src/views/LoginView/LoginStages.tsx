import {Input} from "../../components/Input/Input.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {useAppSelector} from "../../store/store.ts";
import {getLoginState, LoginStage, resetLoginState, setCode, setEmail} from "../../membership/membershipSlice.ts";
import {submitCode, submitEmail} from "../../membership/membershipSaga.ts";
import classes from "./LoginView.module.css";

export const LoginStages = () => {
    const {stage, email, isEmailValid, isCodeValid, error, failedCodeAttempts} = useAppSelector(getLoginState);

    switch (stage) {
        case LoginStage.EMAIL:
            return (
                <>
                    <p>You must be a member in good standing to access the local convention dashboard..</p>

                    <p>To prove you are a member in good standing, please enter your email below.</p>

                    <Input label="Email" onChange={setEmail} type="email" autocomplete="email"/>

                    <Button label="Send Verification Code" disabled={!isEmailValid} onClick={submitEmail}/>
                </>
            );
        case LoginStage.CODE:
            return (
                <>
                    <p>If you are a member in good standing, you will receive an email containing your verification
                        code.
                    </p>

                    <p>If you have not received a verification code, you might not be might a member in good
                        standing. Please reach out to info@stldsa.org to resolve.</p>

                    <p>Email: {email}</p>

                    {failedCodeAttempts > 0 && <p>Failed code verification attempts: {failedCodeAttempts}</p>}

                    <Input label="Code" onChange={setCode} type="text" placeholder="xxx-xxx" maxLength={7}
                           autocomplete="one-time-code"/>

                    <div className={classes.buttons}>
                        <Button label="Restart" disabled={false} onClick={resetLoginState}/>
                        <Button label="Verify Code" disabled={!isCodeValid} onClick={submitCode}/>
                    </div>

                </>
            );
        case LoginStage.ERROR:
            return (
                <>
                    <p>Error</p>

                    <p>{error}</p>

                    <Button label="Restart" disabled={false} onClick={resetLoginState}/>
                </>
            );
        case LoginStage.LOADING:
            return (
                <p>Loading...</p>
            )
    }
}
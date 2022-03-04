import { withAuthenticationRequired } from "@auth0/auth0-react";
import Login from "./Login";

function Favourites() {
    return (<>This is favorite</>);
}

export default withAuthenticationRequired(Favourites, {
    onRedirecting: () => <Login />,
});

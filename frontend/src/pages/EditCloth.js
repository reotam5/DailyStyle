import { withAuthenticationRequired } from "@auth0/auth0-react";
import Home from "./Home";

function EditCloth() {
  return <>This is EditClothe</>;
}
export default withAuthenticationRequired(EditCloth, {
  onRedirecting: () => <Home />,
});

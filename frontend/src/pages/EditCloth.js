import { withAuthenticationRequired } from "@auth0/auth0-react";
import Login from "./Login";

function EditCloth() {
  return <>This is EditClothe</>;
}
export default withAuthenticationRequired(EditCloth, {
  onRedirecting: () => <Login />,
});

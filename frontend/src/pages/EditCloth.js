import { withAuthenticationRequired } from "@auth0/auth0-react";
import Home from "./Home";
import Box from '@mui/material/Box';
import { Stack, TextField, Button } from "@mui/material";

function EditCloth() {
  return (
    <Stack
      direction = "row" 
      spacing = {2}
      mt = {2}
      justifyContent = "center"
    >
        <Box component="img"
          sx = {{
            width: '45%',
            height: '45%',
            backgroundColor: 'primary.dark',
          }}
          src='https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
        />
        <Stack
          width = "45%"
          justifyContent = "space-between"
        >
          <TextField label="Title" variant="outlined"/>
          <TextField 
            label="Description" 
            variant="outlined"
            multiline
            rows={10}
          />
          <Stack
            direction = "row"
            justifyContent = "space-between"
          >
            <Button variant="outlined">Save</Button>
            <Button variant="outlined">Cancel</Button>
          </Stack>
        </Stack>
    </Stack>
  );
}
// export default withAuthenticationRequired(EditCloth, {
//   onRedirecting: () => <Home />,
// });
export default EditCloth;

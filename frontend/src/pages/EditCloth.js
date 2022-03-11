import { withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Home from "./Home";
import Box from '@mui/material/Box';
import {Button, Input, Container, FormControl, TextField, Stack } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

function EditCloth() {

  return (
    <Box sx={{ paddingTop: 1 }}>
      <Container maxWidth="sm" sx={{ paddingBottom: 5 }}>
        <img
          src={"https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"}
          alt="selected image"
          style={{ margin: "auto auto" }}
        />
        <FormControl fullWidth margin="normal">
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={(event) => {
                    //setFileImage(event.target.files[0]);
                  }}
                  sx={{ display: "none" }}
                />
                <Button
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  variant="outlined"
                  startIcon={<PhotoCamera />}
                  fullWidth
                >
                  Upload
                </Button>
              </label>

            <TextField
              margin="dense"
              required
              id="title"
              label="Title"
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              variant="outlined"
            />
            <Stack
              direction="row"
              justifyContent="space-around">
              <Button variant="contained" type="submit">
                Save
              </Button>
              <Button variant="outlined" type="submit">
                Cancel
              </Button>
            </Stack>
        </FormControl>
      </Container>
    </Box>
  );
}
// export default withAuthenticationRequired(EditCloth, {
//   onRedirecting: () => <Home />,
// });
export default EditCloth;

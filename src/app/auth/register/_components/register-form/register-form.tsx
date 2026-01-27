"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { AuthCard } from "../../../_components/auth-card";
import { registerUser } from "../../actions";
import { useActionState } from "react";

export const RegisterForm = () => {
  const [state, formAction, pending] = useActionState(registerUser, undefined);

  console.log({ state });

  return (
    <AuthCard title="Sign Up">
      <Stack component="form" gap={2} action={formAction}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          error={!!state?.errors.email?.length}
          helperText={state?.errors.email?.join(",")}
          required
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          error={!!state?.errors.password?.length}
          helperText={state?.errors.password?.join(",")}
          required
          fullWidth
        />
        <Box display="flex" justifyContent="flex-end">
          <Button disabled={pending} variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Stack>
    </AuthCard>
  );
};

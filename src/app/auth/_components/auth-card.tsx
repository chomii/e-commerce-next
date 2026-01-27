import { Card, Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { Lock as LockIcon } from "@mui/icons-material";

interface AuthCardProps extends PropsWithChildren {
  title: string;
}

export const AuthCard = ({ children, title }: AuthCardProps) => {
  return (
    <Card
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gap: "20px",
        width: { xs: "100%", md: "400px" },
        // height: "500px",
        padding: "20px",
      }}
    >
      <Stack alignItems="center">
        <LockIcon />
        <Typography>{title}</Typography>
      </Stack>

      {children}
    </Card>
  );
};

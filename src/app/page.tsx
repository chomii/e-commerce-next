import { verifySession } from "@/lib/dal";
import { Box, Container, Typography } from "@mui/material";

export default async function Home() {
  const session = await verifySession();
  console.log({ session });
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Typography component="h1">HOME</Typography>
      </Container>
    </Box>
  );
}

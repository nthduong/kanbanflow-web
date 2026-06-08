import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import HomeIcon from "@mui/icons-material/Home";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import randomColor from "randomcolor";
import { styled } from "@mui/material/styles";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CardMedia from "@mui/material/CardMedia";
import { BorderAll, BorderColor } from "@mui/icons-material";
import { red } from "@mui/material/colors";

import { fetchBoardAPI } from "~/apis";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE } from "~/utils/constants";
import SidebarCreateBoardModal from "~/pages/Boards/create";
import AppBar from "~/components/AppBar/AppBar";
import PageLoadingSpinner from "~/components/Loading/PageLoadingSpinner";

const SidebarItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  backgroundColor: theme.palette.mode === "dark" ? "#121212" : "#fff",
  padding: "12px 16px",
  borderRadius: "8px",
  "&:hover": {
    color: theme.palette.mode === "dark" ? "#fff" : "#58732c",
  },
  "&.active": {
    color: theme.palette.mode === "dark" ? "#fff" : "#58732c",
    backgroundColor: theme.palette.mode === "dark" ? "#333333" : "#f2fae2",
  },
}));

function Boards() {
  const [boards, setBoards] = useState(null);
  const [totalBoards, setTotalBoards] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const updateStateData = (res) => {
    setBoards(res.boards || []);
    setTotalBoards(res.totalBoards || 0);
  };

  useEffect(() => {
    fetchBoardAPI(location.search).then(updateStateData);
  }, [location.search]);

  const afterCreateNewBoard = () => {
    fetchBoardAPI(location.search).then(updateStateData);
  };

  if (!boards) {
    return <PageLoadingSpinner caption="Loading Boards..." />;
  }

  return (
    <Container disableGutters maxWidth={false}>
      <AppBar />
      <Box sx={{ paddingX: 2, my: 4 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={3}>
            <Stack direction="column" spacing={1}>
              <SidebarItem className="active">
                <SpaceDashboardIcon fontSize="small" />
                Boards
              </SidebarItem>
              {/* <SidebarItem>
                <ListAltIcon fontSize="small" />
                Templates
              </SidebarItem> */}
              {/* <SidebarItem>
                <HomeIcon fontSize="small" />
                Home
              </SidebarItem> */}
            </Stack>
            <Divider sx={{ my: 1 }} />
            <Stack direction="column" spacing={1}>
              <SidebarCreateBoardModal afterCreateNewBoard={afterCreateNewBoard} />
            </Stack>
          </Grid>

          <Grid xs={12} sm={9}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              Your boards:
            </Typography>

            {boards?.length === 0 && (
              <Typography variant="span" sx={{ fontWeight: "bold", mb: 3 }}>
                No result found!
              </Typography>
            )}

            {boards?.length > 0 && (
              <Grid container spacing={2}>
                {boards.map((b) => (
                  <Grid xs={2} sm={3} md={4} key={b._id}>
                    <Card sx={{ width: "250px" }}>
                      {/* <CardMedia component="img" height="100" image="https://picsum.photos/100" /> */}
                      <Box sx={{ height: "50px", backgroundColor: randomColor() }}></Box>

                      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {b.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                        >
                          {b.description}
                        </Typography>
                        <Box
                          component={Link}
                          to={`/boards/${b._id}`}
                          sx={{
                            mt: 1,
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            color: "primary.main",
                            "&:hover": { color: "primary.light" },
                          }}
                        >
                          Go to board <ArrowRightIcon fontSize="small" />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {totalBoards > 0 && (
              <Box sx={{ my: 3, pr: 5, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                <Pagination
                  size="large"
                  color="secondary"
                  showFirstButton
                  showLastButton
                  count={Math.ceil(totalBoards / DEFAULT_ITEMS_PER_PAGE)}
                  page={page}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`/boards${item.page === DEFAULT_PAGE ? "" : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Boards;

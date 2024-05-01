import PropTypes from "prop-types";
import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

// project imports
import BajajAreaChartCard from "./BajajAreaChartCard";
import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
import { gridSpacing } from "store/constant";

// assets
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const ServicesCard = ({ title, isLoading }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignContent="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <Typography variant="h4">{title}</Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Accord 2001 - Jesús
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                              30/04/2024{" "}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "success.dark" }}
                    >
                      0 días{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 1.5 }} />

                <Grid item xs={12}>
                  <Grid container direction="column">
                    <Grid item>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            Sentra 2023 - Eduardo
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                27/04/2024{" "}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "error.dark" }}
                      >
                        3 días{" "}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1.5 }} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
            <Button size="small" disableElevation>
              Ver todos
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

ServicesCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
};

export default ServicesCard;

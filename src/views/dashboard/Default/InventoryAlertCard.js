import PropTypes from "prop-types";

// material-ui

import {
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

// project imports

import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
import { gridSpacing } from "store/constant";

// assets
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useNavigate } from "react-router";

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const InventoryAlertCard = ({ title, isLoading, list }) => {
  const navigate = useNavigate();
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
                {list.length > 0 ? (list.map((product) => {
                  return (
                    <div>
                      <Grid container direction="column">
                        <Grid item>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Grid item>
                              <Typography variant="subtitle1" color="inherit">
                                {product.name}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography
                                    variant="subtitle1"
                                    color="inherit"
                                  >
                                    {`Quedan: ${product.stock}`}
                                  </Typography>
                                </Grid>
                                {/*<Grid item>
                            
                            <Avatar
                              variant="rounded"
                              sx={{
                                cursor: "pointer",
                                width: 16,
                                height: 16,
                                borderRadius: "5px",
                                backgroundColor: theme.palette.success.light,
                                color: theme.palette.success.dark,
                                ml: 2,
                              }}
                            >
                              <AddCircleIcon fontSize="small" color="inherit" />
                            </Avatar>
                          </Grid>*/}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            sx={{ color: "error.dark" }}
                          >
                            {`Mínimo: ${product.min}`}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ my: 1.5 }} />
                    </div>
                  );
                })):(
                  <Typography
                    align="center"
                    color="grey"
                    marginTop={2}
                    fontStyle="italic"
                  >
                    No hay alertas
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
            <Button
              size="small"
              onClick={() => {
                navigate(`/inventory`);
              }}
              disableElevation
            >
              Ver Inventario
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

InventoryAlertCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
};

export default InventoryAlertCard;

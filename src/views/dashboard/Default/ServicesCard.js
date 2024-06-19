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
import {
  FORMAT_OPTIONS,
  formatDate,
  getDatesDaysDifference,
} from "client/utils/dateUtils";
import { useNavigate } from "react-router";

const ServicesCard = ({ title, isLoading, list }) => {
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
                {list.length > 0 ? (
                  list.map((service) => {
                    const { model, year } =
                      service.vehicle_service_vehicleTovehicle?.vehicles_db;
                    const days = getDatesDaysDifference(
                      service.startDate,
                      new Date()
                    );
                    const subColor = days < 7 ? "success" : "error";
                    return (
                      <div key={`service-${service.id}`}>
                        <Grid container direction="column">
                          <Grid item>
                            <Grid
                              container
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <Typography variant="subtitle1" color="inherit">
                                  {`${model} - ${year}`}
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
                                      {formatDate(
                                        service.startDate,
                                        FORMAT_OPTIONS.DDMMYYYY
                                      )}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: `${subColor}.dark` }}
                            >
                              {`${days} día(s)`}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider sx={{ my: 1.5 }} />
                      </div>
                    );
                  })
                ) : (
                  <Typography
                    align="center"
                    color="grey"
                    marginTop={2}
                    fontStyle="italic"
                  >
                    No hay servicios activos
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: "center" }}>
            <Button
              onClick={() => {
                navigate(`/services`);
              }}
              size="small"
              disableElevation
            >
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

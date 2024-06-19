import PropTypes from "prop-types";

// material-ui
import { CardContent, Divider, Grid, Typography } from "@mui/material";

// project imports

import MainCard from "ui-component/cards/MainCard";
import SkeletonPopularCard from "ui-component/cards/Skeleton/PopularCard";
import { gridSpacing } from "store/constant";
import {
  FORMAT_OPTIONS,
  formatDate,
  getDatesDaysDifference,
} from "client/utils/dateUtils";

const ServicesAlertCard = ({ title, isLoading, list }) => {
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
                  list.map((reminder) => {
                    const { model, year } =
                      reminder.vehicle_service_reminder_vehicleTovehicle
                        ?.vehicles_db;
                    const days = getDatesDaysDifference(
                      new Date(),
                      reminder.date
                    );
                    const daysLabel =
                      days > 0 ? `Faltan: ${days} día(s)` : "HOY";
                    const subColor = days > 3 ? "success" : "error";
                    return (
                      <Grid item xs={12} key={`reminder-${reminder.id}`}>
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
                                        reminder.date,
                                        FORMAT_OPTIONS.DDMMYYYY
                                      )}
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
                                  backgroundColor: theme.palette.error.light,
                                  color: theme.palette.error.dark,
                                  ml: 2,
                                }}
                              >
                                <CloseIcon fontSize="small" color="inherit" />
                              </Avatar>
                            </Grid>*/}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="subtitle2"
                              sx={{ color: `${subColor}.dark` }}
                            >
                              {daysLabel}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Divider sx={{ my: 1.5 }} />
                      </Grid>
                    );
                  })
                ) : (
                  <Typography
                    align="center"
                    color="grey"
                    marginTop={2}
                    fontStyle="italic"
                  >
                    No hay alertas futuras
                  </Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

ServicesAlertCard.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string,
};

export default ServicesAlertCard;

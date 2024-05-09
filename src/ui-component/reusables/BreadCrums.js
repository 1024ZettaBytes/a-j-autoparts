// NextBreadcrumbs.js

import { Breadcrumbs, Typography, Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./breadcrum.module.css";

const getUrlPaths = (paths) => {
  let pathsArray = ["/"];
  for (let i = 1; i < paths.length; i++) {
    if (paths[i]) {
      pathsArray.push(
        pathsArray[i - 1] +
          paths[i].path?.replace(" ", "-")?.toLowerCase() +
          "/"
      );
    }
  }
  console.log(pathsArray);
  return pathsArray;
};
export default function NextBreadcrumbs({ paths, lastLoaded, sx }) {
  const urlPaths = getUrlPaths(paths);
  return (
    <Breadcrumbs sx={sx} aria-label="breadcrumb">
      {paths.map((path, i) => (
        <Crumb
          text={path.text}
          href={urlPaths[i]}
          key={i}
          last={i === paths.length - 1}
          lastLoaded={lastLoaded}
        />
      ))}
    </Breadcrumbs>
  );
}

function Crumb({ text, href, last = false, lastLoaded }) {
  if (last) {
    return lastLoaded ? (
      <Typography className={styles.bread_text_last} color="text.primary">
        {text}
      </Typography>
    ) : (
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100px" }} />
    );
  }

  return (
    <Link className={styles.bread_text} to={href}>
      {text}
    </Link>
  );
}

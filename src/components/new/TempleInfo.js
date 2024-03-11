import { ImageList, ImageListItem } from "@material-ui/core";
import React from "react";

const TempleInfo = ({ templeInfo }) => {
  return (
    <div className="temple-info">
      <h2 className="temple-name">{templeInfo.name}</h2>
      <p className="temple-address">{templeInfo.formatted_address}</p>
      <ImageList
        sx={{ width: 500, height: 150 }}
        cols={3}
        rowHeight={300}
      >
        {templeInfo.photos.map(({ width, height, getUrl }) => (
          <ImageListItem>
            <img style={{ scale: width / height }} src={getUrl()} />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default TempleInfo;

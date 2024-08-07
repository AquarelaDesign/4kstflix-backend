import db from "../../config/dbConnection.mjs";

const WatchList = db.define("WatchList", {}, {});

WatchList.associate = function (models) {
  WatchList.hasOne(models.Profile, {
    foreignKey: "watchListId",
  });
  WatchList.hasMany(models.WatchListContent, {
    foreignKey: "watchListId",
  });
};

export default WatchList;

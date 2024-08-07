import { DataTypes } from "sequelize";
import db from "../../config/dbConnection.mjs";

const WatchListContent = db.define(
  "WatchListContent",
  {
    watchListId: DataTypes.INTEGER,
    poster_path: DataTypes.STRING,
  },
  {}
);

WatchListContent.associate = function (models) {
  WatchListContent.belongsTo(models.WatchList, {
    foreignKey: "watchListId",
  });
};

export default WatchListContent;

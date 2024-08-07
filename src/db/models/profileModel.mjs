import { DataTypes } from "sequelize";
import db from "../../config/dbConnection.mjs";

const Profile = db.define(
  "Profile",
  {
    name: DataTypes.STRING,
    imageLink: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    watchListId: DataTypes.INTEGER,
  },
  {}
);

Profile.associate = function (models) {
  Profile.belongsTo(models.User, {
    foreignKey: "userId",
  });
  Profile.belongsTo(models.WatchList, {
    foreignKey: "watchListId",
  });
};

export default Profile;

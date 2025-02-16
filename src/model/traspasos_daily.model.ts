import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const TraspasosDaily = sequelize.define(
  "traspasos_daily",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    formulario: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false,
    },
    cuil: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nombre_apellido: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    vigencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_confirmacion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(30),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    cp: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    localidad: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    provincia_nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    obra_social_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    tipo_monotributista: {
      type: DataTypes.STRING(5),
    },
    tipo_movimiento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    regimen_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gerenciador_codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  {
    tableName: "traspasos_daily",
    timestamps: false,
  }
);

TraspasosDaily.sync();

export default TraspasosDaily;

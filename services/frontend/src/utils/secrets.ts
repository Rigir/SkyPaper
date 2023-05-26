import * as _ from "lodash";

export const ENVIRONMENT = _.defaultTo(import.meta.env.MODE, "development");
export const BACKEND_URL = _.defaultTo(import.meta.env.BACKEND_URL, "http://localhost:9000");

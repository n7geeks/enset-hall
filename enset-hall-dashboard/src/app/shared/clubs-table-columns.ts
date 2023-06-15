import { User } from "../models/users.model";

export const columns = {
  logo: {
    title: "Logo",
    type: "html",
    sort: false,
    width: "50px",
    valuePrepareFunction: (logo: string) => {
      return `<img src="${logo}" width="50" height="50" />`;
    },
  },
  name: {
    title: "Nom",
    type: "string",
    sort: false,
  },
  about: {
    title: "A propos",
    type: "string",
    sort: false,
    valuePrepareFunction: (about: string) => {
      return about.slice(0, 50) + (about.length > 50 ? " ..." : "");
    },
  },
  godfather: {
    title: "Parrain",
    type: "string",
    sort: false,
    valuePrepareFunction: (godfather: User) => {
      return godfather.displayName;
    },
  },
};

import Homepage from "pages/Homepage/Homepage";

interface IRoute {
  url: string;
  Component: React.FC;
  protected: Boolean;
}

export const routeList: IRoute[] = [
  {
    url: "/",
    Component: Homepage,
    protected: false,
  },
];

import AppLayout from "layouts/AppLayout/AppLayout";
import Homepage from "pages/Homepage/Homepage";

interface IRoute {
  url: string;
  Component: React.FC;
  protected: Boolean;
  LayoutElement?: React.FC;
}

export const routeList: IRoute[] = [
  {
    url: "/",
    Component: Homepage,
    protected: false,
  },
  // PROTECTED ROUTE
  {
    url: "/secure",
    Component: Homepage,
    protected: true,
    LayoutElement: AppLayout,
  },
];

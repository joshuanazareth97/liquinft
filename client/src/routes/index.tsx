import AppLayout from "layouts/AppLayout/AppLayout";
import Homepage from "pages/Homepage/Homepage";
import NFTListPage from "pages/NFTListPage/NFTListPage";

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
    url: "/nft",
    Component: NFTListPage,
    protected: true,
    // LayoutElement: AppLayout,
  },
];

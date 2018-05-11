import { StackNavigator } from "react-navigation";
import LaunchScreen from "../Containers/LaunchScreen";
import Login from "../Containers/LoginContainer";
import styles from "./Styles/NavigationStyles";
import PhotoSign from "../Containers/PhotoSignContainer";
import PhotoStand from "../Containers/PhotoStandContainer";
import PhotoPromoter from "../Containers/PhotoPromoterContainer";
import Stock from "../Containers/StockContainer";
import StockCount from "../Containers/StockCountContainer";
import Promotion from "../Containers/PromotionContainer";

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    Login: {screen: Login},
    PhotoSign: {screen: PhotoSign},
    PhotoStand: {screen: PhotoStand},
    PhotoPromoter: {screen: PhotoPromoter},
    Stock: {screen: Stock},
    StockCount: {screen: StockCount},
    Promotion: {screen: Promotion}
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "Login",
    navigationOptions: {
      headerStyle: styles.header
    }
  }
);

export default PrimaryNav;

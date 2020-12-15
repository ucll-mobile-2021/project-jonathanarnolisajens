import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

/** Voeg in onderstaand functie x: undefined, toe. 
 * de naam hier en in het name field vd screen is de naam die je ziet in de navbar
*/
export type RouteParamList = {
    Home: undefined,
    GPS: undefined,
};

export type RouteDrawerParamList<T extends keyof RouteParamList> = {
    navigation: DrawerNavigationProp<RouteParamList, T>;
    route: RouteProp<RouteParamList, T>;
}
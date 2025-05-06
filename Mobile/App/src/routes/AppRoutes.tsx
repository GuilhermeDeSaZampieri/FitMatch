import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import EditProfile from "../pages/EditProfile/EditProfile";
import { ChosePreferences } from "../pages/ChoosePreferences/ChoosePreferences";
import { useEffect, useState } from "react";
import useAppContext from "../hooks/useAppContext";
import Home from "../pages/HomePrincipal/Home";
import ActivityCategory from "../pages/ActivityCategory/ActivityCategory";
import { Perfil } from "../pages/Perfil/Perfil";
import { CreateActivity } from "../pages/CreateActivity/CreateActivity";


export type MainStackParamList = {
    Login: undefined,
    Cadastro: undefined,
    Home?: {cameFromPreferences: boolean},
    EditProfile: undefined,
    ChosePreferences?: {editProfile: boolean},
    ActivityCategory?: {categoryId: string}
    Perfil: undefined,
    CreateActivity?: {activityId: string},

}

const MainStack = createStackNavigator<MainStackParamList>();

function MainStackScreen() {
    return (
        <MainStack.Navigator initialRouteName="Home">
            <MainStack.Group
                screenOptions={{
                    headerShown: false,
                }}
            >
                <MainStack.Screen name="Home" component={Home} />
                <MainStack.Screen name="Login" component={Login} />
                <MainStack.Screen name="Cadastro" component={Cadastro} />
                <MainStack.Screen name="EditProfile" component={EditProfile} />
                <MainStack.Screen name="ChosePreferences" component={ChosePreferences} />
                <MainStack.Screen name="ActivityCategory" component={ActivityCategory} />
                <MainStack.Screen name="Perfil" component={Perfil} />
                <MainStack.Screen name="CreateActivity" component={CreateActivity} />


                
            </MainStack.Group>
        </MainStack.Navigator>
    );
}

const LoginStack = createStackNavigator<MainStackParamList>();

function LoginStackScreen(){
    return (
        <LoginStack.Navigator initialRouteName = 'Login'>
            <LoginStack.Group
                screenOptions={{
                    headerShown: false,
                }}
            >
                <LoginStack.Screen name="Login" component={Login}/>
                <LoginStack.Screen name="Cadastro" component={Cadastro} />
            </LoginStack.Group>
        </LoginStack.Navigator>
    )

}


export default function AppRoutes() {
    
    
    const [isLoading, setIsLoading] = useState(true);

    const {auth: {isAuthenticated}} = useAppContext();

    useEffect(() => {
        if(isAuthenticated !== null){
            setIsLoading(false);
        }
    },[isAuthenticated]);
    
    return (
        <NavigationContainer>
            {isAuthenticated ? <MainStackScreen /> : <LoginStackScreen/>}
        </NavigationContainer>
    );

}
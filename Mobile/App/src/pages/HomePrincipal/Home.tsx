import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {AppText} from '../../components/Text/Text';
import {CustomImage} from '../../components/CustomImage/CustomImage';
import {useContext, useEffect, useState} from 'react';
import api, {getAuthorization} from '../../api/api';
import {AppContext} from '../../context/App';
import {User, UserPreferences} from '../../models/User';
import {Plus} from 'phosphor-react-native';
import {Activity} from '../../models/Activity';
import {CustomActivity} from '../../components/CustomActivity/CustomActivity';
import {CustomPreferences} from '../../components/CustomPreferences/CustomPreferences';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../routes/AppRoutes';

type HomePreferencesParams = RouteProp<MainStackParamList, 'Home'>;

export default function Home() {
  const {auth} = useContext(AppContext);
  const [user, setUser] = useState<User>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences[]>([]);
  const navigation = useTypeNavigation();
  const route = useRoute<HomePreferencesParams>();
  const {cameFromPreferences} = route.params || {cameFromPreferences: false};

  useEffect(() => {
    const getPreferences = async () => {
      try {
        const res = await api.get('/user/preferences', {
          headers: getAuthorization(auth.token),
        });
        setPreferences(res.data);
      } catch (error) {
        console.error('Erro ao buscar Preferencias', error);
      }
    };
    getPreferences();
  }, [auth.token]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get('/activities/all', {
          headers: getAuthorization(auth.token),
        });
        setActivities(response.data);
      } catch (error) {
        console.error('Erro ao buscar atividades', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get('/user', {
          headers: getAuthorization(auth.token),
        });
        setUser(res.data);
      } catch (error) {
        console.error('Erro ao buscar Usuario', error);
      }
    };
    console.log(user);
    getUser();
  }, [auth.token]);

  return (
    <>
      {!preferences.map((type, index) => {
        console.log(cameFromPreferences);
      }) &&
        !cameFromPreferences &&
        navigation.navigate('ChosePreferences')}
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.decorativeBall1} />
            <View style={styles.decorativeBall2} />
            <View style={styles.infoView}>
              <View style={styles.welcomeView}>
                <AppText variant="welcomeLower">Olá, Seja Bem Vindo</AppText>
                <AppText variant="welcomeTitle">{user?.name} !</AppText>
              </View>
              <View style={styles.grouplvImg}>
                <View style={styles.levelView}>
                  <Image
                    source={require('../../assets/image/starLvl.png')}></Image>
                  <AppText variant="welcomeLvl">{user?.level}</AppText>
                </View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Perfil')
                }}>
                  <CustomImage.Root
                    type="imgProfileNavBar"
                    uri={user?.avatar}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.recomends}>
            <AppText variant="lowerTitle">Suas Recomendações</AppText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ActivityCategory');
              }}>
              <AppText variant="seeMore">VER MAIS</AppText>
            </TouchableOpacity>
          </View>

          <CustomActivity
            data={activities}
            loading={loading}
            refreshing={refreshing}
          />

          <CustomPreferences
            text="Categorias"
            categoryId={''}
            selection= {'edit'}
          />

          <View style={styles.createActivity}>
            <TouchableOpacity style={styles.buttonCreateActivity}
            onPress={() => navigation.navigate('CreateActivity')}>
              <Plus color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

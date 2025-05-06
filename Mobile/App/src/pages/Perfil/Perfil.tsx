import {ScrollView, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {
  CaretDown,
  CaretLeft,
  CaretRight,
  NotePencil,
  SignOut,
} from 'phosphor-react-native';
import {AppText} from '../../components/Text/Text';
import useAppContext from '../../hooks/useAppContext';
import {CustomImage} from '../../components/CustomImage/CustomImage';
import {useContext, useEffect, useState} from 'react';
import api, {getAuthorization} from '../../api/api';
import {AppContext} from '../../context/App';
import {User} from '../../models/User';
import Carousel from '../../components/Carrossel/Carrossel';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import {Activity} from '../../models/Activity';
import {CustomActivity} from '../../components/CustomActivity/CustomActivity';

export function Perfil() {
  const {
    auth: {logout},
  } = useAppContext();
  const {auth} = useContext(AppContext);
  const [user, setUser] = useState<User>();
  const navigation = useTypeNavigation();
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [userActivities, setUserActivities] = useState<Activity[]>([]);
  const [communityActivities, setCommunityActivities] = useState<Activity[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    loading: false,
  });

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
    getUser();
  }, [auth.token]);

  const separateActivities = (activities: Activity[], userId: string) => {
    const userActs = activities.filter(activity => activity.creator.id === userId);
    const communityActs = activities.filter(activity => activity.creator.id !== userId);
    
    setUserActivities(userActs);
    setCommunityActivities(communityActs);
  };

  const fetchData = async (page = 1) => {
    try {
      setPagination(prev => ({...prev, loading: true}));

      const response = await api.get('/activities', {
        headers: getAuthorization(auth.token),
        params: {page, pageSize: 10},
      });

      const newActivities = response.data.activities;
      
      setAllActivities(prev =>
        page === 1 ? newActivities : [...prev, ...newActivities],
      );
      
      if (user?.id) {
        separateActivities(
          page === 1 ? newActivities : [...allActivities, ...newActivities],
          user.id
        );
      }

      setPagination({
        page: response.data.page,
        totalPages: response.data.totalPages,
        loading: false,
      });
    } catch (error) {
      console.error('Erro ao buscar atividades', error);
      setPagination(prev => ({...prev, loading: false}));
    }
  };

  useEffect(() => {
    if (user?.id) {
      if (allActivities.length > 0) {
        separateActivities(allActivities, user.id);
      } else {
        fetchData(1);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    fetchData(1);
  }, [auth.token]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(1);
    setRefreshing(false);
  };

  const toggleSelection = () => {
    setIsPressed(!isPressed);
  };

  const handleLoadMore = () => {
    if (!pagination.loading && pagination.page < pagination.totalPages) {
      fetchData(pagination.page + 1);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <CaretLeft size={32} color="#000" />
            </TouchableOpacity>

            <View style={styles.titleEditLogoutView}>
              <AppText variant="title">PERFIL</AppText>

              <View style={styles.editLogout}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditProfile');
                  }}>
                  <NotePencil size={32}></NotePencil>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    logout && logout();
                  }}>
                  <SignOut size={32} color="" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.imageTitle}>
            <CustomImage.Root type="imgProfile" uri={user?.avatar} />
            <AppText variant="lowerTitle">{user?.name}</AppText>
          </View>
        </View>

        <View style={styles.Caroussel}>{user && <Carousel user={user} />}</View>

        <View style={styles.recomends}>
          <AppText variant="lowerTitle">Suas ATIVIDADES</AppText>
          <TouchableOpacity onPress={toggleSelection}>
            {!isPressed ? <CaretRight size={32} /> : <CaretDown size={32} />}
          </TouchableOpacity>
        </View>
        {isPressed ? (
          <CustomActivity
            data={userActivities}
            loading={pagination.loading}
            refreshing={refreshing}

          />
        ) : (
          <View style={styles.hidden}></View>
        )}

        <View style={styles.comunityActivities}>
          <AppText variant="title">ATIVIDADES DA COMUNIDADE</AppText>
        </View>
        <CustomActivity
          data={communityActivities}
          loading={pagination.loading}
          refreshing={refreshing}

        />
      </View>
    </ScrollView>
  );
}
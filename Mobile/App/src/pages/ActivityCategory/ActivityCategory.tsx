import {ScrollView, TouchableOpacity, View} from 'react-native';
import Arrow from '../../components/CustomArrow/Arrow';
import {AppText} from '../../components/Text/Text';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import {styles} from './style';
import {CustomPreferences} from '../../components/CustomPreferences/CustomPreferences';
import {CustomActivity} from '../../components/CustomActivity/CustomActivity';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../context/App';
import {Activity} from '../../models/Activity';
import api, {getAuthorization} from '../../api/api';
import {CaretDown, CaretRight} from 'phosphor-react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../routes/AppRoutes';

type ActivityCategoryRouteProp = RouteProp<
  MainStackParamList,
  'ActivityCategory'
>;

export default function ActivityCategory() {
  const route = useRoute<ActivityCategoryRouteProp>();
  const initialCategoryId = route.params?.categoryId || '';

  const {auth} = useContext(AppContext);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(initialCategoryId);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  useEffect(() => {
    console.log('ID da categoria recebido:', selectedCategoryId);
  }, [selectedCategoryId]);

  const toggleSelection = () => {
    setIsPressed(!isPressed);
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategoryId(id);
    console.log('Categoria selecionada:', id);
  };

  const navigation = useTypeNavigation();
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.header}>
          <Arrow
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <AppText variant="title">TREINO</AppText>
        </View>

        <CustomPreferences
          text="Categorias"
          categoryId={selectedCategoryId}
          onSelectCategory={handleCategorySelect}
        />

        <View style={styles.recomends}>
          <AppText variant="lowerTitle">Suas ATIVIDADES</AppText>
          <TouchableOpacity onPress={toggleSelection}>
            {!isPressed ? <CaretRight size={32} /> : <CaretDown size={32} />}
          </TouchableOpacity>
        </View>

        {isPressed ? (
          <CustomActivity
            data={activities}
            loading={loading}
            refreshing={refreshing}
          />
        ) : (
          <View style={styles.hidden}></View>
        )}

        <View style={styles.comunityActivities}>
          <AppText variant="title">ATIVIDADES DA COMUNIDADE</AppText>
        </View>
        <CustomActivity
          data={activities}
          loading={loading}
          refreshing={refreshing}
        />
      </View>
    </ScrollView>
  );
}

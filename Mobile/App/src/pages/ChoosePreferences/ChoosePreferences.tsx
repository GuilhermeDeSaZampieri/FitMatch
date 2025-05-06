import {FlatList, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {AppText} from '../../components/Text/Text';
import {Button} from '../../components/Button/Button';
import {CustomImage} from '../../components/CustomImage/CustomImage';
import {useCallback, useContext, useEffect, useState} from 'react';
import api, {getAuthorization} from '../../api/api';
import {AppContext} from '../../context/App';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import {ActivityType} from '../../models/Activity';
import Arrow from '../../components/CustomArrow/Arrow';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '../../routes/AppRoutes';
import { UserPreferences } from '../../models/User';

type ChosePreferencesRouteParams = RouteProp<
  MainStackParamList,
  'ChosePreferences'
>;

export function ChosePreferences() {
  const route = useRoute<ChosePreferencesRouteParams>();
  const editProfile = route.params?.editProfile ?? false;
  const {auth} = useContext(AppContext);
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const navigation = useTypeNavigation();

   useEffect(() => {
      const getUserPreferences = async () => {
        if (editProfile) {
          try {
            const response = await api.get('/user/preferences', {
              headers: getAuthorization(auth.token),
            });
            setSelectedId(response.data.map((item: UserPreferences) => item.typeId));

          } catch (error) {
            console.error('Erro ao buscar preferências do usuário:', error);
          }
        }
      };
      getUserPreferences();
    }, [auth.token, editProfile]);
    
    useEffect(() => {
      console.log('IDs selecionados atualizados:', selectedId);
    }, [selectedId]);

  useEffect(() => {
    const getActivitiesTypes = async () => {
      try {
        const response = await api.get('/activities/types', {
          headers: getAuthorization(auth.token),
        });
        setActivityTypes(response.data);
      } catch (error) {
        console.error('Erro ao buscar tipos de atividades:', error);
      }
    };
    getActivitiesTypes();
  }, [auth.token]);

  const toggleSelection = (id: string) => {
    setSelectedId(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  const defineUserPreferences = useCallback(async () => {
    try {
      if (selectedId.length === 0) {
        console.log('Nenhuma preferência selecionada');
        return;
      }

      console.log('Enviando dados:', JSON.stringify(selectedId));

      const response = await api.post(
        '/user/preferences/define',
        JSON.stringify(selectedId),
        {
          headers: getAuthorization(auth.token),
        },
      );

      console.log('Preferências salvas com sucesso:', response.data);

      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Erro ao definir preferências:', error);
    }
  }, [auth.token, selectedId]);


  return (
    <View style={styles.container}>
      {editProfile && (
        <View style={styles.editProfile}>
          <Arrow onPress={() => navigation.navigate('EditProfile')}></Arrow>
        </View>
      )}
      <View style={styles.viewText}>
        <AppText variant="title">SELECIONE SEU TIPO FAVORITO</AppText>
      </View>
      <View style={styles.form}>
        <FlatList
          style={styles.flatList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={activityTypes}
          keyExtractor={type => type.id.toString()}
          renderItem={({item: type}) => {
            const isSelected = selectedId.includes(type.id);
            
            return (
              <View style={styles.touch}>
                <TouchableOpacity
                  onPress={() => {
                    toggleSelection(type.id);
                  }}
                  style={[
                    isSelected && {
                      borderColor: '#00BC7D',
                      borderWidth: 2,
                      borderRadius: 58,
                    },
                  ]}>
                  <CustomImage.Root type="imgPreferences" uri={type.image} />
                </TouchableOpacity>
                <AppText variant="labelChoose">{type.name}</AppText>
              </View>
            );
          }}
        />

        <Button.Root
          style={{
            marginTop: 20,
            width: '75%',
            height: 44,
            alignSelf: 'center',
          }}
          type="default"
          onPress={defineUserPreferences}>
          <Button.Label>Salvar</Button.Label>
        </Button.Root>

        {!editProfile && (
          <Button.Root
            style={{
              marginTop: 20,
              marginBottom: 25,
              width: '75%',
              height: 44,
              alignSelf: 'center',
            }}
            onPress={() =>
              navigation.navigate('Home', {cameFromPreferences: true})
            }
            type="ghost">
            <Button.Label>Pular</Button.Label>
          </Button.Root>
        )}
      </View>
    </View>
  );
}

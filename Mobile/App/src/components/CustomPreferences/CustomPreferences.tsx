import {FlatList, ListRenderItem, TouchableOpacity, View} from 'react-native';
import {AppText} from '../Text/Text';
import {styles} from './style';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../context/App';
import {ActivityType} from '../../models/Activity';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import api, {getAuthorization} from '../../api/api';
import {CustomImage} from '../CustomImage/CustomImage';
import {NotePencil} from 'phosphor-react-native';
import {UserPreferences} from '../../models/User';

interface CustomPreferencesProps {
  text: string;
  categoryId: string;
  selection?: string
  onSelectCategory?: (id: string) => void; 

}

export function CustomPreferences({
  text,
  categoryId,
  selection = '',
  onSelectCategory 

}: CustomPreferencesProps) {
  const {auth} = useContext(AppContext);
  const [selectedId, setSelectedId] = useState('');
  const [selectedManyId, setSelectedManyId] = useState<UserPreferences[]>([]);
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const navigation = useTypeNavigation();

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

  useEffect(() => {
    const getUserPreferences = async () => {
      if (selection === 'EditProfile') {
        try {
          const response = await api.get('/user/preferences', {
            headers: getAuthorization(auth.token),
          });

          setSelectedManyId(response.data);
        } catch (error) {
          console.error('Erro ao buscar preferências do usuário:', error);
        }
      }
    };
    getUserPreferences();
  }, [auth.token, selection]);

  const handleCategoryPress = (id: string) => {
    setSelectedId(id);

    
  if (onSelectCategory) {
    onSelectCategory(id);
  }
    if (selection === 'edit') {
      navigation.navigate('ActivityCategory', {
        categoryId: id,
      });
      console.log('Navegando para categoria com ID:', id);
    }
    else{
      console.log('Categoria selecionada sem navegação:', id);
    }
  };


  const isActivitySelected = (typeId: string): boolean => {
    if (!selectedManyId || selectedManyId.length === 0) {
      return false;
    }
    return selectedManyId.some(preference => {
      if (preference.typeId) {
        return preference.typeId === typeId;
      } else if (typeof preference === 'string') {
        return preference === typeId;
      }
      return false;
    });
  };

  const renderItem: ListRenderItem<ActivityType> = ({ item: type }) => {
    if (selection === 'EditProfile') {
      const isSelected = isActivitySelected(type.id);
      return (
        <View style={styles.touch}>
          <View
            style={[
              isSelected && {
                borderColor: '#00BC7D',
                borderWidth: 2,
                borderRadius: 58,
              },
            ]}>
            <CustomImage.Root type="imgCategory" uri={type.image} />
          </View>
          <AppText variant="labelChoose">{type.name}</AppText>
        </View>
      );
    } else if (selection === 'edit') {
      const isSelected = categoryId === type.id;

      return (
        <View style={styles.touch}>
          <TouchableOpacity
            onPress={() => handleCategoryPress(type.id)}
            style={[
              isSelected && {
                borderColor: '#00BC7D',
                borderWidth: 2,
                borderRadius: 58,
              },
            ]}>
            <CustomImage.Root type="imgCategory" uri={type.image} />
          </TouchableOpacity>

          <AppText variant="labelCategory">{type.name}</AppText>
        </View>
      );
    } else {
      // Caso padrão para outras seleções não especificadas
      // Isso garante que sempre retornamos um componente React
      return (
        <View style={styles.touch}>
          <TouchableOpacity
            onPress={() => handleCategoryPress(type.id)}
            style={[
              categoryId === type.id && {
                borderColor: '#00BC7D',
                borderWidth: 2,
                borderRadius: 58,
              },
            ]}>
            <CustomImage.Root type="imgCategory" uri={type.image} />
          </TouchableOpacity>
          <AppText variant="labelCategory">{type.name}</AppText>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {selection === 'edit' ? (
        <View style={styles.Preferences}>
          <AppText variant="lowerTitle">{text}</AppText>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChosePreferences', { editProfile: true });
            }}>
            <NotePencil size={32} />
          </TouchableOpacity>
        </View>
      ) : (
        <AppText variant="lowerTitle">{text}</AppText>
      )}
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
        horizontal={true}
        data={activityTypes}
        keyExtractor={type => type.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}


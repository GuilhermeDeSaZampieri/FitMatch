import {ScrollView, View} from 'react-native';
import {styles} from './style';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import {CustomHeader} from '../../components/CustomHeader/CustomHeader';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import {CustomPreferences} from '../../components/CustomPreferences/CustomPreferences';
import {useCallback, useContext, useState} from 'react';
import {MainStackParamList} from '../../routes/AppRoutes';
import {RouteProp, useRoute} from '@react-navigation/native';
import DatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import api, {getAuthorization} from '../../api/api';
import {AppContext} from '../../context/App';
import Toast from 'react-native-toast-message';
import {CustomImagePicker} from '../../components/CustomImagePicker/CustomImagePicker';
import {CustomTwoButtons} from '../../components/CustomTwoButtons/CustomTwoButtons';
import Map from '../../components/CustomMap/Map';
import {AppText} from '../../components/Text/Text';

type CreateActivityRouteParams = RouteProp<
  MainStackParamList,
  'CreateActivity'
>;

export function CreateActivity() {
  const route = useRoute<CreateActivityRouteParams>();
  const IdActivityType = route.params?.activityId ?? '';
  const [selectedCategoryId, setSelectedCategoryId] = useState(IdActivityType);
  const {auth} = useContext(AppContext);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [typeId, setTypeId] = useState('');
  const [image, setImage] = useState('');
  const [privated, setPrivated] = useState(true);
  const [address, setAddress] = useState<{latitude: number; longitude: number}>(
    {
      latitude: 0,
      longitude: 0,
    },
  );

  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [scheduledDateError, setScheduledDateError] = useState(false);
  const [typeIdError, setTypeIdError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const navigation = useTypeNavigation();

  const register = useCallback(
    async (
      title: string,
      description: string,
      scheduledDate: string,
      typeId: string,
      image: string,
      privated: boolean,
      address: {latitude: number; longitude: number},
    ) => {
      try {
        const dateObj = new Date(scheduledDate);
        if (isNaN(dateObj.getTime())) {
          throw new Error('Formato de data inválido');
        }
        const isoDate = dateObj.toISOString();

        const addressString = JSON.stringify({
          latitude: address.latitude,
          longitude: address.longitude,
        });

        const formData = new FormData();

        if (image) {
          const filename = image.split('/').pop() || 'activity.jpg';
          formData.append('image', {
            uri: image,
            type: 'image/jpeg',
            name: filename,
          } as any);
        }

        formData.append('title', title);
        formData.append('description', description);
        formData.append('scheduledDate', isoDate);
        formData.append('typeId', typeId);
        formData.append('address', addressString);
        formData.append('private', privated ? 'true' : 'false');

        console.log('Dados formatados para envio:', {
          title,
          description,
          scheduledDate: isoDate,
          typeId,
          address: addressString,
          private: privated,
          hasImage: !!image,
        });

        const response = await api.post('/activities/new', formData, {
          headers: {
            ...getAuthorization(auth.token),
            'Content-Type': 'multipart/form-data',
          },
        });

        return response.data;
      } catch (error: any) {
        console.error('Erro detalhado:', {
          message: error.message,
          response: error.response?.data,
        });
        throw error;
      }
    },
    [auth.token],
  );

  const handleImageChange = useCallback((selectedImage: string) => {
    console.log('Nova imagem selecionada:', selectedImage);
    setImage(selectedImage);
  }, []);

  function showErrorToast(title: string, message: string) {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  }

  const validateForm = () => {
    let isValid = true;

    setTitleError(false);
    setDescError(false);
    setScheduledDateError(false);
    setTypeIdError(false);
    setImageError(false);
    setAddressError(false);

    if (!title || title.trim().length < 2) {
      setTitleError(true);
      isValid = false;
    }

    if (!desc || desc.trim().length < 6 || !desc.includes(' ')) {
      setDescError(true);
      isValid = false;
    }

    if (!scheduledDate || isNaN(new Date(scheduledDate).getTime())) {
      setScheduledDateError(true);
      isValid = false;
    }

    if (!typeId) {
      setTypeIdError(true);
      isValid = false;
    }

    if (!image) {
      setImageError(true);
      isValid = false;
    }

    if (!address || address.latitude === 0 || address.longitude === 0) {
      setAddressError(true);
      isValid = false;
    }

    return isValid;
  };

  async function handleRegister() {
    try {
      if (!validateForm()) {
        showErrorToast(
          'Formulário incompleto',
          'Preencha todos os campos corretamente',
        );
        return;
      }

      register &&
        (await register(
          title,
          desc,
          scheduledDate,
          typeId,
          image,
          privated,
          address,
        ));

      Toast.show({
        type: 'success',
        text1: 'Sucesso!',
        text2: 'Atividade criada com sucesso',
      });

      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Erro ao criar atividade:', error);

      if (error.response) {
        const errorMessage = error.response.data?.error || error.message;
        showErrorToast('Erro ao criar atividade', errorMessage);
      } else {
        showErrorToast(
          'Erro de conexão',
          'Verifique sua conexão e tente novamente',
        );
      }
    }
  }

  const handleCategorySelect = (id: string) => {
    setSelectedCategoryId(id);
    setTypeId(id);
    console.log('Categoria selecionada na criação:', id);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomHeader text="CADASTRAR ATIVIDADE" ComeBack={'Home'} />

        <View>
          <CustomImagePicker
            onImageChange={uri => {
              setImage(uri);
              setImageError(false);
            }}
          />
          {imageError && (
            <AppText variant="labelChoose" style={{color: '#E7000B'}}>
              Selecione uma imagem
            </AppText>
          )}
        </View>

        <View style={styles.form}>
          <Input.Root isError={titleError} style={{marginTop: 20}}>
            <Input.Label required>Titulo</Input.Label>
            <Input.Input
              placeholder="Ex.: Jogar Basquete"
              value={title}
              onChangeText={text => {
                setTitle(text);
                setTitleError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com o titulo da atividade
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={descError} style={{marginTop: 10}}>
            <Input.Label required>Descrição</Input.Label>
            <Input.Input
              value={desc}
              placeholder="Ex.: A atividade deve conter ao menos 5 pessoas..."
              onChangeText={text => {
                setDesc(text);
                setDescError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com a descrição
            </Input.ErrorMessage>
          </Input.Root>

          <DatePicker
            label="Data do Evento"
            required
            error={scheduledDateError}
            errorMessage="Preencha o campo com a data do evento"
            onChange={date => {
              setScheduledDate(date.toISOString());
            }}
            placeholder="12/02/2025 19:30"
          />

          <View>
            <Map
              onLocationChange={(latitude, longitude) => {
                setAddress({latitude, longitude});
                setAddressError(false);
              }}
            />
            {addressError && (
              <AppText variant="labelChoose" style={{color: '#E7000B'}}>
                Selecione uma localização no mapa
              </AppText>
            )}
          </View>

          <CustomTwoButtons
            initialValue={true}
            onValueChange={value => {
              setPrivated(value);
            }}
          />

          <View style={styles.customPreference}>
            <CustomPreferences
              text="Categorias"
              categoryId={selectedCategoryId}
              onSelectCategory={id => {
                handleCategorySelect(id);
                setTypeIdError(false);
              }}
            />
          </View>

          <Button.Root
            onPress={handleRegister}
            style={{
              marginTop: 40,
              marginBottom: 10,
              width: '88%',
              height: 44,
              alignSelf: 'center',
            }}
            type="default">
            <Button.Label>Salvar</Button.Label>
          </Button.Root>
        </View>
      </View>
    </ScrollView>
  );
}

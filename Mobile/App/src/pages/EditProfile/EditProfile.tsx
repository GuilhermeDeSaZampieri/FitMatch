import {View} from 'react-native';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';

import {styles} from './style';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';

import {CustomPreferences} from '../../components/CustomPreferences/CustomPreferences';
import {useCallback, useContext, useEffect, useState} from 'react';
import {User} from '../../models/User';
import api, {getAuthorization} from '../../api/api';
import {AppContext} from '../../context/App';
import Toast from 'react-native-toast-message';
import KeyboardAvoidingContent from '../../components/KeyBoardAvoidingContent/KeyBoardAvoidingContent';
import { ModalDesactive } from '../../components/ModalDesactive/ModalDesactive';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { CustomImagePicker } from '../../components/CustomImagePicker/CustomImagePicker';

export default function EditProfile() {
  const {auth} = useContext(AppContext);
  const [user, setUser] = useState<User>();
  const navigation = useTypeNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState('')

  const update = useCallback(
    async (email: string, password: string, name: string) => {
      try {
        const data = {
          email,
          password,
          name,
        };

        const response = await api.put('/user/update', JSON.stringify(data), {
          headers: getAuthorization(auth.token),
        });
        const responseData: any = response.data;
        console.log(responseData);
      } catch (error: any) {
        throw error;
      }
    },
    [],
  );

  const updateImg = useCallback(
    async (imageUri: string) =>{
      try {

        console.log('Preparando para enviar imagem', imageUri)

        const formData = new FormData();
        const filename = imageUri.split('/').pop() || 'profile.jpg';

        formData.append('avatar', {
          uri: imageUri,
          type: 'image/jpeg',
          name: filename
        });

        console.log('FormData preparado para envio', formData);

        const response = await api.put('user/avatar', formData, {
          headers: {
            ...getAuthorization(auth.token),
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Resposta da atualização de avatar:', response.data);


        Toast.show({
          type: 'success',
          text1: 'Sucesso',
          text2: 'Foto de perfil atualizada com sucesso!',
        });
      }
      catch(error: any){
        console.log('Erro ao atualizar avatar:', error);
        console.log('Error details:', error.response?.data); 
        Toast.show({
          type: 'error',
          text1: 'Erro',
          text2: 'Não foi possível atualizar a foto de perfil.',
        });
      }

      
    },[],
  );

  const handleImageChange = useCallback((selectedImage: string) => {
    console.log("Nova imagem selecionada:", selectedImage);
    setImage(selectedImage);
  }, []);


  function verifyEmail() {
    if (!email) return false;
    const atIndex = email.indexOf('@');
    if (atIndex <= 0 || atIndex === email.length - 1) return false;
    const dotIndex = email.indexOf('.', atIndex);
    if (dotIndex === -1 || dotIndex === email.length - 1) return false;
    return true;
  }

  function verifyName() {
    if (!name) return false;
    if (name.length < 6) return false;
    if (!name.includes(' ')) return false;
    return true;
  }

  function showErrorToast(title: string, message: string) {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
    });
  }

  async function handleEdit() {
    try {
      let isError = false;


      if (!verifyEmail()) {
        setEmailError(true);
        isError = true;
      }

      if (password.length < 6) {
        setPasswordError(true);
        isError = true;
      }

      if (!verifyName()) {
        setNameError(true);
        isError = true;
      }

      if (isError) return;

      update && (await update(email, password, name))

      image && await updateImg(image);

      navigation.navigate('Perfil')
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 409) {
          showErrorToast(
            'O e-mail ou CPF informado já pertence a outro usuário.',
            error.message,
          );
        } else {
          showErrorToast('Houve um Erro', error.message);
        }
      }
    }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await api.get('/user', {
          headers: getAuthorization(auth.token),
        });
        setUser(res.data);

        setEmail(res.data.email || '');
        setName(res.data.name || ''),
        setPassword(String(auth.user.password))
      } catch (error) {
        console.error('Erro ao buscar Usuario', error);
      }
    };
    console.log(user);
    getUser();
  }, [auth.token]);

    

  return (
    <KeyboardAvoidingContent>
      <View style={styles.container}>
        <CustomHeader text="Atualizar Perfil" ComeBack={'Perfil'} />

        <CustomImagePicker 
          type='Profile' 
          uri={user?.avatar}
          onImageChange={handleImageChange}
        />

        <View style={styles.form}>
          <Input.Root isError={nameError} style={{marginTop: 20}}>
            <Input.Label required>Nome Completo</Input.Label>
            <Input.Input
              placeholder="Ex.: Joao Pessoa"
              value={name}
              onChangeText={text => {
                setName(text);
                setNameError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com seu nome
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={false} style={{marginTop: 10}}>
            <Input.Label required>CPF</Input.Label>
            <Input.Input
              value={user?.cpf}
              keyboardType="numeric"
              placeholder="Ex.: 111.111.1111-12"
              editable={false}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com seu CPF
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={emailError} style={{marginTop: 10}}>
            <Input.Label required>E-mail</Input.Label>
            <Input.Input
              value={email}
              placeholder="Ex.: nome@email.com"
              onChangeText={text => {
                setEmail(text);
                setEmailError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com seu e-mail
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={passwordError} style={{marginTop: 10}}>
            <Input.Label required>Senha</Input.Label>
            <Input.Input
              value={password}
              placeholder="Ex.: nome123"
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry
              onChangeText={text => {
                setPassword(text);
                setPasswordError(false);
              }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com a sua senha
            </Input.ErrorMessage>
          </Input.Root>

          <View style={styles.customPreference}>
            <CustomPreferences text="Preferências" categoryId={''} selection='EditProfile'/>
          </View>

          <Button.Root
            onPress={handleEdit}
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
          <Button.Root
            style={{
              marginBottom: 25,
              width: '88%',
              height: 44,
              alignSelf: 'center',
            }}
            onPress={() => setModalVisible(true)}
            type="ghost">
            <Button.Label>Desativar Conta</Button.Label>
          </Button.Root>
          <ModalDesactive visible={modalVisible} onClose={() => setModalVisible(false)} />

        </View>
      </View>
    </KeyboardAvoidingContent>
  );
}

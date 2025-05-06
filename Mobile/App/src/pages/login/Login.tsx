import {Image, View} from 'react-native';
import {styles} from './style';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import TextLink from '../../components/TextLink/TextLink';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import {AppText} from '../../components/Text/Text';
import KeyboardAvoidingContent from '../../components/KeyBoardAvoidingContent/KeyBoardAvoidingContent';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import useAppContext from '../../hooks/useAppContext';

const logo = require('../../assets/image/logoMobile.png');


export default function Login() {
  const navigation = useTypeNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { auth: { login } } = useAppContext();


  function verifyEmail() {
    if (!email) return false;
    const atIndex = email.indexOf('@');
    if (atIndex <= 0 || atIndex === email.length - 1) return false;
    const dotIndex = email.indexOf('.', atIndex);
    if (dotIndex === -1 || dotIndex === email.length - 1) return false;
    return true;
}

  function showErrorToast(title: string, message: string){
    Toast.show({
      type: 'error',
      text1: title,
      text2: message
    })
  }

  async function handleLogin(){
    try{
      let isError = false;

      if(!verifyEmail())
      {
        setEmailError(true);
        isError = true;
      }

      if(password.length < 6){
        setPasswordError(true);
        isError = true;
      }

      if(isError) return;
      login && await login(email, password)
    }
    catch(error: any){
      if (error.response) {
        const statusCode = error.response.status; 

        if (statusCode === 401) {
            showErrorToast("Senha incorreta", error.message);
        } if (statusCode === 403) {
            showErrorToast("Esta conta foi desativada e não pode ser utilizada", error.message);
        } if (statusCode === 404) {
            showErrorToast("Usuário não encontrado", error.message);
        } 
    } else {
        
        showErrorToast('Houve um Erro', error.message);
    }
    }
  }

  return (
    <KeyboardAvoidingContent>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.header}>
          <AppText variant="title">Faça Login e comece a treinar</AppText>
          <AppText style={styles.subTitle}>
            Encontre parceiros para treinar ao ar livre. Conecte-se e comece
            agora! 💪
          </AppText>
        </View>
        <View style={styles.form}>
          <Input.Root isError={emailError}>
            <Input.Label required>E-mail</Input.Label>
            <Input.Input placeholder="Ex.: nome@email.com" 
            value={email}
            onChangeText={(text) =>{
              setEmail(text)
              setEmailError(false)
            }}
            autoCapitalize='none' />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com seu e-mail
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={passwordError} style={{marginTop: 6}}>
            <Input.Label required>Senha</Input.Label>
            <Input.Input
            value={password}
            onChangeText={(text) =>{
              setPassword(text);
              setPasswordError(false)
            }}

              placeholder="Ex.: nome123"
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com sua senha
            </Input.ErrorMessage>
          </Input.Root>
          <Button.Root
          onPress={handleLogin}

            style={{
              marginTop: 40,
              marginBottom: 25,
              width: '80%',
              height: 44,
              alignSelf: 'center',
            }}
            type="default">
            <Button.Label>Entrar</Button.Label>
          </Button.Root>
          <TextLink
            onPress={() => navigation.navigate('Cadastro')}
            simpleText="Ainda não tem uma conta?"
            boldText=" Cadastre-se"
          />
        </View>
      </View>
    </KeyboardAvoidingContent>
  );
}

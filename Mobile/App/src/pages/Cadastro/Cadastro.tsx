import {View} from 'react-native';
import {useTypeNavigation} from '../../hooks/useTypeNavigation';
import Arrow from '../../components/CustomArrow/Arrow';
import {styles} from './style';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import TextLink from '../../components/TextLink/TextLink';
import {AppText} from '../../components/Text/Text';
import KeyboardAvoidingContent from '../../components/KeyBoardAvoidingContent/KeyBoardAvoidingContent';
import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';
import api, { getHeaders } from '../../api/api';

export default function Cadastro() {

      const register = useCallback(async (email: string, password: string, cpf: string, name: string ) => {
      try {
        const data = {
          email,
          password,
          cpf,
          name
      };

      const response = await api.post('/auth/register', JSON.stringify(data), { headers: getHeaders() });
      const responseData: any = response.data;
      console.log(responseData);
      }catch(error: any){
        throw error;
      }
    }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCPF] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpfError, setCpfError] = useState(false);
  const [nameError, setNameError] = useState(false);


  function verifyEmail() {
    if (!email) return false;
    const atIndex = email.indexOf('@');
    if (atIndex <= 0 || atIndex === email.length - 1) return false;
    const dotIndex = email.indexOf('.', atIndex);
    if (dotIndex === -1 || dotIndex === email.length - 1) return false;
    return true;
  }

  function verifyCpf() {
    if (!cpf) return false;
    if (cpf.length !== 11) return false;
    for (let i = 0; i < cpf.length; i++) {
      if (cpf[i] < '0' || cpf[i] > '9') return false;
    }
    return true;
  }

  function verifyName() {
    if (!name) return false;
    if (name.length < 6) return false;
    if (!name.includes(' ')) return false; 
    return true;
  }



 function showErrorToast(title: string, message: string){
    Toast.show({
      type: 'error',
      text1: title,
      text2: message
    })
  }

  async function handleRegister() {
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

        if(!verifyCpf()){
          setCpfError(true);
          isError = true;
        }

        if(!verifyName()){
          setNameError(true);
          isError = true
        }

  
        if(isError) return;
        register && await register(email, password, cpf, name)
        navigation.navigate('Login')
    }
    catch(error: any){
      if (error.response) {
        const statusCode = error.response.status; 

        if (statusCode === 409) {
            showErrorToast("O e-mail ou CPF informado já pertence a outro usuário.", error.message);
    } else {
        
        showErrorToast('Houve um Erro', error.message);
    }
    
  }}}

  const navigation = useTypeNavigation();
  return (
    <KeyboardAvoidingContent>
      <View style={styles.container}>
        <View style={styles.Arrow}>
          <Arrow
            color="#171717"
            onPress={() => navigation.navigate('Login')}></Arrow>
        </View>

        <View style={styles.header}>
          <AppText variant="title">Crie Sua Conta</AppText>
          <AppText style={styles.subTitle}>
            Por favor preencha os dados para prosseguir!
          </AppText>
        </View>

        <View style={styles.form}>
          <Input.Root isError={nameError} style={{marginTop: 20}}>
            <Input.Label required>Nome Completo</Input.Label>
            <Input.Input placeholder="Ex.: Joao Pessoa" 
             value={name}
             onChangeText={(text) =>{
               setName(text)
               setNameError(false)
             }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com seu nome
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={cpfError} style={{marginTop: 10}}>
            <Input.Label required>CPF</Input.Label>
            <Input.Input
              keyboardType="numeric"
              placeholder="Ex.: 111.111.1111-12"
              value={cpf}
              onChangeText={(text) =>{
                setCPF(text)
                setCpfError(false)
              }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com seu CPF
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={emailError} style={{marginTop: 10}}>
            <Input.Label required>E-mail</Input.Label>
            <Input.Input placeholder="Ex.: nome@email.com" 
            value={email}
            onChangeText={(text) =>{
              setEmail(text)
              setEmailError(false)
            }}/>
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com seu e-mail
            </Input.ErrorMessage>
          </Input.Root>

          <Input.Root isError={passwordError} style={{marginTop: 10}}>
            <Input.Label required>Senha</Input.Label>
            <Input.Input
              placeholder="Ex.: nome123"
              autoCapitalize="none"
              autoComplete="off"
              secureTextEntry

              value={password}
              onChangeText={(text) =>{
                setPassword(text)
                setPasswordError(false)
              }}
            />
            <Input.ErrorMessage style={{marginTop: 6}}>
              Preencha o campo com a sua senha
            </Input.ErrorMessage>
          </Input.Root>

          <Button.Root
          onPress={handleRegister}

            style={{
              marginTop: 40,
              marginBottom: 25,
              width: '80%',
              height: 44,
              alignSelf: 'center',
            }}
            type="default">
            <Button.Label>Cadastrar</Button.Label>
          </Button.Root>
          <TextLink
            onPress={() => navigation.navigate('Login')}
            simpleText="Já possui uma conta?"
            boldText=" Login"
          />
        </View>
      </View>
    </KeyboardAvoidingContent>
  );
}

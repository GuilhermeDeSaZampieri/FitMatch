import React, { useContext, useState } from 'react';
import {View, Modal, Text} from 'react-native';
import {styles} from './style';
import {AppText} from '../Text/Text';
import {Button} from '../Button/Button';
import api, { getAuthorization } from '../../api/api';
import { AppContext } from '../../context/App';

export const deactivateUserAccount = async (token: any) => {
  try {
    const response = await api.delete('/user/deactivate', {
      headers: getAuthorization(token),
    });
    
    return response.data; 
  } catch (error) {
    console.error('Erro ao desativar conta:', error);
    throw error;
  }
};

interface ModalProp {
  visible: boolean;
  onClose: () => void;
}

export function ModalDesactive({ visible, onClose }: ModalProp) {
  const { auth } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleDeactivateAccount = async () => {
    try {
      setLoading(true);
      await deactivateUserAccount(auth.token);
      
      auth.logout && auth.logout();
      
      onClose();
    } catch (error) {
      console.error('Erro ao desativar conta:', error);
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <AppText variant="titleAchievements">
            Deseja desativar sua conta?
          </AppText>
          
          <View style={styles.buttonContainer}>
            <Button.Root 
              type='ghost' 
              onPress={onClose}
              style={styles.cancelButton}
              disabled={loading}
            >
              <Button.Label>Cancelar</Button.Label>
            </Button.Root>
            
            <Button.Root 
              type='default' 
              onPress={handleDeactivateAccount}
              style={styles.confirmButton}
              disabled={loading}
            >
              <Button.Label>{loading ? 'Desativando...' : 'Confirmar'}</Button.Label>
            </Button.Root>
          </View>
        </View>
      </View>
    </Modal>
  );
}
import {View} from 'react-native';
import {styles} from './style';
import Arrow from '../../components/CustomArrow/Arrow';
import { AppText } from '../../components/Text/Text';
import { useTypeNavigation } from '../../hooks/useTypeNavigation';


interface CreateActivityProp{
    text: string,
    ComeBack: any
}

export function CustomHeader({text, ComeBack}: CreateActivityProp) {

const navigation = useTypeNavigation();
  return (
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <Arrow onPress={() => navigation.navigate(ComeBack)}></Arrow>
          <AppText variant="title">{text}</AppText>
        </View>
      </View>
  );
}

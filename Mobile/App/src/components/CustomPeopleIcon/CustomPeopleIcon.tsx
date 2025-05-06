import {View} from 'react-native';
import {styles} from './style';
import { IconProps, UsersThree} from 'phosphor-react-native';
import { AppText } from '../Text/Text';

interface IconPeopleProps extends IconProps {
  data: number,
}

export default function CustomPeopleIcon({
  style,
  size,
  weight,
  data,
  ...props
}: IconPeopleProps) {
  
  return (
    <View style={styles.container}>
        <UsersThree {...props} size={size} weight={weight} style={style}/>
        <AppText variant='small'>{data}</AppText>
    </View>
  );
}

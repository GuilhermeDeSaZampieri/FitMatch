import { View} from 'react-native';
import {styles} from './style';
import {CalendarDots, IconProps} from 'phosphor-react-native';
import { AppText } from '../Text/Text';

interface calendarProps extends IconProps {
  data: string
}

export default function CustomDate({
  style,
  size,
  weight,
  data,
  ...props
}: calendarProps) {
  return (
    <View style={styles.container}>
        <CalendarDots {...props} size={size} weight={weight} style={style}/>
        <AppText variant='small'>{data}</AppText>
        
    </View>
  );
}''

import {TouchableOpacity} from 'react-native';
import {styles} from './style';
import {CaretLeft, IconProps} from 'phosphor-react-native';

interface ArrowProps extends IconProps {
  onPress: () => void;
  color?: string;
}

export default function Arrow({
  onPress,
  color,
  size = 32,
  weight = "bold",
  ...props
}: ArrowProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <CaretLeft {...props} color={color ?? '#191919'} size={size} weight={weight}/>
    </TouchableOpacity>
  );
}

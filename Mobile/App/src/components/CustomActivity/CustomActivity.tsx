import {ActivityIndicator, FlatList, View} from 'react-native';
import {styles} from './style';
import {CustomImage} from '../CustomImage/CustomImage';
import CustomDate from '../CustomDateIcon/CustomDate';
import CustomPeopleIcon from '../CustomPeopleIcon/CustomPeopleIcon';
import {Text} from 'react-native-gesture-handler';
import {LockSimple} from 'phosphor-react-native';
import {AppText} from '../Text/Text';
import { Activity, ActivityListProps } from '../../models/Activity';
import { formatDate } from '../CustomDatePicker/CustomDatePicker';




function ActivityItem({item}: {item: Activity}){
  return(
    <View style={styles.container}>
        <CustomImage.Root type="imgActivity"
        uri={item.image} />
        {item.private && (
          <View style={styles.backLock}>
            <LockSimple color="white" size={17} />
          </View>
        )}

        <View style={styles.box}>
          <AppText variant="titleActivity">{item.title}</AppText>
          <View style={styles.descImg}>
            <CustomDate data={formatDate(item.createdAt)} color="#009966" />
            <Text>|</Text>
            <CustomPeopleIcon data={item.participantCount} color="#009966" />
          </View>
        </View>
      </View>
  )
}

function ActivityRow({items}: {items: Activity[]}) {
  return (
    <View style={styles.rowContainer}>
      {items.map((item) => (
        <ActivityItem key={item.id.toString()} item={item} />
      ))}
    </View>
  );
}

export function CustomActivity({data,
  loading = false,
  refreshing = false}: ActivityListProps) {

    if (loading && !refreshing) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#009966" />
        </View>
      );
    }
    const groupedData: Activity[][] = [];
    for (let i = 0; i < data.length; i += 2) {
      const pair = data.slice(i, i + 2);
      groupedData.push(pair);
    }

    return (
      <FlatList
      style={styles.flatList}
      horizontal
        data={groupedData}
        keyExtractor={(_,index) => `row-${index}`}
        renderItem={({ item }) => <ActivityRow items={item} />}
        refreshing={refreshing}
        showsHorizontalScrollIndicator={false}
      />
    );
}

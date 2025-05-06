import {Dimensions, FlatList, Image, View} from 'react-native';
import {styles} from './style';
import {AppText} from '../Text/Text';
import { User } from '../../models/User';

const icon = require('../../assets/image/Icon.png');
const trophy = require('../../assets/image/trophyMedal.png');
const medal = require('../../assets/image/medal.png');

interface ProfileStatusBoxProps {
  user: User;
}

function ProfileStatusBox({user}: ProfileStatusBoxProps) {
  const progress = (user.xp / 1000) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={icon} />
      </View>
      <View style={styles.row}>
        <View style={styles.level}>
          <AppText variant="levelSmall">Seu nível é</AppText>
          <AppText variant="level">{user.level}</AppText>
        </View>
        <Image source={trophy} style={{width: 140, height: 75}} />
      </View>
      <View>
        <View style={styles.row}>
          <AppText style={styles.PointsNextLevel} variant="pointsNextLevel">
            Pontos para o próximo nível
          </AppText>
          <View style={styles.points}>
            <AppText variant="pointsCount">{user.xp}/1000</AppText>
            <AppText variant="ptsPointsCount">pts</AppText>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: `${progress}%`}]} />
          </View>
        </View>
      </View>
    </View>
  );
}

function renderMedalCard(ac: any) {
  return (
    <View
      style={{
        width: 120,
        height: '100%',
        alignSelf: 'center',
        marginHorizontal: 20,
        marginTop: 10,
      }}>
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 110 / 2,
          backgroundColor: '#D9D9D9',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={medal} style={{width: 65, height: 90}} />
      </View>
      <View>
        <AppText style={{textAlign: 'center', marginBottom:2}} variant="titleAchievements">
          {ac.name}
        </AppText>
        <AppText style={{textAlign: 'center'}} variant="medal">
          {ac.criterion}
        </AppText>
      </View>
    </View>
  );
}

function MedalBox({user}: ProfileStatusBoxProps) {
  const groupedAchievements: any[][] = [];

  if (user.achievements) {
    for (let i = 0; i < user.achievements.length; i += 2) {
      groupedAchievements.push(user.achievements.slice(i, i + 2));
    }
  }

  return (
    <View
      style={[
        styles.container,
        {alignContent: 'center', justifyContent: 'center'},
      ]}>
      <FlatList
        data={groupedAchievements}
        keyExtractor={(__, index) => `group-${index}`}
        renderItem={({item}) => (
          <View
            style={{
              height: 230,
              width: '85%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            {item.map((ac, index) => (
              <View style={{paddingHorizontal: 10}} key={ac.name + '_' + index}>
                {renderMedalCard(ac)}
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        pagingEnabled
        nestedScrollEnabled
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 230,
            }}>
            <AppText
              variant='titleAchievements'>
              Você ainda não possui medalhas
            </AppText>
          </View>
        )}
      />
    </View>
  );
}

export default function Carousel({user} : ProfileStatusBoxProps) {
  const components = [
    <ProfileStatusBox user={user} key="profile-status" />,
    <MedalBox user={user} key="medal-box" />,
  ];

  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
      <FlatList
        data={components}
        keyExtractor={(__, index) => `page-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={item => (
          <View
            style={{
              width: Dimensions.get('window').width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {item.item}
          </View>
        )}
      />
    </View>
  );
}

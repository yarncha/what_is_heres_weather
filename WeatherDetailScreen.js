import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', 'Unknown');

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=3623c76773a67a92ce292b38ce60386a')
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

    render() {
        if (this.state.isLoading) {
          return (
 <View style={styles.loadingContainer}>
              <Image
              style={{ width: 250,height: 250,}}
              source={{uri: 'https://raw.githubusercontent.com/yarncha/Team_19/master/Ripple-1s-200px.gif'}}
               />
            </View>
          )
        }

        let celsius = this.state.main.temp - 273.15;
        let min = this.state.main.temp_min - 273.15;
        let max = this.state.main.temp_max - 273.15;

        let country = this.state.sys.country;
        let region = this.state.name;
        let icon = this.state.weather[0].icon;

      let wind = this.state.wind.speed;
      let humidity = this.state.main.humidity;
      let cloud = this.state.clouds.all;
        if(icon.substring(0, 2)=='01')
            icon = "fair";
        else if(icon.substring(0, 2)=='02')
            icon = "cloudy1";
        else if(icon.substring(0, 2)=='03' || icon.substring(0, 2)=='04')
            icon = "cloudy4";
        else if(icon.substring(0, 2)=='09' || icon.substring(0, 2)=='10')
            icon = "rain";
        else if(icon.substring(0, 2)=='11')
            icon = "storm";
        else if(icon.substring(0, 2)=='13')
            icon = "snow";
        else if(icon.substring(0, 2)=='50')
            icon = "fog";

        return (
        <View style={{flex: 1}}>
          <View style={{flex: 2, backgroundColor: 'powderblue',flexDirection: 'row'}}>
            <View style={styles.temperatureContainer}>
            <Image
             style={
             {
               width: 70,
               height: 70,
               resizeMode: 'contain',
               justifyContent: 'center',
               alignItems: 'center',
               left : 30,
             }}
             source={{uri: 'https://raw.githubusercontent.com/yarncha/Team_19/master/temperature.png'}}
           />
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.bigWhite}>{celsius.toFixed(1)}℃</Text>
            </View>
            <View style={styles.locationContainer}>
              <Text style={styles.white}>min {min.toFixed(1)}℃</Text>
              <Text style={styles.white}>max {max.toFixed(1)}℃</Text>
            </View>
          </View>
                    <View style={{flex: 2, backgroundColor: 'skyblue', alignItems:'center', justifyContent: 'center',}}>
          <Image
             style={
             {
               width: 130,
               height: 130,
               resizeMode: 'contain',
               justifyContent: 'center',
               alignItems: 'center',
             }}
             source={{uri: 'https://raw.githubusercontent.com/yarncha/Team_19/master/'+icon+'.png'}}
           />
          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue'}}>
          <View style={styles.locationContainer}>
          <Text style={styles.locationText}>위치: {region}, {country}</Text>
          </View>
          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue', flexDirection: 'row'}}>
          <View style={styles.temperatureContainer}>
                     <Image
                     style={{width: 50, height: 50, resizeMode: 'contain'}}
                     source={{uri: 'https://raw.githubusercontent.com/yarncha/Team_19/master/wind.png'}}
                     />
                      </View>
                      <View style={styles.temperatureContainer}>
                     <Image
                     style={{width: 50, height: 50, resizeMode: 'contain'}}
                     source={{uri: 'https://raw.githubusercontent.com/yarncha/Team_19/master/humidity.png'}}
                     />
                      </View>
                      <View style={styles.temperatureContainer}>
                     <Image
                     style={{width: 50, height: 50, resizeMode: 'contain'}}
                     source={{uri: 'https://raw.githubusercontent.com/yarncha/Team_19/master/clouds.png'}}
                     />
                      </View>

          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue', flexDirection: 'row'}}>
<View style={styles.temperatureContainer}>
             <Text style={styles.white}>   {wind.toFixed(1)}</Text>
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.white}>   {humidity.toFixed(1)}</Text>
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={styles.white}>   {cloud.toFixed(1)}</Text>
            </View>
          </View>
        </View>
        );
      }
}

const styles = StyleSheet.create({

    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: 15,
    },
    bigWhite: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
    },
    white: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    locationContainer: {
        flex: 1,
        backgroundColor: 'steelblue',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    temperatureContainer: {
        flex: 1,
        backgroundColor: 'powderblue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
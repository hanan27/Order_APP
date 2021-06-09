import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import vars from '../../utils/vars';
import Api from '../../config/api';
import sharedStyle from '../../utils/sharedStyles';
import moment from 'moment';
import { Dropdown } from 'react-native-material-dropdown';

class Branch extends Component {
    static navigationOptions = ({navigation}) => ({
        headerLeft:
        <TouchableOpacity style={{paddingLeft:9}} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" style={{color:'white'}} />
        </TouchableOpacity>
      });
    
    constructor() {
        super();
        this.state = {
            id: '',
            branches: [],
            cities: [],
            time: [],
            selected: '',
            types: [{value: 'طلب محلي'}, {value: 'طلب خارجي'}],
            type: '',
            loading: true
        }
    }

    componentDidMount(){
        Api.get('/branches').then(res => {
            this.setState({branches: res.branches})
        }).catch(function(err) {
            console.log('error: ', err);
        });
        Api.get('/cities').then(res => {
            this.setState({cities: res.cities, loading: false})
        }).catch(function(err) {
            console.log('error: ', err);
        });

        const timelineLabels = (desiredStartTime, interval, period) => {
            const periodsInADay = moment.duration(1, 'day').as(period);
            const timeLabels = [];
            const startTimeMoment = moment(desiredStartTime, 'HH:mm');
            for (let i = 0; i <= periodsInADay; i += interval) {
                startTimeMoment.add(i === 0 ? 0 : interval, period);
                timeLabels.push(startTimeMoment.format('HH:mm'));
            }
            return timeLabels;
        };
        
        var min = moment().add(12, 'm').format('HH:mm'), max = '01:40:00'
        const hours = timelineLabels('14:00', 15, 'm').filter(a => a > min )
        const arr = [];
        const time = hours.map((item) => arr.push({value: item}))
        this.setState({time: arr})
    }

    getCity = (hid) => {
        return this.state.cities.find(x => x.hid === hid).name.ar
    }

    done = () => {
        const due_time = moment().format('YYYY-MM-DD') + ' ' + this.state.selected + ':00'
        const test = this.state.type === 'طلب محلي' ? 1 : 2
        console.log(due_time, test)
        this.props.navigation.navigate('Invoice', {branch_hid: '_52791d67', due_time: due_time, type: test})
    }

     address = (latitude, longitude) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=en&key=AIzaSyDpY6AFH4M_ni3exgVWQJ3MHfCkHPSV3Tw`;
        // fetch(url).then(res => {
        //    res.json().then(responseJson => {
        //        return (responseJson.results[0].formatted_address)
        //     })
        // })
        // const response = await fetch(url);
        // const payload = await response.json();
        // const data = payload.results[0];
        // console.log(payload.results[0])
        // return data.formatted_address
    }

    render(){
        return(
            <View style={{flex: 1, backgroundColor: vars.bgColor, paddingHorizontal: 25, paddingVertical: 15}}>
                {!this.state.loading ?
                <React.Fragment>
                    <View style={{height: 'auto'}}>
                        <Text style={styles.txt}>اختيار الفرع</Text>
                        <FlatList
                            style={styles.root}
                            data={this.state.branches}
                            extraData={this.state}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={styles.separator} />
                                )
                            }}
                            keyExtractor={(item) => {
                                return item.hid;
                            }}
                            renderItem={({item}) => {
                                return (
                                <View>
                                    <TouchableOpacity style={[styles.container, sharedStyle.shadow, {backgroundColor: this.state.id === item.hid ? '#d3d3d3' : 'white', borderColor: this.state.id === item.hid ? 'white' : 'transparent', borderWidth: this.state.id === item.hid ? 2 : 0}]} 
                                        onPress={() => this.setState({id: item.hid})}
                                    >
                                        <Text style={styles.name}>{item.name.ar}</Text>
                                        <View style={styles.content}>
                                            <Text style={{textAlign:'right', color: '#545454'}}>{this.getCity(item.city.hid)}</Text>
                                            {/* <Text>{this.address(item.latitude, item.longitude)}</Text> */}
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.container, sharedStyle.shadow, {backgroundColor: 'white'}]} >
                                        <Text style={styles.name}>الفرع</Text>
                                        <View style={styles.content}>
                                            <Text style={{textAlign:'right'}}>المدينة</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                );
                            }} 
                        />
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <Dropdown
                            label='اختيار الوقت'
                            data={this.state.time}
                            value={this.state.selected}
                            onChangeText={(value, index, data) => this.setState({selected: value})}
                            inputContainerStyle={{ alignItems: 'flex-end' }}
                            style={{textAlign: 'right'}}
                            baseColor={vars.baseColor}
                            lineWidth={1}
                            textColor={'grey'}
                        />
                        <Dropdown
                            label='اختيار نوع الطلب'
                            data={this.state.types}
                            value={this.state.type}
                            onChangeText={(value, index, data) => this.setState({type: value})}
                            inputContainerStyle={{ alignItems: 'flex-end' }}
                            style={{textAlign: 'right'}}
                            baseColor={vars.baseColor}
                            lineWidth={1}
                            textColor={'grey'}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent:'flex-end', alignItems:'center', marginBottom: 30}}>
                        <TouchableOpacity style={styles.btn} onPress={() => this.done()}>
                            <Text style={styles.textbtn}>متابعة الطلب </Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
                : null }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: vars.bgColor,
        marginTop: 15,
    },
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'column',
        alignItems: 'flex-end',
        margin: 5,
        marginTop: 5,
        borderRadius: 10,
    },
    content: {
        margin: 2,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    name: {
        textAlign:'right',
        fontSize: 16,
        fontWeight: "bold",
        color: '#545454'
    },
    btn:{
        backgroundColor:vars.baseColor,
        width: 170,
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        alignSelf: 'center'
      },
    textbtn:{
        color:vars.white,  
        fontSize: 14,
        fontWeight:'bold'
    },
    txt: {
        textAlign: 'right', 
        color: vars.baseColor,
        fontWeight: '600'
    }
});  

export default Branch;
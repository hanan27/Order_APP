
import {View, FlatList, StyleSheet, Image, Dimensions} from 'react-native';
import React, { Component } from 'react';
import vars from '../../utils/vars';
import {CategoryTab, ProductCard} from '../../components';
import Api from '../../config/api';
import Carousel from 'react-native-snap-carousel';
import {observer} from 'mobx-react/native';

const width =  Dimensions.get('screen').width;

@observer
class Home extends Component {
    state = {
        categories: [],
        products: [],
        activeTab: '',
        loading: true,
        productData: []
    }

    ready(){
        this.setState({
            productData: this.state.products.filter(product => product.category.hid === this.state.activeTab),
            loading: false,
        })
    }

    async componentDidMount(){
        await Api.get('/categories').then(res => {
            this.setState({categories: res.categories, activeTab: res.categories[0].hid})
        }).catch(function(err) {
            console.log('error: ', err);
        });
        await Api.get('/products').then(res => {
            this.setState({
                products: res.products, 
            })
        }).catch(function(err) {
            console.log('error: ', err);
        });

        this.ready();
    }

    _renderItem ({item, index}) {
        return (
            <Image 
                source = {{uri: item.pic}} 
                style = {{width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 20}}
            />
        );
    }

    render() {
        const {categories, products, activeTab, productData} = this.state;
        return (
            <View style={styles.wrapper}>
                <View style={{backgroundColor: vars.baseColor, height: 120, borderBottomLeftRadius: 70, borderBottomRightRadius: 70,}}></View>
                <View style={{ height: 80, }}></View>
                {this.state.loading ? null :
                <React.Fragment>
                    <View style={{height: 190, marginVertical: 10, zIndex: 0, position: 'absolute'}}>
                        <Carousel
                            data={[
                                {pic: 'https://www.keyshotels.com/uploads/offer/0005162001471860750.jpg'},
                                {pic: 'https://www.tunehotels.com/wp-content/uploads/1245-x-467.jpg'},
                                {pic: 'https://www.interstatehotels.com/wp-content/uploads/2018/03/News-Vegetarian.jpg'}
                            ]}
                            renderItem={this._renderItem}
                            ref={(c) => { this._carousel = c; }}
                            layout={'default'}
                            sliderWidth={width}
                            itemWidth={width - 60}
                            loop={true}
                        />
                    </View>
                    <View style={{height: 75}}>
                        <CategoryTab 
                            data={categories}
                            activeTab={activeTab}
                            onChange={activeTab => 
                                this.setState({
                                    activeTab, 
                                    productData: products.filter(product => product.category.hid === activeTab)
                                })
                            }
                        />
                    </View>
                    <FlatList 
                        data={productData} 
                        renderItem={({item}) => <ProductCard { ... item} navigation={this.props.navigation} />}
                        keyExtractor= {(item) => item.hid}
                        numColumns={2}
                        style={{ marginTop: 15, alignSelf:'center', }}
                        contentContainerStyle={{alignItems:'flex-end'}}
                        showsVerticalScrollIndicator={false}
                    />
                </React.Fragment>
                }
            </View>
          
    );
  }
}


export default Home;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: vars.bgColor,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        color: "#fff",
        fontSize: 30,
        fontWeight: 'bold',
    },
    btn:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: vars.baseColor,
        padding: 20,
        margin: 10,
        marginBottom: 80,
        borderRadius: 100,
        marginHorizontal: 10,
        height:10,
        width:90,
    },
    txt: {
        color:'white',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        marginBottom: 15,
        marginRight: 5,
        width:150,
        fontWeight: 'bold'
    },
})

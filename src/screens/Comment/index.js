import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating';


export default class Comment extends Component {


    constructor(props) {
        super(props);
        this.state = {
     
            loading: true,
          
            data: [
                { id: 1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name: "احمد ", comment: " تالبعفغقهعغافلبهعنتالقليءغعلنتاغ ؤغنوتابلقثيىل ءاةالوننمبىلبنعتلت بةعغبغفثغ الطعم رائع والخدمة متازه" },
                { id: 2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name: "John DoeLink", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name: "March SoulLaComa", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name: "Finn DoRemiFaso", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 5, image: "https://bootdey.com/img/Content/avatar/avatar3.png", name: "Maria More More", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 6, image: "https://bootdey.com/img/Content/avatar/avatar4.png", name: "Clark June Boom!", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
                { id: 7, image: "https://bootdey.com/img/Content/avatar/avatar5.png", name: "The googler", comment: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." },
            ]
        }


    };


    render() {
        return (

            <View style={{ flexDirection: 'column',}}>
                <View id='rating' style={{ padding: 5, }}>
                    <View style={{ flexDirection:'column', alignSelf:'center', alignItems: 'center', margin:5, }}>
                        <Text style={{fontSize:25,padding:8,}} > تقييمك يهمنا </Text>
                        <StarRating
                            starSize={20}
                            disabled={false}
                            maxStars={5}
                            fullStarColor={"black"}
                            emptyStarColor={"gold"}
                            rating={this.state.starCount}
                        />
                        <TextInput style={{padding:8,}} placeholder='عندك تعليق اضافي؟ (اختياري)' />
                    </View>
                </View>
                <FlatList
                    style={styles.root}
                    data={this.state.data}
                    extraData={this.state}
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={styles.separator} />
                        )
                    }}
                    keyExtractor={(item) => {
                        return item.id;
                    }}
                    renderItem={(item) => {
                        const Comment = item.item;
                        return (
                            <View style={styles.container}>

                                <View style={{flexDirection:'row'}}>
                                    <View style={{flexDirection:'column'}}>
                                        <Text style={styles.name}>{Comment.name}</Text>
                                        <View style={{flexDirection: 'row-reverse'}}>
                                            <StarRating
                                                starSize={15}
                                                disabled={false}
                                                maxStars={5}
                                                fullStarColor={"black"}
                                                emptyStarColor={"gold"}
                                                rating={this.state.starCount}
                                            />
                                        </View>
                                    </View>
                                    <Image style={styles.image} source={{ uri: Comment.image }} />
                                </View>
                                <View style={styles.content}>
                                    <Text style={{textAlign:'right'}}>{Comment.comment}</Text>
                                </View>
                                
                            </View>

                        );
                    }} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff",
        marginTop: 10,
    },
    container: {
        paddingLeft: 19,
        paddingRight: 16,
        paddingVertical: 12,
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    content: {
        margin: 2,
        flex: 1,
    },
    contentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
        alignItems: 'center',

    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 45,
        height: 45,
        borderRadius: 20,
        marginLeft: 20
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        textAlign:'right',
        fontSize: 16,
        fontWeight: "bold",
    },
});  
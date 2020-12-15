import React from 'react';
import { StyleSheet, Text, View ,FlatList,TextInput, ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {Header} from 'react-native-elements';
import db from '../config'




export default class Read extends React.Component {
  constructor(){
    super();
    this.state ={
      allStories:[],
      dataSource:[],
      search : ''
    }
  }
  componentDidMount(){
    this.retrieveStories()
  }

  updateSearch = search => {
    this.setState({ search });
  };


  retrieveStories=()=>{
    try {
      var allStories= []
      var stories = db.collection("stories")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              allStories.push(doc.data())
          })
          this.setState({allStories})
        })
    }
    catch (error) {
      console.log(error);
    }
  };


  SearchFunction(text) {
   
     const newData = this.state.allStories.filter((item)=> {
     
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      
      dataSource: newData,
      search: text,
    });
  }

    render(){
      return(
        <View style ={styles.container}>
           <Header 
                backgroundColor = {'turquoise'}
                centerComponent = {{
                    text : 'Bed Time Stories',
                    style : { color: 'white', fontSize: 20}
                }}
            />
          <View styles ={{height:20,width:'100%'}}>
           <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.SearchFunction(text)}
              onClear={text => this.SearchFunction('')}
              value={this.state.search}

            />
          </View>   
          
          <FlatList
                data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text>  Title: {item.title}</Text>
                    <Text>  Author : {item.author}</Text>
                  </View>
                )}
               
                /> 
          
          
          
        </View>  
      );      
    }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: 'turquoise',
    padding:10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  itemContainer: {
    height: 80,
    width:'100%',
    borderWidth: 2,
    borderColor: 'turquoise',
    justifyContent:'center',
    alignSelf: 'center',
  }
})


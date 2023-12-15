import React, {View, Text, Image} from "react-native"

const Home = ({children}) => {
  return (
    <View className="body-dark py4">
      <View className="container">
        <View className="center">
          <Text className="white mt0">HAAPI demo application with React</Text>
        </View>

        {children}
      </View>
    </View>
  )
}

export default Home

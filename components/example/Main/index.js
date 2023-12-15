import React, {View} from "react-native"

const Main = ({children}) => {
  return (
    <View className="body-dark py4">
        {children}
    </View>
  )
}

export default Main

/*
 *  Copyright 2023 Curity AB
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { useState } from "react";
import HaapiProcessor from "./components/HaapiProcessor";
import Authenticated from "./components/Authenticated";
import Styles from "./Styles";
import { Image, SafeAreaView, ScrollView } from "react-native";

const App = () => {
    const [tokens, setTokens] = useState(null);
    const Header = () => {
        return <Image source={require("./images/curity-logo.png")} />;
    };

    return (
        <SafeAreaView style={Styles.layoutContainer}>
            <ScrollView>
                <Header />
                {tokens ? <Authenticated tokens={tokens} setTokens={setTokens} /> : <HaapiProcessor setTokens={setTokens} />}
            </ScrollView>
        </SafeAreaView>
    );
};

export default App;

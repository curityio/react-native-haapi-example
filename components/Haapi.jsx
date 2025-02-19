/*
 *   Copyright 2024 Curity AB
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

import {NativeModules} from "react-native";
import HaapiConfiguration from "../configuration";

export const {HaapiModule} = NativeModules;

HaapiModule.load(HaapiConfiguration).catch(e => {
    console.log(HaapiConfiguration);
    console.log(e.stack);
    console.error('Error in loading configuration', e);
});

export const startLogin = async () => {
    console.debug('Starting login');
    try {
        await HaapiModule.start();
    } catch (e) {
        console.debug('Error in starting HAAPI Login', e);
        console.error(e);
    }
};

export const submitAction = async (action, parameters = {}) => {
    console.debug('Submitting action: ' + JSON.stringify(action));
    try {
        await HaapiModule.submitForm(action, parameters);
    } catch (e) {
        console.debug('Error in submitting' + JSON.stringify(action));
        console.error(e);
    }
};

export const followLink = async model => {
    console.debug('Following link: ' + JSON.stringify(model));
    try {
        await HaapiModule.navigate(model);
    } catch (e) {
        console.debug('Error in following link' + JSON.stringify(model));
        console.error(e);
    }
};

export const logout = async () => HaapiModule.logout()

export const refreshAccessToken = async (refreshToken) => HaapiModule.refreshAccessToken(refreshToken)
/*
 *  Copyright 2022 Curity AB
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

import React from "react-native";

/* UI Components */
import { Layout, Page, Well, Logo } from "../ui-kit/ui-components";

export default function RedirectStep(props) {
  const { continueFlow, type } = props;
  return (
    <>
      <Layout>
        <Page>
          <Well>
            <Logo />
            <h1>{type ? type : 'Redirect'} step</h1>

            <p>
              Normally, a user will not be able to see this step. Click
              "Continue" to continue to the next step.
            </p>
            <button className="button button-primary button-fullwidth" onClick={continueFlow}>
              Continue
            </button>
          </Well>
        </Page>
      </Layout>
    </>
  );
}

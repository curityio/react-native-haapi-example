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

import React, { useState } from "react";

import { prettyPrintJson } from "pretty-print-json";
import FormElement from "../ui-kit/ui-components/FormElement";

export default function ShowRawResponse(props) {
  const [visible, setVisible] = useState(false);

  const { haapiResponse, forceVisibility } = props;

  // const isResponseVisible = visible || forceVisibility;

  return (
    <>
      <FormElement>
          {/* For now, the raw response is always displayed */}
          {/*<input
          type="checkbox"
          checked={isResponseVisible}
          name="showRaw"
          id="showRaw"
          className="mr1"
          onChange={() => setVisible(!isResponseVisible)}
        />
        <label htmlFor="showRaw">Show raw JSON response</label> */}
      </FormElement>
      <pre
        className="json-container"
        dangerouslySetInnerHTML={{
          __html: prettyPrintJson.toHtml(haapiResponse),
        }}
      ></pre>
    </>
  );
}

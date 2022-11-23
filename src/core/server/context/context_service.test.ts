/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { PluginOpaqueId, ExtensionOpaqueId } from '../../server';
import { MockContextConstructor } from './context_service.test.mocks';
import { ContextService } from './context_service';
import { CoreContext } from '../core_context';

const pluginDependencies = new Map<PluginOpaqueId, PluginOpaqueId[]>();
const extensionDependencies = new Map<ExtensionOpaqueId, ExtensionOpaqueId[]>();

describe('ContextService', () => {
  describe('#setup()', () => {
    test('createContextContainer returns a new container configured with pluginDependencies and extensionDependencies', () => {
      const coreId = Symbol();
      const service = new ContextService({ coreId } as CoreContext);
      const setup = service.setup({ pluginDependencies, extensionDependencies });
      expect(setup.createContextContainer()).toBeDefined();
      expect(MockContextConstructor).toHaveBeenCalledWith(pluginDependencies, coreId);
    });
  });
});

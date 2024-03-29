#!/bin/bash
# Copyright © 2023 SUSE LLC
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

S3GW_CLUSTER_IP=$(docker inspect k3d-s3gw-ui-testing-server-0 | jq -r '.[0]["NetworkSettings"]["Networks"]["s3gw-ui-testing"]["IPAddress"]')
S3GW_SYSTEM_DOMAIN="${S3GW_CLUSTER_IP}.omg.howdoi.website"
export S3GW_TEST_ENDPOINT=http://s3gw-ui-testing-s3gw-ui-testing.${S3GW_SYSTEM_DOMAIN}
echo -e "\e[32mUsing S3GW_TEST_ENDPOINT=$S3GW_TEST_ENDPOINT \e[0m"
cd src && tox -e py310-with-s3gw

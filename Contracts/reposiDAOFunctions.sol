// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract ReposiDAOFunctions is FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    bytes32 public lastRequestId;
    bytes public lastResponse;
    bytes public lastError;

    struct RequestStatus {
        bool fulfilled;
        bool exists;
        bytes response;
        bytes err;
    }
    mapping(bytes32 => RequestStatus) public requests;
    bytes32[] public requestIds;

    event Response(
        bytes32 indexed requestId,
        bytes response,
        bytes err
    );

    address router = 0xb83E47C2bC239B3bf370bc41e1459A34b41238D0;
    bytes32 donID = 0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000;
    uint32 gasLimit = 300000;
    uint64 public subscriptionId;

    string public source =
        "const apiResponse = await Functions.makeHttpRequest({"
        "url: `http://18.235.255.142/update-git-log`});" // Replace with actual API endpoint
        "if (apiResponse.error) {"
        "console.error(apiResponse.error);"
        "throw Error('Request failed');"
        "}"
        "const { data } = apiResponse;"
        "console.log('API response data:', JSON.stringify(data, null, 2));"
        "return Functions.encodeBytes(JSON.stringify(data));"; // Adjust return type as needed

    constructor(uint64 functionsSubscriptionId) FunctionsClient(router) {
        subscriptionId = functionsSubscriptionId;
    }

    function requestData() external returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);

        lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );

        requests[lastRequestId] = RequestStatus({
            exists: true,
            fulfilled: false,
            response: "",
            err: ""
        });
        requestIds.push(lastRequestId);

        return lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        require(requests[requestId].exists, "request not found");

        lastError = err;
        lastResponse = response;

        requests[requestId].fulfilled = true;
        requests[requestId].response = response;
        requests[requestId].err = err;

        emit Response(requestId, lastResponse, lastError);
    }

    // Additional helper functions as needed for accessing response data
}

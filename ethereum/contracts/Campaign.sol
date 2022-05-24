// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimumContribution, string memory campaignName) public {
        address newCampaign = address(new Campaign(minimumContribution, campaignName, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        uint approvalTolerance;
        bool complete;
        uint approvalCount;
        // Map of Addresses and wether or not have voted on this request
        mapping(address => bool) approvals;
        
    }

    address public manager;
    string public campaignName;
    uint public minimumContribution;
    Request[] public requests;

    // Map of contributor addresses and whether or not have contributed
    mapping(address  => bool) public contributors;
    uint public contributorsCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    constructor(uint _minimumContribution, string memory _campaignName, address _manager) {
        minimumContribution = _minimumContribution;
        campaignName = _campaignName;
        manager = _manager;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        contributors[msg.sender] = true;
        contributorsCount++;
    }

    function createRequest(string memory _description, uint _value, address payable _recipient, uint _approvalTolerance) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.approvalTolerance = _approvalTolerance;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    } 

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        // Rquire: sender has contributed
        require(contributors[msg.sender]);
        // Require: sender has not voted yet
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // Validate the approval tolerance.
        require(((request.approvalCount * 100) / contributorsCount) >= request.approvalTolerance);
        // Require it hasn't completed yet.
        require(!request.complete);

        // Send money to recipient
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getCampaignSummary() public view returns (string memory, uint, uint, uint, uint, address) {
        return (
            campaignName,
            address(this).balance, 
            minimumContribution, 
            requests.length, 
            contributorsCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}

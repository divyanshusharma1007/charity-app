// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract charity {
    string public charity_name;
    address payable charity_address;
    string public charity_for;

    struct Donation {
        string to_use;
        address by;
        string donnor_name;
        uint256 amount;
        uint256 timestamp;
    }

    Donation[] public donation;

    constructor(string memory _charity_name, string memory _charity_for) {
        charity_address = payable(msg.sender);
        charity_name = _charity_name;
        charity_for = _charity_for;
    }

    function donate(string memory _name, string memory _to_use) public payable {
        require(msg.value > 0, "kindly pay some amount");
        (bool sent, ) = charity_address.call{value: msg.value}(
            "error while transfer"
        );
        require(sent, "Failure while transfer");
        donation.push(
            Donation(_to_use, msg.sender, _name, msg.value, block.timestamp)
        );
    }
     function getdonation() public view returns(Donation[] memory){
            return donation;
        }
}

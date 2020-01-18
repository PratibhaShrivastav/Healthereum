pragma solidity >= 0.4.9;
pragma experimental ABIEncoderV2;

contract PatientRecords{

    struct Record {
        uint id;
        string hospitalname;
        string doctorname;
        string doctorspeciality;
        address addresss;
        uint date;
        string patientname;
        int age;
        string sex;
        string disease;
        string[] medicines;
    }

    mapping(uint => Record) Records;

    uint public totalRecords;

    constructor() public {
        totalRecords = 0;
    }
    function addData(string memory hospname,
                     string memory doctname,
                     string memory doctspecial,
                     address addresss,
                     uint date,
                     string memory patname,
                     int age,
                     string memory sex,
                     string memory disease,
                     string[] memory medicines
                     )public returns (uint){
        totalRecords++;
        Record memory Singlerecord = Record(totalRecords, hospname, doctname, doctspecial, addresss, date,
        patname, age, sex, disease, medicines);
        Records[totalRecords] = Singlerecord;
        return totalRecords;
    }

    function recordCount() public view returns (uint) {
        return totalRecords;
    }

    function showData(uint id) public view returns (string memory , string memory , string memory,address,
    uint, string memory, int, string memory, string memory, string[] memory) {
        Record memory SingleRecord = Records[id];
        return (SingleRecord.hospitalname,
                SingleRecord.doctorname,
                SingleRecord.doctorspeciality,
                SingleRecord.addresss,
                SingleRecord.date,
                SingleRecord.patientname,
                SingleRecord.age,
                SingleRecord.sex,
                SingleRecord.disease,
                SingleRecord.medicines);
    }

}
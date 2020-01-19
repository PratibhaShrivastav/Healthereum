pragma solidity >= 0.4.9;
pragma experimental ABIEncoderV2;

contract PatientRecords{

    struct Record {
        uint id;
        string hospitalname;
        string doctorname;
        string doctorspeciality;
        string addresss;
        string date;
        string patientname;
        string age;
        string sex;
        string disease;
        string medicines;
    }

    mapping(uint => Record) Records;

    uint public totalRecords;

    constructor() public {
        totalRecords = 0;
    }
    function addData(string memory hospitalname,
                     string memory doctname,
                     string memory doctspecial,
                     string memory addresss,
                     string memory date,
                     string memory patname,
                     string memory age,
                     string memory sex,
                     string memory disease,
                     string memory medicines
                     )public returns (uint){
        totalRecords++;
        Record memory Singlerecord = Record(totalRecords, hospitalname, doctname, doctspecial, addresss, date,
        patname, age, sex, disease, medicines);
        Records[totalRecords] = Singlerecord;
        return totalRecords;
    }

    function recordCount() public view returns (uint) {
        return totalRecords;
    }

    function showData(uint id) public view returns (string memory , string memory , string memory,string memory,
    string memory, string memory, string memory, string memory, string memory, string memory) {
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
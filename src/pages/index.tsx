import Overview from "@/components/Overview";
import Table from "@/components/Table";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { useState, ChangeEvent, useEffect } from "react";

export type dataTypes = {
  id: string,
  petname: string,
  pawrent: string,
  breed: string,
  gender: string,
  dateOfBirth: string | Date,
  contactNo: string,
  address: string,
  township: string,
  city: string,
  status: string
}

export default function Home() {
  const [data, setData] = useState<dataTypes[]>([]);

  const { searchQuery, setSearchQuery } = useAppContext();

  const getData = async () => {
    const response = await axios.get(
      "https://patient-list-w0nz.onrender.com/patients");
    setData(response.data)
  }

  useEffect(() => {
    getData();
  }, [])



  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredPets = data?.filter((pet) => {
    if (pet && pet.petname) {
      return pet.petname.toLowerCase().includes(searchQuery.toLowerCase());
    }
    setData(filteredPets);
    return false;
  });

  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const selectedData = data?.filter((pet) => {
    return (
      pet &&
      (pet.breed.includes(selectedStatus) || pet.status.includes(selectedStatus))
    );
  })



  return (
    <>
      <Overview
        handleSearchInputChange={handleSearchInputChange}
        setData={setData}
        setSelectedStatus={setSelectedStatus}
        data={data}
      />
      <Table data={data} selectedData={selectedData} setData={setData} filteredPets={filteredPets} />

    </>
  )

}



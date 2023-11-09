import React, { useState, ChangeEvent } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from "@/context/AppContext";
import { dataTypes } from "@/pages";
import { RxCross2 } from "react-icons/rx"
interface EditPatientProps {
  pet: dataTypes;

}

const EditPatient = ({ pet }: EditPatientProps) => {
  const { editModal, setEditModal } = useAppContext();

  const [patientData, setPatientData] = useState<dataTypes>({
    id: pet.id,
    petname: pet.petname,
    pawrent: pet.pawrent,
    gender: pet.gender,
    contactNo: pet.contactNo,
    city: pet.city,
    status: pet.status,
    breed: pet.breed,
    dateOfBirth: new Date(pet.dateOfBirth),
    address: pet.address,
    township: pet.township,
  });

  const updateData = async (data: dataTypes) => {
    try {
      await axios.patch(
        `https://patient-list-w0nz.onrender.com/patients/${pet.id}`,
        data
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    await updateData(patientData);
    setEditModal(false);
    toast.success("Patient is successfully edited!", {
      position: "bottom-left",
      autoClose: 300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleRadioChange = (value: string) => {
    setPatientData({
      ...patientData,
      gender: value,
    });
  };

  return (
    <>
      <div className={`flex justify-center px-10 items-center overflow-x-hidden shadow-2xl overflow-y-auto fixed inset-0 z-50 bg-opacity-100  ${editModal ? " bg-opacity-50 bg-gray-700 transition-all " : ""}`} >
        <div className="relative w-[50%]  my-6 mx-auto ">
          <div className="border-0 rounded-lg shadow-xl relative flex flex-col w-full bg-white outline-none">
            <div className="flex justify-end p-3 rounded-t">
              <button
                className=" border-0 text-black  float-right"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModal(false);
                }}
              >
                <RxCross2 />
              </button>
            </div>
            <h3 className="mx-auto font-semibold Title">Update Patient</h3>
            <h3 className="mx-auto text-[14px] py-2 ">
              Enter Updated Patient Information Below
            </h3>

            <div className="relative ">
              <form onClick={(e) => e.stopPropagation()} action="" className="flex flex-col w-full justify-center">
                <div className="flex flex-row gap-10 px-7 " >
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 mt-1">Pet Name</label>
                    <input
                      name="petname"
                      value={patientData.petname}
                      onChange={handleInputChange}
                      className="shadow appearance-none border inputBorder inputBorder rounded w-full  p-2 mb-1 text-black"
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 mt-1">Status</label>
                    <select
                      id="small"
                      name="status"
                      value={patientData.status}
                      onChange={handleInputChange}
                      className="block w-full p-2 mb-1 text-sm text-gray-900 border inputBorder rounded bg-inherit"
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      <option value="picky_eat">Picky eater</option>
                      <option value="allergy">Allergy</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row gap-10 px-7 " >
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 ">
                      Pawrent
                    </label>
                    <input
                      name="pawrent"
                      value={patientData.pawrent}
                      onChange={handleInputChange}
                      className="shadow appearance-none border inputBorder rounded w-full p-2 mb-1 text-black"
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 mt-1">Breed</label>
                    <select
                      id="small"
                      name="breed"
                      value={patientData.breed}
                      onChange={handleInputChange}
                      className="block w-full  p-2 mb-1 text-sm text-gray-900 border inputBorder rounded bg-inherit"
                    >
                      <option value="" disabled>
                        Choose Breed
                      </option>
                      <option value="Golden Retriever">Golden Retriever</option>
                      <option value="Beagle">Beagle</option>
                      <option value="Spaniel">Spaniel</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-row gap-10 px-7" >
                  <div className="w-[50%]"><label className="block text-black text-sm mt-1 mb-1">Gender</label>
                    <div className="flex mb-3">
                      <div className="flex gap-3 ">
                        <label
                          htmlFor="inline-radio"
                          className="text-sm font-medium text-gray-900"
                        >
                          Male
                        </label>
                        <input
                          id="inline-radio"
                          value="Male"
                          onChange={() => handleRadioChange("Male")}
                          checked={patientData.gender == "Male" ? true : false}
                          type="radio"
                          name="inline-radio-group"
                          className="w-4 h-4 radio-color bg-gray-100 inputBorder"
                        />
                      </div>
                      <div className="flex gap-3 ">
                        <label
                          htmlFor="inline-2-radio"
                          className="ml-2 text-sm font-medium text-gray-900"
                        >
                          Female
                        </label>
                        <input
                          value="Female"
                          onChange={() => handleRadioChange("Female")}
                          checked={patientData.gender == "Female" ? true : false}
                          id="inline-2-radio"
                          type="radio"
                          name="inline-radio-group"
                          className="w-4 h-4 radio-color bg-gray-100 inputBorder"
                        />
                      </div>
                    </div></div>
                  <div className="w-[50%] ps-5">
                    <label className=" block text-black text-sm mb-1">Date of birth</label>
                    <DatePicker
                      selected={new Date(patientData.dateOfBirth)}
                      onChange={(date: any) => setPatientData({ ...patientData, dateOfBirth: date })}
                      dateFormat="dd/MM/yyyy"
                      className="shadow appearance-none border inputBorder rounded  w-[17rem] p-2 mb-1  text-black"
                      placeholderText="Select Date"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-10 px-7 " >
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 mt-1">
                      Contact No.
                    </label>
                    <input
                      name="contactNo"
                      value={patientData.contactNo}
                      onChange={handleInputChange}
                      className="shadow appearance-none border inputBorder rounded w-full p-2 px-1 text-black"
                    />
                  </div>
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 mt-1">Address</label>
                    <textarea
                      name="address"
                      value={patientData.address}
                      onChange={handleInputChange}
                      className="shadow appearance-none border inputBorder rounded w-full p-2 px-1 text-black"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-10 px-7">
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 mt-1">City</label>
                    <select
                      required
                      id="small"
                      value={patientData.city}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          city: e.target.value,
                        })
                      }
                      className="block w-full p-2 mb-1 text-sm text-gray-900 border inputBorder rounded bg-inherit"
                    >
                      <option value="" disabled>
                        Select a Township
                      </option>
                      <option value="Yangon">Yangon</option>
                      <option value="Mandalay">Mandalay</option>
                      <option value="Bago">Bago</option>

                    </select>

                  </div>
                  <div className="w-[50%]">
                    <label className="block text-black text-sm mb-1 mt-1">Township</label>
                    <select
                      required
                      id="small"
                      value={patientData.township}
                      onChange={(e) =>
                        setPatientData({
                          ...patientData,
                          township: e.target.value,
                        })
                      }
                      className="block w-full p-2 mb-1 text-sm text-gray-900 border inputBorder rounded bg-inherit"
                    >
                      <option value="" disabled>
                        Select a City
                      </option>
                      <option value="Pazundaung">Pazundaung</option>
                      <option value="Myaynigone">Myaynigone</option>
                      <option value="Hlaing">Hlaing</option>

                    </select>

                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-center pt-7 pb-12 gap-5">
              <button
                onClick={handleSave}
                className="w-20 update-btn rounded-md text-center"
              >
                Update
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditModal(false);
                }}
                className="w-20 bg-inherit cancel-btn rounded-md text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPatient;

import React, { useEffect, useState } from "react";
import Image from "next/image";
import add from "../images/add.png";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from "@/context/AppContext";

interface PatientData {
  petname: string;
  pawrent: string;
  gender: string;
  contactNo: string;
  city: string;
  status: string;
  breed: string;
  dateOfBirth: string;
  address: string;
  township: string;
}

const CreatePatient: React.FC = () => {
  const { showModal, setShowModal } = useAppContext();


  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [patientData, setPatientData] = useState<PatientData>({
    petname: "",
    pawrent: "",
    gender: "",
    contactNo: "",
    city: "",
    status: "",
    breed: "",
    dateOfBirth: "",
    address: "",
    township: "",
  });

  const addData = async (data: PatientData) => {
    const { data: response } = await axios.post(
      "https://patient-list-w0nz.onrender.com/patients",
      data
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await addData(patientData);
    console.log("PATIENT DATA", patientData);
    setShowModal(false);
    toast.success("Created Successfully", {
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

  useEffect(() => {
    setPatientData({
      ...patientData,
      dateOfBirth: selectedDate?.toDateString() || "",
    });
  }, [selectedDate]);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="add-btn py-1"
      >
        <Image className="mt-1.5" src={add} alt="" />
        Add new patient
      </button>

      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto shadow-2xl fixed inset-0 z-50">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <form
                onSubmit={handleSave}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                <div className="flex justify-end p-3 rounded-t">
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-x block py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <h3 className="mx-auto font-semibold Title">Add New Patient</h3>
                <h3 className="mx-auto text-[14px]">
                  Enter New Patient Information Below
                </h3>

                <div className="relative px-7 pt-5 pb-12 flex flex-row gap-12">
                  <div className="w-[50%]">
                    <div className="px-8 pt-6 pb-4 w-full">
                      <label className="block text-black text-sm mb-1">Pet Name</label>
                      <input
                        required
                        value={patientData.petname}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            petname: e.target.value,
                          })
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 text-black"
                      />
                      <label className="block text-black text-sm mb-1 mt-1">
                        Pawrent
                      </label>
                      <input
                        required
                        value={patientData.pawrent}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            pawrent: e.target.value,
                          })
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 text-black"
                      />
                      <label className="block text-black text-sm mt-1 mb-1">
                        Gender
                      </label>
                      <div className="flex mb-3">
                        <div className="flex gap-3">
                          <label
                            htmlFor="inline-radio"
                            className="text-sm font-medium text-gray-900"
                          >
                            Male
                          </label>
                          <input
                            id="inline-radio"
                            value={"Male"}
                            onChange={(e) =>
                              setPatientData({ ...patientData, gender: "Male" })
                            }
                            type="radio"
                            name="inline-radio-group"
                            className="w-4 h-4 text-blue-600 bg-gray-100 inputBorder"
                          />
                        </div>
                        <div className="flex gap-3 items-center mr-4">
                          <label
                            htmlFor="inline-2-radio"
                            className="ml-2 text-sm font-medium text-gray-900"
                          >
                            Female
                          </label>
                          <input
                            value={"Female"}
                            onChange={(e) =>
                              setPatientData({
                                ...patientData,
                                gender: "Female",
                              })
                            }
                            id="inline-2-radio"
                            type="radio"
                            name="inline-radio-group"
                            className="w-4 h-4 text-blue-600 bg-gray-100 inputBorder"
                          />
                        </div>
                      </div>

                      <label className="block text-black text-sm mb-1 mt-1">
                        Contact No.
                      </label>
                      <input
                        required
                        value={patientData.contactNo}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            contactNo: e.target.value,
                          })
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                      <label className="block text-black text-sm mb-1 mt-1">
                        City
                      </label>
                      <input
                        value={patientData.city}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            city: e.target.value,
                          })
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                  </div>
                  <div className="w-[50%]">
                    <div className="px-8 pt-6 pb-4 w-full">
                      <label className="block text-black text-sm mb-1 mt-1">
                        Status
                      </label>
                      <select
                        required
                        id="small"
                        value={patientData.status}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            status: e.target.value,
                          })
                        }
                        className="block w-full p-2 mb-3 text-sm text-gray-900 border inputBorder rounded-lg bg-inherit"
                      >
                        <option value="" disabled>
                          Select a status
                        </option>
                        <option value="picky_eat">picky_eater</option>
                        <option value="allergy">allergy</option>
                      </select>
                      <label className="block text-black text-sm mb-1 mt-1">
                        Breed
                      </label>
                      <select
                        required
                        id="small"
                        value={patientData.breed}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            breed: e.target.value,
                          })
                        }
                        className="block w-full p-2 mb-3 text-sm text-gray-900 border inputBorder rounded-lg bg-inherit"
                      >
                        <option value="" disabled>
                          Choose Breed
                        </option>
                        <option value="Golden Retriever">Golden Retriever</option>
                        <option value="Beagle">Beagle</option>
                        <option value="Spaniel">Spaniel</option>
                      </select>
                      <label className="block text-black text-xs mt-1 mb-1">
                        Date of birth
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className="shadow appearance-none border inputBorder rounded w-full py-2 mb-1 px-1 text-black"
                        placeholderText="Select Date"
                      />
                      <label className="block text-black text-sm mb-1 mt-1">
                        Address
                      </label>
                      <textarea
                        required
                        value={patientData.address}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            address: e.target.value,
                          })
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                      <label className="block text-black text-sm mb-1 mt-1">
                        Township
                      </label>
                      <input
                        value={patientData.township}
                        onChange={(e) =>
                          setPatientData({
                            ...patientData,
                            township: e.target.value,
                          })
                        }
                        className="shadow appearance-none border inputBorder rounded w-full py-2 px-1 text-black"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pb-3 gap-5">
                  <button type="submit" className="w-20 save-btn rounded-md text-center">
                    Save
                  </button>
                  <button onClick={() => setShowModal(false)} className="cancel-btn rounded-md w-20 text-center">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default CreatePatient;

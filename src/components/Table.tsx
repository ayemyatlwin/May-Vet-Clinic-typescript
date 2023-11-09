import React, { useState } from "react";
import Image from "next/image";
import allergy from "../images/allergy.png";
import picky_eater from "../images/picky_eater.png";
import pencil from "../images/edit.png";
import more from "../images/more.png";
import bin from "../images/delete.png";
import Swal from "sweetalert2";
import axios from "axios";
import EditPatient from "./EditPatient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgress } from "@mui/material";
import { dataTypes } from "@/pages";
import { useAppContext } from "@/context/AppContext";

interface TableProps {
  data: dataTypes[];
  setData: (data: dataTypes[]) => void;
  filteredPets?: dataTypes[];
  selectedData?: dataTypes[];
}

const Table: React.FC<TableProps> = ({ data, setData, filteredPets, selectedData }) => {
  const { selectedRow, editModal, setEditModal, searchQuery } = useAppContext();

  const rowsPerPage = selectedRow; //rows like 10,15,20

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [dropDownOpen, setDropDownOpen] = useState<string | null>(null);

  const showDropDown = (id: string) => {
    if (id === dropDownOpen) {
      setDropDownOpen(null);
    } else {
      setDropDownOpen(id);
    }
  };

  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const deleteProduct = async (id: string) => {
    Swal.fire({
      title: "Confirmation",
      showCancelButton: true,
      confirmButtonColor: "#cd211d",
      cancelButtonColor: "#444444",
      confirmButtonText: "Delete",
      html: "<small>Are you sure you want to delete this patient?</small>",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://patient-list-w0nz.onrender.com/patients/${id}`
          );
          toast.error("delected successfully!", {
            position: "bottom-left",
            autoClose: 300,
            theme: "colored",
          });
        } catch (error) {
          Swal.fire(
            "Error",
            "An error occurred while deleting the item.",
            "error"
          );
        }
      }
    });
  };

  const displayData = selectedData?.slice(0, rowsPerPage);



  return (
    <>
      <div className="data-container p-4  mb-7">
        {data?.length === 0 ? (
          <CircularProgress sx={{ color: "#54bab9" }} />
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className=" border-b border-t border-gray-300">
                <th className="headerText p-2">
                  <input
                    type="checkbox"
                    className="form-checkbox "
                    checked={selectedRows.length === data.length}
                    onChange={() =>
                      selectedRows.length === data.length
                        ? setSelectedRows([])
                        : setSelectedRows(data.map((pet) => pet.id))
                    }
                  />
                </th>
                <th className="headerText p-2">ID</th>
                <th className="headerText p-2">Pet Name</th>
                <th className="headerText p-2">Status</th>
                <th className="headerText p-2">Pawrent Name</th>
                <th className="headerText p-2">Breed</th>
                <th className="headerText p-2">Gender</th>
                <th className="headerText p-2">Date of Birth</th>
                <th className="headerText p-2">Contact No</th>
                <th className="headerText p-2">Address</th>
                <th className="headerText p-2"></th>
              </tr>
            </thead>
            <tbody>
              {searchQuery == ""
                ? displayData?.map((pet, i) => (
                  <tr className="" key={pet.id}>
                    <td className="bodyText p-2 border-b">
                      <input
                        type="checkbox"
                        className="form-checkbox  text-gray-500"
                        checked={selectedRows.includes(pet?.id)}
                        onChange={() => toggleSelectRow(pet?.id)}
                      />
                    </td>
                    <td className="bodyText border-b p-2">
                      {pet?.breed
                        ? pet.breed.slice(0, 1) + " - 0" + (i + 1)
                        : "N/A"}
                    </td>
                    <td className="bodyText p-2 border-b">{pet?.petname}</td>
                    <td className="bodyText p-2 border-b">
                      {pet?.status === "allergy" ? (
                        <Image
                          src={allergy}
                          alt={pet?.status}
                          className="h-4 w-4 mx-auto"
                        />
                      ) : (
                        <Image
                          src={picky_eater}
                          alt={pet?.status}
                          className="h-4 w-4 mx-auto"
                        />
                      )}
                    </td>
                    <td className="bodyText p-2 border-b">{pet?.pawrent}</td>
                    <td className="bodyText p-2 border-b">{pet?.breed}</td>
                    <td className="bodyText p-2 border-b">{pet?.gender}</td>
                    <td className="bodyText p-2 border-b">
                      {formatDate(pet?.dateOfBirth)}
                    </td>
                    <td className="bodyText p-2 border-b">
                      {pet?.contactNo}
                    </td>
                    <td className="bodyText p-2 border-b">
                      {pet?.address + ", " + pet?.township + ", " + pet?.city}
                    </td>
                    <td
                      onClick={() => showDropDown(pet?.id)}
                      className="bodyText p-2 border-b relative "
                    >
                      <Image src={more} className="h-4 w-3" alt="" />
                      {dropDownOpen === pet?.id && (
                        <div className="popup">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditModal(true);
                            }}
                            className=" flex gap-3 border-b w-full"
                          >
                            <Image
                              className="h-3 w-3 mt-1"
                              src={pencil}
                              alt=""
                            />
                            Edit
                          </button>
                          {editModal == true ? (
                            <EditPatient
                              pet={pet}
                            />
                          ) : null}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProduct(pet?.id);
                            }}
                            className=" flex gap-3 w-full"
                          >
                            <Image
                              className="h-3 w-3 mt-1"
                              src={bin}
                              alt=""
                            />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
                : filteredPets &&
                filteredPets?.map((filpet, i) => {
                  return (
                    <tr className="" key={filpet.id}>
                      <td className="bodyText p-2 border-b">
                        <input
                          type="checkbox"
                          className="form-checkbox  text-gray-500"
                          checked={selectedRows.includes(filpet?.id)}
                          onChange={() => toggleSelectRow(filpet?.id)}
                        />
                      </td>
                      <td className="bodyText border-b p-2">
                        {filpet?.breed
                          ? filpet.breed.slice(0, 1) + " - 0" + (i + 1)
                          : "N/A"}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.petname}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.status === "allergy" ? (
                          <Image
                            src={allergy}
                            alt={filpet?.status}
                            className="h-4 w-4 mx-auto"
                          />
                        ) : (
                          <Image
                            src={picky_eater}
                            alt={filpet?.status}
                            className="h-4 w-4 mx-auto"
                          />
                        )}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.pawrent}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.breed}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.gender}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {formatDate(filpet?.dateOfBirth)}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.contactNo}
                      </td>
                      <td className="bodyText p-2 border-b">
                        {filpet?.address +
                          ", " +
                          filpet?.township +
                          ", " +
                          filpet?.city}
                      </td>
                      <td
                        onClick={() => showDropDown(filpet?.id)}
                        className="bodyText p-2 border-b relative "
                      >
                        <Image src={more} className="h-4 w-3" alt="" />
                        {dropDownOpen === filpet?.id && (
                          <div className="popup">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditModal(true);
                                console.log(
                                  "Edit button clicked for ID:",
                                  filpet?.id,
                                  editModal
                                );
                              }}
                              className=" flex gap-3 border-b w-full"
                            >
                              <Image
                                className="h-3 w-3 mt-1"
                                src={pencil}
                                alt=""
                              />
                              Edit
                            </button>
                            {editModal == true ? (
                              <EditPatient
                                pet={filpet}
                              />
                            ) : null}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteProduct(filpet?.id);
                              }}
                              className=" flex gap-3 w-full"
                            >
                              <Image
                                className="h-3 w-3 mt-1"
                                src={bin}
                                alt=""
                              />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

    </>
  );
};

export default Table;

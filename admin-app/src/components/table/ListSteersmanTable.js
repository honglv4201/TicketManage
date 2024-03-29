import React, { useState, useRef, forwardRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSteersman, editSteersman } from "../../actions/steersman.actions";
import { Input } from "../UI/Input";
import { InputTitleLeft } from "../UI/inputTitleLeft/InputTitleLeft";
import { SelectBox } from "../UI/select/SelectBox";
import { Table } from "./Table";

/**
 * @author
 * @function ListSteersmanTable
 **/

export const ListSteersmanTable = (props) => {
  const dispatch = useDispatch();
  const inputEl = useRef("");
  const listSteersman = props.listSteersman;
  const id_Enterprise = props.idEnterprise;
  const prop_listVehicle = props.listVehicle;
  const getListVehicle = () => {
    let listVehicle = [];
    for (let i = 0; i < prop_listVehicle.length; i++) {
      if (prop_listVehicle[i].isActive === "yes") {
        //console.log(prop_listVehicle[i].isActive);
        listVehicle.push(prop_listVehicle[i]);
      }
    }
    return listVehicle;
  };
  const [editData, setEditData] = useState(false);
  const checkEditData = () => {
    if (
      steersman.idEnterprise &&
      steersman.firstName &&
      steersman.lastName &&
      steersman.gender &&
      steersman.email &&
      steersman.contactNumber
    ) {
      setEditData(true);
    } else {
      setEditData(false);
    }
  };
  const term = props.term;
  const initSteersman = () => {
    return {
      _id: "",
      idEnterprise: id_Enterprise,
      position: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "steersman",
      username: "driver",
      password: "111111",
      gender: "",
      contactNumber: "",
      idVehicle: "",
      idUser: "",
    };
  };
  const [steersman, setSteersman] = useState(initSteersman);

  const [modalShow, setModalShow] = useState(false);
  const [modalFlag, setModalFlag] = useState("Add");
  const [modalTitle, setModalTitle] = useState();

  const handleModalShow = (iFlag, steersman = []) => {
    if (iFlag === "Add") {
      setModalFlag("Add");
      setModalTitle("Thêm tài xế");
    } else {
      setModalFlag("Edit");
      setModalTitle("Sửa tài xế");
      setSteersman({
        _id: steersman._id,
        idEnterprise: steersman.idEnterprise,
        position: steersman.position,
        firstName: steersman.idUser.firstName,
        lastName: steersman.idUser.lastName,
        email: steersman.idUser.email,
        contactNumber: steersman.idUser.contactNumber,
        gender: steersman.profile.gender,
        idVehicle: steersman.idVehicle ? steersman.idVehicle._id : "",
        idUser: steersman.idUser._id,
      });
    }
    setModalShow(true);
  };
  const handleModalSave = () => {
    if (modalFlag === "Add") {
      createUsername();
    }
    const form = steersman;
    //console.log(form);
    if (modalFlag === "Add") {
      delete form._id;
      dispatch(addSteersman(form));
    } else {
      dispatch(editSteersman(form));
    }
    setSteersman(initSteersman);
    if (props.type !== "Main") {
      if (props.reLoadEnterpriseDetails());
    }
    setModalShow(false);
  };
  const handleModalClose = () => {
    setSteersman(initSteersman);
    setModalShow(false);
  };

  const createUsername = () => {
    setSteersman({
      ...steersman,
      username: steersman.firstName + steersman.lastName + "123",
    });
    //console.log(steersman.username);
  };

  const positions = [
    { _id: 1, value: "main", show: "Lái chính" },
    { _id: 2, value: "helper", show: "Lái phụ" },
  ];

  const genders = [
    { _id: 1, value: "Male", show: "Nam" },
    { _id: 2, value: "Female", show: "Nữ" },
  ];

  const steersmans = {
    header: [
      "Họ tên",
      "Giới tính",
      "Số điện thoại",
      "Vị trí",
      "Xe phụ trách",
      "Tùy chọn",
    ],
    body: [],
  };
  const renderHead = (item, ind) => {
    return <th key={ind}>{item}</th>;
  };
  const renderSteersmans = (steersmans) => {
    let mySteersmans = [];
    for (let steersman of steersmans) {
      mySteersmans.push(
        <tr>
          <td>
            {steersman.idUser.firstName} {steersman.idUser.lastName}
          </td>
          <td>{steersman.profile.gender === "Male" ? "Nam" : "Nữ"}</td>
          <td>{steersman.idUser.contactNumber}</td>
          <td>{steersman.position}</td>
          <td>
            {steersman.idVehicle ? steersman.idVehicle.lisensePlate : "Trống"}
          </td>
          <td>
            <button
              className="edit"
              onClick={() => {
                handleModalShow("Edit", steersman);
              }}
            >
              <i class="far fa-edit"></i>
            </button>
            <button
              className="delete"
              onClick={() => {
                //delRoute(route);
              }}
            >
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      );
    }
    return mySteersmans;
  };

  const getSearchTerm = () => {
    //console.log(inputEl.current.value)
    props.searchKeyword(inputEl.current.value);
  };

  return (
    <div>
      {/*   MODAL */}
      <div
        className={
          modalShow ? "add-modal__wrapper active" : "add-modal__wrapper"
        }
      >
        <div className={modalShow ? "add-modal active" : "add-modal"}>
          <div className="add-modal__header">{modalTitle}</div>

          <div className="add-modal__body">
            <div className="input-enterprise-name">
              <InputTitleLeft
                title="Họ"
                placeholder={``}
                value={steersman.firstName}
                onChange={(e) => {
                  setSteersman({ ...steersman, firstName: e.target.value });
                  checkEditData();
                }}
              ></InputTitleLeft>
              <InputTitleLeft
                title="Tên"
                placeholder={``}
                value={steersman.lastName}
                onChange={(e) => {
                  setSteersman({ ...steersman, lastName: e.target.value });
                  checkEditData();
                }}
              ></InputTitleLeft>

              {/* <InputTitleLeft
                title="Họ tên"
                placeholder={``}
                value={`${steersman.firstName} ${steersman.lastName}`}
                onChange={(e) => {
                  if (e.target.value.split(" ").length > 1)
                    setSteersman({
                      ...steersman,
                      firstName: e.target.value.split(" ")[0],
                      lastName: e.target.value.substring(
                        e.target.value.split(" ")[1].length,
                        e.target.value.length
                      ),
                    });

                  checkEditData();
                }}
              /> */}
              {/* 
              <InputTitleLeft
                title="Tên"
                value={steersman.lastName}
                placeholder={``}
                onChange={(e) => {
                  setSteersman({
                    ...steersman,
                    lastName: e.target.value,
                    username: steersman.firstName + steersman.lastName + "123",
                  });
                  checkEditData();
                }}
              /> */}

              <SelectBox
                type="gender"
                value={steersman.gender}
                onChange={(e) => {
                  setSteersman({ ...steersman, gender: e.target.value });
                  checkEditData();
                }}
                list={genders}
                title="Giới tính"
              />

              <InputTitleLeft
                title="Email"
                value={steersman.email}
                placeholder={``}
                onChange={(e) => {
                  setSteersman({ ...steersman, email: e.target.value });
                  checkEditData();
                }}
              />
              <InputTitleLeft
                title="Số điện thoại"
                value={steersman.contactNumber}
                placeholder={``}
                onChange={(e) => {
                  setSteersman({ ...steersman, contactNumber: e.target.value });
                  checkEditData();
                }}
              />

              <SelectBox
                type="gender"
                value={steersman.position}
                onChange={(e) => {
                  setSteersman({ ...steersman, position: e.target.value });
                  checkEditData();
                }}
                list={positions}
                title="Vị trí"
              />
              <SelectBox
                type="VehicleSelect_BS"
                value={steersman.idVehicle}
                onChange={(e) => {
                  setSteersman({ ...steersman, idVehicle: e.target.value });
                  checkEditData();
                }}
                list={getListVehicle()}
                title="Phương tiện điều khiển"
              />
            </div>
          </div>

          <div className="add-modal__footer">
            <button className="btn-cancel" onClick={handleModalClose}>
              {" "}
              Hủy bỏ
            </button>
            <button
              className="btn-save"
              disabled={!editData}
              onClick={handleModalSave}
            >
              {" "}
              Lưu lại
            </button>
          </div>
        </div>
      </div>

      <div className="card right-content-fixsize">
        <div className="card__header">
          <h3>Các tài xế</h3>
          <Button
            onClick={() => {
              handleModalShow("Add");
            }}
          >
            Thêm tài xế
          </Button>{" "}
          <div className="ui-search">
            <input
              ref={inputEl}
              type="text"
              placeholder="Search Here"
              className="prompt"
              value={term}
              onChange={getSearchTerm}
            />
          </div>
        </div>

        <div className="card__body">
          <Table
            headData={steersmans.header}
            renderHead={(item, ind) => renderHead(item, ind)}
            render2Body={() => renderSteersmans(listSteersman)}
          />
        </div>
        <div className="card__footer"></div>
      </div>
    </div>
  );
};

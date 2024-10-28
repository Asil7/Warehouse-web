import { Button, Card, message, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCompany,
  getCompanyList,
} from "../../store/actions/company/company";
import UserService from "../../services/UserService";
import { Link } from "react-router-dom";

const CompanyList = () => {
  const dispatch = useDispatch();
  const { companyList, isLoading } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  const handleDeleteCompany = async (id) => {
    let res = await dispatch(deleteCompany(id));
    if (res.payload.status === 200) {
      dispatch(getCompanyList());
      message.success(res.payload.data.message);
    } else if (res.payload.status === 200) {
      message.error(res.payload.response.data.message);
    }
  };

  const ActionComponent = ({ item, handleDeleteCompany }) => {
    return (
      <div>
        {item.locationMap && (
          <button
            onClick={() => window.open(item.locationMap)}
            title="Location"
            className="btn btn-sm btn-outline-warning me-1"
          >
            <i className="bi bi-geo-alt-fill" />
          </button>
        )}
        <Link to={`/company-form/${item.id}`}>
          <button title="Edit" className="btn btn-sm btn-outline-success me-1">
            <i className="bi bi-pencil-square" />
          </button>
        </Link>
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteCompany(item.id)}
        >
          <button title="Delete" className="btn btn-sm btn-outline-danger me-1">
            <i className="bi bi-trash" />
          </button>
        </Popconfirm>
      </div>
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 200,
    },
    {
      title: "Additional Phone",
      dataIndex: "additionalPhone",
      key: "additionalPhone",
      width: 200,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 200,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("MM-DD-YYYY hh:mm"),
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 200,
      render: (_, item) => (
        <ActionComponent
          item={item}
          handleDeleteCompany={handleDeleteCompany}
        />
      ),
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_COMPANY") && (
            <Link to={"/companies/company-form"}>
              <Button className="mt-1 mb-1" type="primary">
                Create Company
              </Button>
            </Link>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={companyList}
          columns={columns}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </div>
  );
};

export default CompanyList;

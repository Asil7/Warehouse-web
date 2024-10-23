import { Button, Card, Checkbox, message, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrderList } from "../../store/actions/order/order";
import { useEffect } from "react";

const OrderList = () => {
  const dispatch = useDispatch();
  const { orderList, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const handleCheckboxChange = (orderId) => {
    console.log(`Order ${orderId} delivered status changed`);
  };

  const handleDeleteOrder = async (id) => {
    try {
      let res = await dispatch(deleteOrder(id));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getOrderList());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const ActionComponent = ({ item }) => {
    return (
      <div>
        <Link to={`/order-product-list/${item.id}`}>
          <button
            title="Product List"
            className="btn btn-sm btn-outline-primary me-1"
          >
            <i className="bi bi-list" />
          </button>
        </Link>
        {item.locationMap && (
          <button
            onClick={() => window.open(item.locationMap)}
            title="Location"
            className="btn btn-sm btn-outline-warning me-1"
          >
            <i className="bi bi-geo-alt-fill" />
          </button>
        )}
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDeleteOrder(item.id)}
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
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Company Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Total Weight",
      dataIndex: "totalWeight",
      key: "totalWeight",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "User",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Delivered",
      dataIndex: "delivered",
      key: "delivered",
      render: (delivered, record) => (
        <Checkbox
          checked={delivered}
          onChange={() => handleCheckboxChange(record.id)}
        />
      ),
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
      render: (_, item) => <ActionComponent item={item} />,
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_ORDER") && (
            <Link to={"/order-form"}>
              <Button className="mt-1 mb-1" type="primary">
                Add Order
              </Button>
            </Link>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={orderList}
          columns={columns}
          rowKey="id"
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 20 }}
        />
      </Card>
    </div>
  );
};

export default OrderList;

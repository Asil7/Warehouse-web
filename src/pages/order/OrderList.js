import { Button, Card, Checkbox, message, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  editOrderDeliveredStatus,
  getOrderById,
  getOrderList,
} from "../../store/actions/order/order";
import { useEffect } from "react";
import { sendNotification } from "../../store/actions/firebase/firebase";

const OrderList = () => {
  const dispatch = useDispatch();
  const { orderList, isLoading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const handleChangeDeliveredStatus = async (data) => {
    const payload = {
      id: data.id,
      delivered: !data.delivered,
    };
    try {
      let res = await dispatch(editOrderDeliveredStatus(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getOrderList());
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {
      message.error("Failed to update the delivered status");
    }
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

  const handleSendNotification = async (id) => {
    const orderResponse = await dispatch(getOrderById(id));
    const orderData = orderResponse.payload.data.object;

    if (!orderData) {
      message.error("Failed to retrieve order details");
      return;
    }

    try {
      const payload = {
        userToken:
          "c7g44sQTM0Ww4geb4r151t:APA91bEOXa4z8nyK_WwPPg2VoXvdXUj78RX6CFNlE-Ccx9VgfUrnQQe0AT7bQgi6781AGhVcHnQNyeaWe8qzA7AXQrFRGxtbqkf7WtuReLvPZdLhDwEWsLA",
        title: orderData?.company,
        body: "Mahsulot ortib bo'lindi",
        route: `/order-list/order-product-list/${id}`,
      };
      let res = await dispatch(sendNotification(payload));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const ActionComponent = ({ item }) => {
    return (
      <div>
        <Link to={`/order-list/order-product-list/${item.id}`}>
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
        <button
          title="Send Notification"
          className="btn btn-sm btn-outline-info me-1"
          onClick={() => handleSendNotification(item.id)}
        >
          <i className="bi bi-bell" />
        </button>
      </div>
    );
  };

  const columns = [
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
        <Popconfirm
          title="Are you sure you want to change the delivered status?"
          onConfirm={() => handleChangeDeliveredStatus(record)}
          okText="Yes"
          cancelText="No"
        >
          <Checkbox checked={delivered} onChange={(e) => e.preventDefault()} />
        </Popconfirm>
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
            <Link to={"/order-list/order-form"}>
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

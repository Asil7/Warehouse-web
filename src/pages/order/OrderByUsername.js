import { Card, Checkbox, Table, message, Grid } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editOrderDeliveredStatus,
  getOrderById,
  getOrderListByUser,
} from "../../store/actions/order/order";
import { useEffect } from "react";
import UserService from "../../services/UserService";
import { PhoneOutlined } from "@ant-design/icons";
import { sendNotification } from "../../store/actions/firebase/firebase";

const { useBreakpoint } = Grid;

const OrderByUsername = () => {
  const dispatch = useDispatch();
  const { orderListByUser, isLoading } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  useEffect(() => {
    dispatch(getOrderListByUser(UserService.getSubject()));
  }, [dispatch]);

  const handleChangeDeliveredStatus = async (data) => {
    const payload = {
      id: data.id,
      delivered: !data.delivered,
    };
    try {
      let res = await dispatch(editOrderDeliveredStatus(payload));
      if (res.payload.status === 200) {
        dispatch(getOrderListByUser(UserService.getSubject()));
        message.success(res.payload.data.message);
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {
      message.error("Failed to update the delivered status");
    }
  };

  const handleSendNotification = async (id, event) => {
    event.stopPropagation();
    const orderResponse = await dispatch(getOrderById(id));
    const orderData = orderResponse.payload?.data?.object;

    if (!orderData) {
      message.error("Failed to retrieve order details");
      return;
    }

    try {
      const payload = {
        userToken:
          "fmSL3gDK1LlJvRM7-o23fL:APA91bHEdqOJHLLV7LvigCuL5SxzlFn6SKb-2hgBLclMp-B8CqU8PonF6fM28TZ5uRT2480JcvrkNg4WNvK9OpnyjOXZxf9rLJGD3WfNA9mpJ89I43bccUY",
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
    const handleLocationClick = (event) => {
      event.stopPropagation();
      window.open(item.locationMap);
    };

    return (
      <div>
        {item.locationMap && (
          <button
            onClick={handleLocationClick}
            title="Location"
            className="btn btn-sm btn-outline-warning me-1"
          >
            <i className="bi bi-geo-alt-fill" />
          </button>
        )}
        <button
          onClick={(event) => handleSendNotification(item.id, event)}
          title="Notification"
          className="btn btn-sm btn-outline-primary me-1"
        >
          <i className="bi bi-bell-fill" />
        </button>
      </div>
    );
  };

  const columns = [
    {
      title: "Tashkilot",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Tel",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => (
        <>
          {screens.sm ? (
            <a
              href={`tel:${phone}`}
              onClick={(event) => event.stopPropagation()}
            >
              {phone}
            </a>
          ) : (
            <PhoneOutlined
              onClick={(event) => {
                event.stopPropagation();
                window.location.href = `tel:${phone}`;
              }}
              style={{ fontSize: "18px", color: "green" }}
            />
          )}
        </>
      ),
    },
    {
      title: "Yetkazildi",
      dataIndex: "delivered",
      key: "delivered",
      render: (delivered, record) => (
        <Checkbox
          checked={delivered}
          onClick={(event) => event.stopPropagation()}
          onChange={() => handleChangeDeliveredStatus(record)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 100,
      render: (_, item) => <ActionComponent item={item} />,
    },
  ];

  return (
    <div>
      <Card size="small">
        <Table
          size="small"
          loading={isLoading}
          dataSource={orderListByUser}
          columns={columns}
          rowKey="id"
          scroll={{ x: 380 }}
          pagination={{ pageSize: 20 }}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/orders/order-products/${record.id}`);
            },
          })}
        />
      </Card>
    </div>
  );
};

export default OrderByUsername;

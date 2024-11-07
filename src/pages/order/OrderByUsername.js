import { Card, Checkbox, Table, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editOrderDeliveredStatus,
  getOrderListByUser,
} from "../../store/actions/order/order";
import { useEffect } from "react";
import UserService from "../../services/UserService";

const OrderByUsername = () => {
  const dispatch = useDispatch();
  const { orderListByUser, isLoading } = useSelector((state) => state.order);
  const navigate = useNavigate();

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
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Delivered",
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
          scroll={{ x: 300 }}
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

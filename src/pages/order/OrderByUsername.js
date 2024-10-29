import { Button, Card, Checkbox, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../store/actions/order/order";
import { useEffect } from "react";

const OrderByUsername = () => {
  const dispatch = useDispatch();
  const { orderList, isLoading } = useSelector((state) => state.order);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const handleCheckboxChange = (orderId) => {
    console.log(`Order ${orderId} delivered status changed`);
  };

  const ActionComponent = ({ item }) => {
    const handleLocationClick = (event) => {
      event.stopPropagation(); // Prevents row click event
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
          onChange={() => handleCheckboxChange(record.id)}
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
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_ORDER") && (
            <Link to={"/orders/order-form"}>
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
          scroll={{ x: 300 }}
          pagination={{ pageSize: 20 }}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/orders/order-product-list/${record.id}`);
            },
          })}
        />
      </Card>
    </div>
  );
};

export default OrderByUsername;

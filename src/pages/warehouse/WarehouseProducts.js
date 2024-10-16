import { Button, Card, Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { getWarehouseProducts } from "../../store/actions/warehouse/warehouse";
import { useEffect } from "react";

const WarehouseProducts = () => {
  const dispatch = useDispatch();
  const { warehouseProductList, isLoading } = useSelector(
    (state) => state.warehouse
  );

  useEffect(() => {
    dispatch(getWarehouseProducts());
  }, [dispatch]);

  const ActionComponent = ({ item }) => {
    return (
      <div>
        <button
          // onClick={() => handleOpenModal(item)}
          title="Edit"
          className="btn btn-sm btn-outline-success me-1"
        >
          <i className="bi bi-pencil-square" />
        </button>
        <Popconfirm
          title="Are you sure to Delete"
          okText="Yes"
          cancelText="No"
          // onConfirm={() => handleDeleteProduct(item.id)}
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
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => (
        <span style={{ color: quantity < 0 ? "red" : "inherit" }}>
          {quantity}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => dayjs(createdAt).format("MM-DD-YYYY hh:mm"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <ActionComponent
          item={item}
          // handleOpenModal={handleOpenModal}
          // handleDeleteProduct={handleDeleteProduct}
        />
      ),
    },
  ];

  return (
    <div>
      <Card
        size="small"
        extra={
          UserService.hasPermission("ADD_WAREHOUSE_PRODUCT") && (
            <Button
              className="mt-1 mb-1"
              // onClick={() => handleOpenModal()}
              type="primary"
            >
              Add Product
            </Button>
          )
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={warehouseProductList}
          scroll={{ x: 600 }}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default WarehouseProducts;

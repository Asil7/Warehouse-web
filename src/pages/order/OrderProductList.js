import { Card, Row, Col, Divider, Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderById,
  getOrderProductList,
} from "../../store/actions/order/order";
import { useParams } from "react-router-dom";

const OrderProductList = () => {
  const dispatch = useDispatch();
  const { orderProductList, orderById, isLoading } = useSelector(
    (state) => state.order
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderProductList(id));
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const items = [
    { label: "Company", value: orderById.company },
    { label: "Phone", value: orderById.phone },
    { label: "Total Weight", value: orderById.totalWeight },
    { label: "Location", value: orderById.location },
  ];

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <div>
      <Card>
        <Card>
          <Row gutter={16}>
            {items.map((item, index) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} key={index}>
                <strong>{item.label}:</strong> {item.value}
              </Col>
            ))}
          </Row>
        </Card>
        <Divider />
        <Table
          size="small"
          loading={isLoading}
          dataSource={orderProductList}
          columns={columns}
          rowKey="id"
          scroll={{ x: 300 }}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default OrderProductList;

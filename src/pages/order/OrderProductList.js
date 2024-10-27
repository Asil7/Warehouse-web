import { Card, Row, Col, Button, message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrderProduct,
  editOrderProduct,
  getOrderById,
  getOrderProductList,
} from "../../store/actions/order/order";
import { useParams } from "react-router-dom";
import { PrinterOutlined } from "@ant-design/icons";
import CustomTable from "../../components/table/CustomTable";

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

  const handleEditOrderProduct = async (data) => {
    try {
      let res = await dispatch(editOrderProduct(data));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getOrderProductList(id));
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

  const handleDeleteOrderProduct = async (productId) => {
    try {
      let res = await dispatch(deleteOrderProduct(productId));
      if (res.payload.status === 200) {
        message.success(res.payload.data.message);
        dispatch(getOrderProductList(id));
      } else if (res.payload.status === 409) {
        message.error(res.payload.response.data.message);
      }
    } catch (e) {}
  };

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
      width: 400,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      editable: true,
      width: 400,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 400,
    },
  ];

  const printCard = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Order</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.21.5/antd.min.css" />
          <style>
            body { font-family: Arial, sans-serif; }
            .print-card { padding: 20px; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>
          <div class="print-card">
            <h2>Order Details</h2>
            <div>
              ${items
                .map(
                  (item) =>
                    `<strong>${item.label}:</strong> ${item.value}<br />`
                )
                .join("")}
            </div>
            <h3>Product List</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr>
                  <th style="border: 1px solid black; padding: 8px;">Product</th>
                  <th style="border: 1px solid black; padding: 8px;">Quantity</th>
                  <th style="border: 1px solid black; padding: 8px;">Type</th>
                </tr>
              </thead>
              <tbody>
                ${orderProductList
                  .map(
                    (item) => `
                  <tr>
                    <td style="border: 1px solid black; padding: 8px;">${item.product}</td>
                    <td style="border: 1px solid black; padding: 8px;">${item.quantity}</td>
                    <td style="border: 1px solid black; padding: 8px;">${item.type}</td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <Card
        size="small"
        extra={
          <Button className="m-1" type="primary" onClick={printCard}>
            Print Order <PrinterOutlined />
          </Button>
        }
      >
        <Card>
          <Row gutter={16}>
            {items.map((item, index) => (
              <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} key={index}>
                <strong>{item.label}:</strong> {item.value}
              </Col>
            ))}
          </Row>
        </Card>
        <div className="mt-3 mb-3 text-end">
          <Button>Add Product</Button>
        </div>
        <CustomTable
          size="small"
          loading={isLoading}
          data={orderProductList}
          columns={columns}
          rowKey="id"
          scroll={{ x: 300 }}
          pagination={false}
          onEdit={handleEditOrderProduct}
          onDelete={handleDeleteOrderProduct}
        />
      </Card>
    </div>
  );
};

export default OrderProductList;

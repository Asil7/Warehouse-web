import { Card, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getExpenseByUsername } from "../store/actions/expense/expense";
import { useEffect } from "react";
import UserService from "../services/UserService";

const Profile = () => {
  const username = UserService.getSubject();
  const dispatch = useDispatch();
  const { expenseByUsername, isLoading } = useSelector(
    (state) => state.expense
  );

  useEffect(() => {
    if (username) {
      let res = dispatch(getExpenseByUsername(username));
      console.log(res);
    }
  }, [dispatch, username]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => new Intl.NumberFormat("en-US").format(text),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const totalPrice =
    expenseByUsername?.reduce((acc, item) => acc + item.price, 0) || 0;
  const formattedTotalPrice = new Intl.NumberFormat("en-US").format(totalPrice);

  return (
    <div>
      <Card
        size="small"
        title={
          <Tag className="fs-6" color="cyan">
            {username}
          </Tag>
        }
        extra={
          <div className="fs-5">{"Total price: " + formattedTotalPrice}</div>
        }
      >
        <Table
          size="small"
          loading={isLoading}
          dataSource={expenseByUsername}
          scroll={{ x: 700 }}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default Profile;

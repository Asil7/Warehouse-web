import { Card, Checkbox, Row, Col, message, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addPermissionToRole,
  deletePermissionFromRole,
  getRoleNotHavePermissions,
  getRolePermissions,
} from "../../../store/actions/role/role";

const RolePermissionForm = () => {
  const dispatch = useDispatch();
  const { rolePermission, roleNotPermission } = useSelector(
    (state) => state.role
  );
  const { id } = useParams();

  const [selectedGrantedPermissions, setSelectedGrantedPermissions] = useState(
    []
  );
  const [selectedDeniedPermissions, setSelectedDeniedPermissions] = useState(
    []
  );

  useEffect(() => {
    if (id) {
      dispatch(getRolePermissions(id));
      dispatch(getRoleNotHavePermissions(id));
    }
  }, [dispatch, id]);

  const onGrantedPermissionChange = async (checkedValues) => {
    setSelectedGrantedPermissions(checkedValues);
    let payload = {
      roleId: id,
      permissionId: checkedValues,
    };
    let res = await dispatch(deletePermissionFromRole(payload));
    if (res.payload.status === 200) {
      message.success(res.payload.data.message);
      setSelectedGrantedPermissions([]);
      dispatch(getRolePermissions(id));
      dispatch(getRoleNotHavePermissions(id));
    }
  };

  const onDeniedPermissionChange = async (checkedValues) => {
    setSelectedDeniedPermissions(checkedValues);
    let payload = {
      roleId: id,
      permissionId: checkedValues,
    };
    let res = await dispatch(addPermissionToRole(payload));
    if (res.payload.status === 200) {
      message.success(res.payload.data.message);
      setSelectedDeniedPermissions([]);
      dispatch(getRolePermissions(id));
      dispatch(getRoleNotHavePermissions(id));
    }
  };

  return (
    <div>
      <Card>
        <div className="scroll-role-card">
          {id && (
            <>
              <Card size="small" title="Granted Permissions">
                <Checkbox.Group
                  onChange={onGrantedPermissionChange}
                  value={selectedGrantedPermissions}
                >
                  <Row gutter={[16, 16]}>
                    {rolePermission.map((permission) => (
                      <Col
                        xs={24}
                        sm={24}
                        md={13}
                        lg={10}
                        xl={8}
                        xxl={
                          rolePermission.length >= 2 &&
                          rolePermission.length <= 4
                            ? 10
                            : 6
                        }
                        key={permission.id}
                      >
                        <Checkbox value={permission.id}>
                          {permission.name}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Card>
              <Divider />
              <Card size="small" title="Denied Permissions">
                <Checkbox.Group
                  onChange={onDeniedPermissionChange}
                  value={selectedDeniedPermissions}
                >
                  <Row gutter={[16, 16]}>
                    {roleNotPermission.map((permission) => (
                      <Col
                        xs={24}
                        sm={24}
                        md={13}
                        lg={10}
                        xl={8}
                        xxl={
                          rolePermission.length >= 2 &&
                          rolePermission.length <= 4
                            ? 10
                            : 6
                        }
                        key={permission.id}
                      >
                        <Checkbox value={permission.id}>
                          {permission.name}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Card>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default RolePermissionForm;

import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import { Modal } from "antd";
import PropTypes from "prop-types";

const DraggableModal = ({
  children,
  title = "Modal",
  visible,
  modalClose,
  maskClosable = false,
  width,
}) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggableRef = useRef(null);
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggableRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  return (
    <Modal
      title={
        <div
          className="w-100 p-2 pb-0"
          style={{
            cursor: "move",
          }}
          onMouseOver={() => {
            if (disabled) {
              setDisabled(false);
            }
          }}
          onMouseOut={() => {
            setDisabled(true);
          }}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          {title}
        </div>
      }
      open={visible}
      onCancel={modalClose}
      footer={null}
      style={{ marginTop: "3%" }}
      maskClosable={maskClosable}
      width={width}
      modalRender={(modal) => (
        <Draggable
          disabled={disabled}
          bounds={bounds}
          nodeRef={draggableRef}
          onStart={(event, uiData) => onStart(event, uiData)}
        >
          <div ref={draggableRef}>{modal}</div>
        </Draggable>
      )}
    >
      <div className="pt-2 p-3">{children}</div>
    </Modal>
  );
};

DraggableModal.propTypes = {
  children: PropTypes.element,
  title: PropTypes.node,
  visible: PropTypes.bool.isRequired,
  modalClose: PropTypes.func.isRequired,
  maskClosable: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default DraggableModal;

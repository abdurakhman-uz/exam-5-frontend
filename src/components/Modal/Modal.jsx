import { Button, Modal } from 'antd';
import { useState } from 'react';
const Modals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if(keys){
    setIsModalOpen(true);
  }
  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>OK</p>
      </Modal>
    </>
  );
};
export default Modals;
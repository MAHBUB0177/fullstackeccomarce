import { Modal } from 'antd'
import React, { ReactNode } from 'react'

interface CommonModalProps {
    children: ReactNode;
    open: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    title?: string;
    onCancel: () => void;
    width?: string;
  }

const CommonModal = ({children,open,setIsModalOpen,title,onCancel,width}:CommonModalProps) => {
  return (
    <div>
        <Modal title={title} open={open}  onCancel={onCancel}    footer={null} className="flex justify-center"
          maskClosable={false} width={width ? width :'500px'}
       >
        
       {children}
      </Modal>
    </div>
  )
}

export default CommonModal
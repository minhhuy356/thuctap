import { Button } from "antd";
import { IoAdd } from "react-icons/io5";

interface IProps {
  title: string;
  setIsModalOpen: (isOpen: boolean) => void;
}

const Add = (props: IProps) => {
  const { setIsModalOpen, title } = props;

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        className="bg-regal-blue"
        icon={<IoAdd className="size-6" />}
        onClick={showModal}
      >
        {title}
      </Button>
    </>
  );
};

export default Add;

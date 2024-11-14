import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface PopUpProps {
  openPopUp: boolean;
  closePopUp: () => void;
  name: string | undefined;
  HandleBlockUser?: () => void;
  HandleUnBlockUser?: () => void;
  HandleUpdate?: () => void;
  isBlock?: boolean;
  setPlayerUserName?: any;
  playerUserName?: any;
}

const Menu: React.FC<PopUpProps> = ({
  openPopUp,
  name,
  closePopUp,
  HandleBlockUser,
  HandleUnBlockUser,
  setPlayerUserName,
  HandleUpdate,
  isBlock,
}) => {
  const [editableName, setEditableName] = useState(name);
  useEffect(() => {
    setEditableName(name || "");
  }, [name]);

  const handleClosePopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "ModalContainer") {
      closePopUp();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableName(e.target.value);
    if (setPlayerUserName) {
      setPlayerUserName(e.target.value);
    }
  };

  const handleBlurOrEnter = (
    e:
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.type === "blur" || (e as React.KeyboardEvent).key === "Enter") {
      if (HandleUpdate) HandleUpdate();
    }
  };

  if (!openPopUp) return null;

  return (
    <div
      id="ModalContainer"
      onClick={handleClosePopUp}
      style={{ zIndex: 1000 }}
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="w-10/12 rounded-lg bg-gray-400 p-6 shadow-inner dark:bg-gray-800 md:w-1/2 lg:w-1/3">
        {/* Header with close icon */}
        <div className="flex items-center justify-between border-b border-gray-500 pb-4">
          <input
            type="text"
            onChange={handleNameChange}
            value={editableName}
            onBlur={handleBlurOrEnter}
            onKeyDown={handleBlurOrEnter}
            className="border-none bg-transparent text-white focus:outline-none dark:text-white"
            name="username"
            id="username"
          />

          <button
            onClick={closePopUp}
            className="text-white hover:text-gray-300 dark:text-white"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        <div className="mt-4 text-sm text-white dark:text-white">
          <div className="mt-3 flex items-center">
            <button
              onClick={HandleUpdate}
              className="ml-3 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Update User
            </button>

            <button
              onClick={isBlock ? HandleBlockUser : HandleUnBlockUser}
              className="ml-3 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              {isBlock ? "Block User" : "UnBlock User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

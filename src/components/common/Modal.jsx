import React, { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  footer,
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modal = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdrop}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full p-4 text-center">
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modal}
                className={`
                  inline-block w-full text-left align-middle transition-all transform
                  bg-white rounded-lg shadow-xl dark:bg-gray-800
                  ${sizes[size]}
                `}
              >
                {/* Header */}
                {(title || showClose) && (
                  <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
                    {title && (
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {title}
                      </h3>
                    )}
                    {showClose && (
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="px-6 py-4">{children}</div>

                {/* Footer */}
                {footer && (
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
                    {footer}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default Modal;

// Example usage:
// const [isOpen, setIsOpen] = useState(false);
//
// <Modal
//   isOpen={isOpen}
//   onClose={() => setIsOpen(false)}
//   title="Modal Title"
//   size="md"
//   footer={
//     <div className="flex justify-end space-x-4">
//       <Button variant="secondary" onClick={() => setIsOpen(false)}>
//         Cancel
//       </Button>
//       <Button onClick={() => {}}>
//         Confirm
//       </Button>
//     </div>
//   }
// >
//   Modal content goes here
// </Modal> 
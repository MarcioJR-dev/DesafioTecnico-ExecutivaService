interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'CONFIRMAR',
  cancelText = 'CANCELAR',
  onConfirm,
  onCancel,
  type = 'danger'
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: (
            <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          confirmButton: 'bg-red-600 border-red-600 hover:bg-white hover:text-red-600'
        };
      case 'warning':
        return {
          icon: (
            <svg className="w-12 h-12 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
          confirmButton: 'bg-yellow-600 border-yellow-600 hover:bg-white hover:text-yellow-600'
        };
      default:
        return {
          icon: (
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          ),
          confirmButton: 'bg-blue-600 border-blue-600 hover:bg-white hover:text-blue-600'
        };
    }
  };

  const { icon, confirmButton } = getTypeStyles();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onCancel}
        />
        
        {/* Modal */}
        <div className="relative bg-white shadow-2xl border-2 border-gray-200 max-w-md w-full">
          <div className="p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              {icon}
            </div>
            
            {/* Content */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">{title}</h3>
              <p className="text-gray-700 leading-relaxed">{message}</p>
            </div>
            
            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onCancel}
                className="flex-1 btn-secondary"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`flex-1 text-white px-8 py-4 rounded-none border-2 transition-all duration-300 font-semibold tracking-wide text-sm uppercase ${confirmButton}`}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

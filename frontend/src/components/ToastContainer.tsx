import { Toast } from './Toast';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastState[];
  onHideToast: (id: string) => void;
}

export const ToastContainer = ({ toasts, onHideToast }: ToastContainerProps) => {
  return (
    <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => onHideToast(toast.id)}
        />
      ))}
    </div>
  );
};

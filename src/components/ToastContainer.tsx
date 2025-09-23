import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useToast } from "../contexts/ToastContext";
import { Toast } from "../types";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ToastContainerWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;

const ToastItem = styled.div<{ type: Toast["type"] }>`
  background: ${(props) => {
    switch (props.type) {
      case "success":
        return "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)";
      case "error":
        return "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)";
      case "warning":
        return "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)";
      case "info":
        return "linear-gradient(135deg, #3498db 0%, #2980b9 100%)";
      default:
        return "linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)";
    }
  }};
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  animation: ${slideIn} 0.3s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ToastMessage = styled.span`
  flex: 1;
  font-weight: 500;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProgressBar = styled.div<{ duration: number }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  animation: progress ${(props) => props.duration}ms linear;

  @keyframes progress {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }
`;

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    });
  }, [toasts, removeToast]);

  if (toasts.length === 0) return null;

  return (
    <ToastContainerWrapper>
      {toasts.map((toast) => (
        <ToastItem key={toast.id} type={toast.type}>
          <ToastMessage>{toast.message}</ToastMessage>
          <CloseButton onClick={() => removeToast(toast.id)}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </CloseButton>
          <ProgressBar duration={toast.duration || 5000} />
        </ToastItem>
      ))}
    </ToastContainerWrapper>
  );
};

export default ToastContainer;

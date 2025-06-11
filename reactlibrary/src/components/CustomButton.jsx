import React from "react";

export function CustomButton({
  text,
  onClick,
  style = {},
  hoverStyle = {},
  disabled = false,
  icon = null,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
}) {
  const baseStyle = {
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
    ...style,
  };

  return (
    <button
      disabled={disabled || loading}
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={(e) =>
        hoverStyle &&
        !disabled &&
        !loading &&
        Object.assign(e.currentTarget.style, hoverStyle)
      }
      onMouseLeave={(e) =>
        !disabled &&
        !loading &&
        Object.assign(e.currentTarget.style, baseStyle)
      }
    >
      {loading ? (
        <span>Cargando...</span>
      ) : (
        <>
          {icon && iconPosition === "left" && icon}
          <span>{text}</span>
          {icon && iconPosition === "right" && icon}
        </>
      )}
    </button>
  );
}

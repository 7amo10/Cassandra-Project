function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border p-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
    />
  );
}

export default Input;
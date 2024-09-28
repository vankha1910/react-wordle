const CustomSwitch = ({
  value,
  disabled,
  onChange,
}: {
  value?: boolean;
  disabled?: boolean;
  onChange?: () => void;
}) => {
  return (
    <label className='inline-flex items-center cursor-pointer'>
      <input
        disabled={disabled}
        type='checkbox'
        checked={value}
        className='sr-only peer'
        onChange={onChange}
      ></input>
      <div
        className={`${
          disabled ? 'cursor-not-allowed' : ''
        } relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-green`}
      ></div>
    </label>
  );
};

export default CustomSwitch;

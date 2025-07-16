interface LabelledInputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
}

const LabelledInputField = ({
  id,
  label,
  type,
  placeholder,
  onChange,
  value,
}: LabelledInputFieldProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-lg capitalize font-winky text-white mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 text-lg py-4 border border-gray-300 rounded-md shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-white font-winky"
        required
      />
    </div>
  );
};

export default LabelledInputField
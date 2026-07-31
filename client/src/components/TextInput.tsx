interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TextInput({
  value,
  onChange,
}: TextInputProps) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-lg font-semibold">
        Paste Document
      </label>

      <textarea
        rows={12}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your document here..."
        className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900"
      />
    </div>
  );
}

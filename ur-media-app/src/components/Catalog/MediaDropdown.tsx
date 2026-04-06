interface DropdownProps {
  dropdownOptions: string[];
  selectedMedia: string;
  onMediaChange: (newValue: string) => void;
}

export const MediaDropdown = ({
  dropdownOptions,
  selectedMedia,
  onMediaChange,
}: DropdownProps) =>{
  return (
    <div>
      <h1>Media Type</h1>
      <select
        onChange={(media) => onMediaChange(media.target.value)}
        defaultValue={selectedMedia}
      >
        {dropdownOptions.map((media, idx) => (
          <option key={idx}>{media}</option>
        ))}
      </select>
    </div>
  );
};

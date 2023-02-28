
const MySelect = ({options, defaultValue, value, onChange}) => {
  return (
    <select style={{marginTop: '10px', backgroundColor: 'transparent'}} value={value}
            onChange={event => onChange(event.target.value)}
    >
      <option disabled value="">{defaultValue}</option>
      {options.map(option => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        )
      })}
    </select>
  );
};

export default MySelect;
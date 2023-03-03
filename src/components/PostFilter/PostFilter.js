import MySelect from "../UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
  return (
    <MySelect defaultValue="Сортировка"
              value={filter.sort}
              onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
              options={[
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
              ]}
    />
  );
};

export default PostFilter;
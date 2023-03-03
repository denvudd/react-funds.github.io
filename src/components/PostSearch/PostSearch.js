import MyInput from "../UI/input/MyInput";

const PostSearch = ({filter, setFilter}) => {
  return (
    <div>
        <MyInput 
                placeholder="Поиск"
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
        >
        </MyInput>
    </div>
  );
};

export default PostSearch;
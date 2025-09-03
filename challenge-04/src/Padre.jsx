import {useState} from 'react'
import { Hijo } from './Hijo'


const ComponentApp = () => {
  
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([]);

  const handleInputChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddCategory = () => {
    setCategories([...categories, category]);
    setCategory('');
  };


  return (
    <>
    <div>
      <h2>Challenge 04 - Mis Categorías</h2>
      <Hijo
        category={category}
        onInputChange={handleInputChange}
        onAddCategory={handleAddCategory}
      />
      <ul>
        {categories.map((cat, idx) => (
          <li key={idx}>{cat}</li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default ComponentApp